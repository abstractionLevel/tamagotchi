class CatMovementManager {
    
    constructor(cat,catStateManager) {
        this.cat = cat;
        this.catStateManager = catStateManager;
    }

    update() {
        const currentState = this.catStateManager.currentStateCat;
        switch (currentState) {
            case NPC_STATES.WALKING_LEFT:
                this.moveLeft();
                break;
            case NPC_STATES.WALKING_RIGHT:
                this.moveRight();
                break;
            case NPC_STATES.SITTING:
                this.stop();
                break;
            case NPC_STATES.EATING:
                this.stop();
        }
    }

    moveLeft() {
        this.cat.x -= 1;
        this.cat.setFlipX(true);
    }

    moveRight() {
        this.cat.x += 1;
        this.cat.setFlipX(false);
    }

    stop() {
        
    }
}