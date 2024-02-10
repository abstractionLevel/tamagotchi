class Cat extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        this.setScale(4);
        const anims = scene.anims
        this.randomCatState = true;
        this.catWidth = 32;
       
        
        anims.create({
            key: NPC_STATES.SITTING,
            frames: this.anims.generateFrameNumbers('cat', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });

        anims.create({
            key: NPC_STATES.WALKING,
            frames: this.anims.generateFrameNumbers("cat", { start: 32, end: 39 }),
            frameRate: 10,
            repeat: -1,
        });

        anims.create({
            key: NPC_STATES.EATING,
            frames: this.anims.generateFrameNumbers("cat", { start: 3, end: 4 }),
            frameRate: 0.8,
            repeat: -1,
        });

        anims.create({
            key: NPC_STATES.SLEEP,
            frames: this.anims.generateFrameNumbers("cat", { start: 48, end: 50 }),
            frameRate: 0.8,
            repeat: -1,
        })
    }


    update(time) {
       
    }

}