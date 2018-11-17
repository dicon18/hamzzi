var game = new Phaser.Game(1280, 720, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

var user;
var nickname;

Phaser.Device.whenReady(function () {
    game.plugins.add(PhaserInput.Plugin);
    game.plugins.add(PhaserNineSlice.Plugin);
});

function preload(){
    game.load.image('btn', 'assets/images/btn_clean.png');
}

function create(){
    game.stage.backgroundColor = "#1dd1a1";

    var login = game.add.text(game.width/2,100,'잘 만든 축구깸',{
        font: '80px',
        fontWeight: 'bold',
        fill: '#ffffff'
    });
    login.anchor.set(0.5);

    user = game.add.inputField(game.width/2-258, 300, {
        font: '30px Arial',
        fill: '#212121',
        fontWeight: 'bold',
        width: 500,
        max: 30,
        padding: 8,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 6,
        placeHolder: '닉네임을 입력하세요...',
        textAlign: 'center',
        type: PhaserInput.InputType.text
    });

    var submitBtn = game.add.nineSlice(game.width / 2, 400, 'btn', null, 100, 70);
    submitBtn.anchor.set(0.5);
    var submit = game.add.text(game.width / 2, 405, 'play!', {
        font: '18px Arial'
    });
    submit.anchor.set(0.5);
    submitBtn.inputEnabled = true;
    submitBtn.input.useHandCursor = true;
    submitBtn.events.onInputDown.add(function() {
        nickname = user.value;
        game.add.text(30, 10, 'Welcome ' + user.value + '!', {
            font: '18px Arial'
        });

    });
}

function update(){

}

function render(){

}