//  게임 설명
var tutorial = {
    create: function () {
        game.add.image(0, 0, 'spr_tutorial_1');

        var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.nextScene, this);
    },

    nextScene: function() {
        game.state.start('Game');
    }
}