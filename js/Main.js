//  플레이어 이름 받기 및 커스텀마이징
Phaser.Device.whenReady(function() {
    game.plugins.add(PhaserInput.Plugin);
});

var boot = {
    create: function() {
        game.stage.backgroundColor = "#1dd1a1";

        var login = game.add.text(game.width/2,100,'햄 찌 볼',{
            font: '80px BMJUA',
            fill: '#000000'
        });
        login.anchor.set(0.5);

        var user = game.add.inputField(game.width/2-250, 300, {
            font: '30px BMJUA',
            fill: '#212121',
            width: 500,
            max: 30,
            padding: 10,
            borderWidth: 1,
            borderColor: '#000',
            borderRadius: 6,
            placeHolder: '닉네임을 입력하세요...',
            textAlign: 'center',
            type: PhaserInput.InputType.text
        });

        var submitBtn = game.add.image(game.width / 2 + 10, 400, 'btn');
        submitBtn.anchor.set(0.5);
        var submit = game.add.text(game.width / 2 + 10, 400, 'p l a y !', {
            font: '35px BMJUA',
        });
        submit.anchor.set(0.5);
        submitBtn.inputEnabled = true;
        submitBtn.input.useHandCursor = true;
        submitBtn.events.onInputDown.add(function() {
            nickname = user.value;
            game.state.start('Game');
        });
    }
}