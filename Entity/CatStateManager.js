class CatStateManager {

    constructor(cat) {
        this.cat = cat;
        this.currentStateCat = NPC_STATES.SITTING;
        this.randomCatState = true;
        this.nextActionTime = 0;
        this.currentTime = 0;
        this.finishedToEat = false;

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
        const statesArray = [NPC_STATES.WALKING,NPC_STATES.SITTING];
        const randomIndex = Phaser.Math.Between(0, statesArray.length - 1);

        return statesArray[randomIndex];
    }

    setStateCat(catState, time) {
        switch (catState) {
            case NPC_STATES.WALKING:
                this.cat.play(NPC_STATES.WALKING, true);
                break;
            case NPC_STATES.SITTING:
                this.cat.play(NPC_STATES.SITTING, true);
                break;
            case NPC_STATES.EATING:
                this.cat.play(NPC_STATES.EATING, true);
                if (time >= this.currentTime + 5000) {
                    this.randomCatState = true;
                    this.finishedToEat = true;
                }
                break;
            case NPC_STATES.SLEEP:
                this.cat.play(NPC_STATES.SLEEP, true);
                break;
            case NPC_STATES.RUN:
                this.cat.play(NPC_STATES.RUN, true);
                break;
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
    }

    actionWakeUp() {
        this.randomCatState = true;
    }

    actionFun() {
        this.randomCatState = false;
        this.currentStateCat = NPC_STATES.RUN;
    }
}
