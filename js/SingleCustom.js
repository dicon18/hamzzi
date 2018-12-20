//  커스텀마이징
var singleCustom = {
    create: function () {
        //  씬 전환 효과
        this.camera.flash("#000000");

        //   배경
        this.bg_background = this.game.add.tileSprite(0, this.game.height - this.game.cache.getImage("bg_loby").height,
            this.game.width, this.game.cache.getImage("bg_loby").height, "bg_loby");

        //  햄찌 이름
        this.text_playerName_1 = game.add.text(200, 100, chr_name[chr_select_1], {
            font: "bold 60px BMJUA"
        });
            this.text_playerName_1.anchor.set(0.5);
            this.text_playerName_1.stroke = "#ffffff";
            this.text_playerName_1.strokeThickness = 6;

        this.text_playerName_2 = game.add.text(1080, 100, chr_name[chr_select_2], {
            font: "bold 60px BMJUA"
        });
            this.text_playerName_2.anchor.set(0.5);
            this.text_playerName_2.stroke = "#ffffff";
            this.text_playerName_2.strokeThickness = 6;

        //  햄찌 스프라이트
        this.sprite_playerIndex_1 = game.add.sprite(200, 200, chr_sprite[chr_select_1]);
            this.sprite_playerIndex_1.scale.set(3);
            this.sprite_playerIndex_1.anchor.set(0.5);
            this.sprite_playerIndex_1.animations.add("stand", [0,1], 10, true);
            this.sprite_playerIndex_1.animations.play("stand");

        this.sprite_playerIndex_2 = game.add.sprite(1080, 200, chr_sprite[chr_select_2]);
            this.sprite_playerIndex_2.scale.set(3);
            this.sprite_playerIndex_2.scale.x = -this.sprite_playerIndex_2.scale.x;
            this.sprite_playerIndex_2.anchor.set(0.5);
            this.sprite_playerIndex_2.animations.add("stand", [0,1], 10, true);
            this.sprite_playerIndex_2.animations.play("stand");

        //  햄찌 바꾸기 버튼
        this.bt_nextPlayer_1 = game.add.button(255, 420, "spr_arrow", this.nextPlayer_1, this);
            this.bt_nextPlayer_1.anchor.set(0.5);
            this.bt_nextPlayer_1.scale.set(0.5);
        this.bt_prevPlayer_1 = game.add.button(155, 420, "spr_arrow", this.prevPlayer_1, this);
            this.bt_prevPlayer_1.anchor.set(0.5);
            this.bt_prevPlayer_1.scale.set(0.5);
            this.bt_prevPlayer_1.scale.x = -0.5;

        this.bt_nextPlayer_2 = game.add.button(1145, 420, "spr_arrow", this.nextPlayer_2, this);
            this.bt_nextPlayer_2.anchor.set(0.5);
            this.bt_nextPlayer_2.scale.set(0.5);
        this.bt_prevPlayer_2 = game.add.button(1045, 420, "spr_arrow", this.prevPlayer_2, this);
            this.bt_prevPlayer_2.anchor.set(0.5);
            this.bt_prevPlayer_2.scale.set(0.5);
            this.bt_prevPlayer_2.scale.x = -0.5;

        //  맵 이름
        this.text_mapName = game.add.text(CANVAS_WIDTH / 2, 250, bg_name[bg_select], {
            font: "bold 80px BMJUA",
        });
            this.text_mapName.anchor.set(0.5);
            this.text_mapName.stroke = "#ffffff";
            this.text_mapName.strokeThickness = 6;

        //  맵 스프라이트
        this.sprite_mapIndex = game.add.sprite(game.world.centerX, 400, bg_sprite[bg_select]);
        this.sprite_mapIndex.anchor.set(0.5);
        this.sprite_mapIndex.scale.set(0.2);

        //  맵 랜덤
        this.timer = game.time.create(false);
        this.timer.loop(150, this.nextBackGround, this);
        this.timer.start();

        //  햄찌 이름(별명) 입력창
        this.input_playerName_1 = game.add.inputField(100, 300, {
            font: "30px BMJUA",
            fill: "#212121",
            width: 200,
            max: 7,
            padding: 10,
            borderWidth: 1,
            borderColor: "#000000",
            borderRadius: 6,
            placeHolder: "플레이어1",
            textAlign: "center",
            type: PhaserInput.InputType.text
        });
        this.input_playerName_2 = game.add.inputField(980, 300, {
            font: "30px BMJUA",
            fill: "#212121",
            width: 200,
            max: 7,
            padding: 10,
            borderWidth: 1,
            borderColor: "#000000",
            borderRadius: 6,
            placeHolder: "플레이어2",
            textAlign: "center",
            type: PhaserInput.InputType.text
        });

        //  모드
        this.text_mode = game.add.text(CANVAS_WIDTH / 2, 60, '특별게임모드 [폭렬모드]', {
            font: "bold 30px BMJUA",
            fill: "#ff0000"
        });
            this.text_mode.anchor.set(0.5);
            this.text_mode.stroke = "#ffffff";
            this.text_mode.strokeThickness = 6;

        //  모드 선택 버튼
        this.isToggle = false;
        if(this.isToggle == false){
            ballScale = 1.5;
            ballMass = 1;
            playerAccSpeed = 10;
            maxSpeed = 150;
            maxDashSpeed = 250;
            ballMaxSpeed = 500;
            playerShootPower = 500;
        }
        this.bt_toggle = game.add.button(CANVAS_WIDTH / 2, 120, 'spr_toggle', ()=>{
            sfx_button.play();
            if(this.isToggle == false){
                this.bt_toggle.setFrames(1);
                this.isToggle = true;
                ballScale = 2.5;
                ballMass = 10;
                playerAccSpeed = 50;
                maxSpeed = 500;
                maxDashSpeed = 1000;
                ballMaxSpeed = 1500;
                playerShootPower = 1500;
            }
            else{
                this.bt_toggle.setFrames(0);
                this.isToggle = false;
                ballScale = 1.5;
                ballMass = 1;
                playerAccSpeed = 10;
                maxSpeed = 150;
                maxDashSpeed = 250;
                ballMaxSpeed = 500;
                playerShootPower = 500;
            }
        }, this);
        this.bt_toggle.anchor.set(0.5);
        this.bt_toggle.scale.set(0.5);

        //  뒤로가기 버튼
        this.bt_back = game.add.button(100, 625, "spr_back", ()=>{
            sfx_button.play();
            game.state.start("selectMode");
        },this);
            this.bt_back.anchor.set(0.5);
            this.bt_back.scale.set(0.4);

        //  게임 시작 버튼
        this.bt_gameStart = game.add.button(CANVAS_WIDTH / 2, 600, "spr_button", this.gameStart, this);
            this.bt_gameStart.anchor.set(0.5);
            this.bt_gameStart.scale.set(0.5);
    },

    update: function() {
        // 배경 이동
        this.bg_background.tilePosition.x -= 6;

        // 맵
        this.text_mapName.setText(bg_name[bg_select]);
        this.sprite_mapIndex.loadTexture(bg_sprite[bg_select]);

        //#region 버튼 alpha
        //  모드 선택 버튼
        if (this.bt_toggle.input.pointerOver()){
            this.bt_toggle.alpha = 1;
        }
        else{
            this.bt_toggle.alpha = 0.8;
        }

        //  햄찌 바꾸기 버튼
        if (this.bt_prevPlayer_1.input.pointerOver()){
            this.bt_prevPlayer_1.alpha = 1;
        }
        else{
            this.bt_prevPlayer_1.alpha = 0.8;
        }

        if (this.bt_prevPlayer_2.input.pointerOver()){
            this.bt_prevPlayer_2.alpha = 1;
        }
        else{
            this.bt_prevPlayer_2.alpha = 0.8;
        }

        if (this.bt_nextPlayer_1.input.pointerOver()){
            this.bt_nextPlayer_1.alpha = 1;
        }
        else{
            this.bt_nextPlayer_1.alpha = 0.8;
        }

        if (this.bt_nextPlayer_2.input.pointerOver()){
            this.bt_nextPlayer_2.alpha = 1;
        }
        else{
            this.bt_nextPlayer_2.alpha = 0.8;
        }

        //  뒤로가기 버튼
        if (this.bt_back.input.pointerOver()){
            this.bt_back.alpha = 1;
        }
        else{
            this.bt_back.alpha = 0.8;
        }

        //  시작 버튼
        if (this.bt_gameStart.input.pointerOver()){
            this.bt_gameStart.alpha = 1;
        }
        else{
            this.bt_gameStart.alpha = 0.9;
        }
        //#endregion
    },

    //  외부 함수
    nextPlayer_1: function() {
        sfx_button.play();
        if (chr_select_1 < chr_sprite.length - 1)
            chr_select_1++;
        else
            chr_select_1 = 0;
        this.text_playerName_1.text = chr_name[chr_select_1];
        this.sprite_playerIndex_1.loadTexture(chr_sprite[chr_select_1]);
        this.sprite_playerIndex_1.animations.add("stand", [0,1], 10 ,true);
        this.sprite_playerIndex_1.animations.play("stand");
    },
    prevPlayer_1: function() {
        sfx_button.play();
        if (chr_select_1 > 0)
            chr_select_1--;
        else
            chr_select_1 = chr_sprite.length - 1;
        this.text_playerName_1.text = chr_name[chr_select_1];
        this.sprite_playerIndex_1.loadTexture(chr_sprite[chr_select_1]);
        this.sprite_playerIndex_1.animations.add("stand", [0,1], 10 ,true);
        this.sprite_playerIndex_1.animations.play("stand");       
    },

    nextPlayer_2: function() {
        sfx_button.play();
        if (chr_select_2 < chr_sprite.length - 1)
            chr_select_2++;
        else
            chr_select_2 = 0;
        this.text_playerName_2.text = chr_name[chr_select_2];
        this.sprite_playerIndex_2.loadTexture(chr_sprite[chr_select_2]);      
        this.sprite_playerIndex_2.animations.add("stand", [0,1], 10 ,true);
        this.sprite_playerIndex_2.animations.play("stand");  
    },
    prevPlayer_2: function() {
        sfx_button.play();
        if (chr_select_2 > 0)
            chr_select_2--;
        else
            chr_select_2 = chr_sprite.length-1;
        this.text_playerName_2.text = chr_name[chr_select_2];
        this.sprite_playerIndex_2.loadTexture(chr_sprite[chr_select_2]);
        this.sprite_playerIndex_2.animations.add("stand", [0,1], 10 ,true);
        this.sprite_playerIndex_2.animations.play("stand");
    },

    nextBackGround: function() {
        if(bg_select < bg_sprite.length - 1)
            bg_select++;
        else
            bg_select = 0;
    },

    gameStart: function() {
        sfx_button.play();
        playerName_1 = this.input_playerName_1.value;
        playerName_2 = this.input_playerName_2.value;
        console.log(`BallScale : ${ballScale}|BallMass : ${ballMass}|MaxSpeed : ${maxSpeed}|PlayerAccSpeed : ${playerAccSpeed}|MaxDashSpeed : ${maxDashSpeed}|BallMaxSpeed : ${ballMaxSpeed}|PlayerShootPower : ${playerShootPower}`);
        game.state.start("tutorial");
    }
}