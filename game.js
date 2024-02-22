
var config = {
    type: Phaser.AUTO,
    width: 300,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
    },
    scene: [Scene1,Scene2],
    cache: {
        html: false // Disabilita la cache HTML di Phaser
    },
    pixelArt: true,
    autoCenter: true,
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





