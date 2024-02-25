class Scene1 extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    preload() {
        this.load.image("ground","assets/images/platform.png");
        this.load.image("meow","assets/images/meow.png");
        this.load.image("cacca","assets/images/cacca.png");

        this.load.spritesheet("cat", "assets/spritesheets/catSprite.png",{
            frameWidth:32,
            frameHeight:32
        });
        
    }
    create() {
        this.add.text(20,20,"Loading game...");
        this.scene.start("playGame");
    }
}