//  로고 & 크레딧
var main = {
    create: function () {
        game.stage.backgroundColor = "#1dd1a1";

        this.logo = game.add.image(CANVAS_WIDTH / 2, 150,'spr_logo');
            this.logo.scale.set(0.5);
            this.logo.anchor.set(0.5);

        this.text_help = game.add.text(CANVAS_WIDTH / 2, 500, "Press space bar", {
            font: "bold 80px BMJUA",
        })
            this.text_help.anchor.set(0.5);

        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            this.spaceKey.onDown.add(this.nextScene, this);
    },

    nextScene: function() {
        game.state.start('custom');
    }
}