//  게임 리소스 불러오기 및 환경설정
const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 720;

/// 환경 설정
//  캐릭터
var chr_numberMax = 2;
var chr_select_1 = 0, chr_select_2 = 0;

var chr_sprite = [];
    chr_sprite[0] = "spr_chr1";
    chr_sprite[1] = "spr_chr2";
    chr_sprite[2] = "spr_chr1";

var chr_name = [];
    chr_name[0] = "햄찌";
    chr_name[1] = "앙찌";
    chr_name[2] = "준찌";

//  맵
var bg_numberMax = 2;
var bg_select = 0;

var bg_sprite = [];
    bg_sprite[0] = "bgIndex1";
    bg_sprite[1] = "bgIndex2";
    bg_sprite[2] = "bgIndex3";

var boot = {
    preload: function () {
        //  Animation
        game.load.image('spr_chr1', 'assets/sprites/spr_player_1.png');
        game.load.image('spr_chr2', 'assets/sprites/spr_player_2.png');

        //  Image
        game.load.image('spr_tutorial_1', 'assets/sprites/spr_tutorial_1.png');
        game.load.image('spr_arrow', 'assets/sprites/spr_arrow.png');

        game.load.image('spr_logo', 'assets/sprites/spr_logo.png');
        game.load.image('spr_button', 'assets/sprites/spr_button.png');
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