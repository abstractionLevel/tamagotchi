class StatusBar {

    constructor(scene,pos,description) {
        this.scene = scene;
        this.pos = pos;
        this.barSize = 50;
        this.initialEnergy = this.barSize;
        this.countTime = 0;
        this.addText(description);
        this.drawBar();
    }

    addText(description) {
        this.scene.add.text(this.pos.x,this.pos.y - 20, description, {
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
        this.energyBar.fillRect(this.pos.x,this.pos.y, this.initialEnergy, 10);

    }

    updateBar(time,factoreDescrease) {
        if (time > this.countTime) {
            this.decreaseBar(factoreDescrease);
            this.countTime = time + 4000;
        }
    }

    decreaseBar(factoreDescrease) {
        if (this.initialEnergy !== 0) {
            this.initialEnergy = this.initialEnergy - factoreDescrease;
        }
        this.drawBar();
    }

    increaseBar(value) {
        if(this.initialEnergy<=this.barSize) {
            this.initialEnergy += value;
        }
    }


    
}