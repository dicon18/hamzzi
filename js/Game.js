//  인 게임
//#region 글로벌 변수
var playerName_1;
var playerName_2;

var playerAccSpeed = 10;
var playerMaxSpeed = 150;

var ballMaxSpeed = 1000;

var timerSec = '00';
var timerMin = 3;

var orangeScore = 0;
var blueScore = 0;
//#endregion

var Game = {
    create: function() {
        //////////////////////////////////////////////////////////////////////////////////////////
        //#region 게임 설정
        //  물리
        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.setImpactEvents(true);
        game.physics.p2.restitution = 1;

        //  환경
        this.isGoal = false;
        this.isTimeOver = false;

        //  입력
        this.cursors = game.input.keyboard.createCursorKeys();
        this.kickButton_1 = game.input.keyboard.addKey(Phaser.Keyboard.K);
        this.kickButton_2 = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_5);

        //  배경
        game.stage.backgroundColor = "#7befb2";
        game.add.image(0, 0, bg_sprite[bg_select]);

        //  충돌 그룹
        var playerCollisionGroup = game.physics.p2.createCollisionGroup();
        var ballCollisionGroup = game.physics.p2.createCollisionGroup();
        var boxCollisionGroup = game.physics.p2.createCollisionGroup();
        game.physics.p2.updateBoundsCollisionGroup();

        //  사운드
        // bgm_inGame = game.add.audio('bgm_inGame');
        // bgm_inGame.loopFull(1);
        //#endregion

        //////////////////////////////////////////////////////////////////////////////////////////
        //#region 충돌 박스 생성
        var boxes = game.add.group();
        boxes.enableBody = true;
        boxes.physicsBodyType = Phaser.Physics.P2JS;

        //  라인
        for (var i = 0; i < 228; i++) {
            //  윗쪽 라인 박스
            this.box = boxes.create(i * 5 + 68, 40, 'spr_box');
            this.box.body.static = true;
            this.box.scale.set(1);
            this.box.body.mass = 5;
            this.box.body.setCollisionGroup(boxCollisionGroup);
            this.box.body.collides(ballCollisionGroup);

            //  아래쪽 라인 박스
            this.box = boxes.create(i * 5 + 68, 680, 'spr_box');
            this.box.body.static = true;
            this.box.scale.set(1);
            this.box.body.mass = 5;
            this.box.body.setCollisionGroup(boxCollisionGroup);
            this.box.body.collides(ballCollisionGroup);
        }
        for (var i = 0; i < 43; i++) {
            //  왼쪽 라인 박스
            this.box = boxes.create(67, i * 5 + 40, 'spr_box');
            this.box.body.static = true;
            this.box.scale.set(1);
            this.box.body.mass = 5;
            this.box.body.setCollisionGroup(boxCollisionGroup);
            this.box.body.collides(ballCollisionGroup);

            //  오른쪽 라인 박스
            this.box = boxes.create(1280 - 70, i * 5 + 40, 'spr_box');
            this.box.body.static = true;
            this.box.scale.set(1);
            this.box.body.mass = 5;
            this.box.body.setCollisionGroup(boxCollisionGroup);
            this.box.body.collides(ballCollisionGroup);
        }
        for (var i = 0; i < 44; i++) {
            //  왼쪽 라인 박스
            this.box = boxes.create(67, i * 5 + 465, 'spr_box');
            this.box.body.static = true;
            this.box.scale.set(1);
            this.box.body.mass = 5;
            this.box.body.setCollisionGroup(boxCollisionGroup);
            this.box.body.collides(ballCollisionGroup);

            //  오른쪽 라인 박스
            this.box = boxes.create(1280 - 70, i * 5 + 465, 'spr_box');
            this.box.body.static = true;
            this.box.scale.set(1);
            this.box.body.mass = 5;
            this.box.body.setCollisionGroup(boxCollisionGroup);
            this.box.body.collides(ballCollisionGroup);
        }

        //  골대
        for (var i = 0; i < 14; i++) {
            //  윗쪽 라인 박스
            this.box = boxes.create(i * 5 + 3, 250, 'spr_box');
            this.box.body.static = true;
            this.box.scale.set(1);
            this.box.body.mass = 5;
            this.box.body.setCollisionGroup(boxCollisionGroup);
            this.box.body.collides(ballCollisionGroup);

            this.box = boxes.create(i * 5 + 1270 - 60, 250, 'spr_box');
            this.box.body.static = true;
            this.box.scale.set(1);
            this.box.body.mass = 5;
            this.box.body.setCollisionGroup(boxCollisionGroup);
            this.box.body.collides(ballCollisionGroup);

            //  아래쪽 라인 박스
            this.box = boxes.create(i * 5 + 3, 465, 'spr_box');
            this.box.body.static = true;
            this.box.scale.set(1);
            this.box.body.mass = 5;
            this.box.body.setCollisionGroup(boxCollisionGroup);
            this.box.body.collides(ballCollisionGroup);

            this.box = boxes.create(i * 5 + 1270 - 60, 465, 'spr_box');
            this.box.body.static = true;
            this.box.scale.set(1);
            this.box.body.mass = 5;
            this.box.body.setCollisionGroup(boxCollisionGroup);
            this.box.body.collides(ballCollisionGroup);
        }
        for (var i = 0; i < 44; i++) {
            //  왼쪽 라인 박스
            this.box = boxes.create(4, i * 5 + 250, 'spr_box');
            this.box.body.static = true;
            this.box.scale.set(1);
            this.box.body.mass = 5;
            this.box.body.setCollisionGroup(boxCollisionGroup);
            this.box.body.collides(ballCollisionGroup);

            //  오른쪽 라인 박스
            this.box = boxes.create(1280 - 4, i * 5 + 250, 'spr_box');
            this.box.body.static = true;
            this.box.scale.set(1);
            this.box.body.mass = 5;
            this.box.body.setCollisionGroup(boxCollisionGroup);
            this.box.body.collides(ballCollisionGroup);
        }
        //#endregion

        //////////////////////////////////////////////////////////////////////////////////////////
        //#region 플레이어 설정
        //  플레이어1
        this.player_1 = game.add.sprite(264, game.world.centerY, chr_sprite[chr_select_1]);
        this.player_1.anchor.set(0.5);
        this.player_1.scale.set(1);

        game.physics.p2.enable(this.player_1, false);
        this.player_1.body.mass = 5;
        this.player_1.body.setCircle(this.player_1.width / 2);
        this.player_1.body.fixedRotation = true;
        this.player_1.body.damping = 0.75;
        this.player_1.body.setCollisionGroup(playerCollisionGroup);
        this.player_1.body.collides([ballCollisionGroup, playerCollisionGroup]);

        this.player_1.animations.add("stand", [0,1], 10 ,true);
        this.player_1.animations.add("walk", [2,3,4,5], 15 ,true);
        this.player_1.animations.add("win", [6], 10 ,true);
        this.player_1.animations.add("lose", [7,8], 10 ,true);

        this.isKick_1 = false;

        //  플레이어2
        this.player_2 = game.add.sprite(1064, game.world.centerY, chr_sprite[chr_select_2]);
        this.player_2.anchor.set(0.5);
        this.player_2.scale.set(1);

        game.physics.p2.enable(this.player_2, false);
        this.player_2.body.mass = 5;
        this.player_2.body.setCircle(this.player_2.width / 2);
        this.player_2.body.fixedRotation = true;
        this.player_2.body.damping = 0.75;
        this.player_2.body.setCollisionGroup(playerCollisionGroup);
        this.player_2.body.collides([ballCollisionGroup, playerCollisionGroup]);

        this.player_2.animations.add("stand", [0,1], 10 ,true);
        this.player_2.animations.add("walk", [2,3,4,5], 10 ,true);
        this.player_2.animations.add("win", [6], 10 ,true);
        this.player_2.animations.add("lose", [7,8], 10 ,true);

        this.isKick_2 = false;
        //#endregion

        //////////////////////////////////////////////////////////////////////////////////////////
        //#region 공 설정
        this.ball = game.add.sprite(664, game.world.centerY, 'spr_ball');
        this.ball.anchor.set(0.5);

        game.physics.p2.enable(this.ball, false);
        this.ball.body.mass = 1;
        this.ball.body.damping = 0.7;
        this.ball.body.setCircle(this.ball.width / 2);
        this.ball.body.fixedRotation = false;
        this.ball.body.setCollisionGroup(ballCollisionGroup);
        this.ball.body.collides([playerCollisionGroup, boxCollisionGroup]);
        this.ball.body.createBodyCallback(this.player_1, this.kick, this);
        this.ball.body.createBodyCallback(this.player_2, this.kick2, this);
        //#endregion

        //////////////////////////////////////////////////////////////////////////////////////////
        //#region UI 설정
        //  점수
        this.scoreText = game.add.text(664, 20, blueScore + " : " + orangeScore, {
            font: "35px BMJUA",
            fill: "#000000",
            align: "center"
        });
        this.scoreText.anchor.set(0.5);

        this.timerText = game.add.text(664, 60, timerMin + " : " + timerSec, {
            font: "30px BMJUA",
            fill: "#000000",
            backgroundColor: "#ffffff",
            align: "center"
        });
        this.timerText.anchor.set(0.5);

        this.timer = game.time.create(false);
        this.timer.loop(1000, this.timerSecCnt,this);
        this.timer.start();
        //#endregion
    },

    update: function() {
        //////////////////////////////////////////////////////////////////////////////////////////
        //#region 플레이어
        //  플레이어 이동
        this.playerHspd_1 = (game.input.keyboard.addKey(Phaser.Keyboard.D).isDown - game.input.keyboard.addKey(Phaser.Keyboard.A).isDown);
            this.player_1.body.velocity.x += this.playerHspd_1 * playerAccSpeed;
        this.playerVspd_1 = (game.input.keyboard.addKey(Phaser.Keyboard.S).isDown - game.input.keyboard.addKey(Phaser.Keyboard.W).isDown);
            this.player_1.body.velocity.y += this.playerVspd_1 * playerAccSpeed;

        this.playerHspd_2 = this.cursors.right.isDown - this.cursors.left.isDown;
            this.player_2.body.velocity.x += this.playerHspd_2 * playerAccSpeed;
        this.playerVspd_2 = this.cursors.down.isDown - this.cursors.up.isDown;
            this.player_2.body.velocity.y += this.playerVspd_2 * playerAccSpeed;

        this.player_1.body.velocity.x = game.math.clamp(this.player_1.body.velocity.x, -playerMaxSpeed, playerMaxSpeed);
        this.player_1.body.velocity.y = game.math.clamp(this.player_1.body.velocity.y, -playerMaxSpeed, playerMaxSpeed);
        this.player_2.body.velocity.x = game.math.clamp(this.player_2.body.velocity.x, -playerMaxSpeed, playerMaxSpeed);
        this.player_2.body.velocity.y = game.math.clamp(this.player_2.body.velocity.y, -playerMaxSpeed, playerMaxSpeed);

        //  애니메이션
        if (Math.max(Math.abs(this.player_1.body.velocity.x), Math.abs(this.player_1.body.velocity.y)) < 10)
            this.player_1.animations.play("stand");
        else
            this.player_1.animations.play("walk");

        if (Math.max(Math.abs(this.player_2.body.velocity.x), Math.abs(this.player_2.body.velocity.y)) < 10)
            this.player_2.animations.play("stand");
        else
            this.player_2.animations.play("walk");

        //  방향
        if (this.playerHspd_1 != 0)
            this.player_1.scale.x = this.playerHspd_1;
        if (this.playerHspd_2 != 0)
            this.player_2.scale.x = this.playerHspd_2;
    
        //  슛
        if (!this.kickButton_1.isDown)
            this.isKick_1 = false;
        if (!this.kickButton_2.isDown)
            this.isKick_2 = false;
        //#endregion

        //////////////////////////////////////////////////////////////////////////////////////////            
        //#region 볼
        this.ball.body.velocity.x = game.math.clamp(this.ball.body.velocity.x, -ballMaxSpeed, ballMaxSpeed);
        this.ball.body.velocity.y = game.math.clamp(this.ball.body.velocity.y, -ballMaxSpeed, ballMaxSpeed);
        this.ball.body.angle += (Math.abs(this.ball.body.velocity.x) > Math.abs(this.ball.body.velocity.y) ? this.ball.body.velocity.x : this.ball.body.velocity.y) / 20;
        //#endregion

        //////////////////////////////////////////////////////////////////////////////////////////
        //#region 골
        if (this.ball.body.x <= 48.3 && this.ball.body.y >= 252.5 && this.ball.body.y <= 447.6 && this.isGoal == false && this.isTimeOver == false) {
            orangeScore++;
            this.isGoal = true;
            this.scoreText.alpha = 1;
            this.timer.stop();
            this.orangeGoalText();
            game.time.events.add(Phaser.Timer.SECOND * 5, this.restartGame);
        }
        if (this.ball.body.x >= 1232.9 && this.ball.body.y >= 252.5 && this.ball.body.y <= 447.6 && this.isGoal == false && this.isTimeOver == false) {
            blueScore++;
            this.isGoal = true;
            this.scoreText.alpha = 1;
            this.timer.stop();
            this.buleGoalText();
            game.time.events.add(Phaser.Timer.SECOND * 5, this.restartGame);
        }
        this.scoreText.setText(blueScore + " : " + orangeScore);
        //#endregion

        //////////////////////////////////////////////////////////////////////////////////////////
        //#region 게임 오버
        if (timerMin == 0 && timerSec == '00'){
            this.timer.stop();

            this.player_1.body.velocity.x = game.math.clamp(this.player_1.body.velocity.x, 0, 0);
            this.player_1.body.velocity.y = game.math.clamp(this.player_1.body.velocity.y, 0, 0);
            this.player_2.body.velocity.x = game.math.clamp(this.player_2.body.velocity.x, 0, 0);
            this.player_2.body.velocity.y = game.math.clamp(this.player_2.body.velocity.y, 0, 0);

            if (blueScore > orangeScore && this.isTimeOver == false){
                this.BlueWinText = game.add.text(664, game.world.centerY, "Blue Team Win!", {
                    font: "bold 100px BMJUA",
                    fill: "#4834d4",
                    backgroundColor: "#ffffff"
                });
                this.BlueWinText.anchor.set(0.5);
                this.isTimeOver = true;
            }
            if (blueScore < orangeScore && this.isTimeOver == false){
                this.OrangeWinText = game.add.text(664, game.world.centerY, "Orange Team Win!", {
                    font: "bold 100px BMJUA",
                    fill: "#e67e22",
                    backgroundColor: "#ffffff"
                });
                this.OrangeWinText.anchor.set(0.5);
                this.isTimeOver = true;
            }
            if (blueScore == orangeScore && this.isTimeOver == false){
                this.drawText = game.add.text(664, game.world.centerY, "Draw!", {
                    font: "bold 100px BMJUA",
                    fill: "#000000",
                    backgroundColor: "#ffffff"
                });
                this.drawText.anchor.set(0.5);
                this.isTimeOver = true;
            }
        }
        //#endregion

        //////////////////////////////////////////////////////////////////////////////////////////
        //#region UI
        //  타이머
        this.timerText.setText(timerMin + " : " + timerSec);
        //#endregion
    },

    //////////////////////////////////////////////////////////////////////////////////////////
    //#region 외부 함수
    timerSecCnt: function() {
        timerSec--;
        if(timerSec == 0)
            timerSec = '00';
        if(timerSec < 0){
            timerMin--;
            timerSec = 59;
        }
    },

    kick: function() {
        if (this.kickButton_1.isDown && this.isKick_1 == false) {
            this.ball.body.velocity.x *= 2;
            this.ball.body.velocity.y *= 2;
            this.isKick_1 = true;
        }
    },
    kick2: function() {
        if (this.kickButton_2.isDown && this.isKick_2 == false) {
            this.ball.body.velocity.x *= 2;
            this.ball.body.velocity.y *= 2;
            this.isKick_2 = true;
        }
    },

    orangeGoalText: function() {
        var style = {
            font: "bold 32px BMJUA",
            fill: "#e67e22",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };
        this.text = game.add.text(0, 0, "Orange Team GOAL!", style);
        this.text.setTextBounds(250, 100, 800, 100);
    },
    buleGoalText: function() {
        var style = {
            font: "bold 32px BMJUA",
            fill: "#4834d4",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };
        this.text = game.add.text(0, 0, "Blue Team GOAL!", style);
        this.text.setTextBounds(250, 100, 800, 100);
    },

    restartGame: function() {
        game.state.restart();
        this.isGoal = false;
    }
    //#endregion
}
