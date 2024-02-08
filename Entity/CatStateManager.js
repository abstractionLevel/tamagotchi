class CatStateManager {

    constructor(cat) {
        this.cat = cat;
        this.catWidth = 32;
        this.leftBoundary = this.catWidth;
        this.rightBoundary = config.width - this.catWidth;
        this.currentStateCat = NPC_STATES.SITTING;
        this.randomCatState = true;
        this.actionTime = 0;
        this.nextActionTime = 0;
        this.fattoreDescreasEnergy = 0;
        this.currentTime = 0;

    }

    update(time) {
        if (this.randomCatState) {
            if (time > this.nextActionTime) {
                this.currentStateCat = this.getRandomState();
                this.nextActionTime = time + 4000;
            }
            this.setStateCat(this.currentStateCat, time);
        } else {
            this.setStateCat(this.currentStateCat, time);
        }
    }

    getRandomState() {
        const statesArray = [NPC_STATES.WALKING_LEFT, NPC_STATES.WALKING_RIGHT, NPC_STATES.SITTING];
        const randomIndex = Phaser.Math.Between(0, statesArray.length - 1);

        return statesArray[randomIndex];
    }

    setStateCat(catState, time) {

        switch (catState) {
            case NPC_STATES.WALKING_LEFT:
                this.moveCatDirection(true);
                this.fattoreDescreasEnergy = 5;
                break;
            case NPC_STATES.WALKING_RIGHT:
                this.moveCatDirection(false);
                this.fattoreDescreasEnergy = 5;
                break;
            case NPC_STATES.SITTING:
                this.cat.play(NPC_STATES.SITTING, true);
                this.fattoreDescreasEnergy = 1;
                break;
            case NPC_STATES.EATING:
                this.cat.play(NPC_STATES.EATING, true);
                this.fattoreDescreasEnergy = 1;
                if (time >= this.actionTime + 5000) {
                    this.randomCatState = true;
                }
                break;
        }
    }

    moveCatDirection(flip) {
        this.cat.x += flip ? -1 : 1;
        this.cat.play(NPC_STATES.WALKING, true);
        this.cat.setFlip(flip);
        if ((this.cat.x <= this.leftBoundary + this.catWidth) || (this.cat.x + this.catWidth >= this.rightBoundary)) {
            this.currentStateCat = flip ? NPC_STATES.WALKING_RIGHT : NPC_STATES.WALKING_LEFT;
            this.cat.setFlip(flip);
        }
    }

    actionEating() {
        this.currentStateCat = NPC_STATES.EATING;
        this.randomCatState = false;
    }
}
