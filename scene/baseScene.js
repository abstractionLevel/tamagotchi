class BaseScene extends Phaser.Scene {

    constructor(key) {
        super({key});
        this.initialHealth = 50;
        this.currentHealth = this.initialHealth;
        this.catState = NPC_STATES.SITTING;
    }
}