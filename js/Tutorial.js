//  게임 설명
var tutorial = {
    create: function () {
        //  씬 전환 효과
        this.camera.flash("#000000");

        //  배경
        game.add.image(0, 0, "spr_tutorial");

        //  씬 이동 콜백
        game.time.events.add(Phaser.Timer.SECOND * 5, this.startGame);
    },

    startGame: function() {
        game.state.start("Game");
    }
}