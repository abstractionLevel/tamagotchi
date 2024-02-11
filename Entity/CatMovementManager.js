class CatMovementManager {

    constructor(cat, catStateManager) {
        this.cat = cat;
        this.catStateManager = catStateManager;
        this.catWidth = 32;
        this.leftBoundary = this.catWidth;
        this.rightBoundary = config.width - this.catWidth;
        this.collideOnBorder = false;
        this.velocity = 0;
    }

    update() {
        const currentState = this.catStateManager.currentStateCat;
        switch (currentState) {
            case NPC_STATES.WALKING:
                this.setDirection(1);
                break;
            case NPC_STATES.SITTING:
                this.stop();
                break;
            case NPC_STATES.EATING:
                this.stop();
                break;
            case NPC_STATES.SLEEP:
                this.stop();
                break;
            case NPC_STATES.FUN:
                this.move();
                break;
            case NPC_STATES.RUN:
                this.setDirection(2);
                break;
        }
    }

    setDirection(speed) {
        
        if (this.isCollideLeft()) {
            this.velocity = + speed;
            this.cat.setFlip(false);
        }
        if (this.isCollideRight()) {
            this.velocity = -speed;
            this.cat.setFlip(true);
        }
        this.cat.x += this.velocity === 0 ? speed : this.velocity;
    }

    isCollideLeft() {
        return (this.cat.x <= this.leftBoundary + this.catWidth);
    }

    isCollideRight() {
        return (this.cat.x + this.catWidth >= this.rightBoundary);
    }

    stop() {

    }
}