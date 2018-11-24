//  게임 설명
var tutorial = {
    create: function () {
        game.add.image(0, 0, 'spr_tutorial_1');

        isAnyKey = false;
        game.input.keyboard.onPressCallback = function(e) {
            if (e != null && isAnyKey == false) {
                game.state.start('Game');
                isAnyKey = true;
            }
        }
    }
}