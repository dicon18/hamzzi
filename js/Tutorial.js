//  게임 설명
var gameMode;
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
        if(gameMode == "single")
            game.state.start("Game");
        else if(gameMode == "multi")
            game.state.start("gameMulti");
    }
}