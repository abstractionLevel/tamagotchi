class TextCatManager {

    constructor(scene,texture,scale) {
       this.text = null; 
       this.scale = scale;
       this.text = scene.add.sprite(0,0, texture).setScale(scale);
       this.text.visible = false;
    }

  

    updateTextVisibility(condition) {
        if (this.text) {
            this.text.visible = condition;
        }
    }

    updateTextPosition(cat) {
        if (this.text) {
            this.text.x = cat.x + 40;
            this.text.y = cat.y + 8;
        }
    }
}