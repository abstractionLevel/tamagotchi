
var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight - 10,
    scale: {
        mode: Phaser.Scale.FIT,
    },
    scene: [Scene1,Scene2],
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {   
            gravity: { y: 300 },
            debug: false
        }
    }
}

var game = new Phaser.Game(config);

window.addEventListener('resize', function () {
    game.resize(window.innerWidth, window.innerHeight);
});
