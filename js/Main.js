//  로고 & 크레딧
var main = {
    create: function() {

        // BGM
        bgm_inGame = game.add.audio("bgm_inGame");
        bgm_inGame.loopFull(1);

        //  씬 전환 효과
        this.camera.flash("#000000");

        //  배경
        this.bg_loby = this.game.add.tileSprite(0, CANVAS_HEIGHT - this.game.cache.getImage("bg_loby").height, 
            CANVAS_WIDTH, this.game.cache.getImage("bg_loby").height, "bg_loby");

        //  로고
        this.logo = game.add.image(CANVAS_WIDTH / 2, 130,"spr_logo");
            this.logo.anchor.set(0.5);
            this.logo.scale.set(0.6);

        //  도움말
        this.pressAnyKey = game.add.image(CANVAS_WIDTH / 2, 550,"spr_pressAnyKey");
            this.pressAnyKey.anchor.set(0.5);
            this.pressAnyKey.scale.set(0.6);
            this.pressAnyKey.alpha = 1;

        //  크레딧
        this.text_credit = game.add.text(280, 700, "강이수 / 강준하 / 고윤슬 / 박경서 / 정지은 (2018 선린디콘)", {
            font: "bold 20px",
            fill: "#ffffff"
        })
            this.text_credit.anchor.set(0.5);

        //  씬 이동 콜백
        isAnyKey = false;
        game.input.keyboard.onPressCallback = function(e) {
            if (e != null && isAnyKey == false) {
                game.state.start("custom");
                isAnyKey = true;
            }
        }
    },

    update: function() {
        this.bg_loby.tilePosition.x -= 6;
        this.logo.angle = Math.sin((game.time.totalElapsedSeconds() * 2)) * 5;
        this.pressAnyKey.scale.set(Math.abs(Math.cos(game.time.totalElapsedSeconds() * 2) * 0.2) + 0.6);
        this.pressAnyKey.alpha = (Math.abs(Math.cos(game.time.totalElapsedSeconds() * 2) * 0.6) + 0.4);
    }
}