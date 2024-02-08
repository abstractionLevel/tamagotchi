class Scene2 extends Phaser.Scene {

    constructor() {
        super("playGame");
        this.barSize = 50;
        this.initialEnergy = this.barSize;
        this.catState = NPC_STATES.SITTING;
        this.positionEnergyBar = { x: 10, y: 50 };
        this.factoreDescreaseEnergy = 1;
        this.positionGiveFood = { x: 10, y: config.height - 140 };
        this.positionFoodBar = { x: 10, y: 70 };
        this.cat;
        this.textCatManager;
        this.energyBar;
        this.currentTime = 0;
        this.foodBar;
        this.catMovementManager;
        this.fattoreDescreaseEnergy = 1; // Fattore di decremento dell'energia
        this.fattoreDecreaseFood = 1;
    }

    create() {
        this.setupCat();
        this.setUpBackground();
        this.setUpPlatform();
        this.setUpColliders();
        this.giveFood();
    }

    setupCat() {
        this.cat = new Cat(this, config.width / 2 + 50, config.height - 280, "cat");
        this.textCatManager = new TextCatManager(this, "meow", 0.2);
        this.catStateManager = new CatStateManager(this.cat);
        this.catMovementManager = new CatMovementManager(this.cat, this.catStateManager)
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
        this.energyBar = new StatusBar(this, { x: this.positionEnergyBar.x, y: this.positionEnergyBar.y - 20 }, "Energy");
        this.foodBar = new StatusBar(this, { x: this.positionFoodBar.x, y: this.positionFoodBar.y }, "Hunger")
    }

    giveFood() {
        this.add.text(this.positionGiveFood.x, this.positionGiveFood.y, 'give food', {
            fontSize: '16px',
            fill: '#000000'
        });

        const zone = this.add.zone(this.positionGiveFood.x, this.positionGiveFood.y, 32, 32)
            .setOrigin(0).setInteractive();

        zone.on('pointerup', () => {
            if (this.catStateManager.currentStateCat !== NPC_STATES.EATING) {
                this.catStateManager.actionEating(this.currentTime);
                this.foodBar.increaseBar(20);
            }

        });

    }

    update(time) {
        this.currentTime = time;
        this.cat.update(time);
        this.catStateManager.update(time)
        this.catMovementManager.update();

        switch (this.catStateManager.currentStateCat) {
            case NPC_STATES.WALKING_LEFT:
                this.fattoreDescreaseEnergy = 2;
                this.fattoreDecreaseFood = 5;
            case NPC_STATES.WALKING_RIGHT:
                this.fattoreDescreaseEnergy = 2;
                this.fattoreDecreaseFood = 5;
                break;
            case NPC_STATES.SITTING:
                this.fattoreDescreaseEnergy = 1;
                this.fattoreDecreaseFood = 5;
                break;
            case NPC_STATES.EATING:
                // Fattori specifici per lo stato di mangiare, se necessario
                break;
        }

        this.textCatManager.updateTextVisibility(this.catStateManager.currentStateCat === NPC_STATES.SITTING);
        this.textCatManager.updateTextPosition(this.cat);
        this.energyBar.updateBar(time, this.fattoreDescreaseEnergy);
        this.foodBar.updateBar(time, this.fattoreDecreaseFood);
    }

    decreaseEnergy() {
        if (this.initialEnergy !== 0) {
            this.initialEnergy = this.initialEnergy - this.factoreDescreaseEnergy;
        }
        this.drawEnergyBar();
    }

}