//  로고 & 크레딧
var logoN = 0;
var main = {
    create: function () {
        game.stage.backgroundColor = "#1dd1a1";

        this.bg_background = this.game.add.tileSprite(0,
            this.game.height - this.game.cache.getImage('bg_background').height,
            this.game.width,
            this.game.cache.getImage('bg_background').height,
            'bg_background'
            );

        this.logo = game.add.image(CANVAS_WIDTH / 2, 180,'spr_logo');
            this.logo.anchor.set(0.5);
            this.logo.scale.set(0.6);

        this.pressAnyKey = game.add.image(CANVAS_WIDTH / 2, 550,'spr_pressAnyKey');
        this.pressAnyKey.anchor.set(0.5);
        this.pressAnyKey.scale.set(0.6);
        this.pressAnyKey.alpha = 1;
        game.add.tween(this.pressAnyKey).to( { alpha: 0.5 }, 750, Phaser.Easing.Linear.None, true, 1, 1000, true);

        this.text_credit = game.add.text(280, 700, "강이수 / 강준하 / 고윤슬 / 박경서 / 정지은 [2018 선린디콘]", {
            font: "bold 20px",
            fill: "#ffffff"
        })
            this.text_credit.anchor.set(0.5);

        isAnyKey = false;
        game.input.keyboard.onPressCallback = function(e) {
            if (e != null && isAnyKey == false) {
                game.state.start('custom');
                isAnyKey = true;
            }
        }
        
    },

    update: function(){

        this.bg_background.tilePosition.x -= 0.75;

        this.logo.angle = Math.sin((logoN++)/50)*7;

        this.pressAnyKey.scale.set(Math.abs(Math.cos(this.game.time.totalElapsedSeconds()*3)*0.3)+0.7);
    }
}