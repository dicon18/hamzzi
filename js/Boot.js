//  게임 리소스 불러오기 및 환경설정
const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 720;

var nickname;

var boot = {
    preload: function () {
        //  Animation
        game.load.image('spr_player', 'assets/sprites/spr_player.png');
        game.load.image('spr_player2', 'assets/sprites/spr_player2.png');

        //  Image
        game.load.image('img_logo', 'assets/images/logo.png');
        game.load.image('submitBtn', 'assets/sprites/button.png');
        game.load.image('spr_ball', 'assets/sprites/spr_ball.png');
        game.load.image('spr_box', 'assets/sprites/spr_transbox_5x5.png');

        //  Background
        game.load.image('bg_field', 'assets/bg/bg_field.png');

        //  Sound
        game.load.audio('bgm_inGame', 'assets/sound/bgm/bgm_inGame.mp3');

        //  Plugin
        game.plugins.add(PhaserInput.Plugin);
    },

    create: function () {
        game.state.start('main');
    }
}