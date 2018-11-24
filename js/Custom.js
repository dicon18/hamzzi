//  플레이어 이름 받기, 커스텀마이징 및 무작위 맵 선택
var custom = {
    create: function () {
        //  햄찌 이름
        this.text_playerName_1 = game.add.text(100, 200, chr_name[chr_select_1], {
            font: "bold 80px BMJUA",
        });
            this.text_playerName_1.anchor.set(0.5);

        this.text_playerName_2 = game.add.text(500, 200, chr_name[chr_select_2], {
            font: "bold 80px BMJUA",
        });
            this.text_playerName_2.anchor.set(0.5);

        //  햄찌 스프라이트
        this.sprite_playerIndex_1 = game.add.sprite(100, 100, chr_sprite[chr_select_1]);
            this.sprite_playerIndex_1.anchor.set(0.5);
            this.sprite_playerIndex_1.animations.add("stand", [0,1], 10 ,true);
            this.sprite_playerIndex_1.animations.play("stand");

        this.sprite_playerIndex_2 = game.add.sprite(300, 100, chr_sprite[chr_select_2]);
            this.sprite_playerIndex_2.anchor.set(0.5);
            this.sprite_playerIndex_2.animations.add("stand", [0,1], 10 ,true);
            this.sprite_playerIndex_2.animations.play("stand");

        //  햄찌 바꾸기 버튼
        this.bt_nextPlayer_1 = game.add.button(200, 400, 'spr_arrow', this.nextPlayer_1, this);
            this.bt_nextPlayer_1.anchor.set(0.5);
        this.bt_prevPlayer_1 = game.add.button(100, 400, 'spr_arrow', this.prevPlayer_1, this);
            this.bt_prevPlayer_1.anchor.set(0.5);
            this.bt_prevPlayer_1.scale.x = -1;

        this.bt_nextPlayer_2 = game.add.button(600, 400, 'spr_arrow', this.nextPlayer_2, this);
            this.bt_nextPlayer_2.anchor.set(0.5);
        this.bt_prevPlayer_2 = game.add.button(500, 400, 'spr_arrow', this.prevPlayer_2, this);
            this.bt_prevPlayer_2.anchor.set(0.5);
            this.bt_prevPlayer_2.scale.x = -1;

        //  맵 이름
        this.text_mapName = game.add.text(900, 100, bg_name[bg_select], {
            font: "bold 80px BMJUA",
        });
            this.text_mapName.anchor.set(0.5);

        //  맵 스프라이트
        this.sprite_mapIndex = game.add.sprite(900, 300, bg_sprite[bg_select]);
            this.sprite_mapIndex.anchor.set(0.5);
            this.sprite_mapIndex.scale.set(0.1);

        //  게임 시작 버튼
        this.bt_gameStart = game.add.button(CANVAS_WIDTH / 2, 600, 'spr_button', this.gameStart, this);
            this.bt_gameStart.anchor.set(0.5);
            this.bt_gameStart.scale.set(0.5);

        //  햄찌 이름(별명) 입력창
        this.input_playerName_1 = game.add.inputField(100, 300, {
            font: '30px BMJUA',
            fill: '#212121',
            width: 200,
            max: 4,
            padding: 10,
            borderWidth: 1,
            borderColor: '#000',
            borderRadius: 6,
            placeHolder: '닉네임을 입력하세요...',
            textAlign: 'center',
            type: PhaserInput.InputType.text
        });

        this.input_playerName_2 = game.add.inputField(500, 300, {
            font: '30px BMJUA',
            fill: '#212121',
            width: 200,
            max: 4,
            padding: 10,
            borderWidth: 1,
            borderColor: '#000',
            borderRadius: 6,
            placeHolder: '닉네임을 입력하세요...',
            textAlign: 'center',
            type: PhaserInput.InputType.text
        });
    },

    //  외부 함수
    nextPlayer_1: function() {
        if (chr_select_1 < chr_numberMax)
            chr_select_1++;
        else
            chr_select_1 = 0;
        this.text_playerName_1.text = chr_name[chr_select_1];
        this.sprite_playerIndex_1.loadTexture(chr_sprite[chr_select_1]);
        this.sprite_playerIndex_1.animations.add("stand", [0,1], 10 ,true);
        this.sprite_playerIndex_1.animations.play("stand");
    },
    prevPlayer_1: function() {
        if (chr_select_1 > 0)
            chr_select_1--;
        else
            chr_select_1 = chr_numberMax;
        this.text_playerName_1.text = chr_name[chr_select_1];
        this.sprite_playerIndex_1.loadTexture(chr_sprite[chr_select_1]);
        this.sprite_playerIndex_1.animations.add("stand", [0,1], 10 ,true);
        this.sprite_playerIndex_1.animations.play("stand");       
    },

    nextPlayer_2: function() {
        if (chr_select_2 < chr_numberMax)
            chr_select_2++;
        else
            chr_select_2 = 0;
        this.text_playerName_2.text = chr_name[chr_select_2];
        this.sprite_playerIndex_2.loadTexture(chr_sprite[chr_select_2]);      
        this.sprite_playerIndex_2.animations.add("stand", [0,1], 10 ,true);
        this.sprite_playerIndex_2.animations.play("stand");  
    },
    prevPlayer_2: function() {
        if (chr_select_2 > 0)
            chr_select_2--;
        else
            chr_select_2 = chr_numberMax;
        this.text_playerName_2.text = chr_name[chr_select_2];
        this.sprite_playerIndex_2.loadTexture(chr_sprite[chr_select_2]);
        this.sprite_playerIndex_2.animations.add("stand", [0,1], 10 ,true);
        this.sprite_playerIndex_2.animations.play("stand");
    },

    gameStart: function() {
        playerName_1 = this.input_playerName_1.value;
        playerName_2 = this.input_playerName_2.value;
        game.state.start('tutorial');
    },
}