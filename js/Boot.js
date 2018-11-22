//  게임 리소스 불러오기 및 환경설정
const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 720;

var nickname;

var boot = {
    preload: function () {
        //  Image
        game.load.image('submitBtn', 'assets/sprites/button.png');
        game.load.image('bg_field', 'assets/bg/bg_field.png');
        game.load.image('spr_player', 'assets/sprites/spr_player.png');
        game.load.image('spr_player2', 'assets/sprites/spr_player2.png');
        game.load.image('spr_ball', 'assets/sprites/spr_ball.png');
        game.load.image('spr_box', 'assets/sprites/spr_box_5x5.png');

        //  Sound
        // game.load.audio('BGM', 'assets/sound/bgm.mp3');

        //  Plugin
        game.plugins.add(PhaserInput.Plugin);
    },

    create: function () {
        game.state.start('main');
    }
}