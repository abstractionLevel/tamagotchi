class CatStateManager {

    constructor(cat) {
        this.cat = cat;
        this.catWidth = 32;
        this.leftBoundary = this.catWidth;
        this.rightBoundary = config.width - this.catWidth;
        this.currentStateCat = NPC_STATES.SITTING;
        this.randomCatState = true;
        this.nextActionTime = 0;
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
                this.setAnimation(true);
                break;
            case NPC_STATES.WALKING_RIGHT:
                this.setAnimation(false);
                break;
            case NPC_STATES.SITTING:
                this.cat.play(NPC_STATES.SITTING, true);
                break;
            case NPC_STATES.EATING:
                this.cat.play(NPC_STATES.EATING, true);
                if (time >= this.currentTime + 5000) {
                    this.randomCatState = true;
                }
                break;
            case NPC_STATES.SLEEP:
                this.cat.play(NPC_STATES.SLEEP, true);
                break;
        }
    }

    setAnimation(flip) {
        this.cat.play(NPC_STATES.WALKING, true);
        this.cat.setFlip(flip);
        if ((this.cat.x <= this.leftBoundary + this.catWidth) || (this.cat.x + this.catWidth >= this.rightBoundary)) {
            this.currentStateCat = flip ? NPC_STATES.WALKING_RIGHT : NPC_STATES.WALKING_LEFT;
            this.cat.setFlip(flip);
        }
    }

    actionEating(currentTime) {
        this.currentTime = currentTime
        this.currentStateCat = NPC_STATES.EATING;
        this.randomCatState = false;
    }

    actionSleep() {
        this.currentStateCat = NPC_STATES.SLEEP;
        this.randomCatState = false;
        console.log("dorme")
    }
}
