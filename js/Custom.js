//  플레이어 이름 받기, 커스텀마이징 및 무작위 맵 선택
var custom = {
    create: function () {
        //  햄찌 이름
        text_playerName_1 = game.add.text(100, 200, chr_name[chr_select_1], {
            font: "bold 80px BMJUA",
        });
        text_playerName_2 = game.add.text(500, 200, chr_name[chr_select_2], {
            font: "bold 80px BMJUA",
        });

        //  햄찌 스프라이트
        sprite_playerIndex_1 = game.add.sprite(100, 100, chr_sprite[chr_select_1]);
        sprite_playerIndex_2 = game.add.sprite(300, 100, chr_sprite[chr_select_2]);

        //  햄찌 바꾸기 버튼
        var bt_nextPlayer_1 = game.add.button(200, 400, 'spr_arrow', this.nextPlayer_1, this);
            bt_nextPlayer_1.anchor.setTo(0.5, 0.5);
        var bt_prevPlayer_1 = game.add.button(100, 400, 'spr_arrow', this.prevPlayer_1, this);
            bt_prevPlayer_1.anchor.setTo(0.5, 0.5);
            bt_prevPlayer_1.scale.x = -1;

        var bt_nextPlayer_2 = game.add.button(600, 400, 'spr_arrow', this.nextPlayer_2, this);
            bt_nextPlayer_2.anchor.setTo(0.5, 0.5);
        var bt_prevPlayer_2 = game.add.button(500, 400, 'spr_arrow', this.prevPlayer_2, this);
            bt_prevPlayer_2.anchor.setTo(0.5, 0.5);
            bt_prevPlayer_2.scale.x = -1;
        
        var bt_gameStart = game.add.button(300, 500, 'spr_button', this.gameStart, this);
            bt_gameStart.anchor.setTo(0.5, 0.5);
            bt_gameStart.scale.x = 0.5;
            bt_gameStart.scale.y = 0.5;

        //  햄찌 이름(별명) 입력창
        input_playerName_1 = game.add.inputField(game.width / 2 - 250, 325, {
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
        input_playerName_2 = game.add.inputField(game.width / 2 + 250, 325, {
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
        text_playerName_1.text = chr_name[chr_select_1];
        sprite_playerIndex_1.loadTexture(chr_sprite[chr_select_1]);
    },
    prevPlayer_1: function() {
        if (chr_select_1 > 0)
            chr_select_1--;
        else
            chr_select_1 = chr_numberMax;
        text_playerName_1.text = chr_name[chr_select_1];
        sprite_playerIndex_1.loadTexture(chr_sprite[chr_select_1]);        
    },

    nextPlayer_2: function() {
        if (chr_select_2 < chr_numberMax)
            chr_select_2++;
        else
            chr_select_2 = 0;
        text_playerName_2.text = chr_name[chr_select_2];
        sprite_playerIndex_2.loadTexture(chr_sprite[chr_select_2]);        
    },
    prevPlayer_2: function() {
        if (chr_select_2 > 0)
            chr_select_2--;
        else
            chr_select_2 = chr_numberMax;
        text_playerName_2.text = chr_name[chr_select_2];
        sprite_playerIndex_2.loadTexture(chr_sprite[chr_select_2]);
    },

    gameStart: function() {
        playerName_1 = input_playerName_1.value;
        playerName_2 = input_playerName_2.value;
        game.state.start('tutorial');
    },
}