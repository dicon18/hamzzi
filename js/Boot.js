//  게임 리소스 불러오기 및 환경설정
const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 720;

/// 환경 변수
//  캐릭터
var chr_numberMax = 7;
var chr_select_1 = 7, chr_select_2 = 7;

var chr_sprite = [];
    chr_sprite[0] = "spr_chr_1";
    chr_sprite[1] = "spr_chr_2";
    chr_sprite[2] = "spr_chr_3";
    chr_sprite[3] = "spr_chr_4";
    chr_sprite[4] = "spr_chr_5";
    chr_sprite[5] = "spr_chr_6";
    chr_sprite[6] = "spr_chr_7";
    chr_sprite[7] = "spr_chr_8";

var chr_name = [];
    chr_name[0] = "햄찌";
    chr_name[1] = "앙찌";
    chr_name[2] = "준찌";
    chr_name[3] = "사찌";
    chr_name[4] = "오찌";
    chr_name[5] = "육찌";
    chr_name[6] = "칠찌";
    chr_name[7] = "팔찌";

//  맵
var bg_numberMax = 2;
var bg_select = 0;

var bg_sprite = [];
    bg_sprite[0] = "bg_inGame_1";
    bg_sprite[1] = "bg_inGame_2";
    bg_sprite[2] = "bg_inGame_3";

var bg_name = [];
    bg_name[0] = "앞마당";
    bg_name[1] = "철수집";
    bg_name[2] = "하수구";

var boot = {
    preload: function () {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.setShowAll();
        window.addEventListener('resize', function () {
            this.game.scale.refresh();
        });
        this.game.scale.refresh();
  
        //  Animation
        game.load.spritesheet('spr_chr_1', 'assets/anim/spr_chr_1.png', 20, 20, 9);
        game.load.spritesheet('spr_chr_2', 'assets/anim/spr_chr_2.png', 25, 19, 9);
        game.load.spritesheet('spr_chr_3', 'assets/anim/spr_chr_3.png', 20, 20, 9);
        game.load.spritesheet('spr_chr_4', 'assets/anim/spr_chr_4.png', 20, 20, 9);
        game.load.spritesheet('spr_chr_5', 'assets/anim/spr_chr_5.png', 20, 20, 9);
        game.load.spritesheet('spr_chr_6', 'assets/anim/spr_chr_6.png', 20, 20, 9);
        game.load.spritesheet('spr_chr_7', 'assets/anim/spr_chr_7.png', 20, 20, 9);
        game.load.spritesheet('spr_chr_8', 'assets/anim/spr_chr_8.png', 20, 24, 9);

        //  Image
        game.load.image('spr_logo', 'assets/sprites/spr_logo.png');
        game.load.image('spr_arrow', 'assets/sprites/spr_arrow.png');
        game.load.image('spr_button', 'assets/sprites/spr_button.png');
        game.load.image('spr_ball', 'assets/sprites/spr_ball.png');
        game.load.image('spr_box', 'assets/sprites/spr_transbox_5x5.png');

        //  Background
        game.load.image('spr_tutorial_1', 'assets/bg/bg_tutorial_1.png');
        game.load.image('bg_inGame_1', 'assets/bg/bg_inGame_1.png');
        game.load.image('bg_inGame_2', 'assets/bg/bg_inGame_2.png');
        game.load.image('bg_inGame_3', 'assets/bg/bg_inGame_3.png');
        //  Tile
        //TODO

        //  Sound
        game.load.audio('bgm_inGame', 'assets/sound/bgm/bgm_inGame.mp3');

        //  Plugin
        game.plugins.add(PhaserInput.Plugin);
    },

    create: function () {
        game.state.start('main');
    }
}