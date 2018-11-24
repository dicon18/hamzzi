//  로고 & 크레딧
var main = {
    create: function () {
        game.stage.backgroundColor = "#1dd1a1";

        this.logo = game.add.image(CANVAS_WIDTH / 2, 150,'spr_logo');
            this.logo.anchor.set(0.5);
            this.logo.scale.set(0.5);

        this.text_help = game.add.text(CANVAS_WIDTH / 2, 500, "아무키나 누르고 싶어?", {
            font: "bold 80px BMJUA",
        })
            this.text_help.anchor.set(0.5);

        isAnyKey = false;
        game.input.keyboard.onPressCallback = function(e) {
            if (e != null && isAnyKey == false) {
                game.state.start('custom');
                isAnyKey = true;
            }
        }
    },
}