class Scene2 extends Phaser.Scene {

    constructor() {
        super("playGame");
        this.barSize = 50;
        this.initialEnergy = this.barSize;
        this.catState = NPC_STATES.SITTING;
        this.positionBar = { x: 10, y: 20 };
        this.positionGiveFood = { x: 10, y: config.height - 140 };
        this.cat;
        this.textCatManager;
        this.energyBar;
        this.currentTime = 0;
        this.foodBar;
        this.funBar;
        this.catMovementManager;
        this.fattoreEnergy = 1;
        this.fattoreFood = 0;
        this.fattoreFun = 0;
        this.sleepText = null;
        this.wakeUpText = null;
        this.playText = null;
        this.stopPlayText = null;
        this.cacca;
        this.groupCacca;
        this.cleanBar;
        this.cleanLine;
    }

    create() {
        this.setUpEntity();
        this.setUpBackground();
        this.setUpPlatform();
        this.setUpColliders();
        this.giveFood();
        this.wakeUp();
        this.sleep();
        this.stopPlay();
        this.play();
        this.actionClean();
        this.drawLine();
    }

    setUpEntity() {
        this.cat = new Cat(this, 200, config.height - 380, "cat");
        this.groupCacca = this.physics.add.group();
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
        this.physics.add.collider(this.groupCacca, this.platforms);
    }

    setUpBackground() {
        this.cameras.main.setBackgroundColor('#FFFFFF');
        this.energyBar = new StatusBar(this, { x: this.positionBar.x, y: this.positionBar.y }, "Energy");
        this.foodBar = new StatusBar(this, { x: this.positionBar.x + 80, y: this.positionBar.y }, "Hunger")
        this.funBar = new StatusBar(this, { x: this.positionBar.x + 160, y: this.positionBar.y }, "Fun")
        this.cleanBar = new StatusBar(this, { x: this.positionBar.x + 240, y: this.positionBar.y }, "Clean")

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
                this.foodBar.increaseBar(5);
            }

        });
    }

    sleep() {
        this.sleepText = this.add.text(this.positionGiveFood.x + 150, this.positionGiveFood.y, 'sleep', {
            fontSize: '16px',
            fill: '#000000'
        });
    }

    wakeUp() {
        this.wakeUpText = this.add.text(this.positionGiveFood.x + 150, this.positionGiveFood.y, 'wake up', {
            fontSize: '16px',
            fill: '#000000'
        });
    }

    play() {
        this.playText = this.add.text(this.positionGiveFood.x + 250, this.positionGiveFood.y, 'Play', {
            fontSize: '16px',
            fill: '#000000'
        });
    }

    stopPlay() {
        this.stopPlayText = this.add.text(this.positionGiveFood.x + 250, this.positionGiveFood.y, 'Stop play', {
            fontSize: '16px',
            fill: '#000000'
        });
    }

    actionClean() {
        this.add.text(this.positionGiveFood.x, this.positionGiveFood.y + 50, 'Clean', {
            fontSize: '16px',
            fill: '#000000'
        });

        const zone = this.add.zone(this.positionGiveFood.x, this.positionGiveFood.y + 50, 32, 32)
            .setOrigin(0).setInteractive();

        zone.on('pointerup', () => {
            
            this.cleanLine.visible = true;

        });
    }

    onClickWakeupSleepZone() {
        const zone = this.add.zone(this.positionGiveFood.x + 150, this.positionGiveFood.y, 32, 32)
            .setOrigin(0).setInteractive();
        zone.on('pointerup', () => {
            if (this.catStateManager.currentStateCat === NPC_STATES.SLEEP) {
                this.catStateManager.actionWakeUp();
            } else {
                this.catStateManager.actionSleep();
            }
        });

    }

    onClickPlay() {
        const zone = this.add.zone(this.positionGiveFood.x + 250, this.positionGiveFood.y, 32, 32)
            .setOrigin(0).setInteractive();
        zone.on('pointerup', () => {
            if (this.catStateManager.currentStateCat === NPC_STATES.RUN) {
                this.catStateManager.randomCatState = true;
            } else {
                this.catStateManager.actionFun();
            }
        });

    }

    drawLine() {
        this.cleanLine = this.add.line(100, 100, 0, 0, 800, 0, 0x000000);
        this.cleanLine.visible = false;

    }

    update(time) {
        this.currentTime = time;
        this.cat.update(time);
        this.catStateManager.update(time)
        this.catMovementManager.update();

        switch (this.catStateManager.currentStateCat) {
            case NPC_STATES.WALKING:
                this.fattoreEnergy = 2;
                this.fattoreFood = 1;
                this.fattoreFun = 2;
            case NPC_STATES.SITTING:
                this.fattoreEnergy = 1;
                this.fattoreFood = 1;
                this.fattoreFun = 2;
                break;
            case NPC_STATES.EATING:
                this.fattoreEnergy = 2;
                this.fattoreFun = 2;
                this.fattoreFun = 1;
                break;
            case NPC_STATES.SLEEP:
                this.fattoreEnergy = -4;
                this.fattoreFun = 1;
                break;
            case NPC_STATES.RUN:
                this.fattoreFun = -6;
                this.fattoreEnergy = 4;
                break;
        }

        if (this.catStateManager.currentStateCat === NPC_STATES.SLEEP) {
            this.sleepText.setVisible(false);
            this.wakeUpText.setVisible(true);
        }
        if (this.catStateManager.currentStateCat !== NPC_STATES.SLEEP) {
            this.sleepText.setVisible(true);
            this.wakeUpText.setVisible(false);
        }

        if (this.catStateManager.currentStateCat === NPC_STATES.RUN) {
            this.playText.setVisible(false);
            this.stopPlayText.setVisible(true);
        }
        if (this.catStateManager.currentStateCat !== NPC_STATES.RUN) {
            this.stopPlayText.setVisible(false);
            this.playText.setVisible(true);
        }
        if (this.catStateManager.finishedToEat) {
            this.makeCacca();
        }


        this.textCatManager.updateTextVisibility(this.catStateManager.currentStateCat === NPC_STATES.SITTING);
        this.textCatManager.updateTextPosition(this.cat);
        this.energyBar.updateBar(time, this.fattoreEnergy);
        this.foodBar.updateBar(time, this.fattoreFood);
        this.funBar.updateBar(time, this.fattoreFun);
        this.onClickWakeupSleepZone();
        this.onClickPlay();

        if (this.cleanLine.visible) {
            this.cleanCacca();
        }


    }

    makeCacca() {
        this.catStateManager.finishedToEat = false;
        this.catStateManager.randomCatState = false;
        this.catStateManager.currentStateCat = NPC_STATES.SITTING;
        setTimeout(() => {
            this.groupCacca.add(new Cacca(this, this.cat.flipX ? this.cat.x + 40 : this.cat.x - 40, this.cat.y + 60, "cacca"));
            this.catStateManager.randomCatState = true;
            this.cleanBar.updateBar(null, 20);
        }, 2000)
    }

    cleanCacca() {
        this.cleanLine.y += 2;
        if (this.cleanLine.y >= config.height - 180) {
            this.cleanLine.visible = false;
            this.cleanLine.y = 100;
            let children = this.groupCacca.getChildren();
            children.forEach(child => {
                child.destroy();
            });
            this.cleanBar.updateBar(null,-20)
        }
    }


}