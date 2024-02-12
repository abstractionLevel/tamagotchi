class StatusBar {

    constructor(scene, pos, description) {
        this.scene = scene;
        this.pos = pos;
        this.barSize = 50;
        this.levelBar = this.barSize;
        this.countTime = 0;
        this.addText(description);
        this.drawBar();
    }

    addText(description) {
        this.scene.add.text(this.pos.x, this.pos.y - 20, description, {
            fontSize: '16px',
            fill: '#000000'
        });
    }

    drawBar() {
        this.staticEnergyBar = this.scene.add.graphics();
        this.energyBar = this.scene.add.graphics();
        this.staticEnergyBar.clear();
        this.staticEnergyBar.fillStyle(0xC0C0C0);
        this.staticEnergyBar.fillRect(this.pos.x, this.pos.y, this.barSize, 10);

        this.energyBar.clear();
        this.energyBar.fillStyle(0x000000);
        this.energyBar.fillRect(this.pos.x, this.pos.y, this.levelBar, 10);

    }

    updateBar(time, fattore) {
        if (time > this.countTime &&  this.levelBar <= 50) {
            this.updateLevelBar(fattore);
            this.countTime = time + 4000;
        } else if(time==null) {
            this.updateLevelBar(fattore);
        }
    }

    updateLevelBar(fattore) {
        this.levelBar = this.levelBar - fattore;
        if (this.levelBar < 0) this.levelBar = 0;
        this.drawBar();
    }

    increaseBar(value) {
        if ((this.levelBar + value) > this.barSize) {
            this.levelBar = this.barSize;
        }
        else {
            this.levelBar += value;
        }
    }



}