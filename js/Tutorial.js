//  게임 설명
var tutorial = {
    create: function () {
        //  씬 전환 효과
        this.camera.flash("#000000");

        //  배경
        game.add.image(0, 0, "spr_tutorial_1");

        //  씬 이동 콜백
        isAnyKey = false;
        game.input.keyboard.onPressCallback = function(e) {
            if (e != null && isAnyKey == false) {
                ef_button = game.add.audio("ef_button");
                ef_button.play();
                game.state.start("Game");
                isAnyKey = true;
            }
        }
    }
}