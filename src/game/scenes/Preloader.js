import { Scene } from 'phaser';

export class Preloader extends Scene {
    constructor() {
        super('Preloader');
    }

    init() {
        this.add.image(this.cameras.main.width/2, this.cameras.main.height/2, 'background').setDepth(0);

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress) => {
            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);
        });
    }

    preload() {
        //  Load our assets. These are just a few images, but you could load audio, spritesheets, 3D models, etc.
        this.load.image('Hills', 'environment/Hills.png');
        this.load.image('Grass', 'environment/Grass.png');
        this.load.tilemapTiledJSON('tilemap', 'map.json')
    }

    create() {
        this.scene.start('Game');
    }
}
