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
        this.currentTime;
        this.lastClosedTime;
        this.previousStateCat = null;
        this.previousFattoreFood = null;
        this.previousFattoreEnergy = null;
        this.previousFattoreHunger = null;
        this.previousFattoreFun = null;
        
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
        this.cameras.main.setSize(config.width, config.height);

        this.time.addEvent({
            delay: 10000,
            callback: this.updateBar,
            callbackScope: this,
            loop: true
        });

        this.onClickWakeupSleepZone();
        this.onClickPlay();

        const  posStats = {x:324,y:60}

        this.add.text(posStats.x, 30, 'Stats ', {
            fontSize: '16px',
            fill: '#000000'
        });

        this.fpsText = this.add.text(posStats.x, 60, ' ', {
            fontSize: '16px',
            fill: '#000000'
        });

        this.textCurrentStateCat = this.add.text(posStats.x, 90, '', {
            fontSize: '16px',
            fill: '#000000'
        });

        this.textFattoreFood = this.add.text(posStats.x, 120, '' , {
            fontSize: '16px',
            fill: '#000000'
        });

        this.textFattoreEnergy = this.add.text(posStats.x, 150, '' , {
            fontSize: '16px',
            fill: '#000000'
        });

        this.textFattoreFun = this.add.text(posStats.x, 180, '' , {
            fontSize: '16px',
            fill: '#000000'
        });

    }


    setUpEntity() {
        this.cat = new Cat(this, 200, 0, "cat");
        this.groupCacca = this.physics.add.group();
        this.textCatManager = new TextCatManager(this, "meow", 0.2);
        this.catStateManager = new CatStateManager(this.cat);
        this.physics.add.existing(this.cat);
    }

    setUpPlatform() {
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(0, config.height - 200, 'ground').setScale(1.5, 1).refreshBody();
        // this.platform.setSize(200, platform.height);
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

    onClickPlay() {//viene chiamato ad ogni aggiornamento
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
        this.catStateManager.update(time);
        this.cat.update(time);
        this.displayStats();
        this.fpsText.setText('FPS: ' + Math.round(this.game.loop.actualFps));

        switch (this.catStateManager.currentStateCat) {
            case NPC_STATES.WALKING:
                this.fattoreEnergy = 0.3;
                this.fattoreFood = 0.4;
                this.fattoreFun = 0.3;
                break;
            case NPC_STATES.SITTING:
                this.fattoreEnergy = 0.1;
                this.fattoreFood = 0.3;
                this.fattoreFun = 0.5;
                break;
            case NPC_STATES.EATING:
                this.fattoreEnergy = 0.2;
                this.fattoreFun = 0.1;
                break;
            case NPC_STATES.SLEEP:
                this.fattoreEnergy = -4;
                this.fattoreFood = 0.1;
                break;
            case NPC_STATES.RUN:
                this.fattoreEnergy = 3;
                this.fattoreFun = -3;
                this.fattoreFood = 0.5;
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

        if (this.cleanLine.visible) {
            this.cleanCacca();
        }

    }

    onScenePause() {
    }

    makeCacca() {
        this.catStateManager.finishedToEat = false;
        this.catStateManager.randomCatState = false;
        this.catStateManager.currentStateCat = NPC_STATES.SITTING;
        setTimeout(() => {
            this.groupCacca.add(new Cacca(this, this.cat.flipX ? this.cat.x + 40 : this.cat.x - 40, this.cat.y + 60, "cacca"));
            this.catStateManager.randomCatState = true;
            this.cleanBar.updateBar(20);
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
            this.cleanBar.updateBar(-20)
        }
    }

    updateBar() {
        this.energyBar.updateBar(this.fattoreEnergy);
        this.foodBar.updateBar(this.fattoreFood);
        this.funBar.updateBar(this.fattoreFun);
    }

    updateBarAfterResponse(fattore) {
        this.energyBar.updateBar(fattore);
        this.foodBar.updateBar(fattore);
        this.funBar.updateBar(fattore);
    }

    displayStats() {
        
        if (this.catStateManager.currentStateCat !== this.previousStateCat) {
            this.textCurrentStateCat.setText('State:' + this.catStateManager.currentStateCat);
            this.previousStateCat = { ...this.catStateManager.currentStateCat };
        }
        if (this.fattoreFood !== this.previousFattoreFood) {
            this.textFattoreFood.setText('food ratio: ' + this.fattoreFood);
            this.previousFattoreFood = { ...this.fattoreFood };
        }

        if(this.fattoreEnergy !== this.previousFattoreFood) {
            this.textFattoreEnergy.setText('energy ratio: ' + this.fattoreEnergy);
            this.previousFattoreEnergy = { ...this.fattoreEnergy };
        }

        if(this.fattoreFun !== this.previousFattoreFun) {
            this.textFattoreFun.setText('fun ratio: ' + this.fattoreFun);
            this.previousFattoreFun = { ...this.fattoreFun };
        }



    }
}