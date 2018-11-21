//  게임 리소스 불러오기 및 환경설정
const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 720;

var nickname;

var boot = {
    preload: function() {
        //  Image
        // game.load.image('spr_box', 'assets/sprites/spr_box.png');
        // game.load.image('bg_title', 'assets/background/bg_title.png');
        // game.load.image('bg_game', 'assets/background/bg_game.png');
        // game.load.image('bt_play', 'assets/sprites/bt_play.png');
        // game.load.image('bt_unit1', 'assets/sprites/bt_unit1.png');
        // game.load.image('spr_unit1', 'assets/sprites/spr_unit1.png');

        //  Sound
        // game.load.audio('BGM', 'assets/sound/bgm.mp3');        
    },

    create: function() {
        game.state.start('main');
    }
}