var game = new Phaser.Game(1280, 720, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

Phaser.Device.whenReady(function () {
    game.plugins.add(PhaserInput.Plugin);
});

function preload(){
    
}

function create(){
    var nickname = game.add.inputField(game.world.centerX-150, game.world.centerY, {
        font: '18px Arial',
        fill: '#212121',
        fontWeight: 'bold',
        textAlign: 'center',
        width: 300,
        padding: 8,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 6,
        placeHolder: 'Nickname',
        type: PhaserInput.InputType.text
    });
    var nicknameButton = game.add.inputField(game.world.centerX-150, game.world.centerY+100,{
        font: '18px Arial',
        fill: '#212121',
        fontWeight: 'bold',
        textAlign: 'center',
        width: 300,
        padding: 8,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 6,
        type: PhaserInput.InputType.numeric
    });
}

function update(){

}

function render(){

}