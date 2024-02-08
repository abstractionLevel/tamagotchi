class Scene2 extends Phaser.Scene {

    constructor() {
        super("playGame");
        this.barSize = 50;
        this.initialEnergy = this.barSize;
        this.catState = NPC_STATES.SITTING;
        this.positionEnergyBar = { x: 10, y: 50 };
        this.factoreDescreaseEnergy = 1;
        this.positionGiveFood = { x: 10, y: config.height - 140 };
        this.cat;
        this.textCatManager;
        this.energyBar;
        this.currentTime = 0;

    }

    create() {
        this.setupCat();
        this.setUpBackground();
        this.setUpPlatform();
        this.setUpColliders();
        this.addGiveFoodText();

    }

    setupCat() {
        this.cat = new Cat(this, config.width / 2 + 50, config.height - 280, "cat");
        this.textCatManager = new TextCatManager(this, "meow", 0.2);
        this.catStateManager = new CatStateManager(this.cat);
        this.physics.add.existing(this.cat);
    }

    setUpPlatform() {
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(0, config.height - 200, 'ground').setScale(2, 1).refreshBody();
    }

    setUpColliders() {
        this.physics.add.collider(this.cat, this.platforms);
    }

    setUpBackground() {
        this.cameras.main.setBackgroundColor('#FFFFFF');
        this.energyBar = new StatusBar(this,{x:this.positionEnergyBar.x,y:this.positionEnergyBar.y - 20},"Energy");
    }

    addGiveFoodText() {
        this.add.text(this.positionGiveFood.x, this.positionGiveFood.y, 'give food', {
            fontSize: '16px',
            fill: '#000000'
        });

        const zone = this.add.zone(this.positionGiveFood.x, this.positionGiveFood.y, 32, 32)
            .setOrigin(0).setInteractive();

        zone.on('pointerup', () => {
            this.catStateManager.actionEating();
            this.catStateManager.actionTime = this.currentTime;
        });

    }

    update(time, delta) {
        this.currentTime = time;
        this.cat.update(time);
        this.catStateManager.update(time)
        this.textCatManager.updateTextVisibility(this.catStateManager.currentStateCat === NPC_STATES.SITTING);
        this.textCatManager.updateTextPosition(this.cat);
        this.energyBar.updateBar(time,this.catStateManager.fattoreDescreasEnergy)
    }

    decreaseEnergy() {
        if (this.initialEnergy !== 0) {
            this.initialEnergy = this.initialEnergy - this.factoreDescreaseEnergy;
        }
        this.drawEnergyBar();
    }

}