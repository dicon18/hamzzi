//  인 게임
//#region 글로벌 변수
//  플레이어
var playerName_1 = null;
var onPlayerName_1;
var playerName_2 = null;
var onPlayerName_2;
var playerScale_1 = 2;
var playerScale_2 = 2;
var playerAccSpeed = 10;
var playerMaxSpeed = 150;
var playerShootPower = 2;

//  볼
var ballMaxSpeed = 1000;
var ballScale = 1.5;

//  환경
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
        game.physics.p2.restitution = 0.5;

        //  배경
        game.add.image(0, 0, bg_sprite[bg_select]);
        game.add.image(0,0, 'bg_line');

        //  입력
        this.cursors = game.input.keyboard.createCursorKeys();
        this.kickButton_1 = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.kickButton_2 = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

        //  충돌 그룹
        this.playerCollisionGroup = game.physics.p2.createCollisionGroup();
        this.ballCollisionGroup = game.physics.p2.createCollisionGroup();
        this.boxCollisionGroup = game.physics.p2.createCollisionGroup();
        game.physics.p2.updateBoundsCollisionGroup();

        //  환경
        this.isGoal = false;
        this.isTimeOver = false;
        game.time.events.add(Phaser.Timer.SECOND * 2, this.startGame);

        this.isGameStart = false;
        this.text_ready = game.add.text(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, "준비", {
            font: "100px BMJUA",
            fill: "#000000",
            align: "center"
        });
            this.text_ready.anchor.set(0.5);

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
            this.box.body.setCollisionGroup(this.boxCollisionGroup);
            this.box.body.collides(this.ballCollisionGroup);

            //  아래쪽 라인 박스
            this.box = boxes.create(i * 5 + 68, 680, 'spr_box');
            this.box.body.static = true;
            this.box.scale.set(1);
            this.box.body.mass = 5;
            this.box.body.setCollisionGroup(this.boxCollisionGroup);
            this.box.body.collides(this.ballCollisionGroup);
        }
        for (var i = 0; i < 43; i++) {
            //  왼쪽 라인 박스
            this.box = boxes.create(67, i * 5 + 40, 'spr_box');
            this.box.body.static = true;
            this.box.scale.set(1);
            this.box.body.mass = 5;
            this.box.body.setCollisionGroup(this.boxCollisionGroup);
            this.box.body.collides(this.ballCollisionGroup);

            //  오른쪽 라인 박스
            this.box = boxes.create(1280 - 70, i * 5 + 40, 'spr_box');
            this.box.body.static = true;
            this.box.scale.set(1);
            this.box.body.mass = 5;
            this.box.body.setCollisionGroup(this.boxCollisionGroup);
            this.box.body.collides(this.ballCollisionGroup);
        }
        for (var i = 0; i < 44; i++) {
            //  왼쪽 라인 박스
            this.box = boxes.create(67, i * 5 + 465, 'spr_box');
            this.box.body.static = true;
            this.box.scale.set(1);
            this.box.body.mass = 5;
            this.box.body.setCollisionGroup(this.boxCollisionGroup);
            this.box.body.collides(this.ballCollisionGroup);

            //  오른쪽 라인 박스
            this.box = boxes.create(1280 - 70, i * 5 + 465, 'spr_box');
            this.box.body.static = true;
            this.box.scale.set(1);
            this.box.body.mass = 5;
            this.box.body.setCollisionGroup(this.boxCollisionGroup);
            this.box.body.collides(this.ballCollisionGroup);
        }

        //  골대
        for (var i = 0; i < 14; i++) {
            //  윗쪽 라인 박스
            this.box = boxes.create(i * 5 + 3, 250, 'spr_box');
            this.box.body.static = true;
            this.box.scale.set(1);
            this.box.body.mass = 5;
            this.box.body.setCollisionGroup(this.boxCollisionGroup);
            this.box.body.collides(this.ballCollisionGroup);

            this.box = boxes.create(i * 5 + 1270 - 60, 250, 'spr_box');
            this.box.body.static = true;
            this.box.scale.set(1);
            this.box.body.mass = 5;
            this.box.body.setCollisionGroup(this.boxCollisionGroup);
            this.box.body.collides(this.ballCollisionGroup);

            //  아래쪽 라인 박스
            this.box = boxes.create(i * 5 + 3, 465, 'spr_box');
            this.box.body.static = true;
            this.box.scale.set(1);
            this.box.body.mass = 5;
            this.box.body.setCollisionGroup(this.boxCollisionGroup);
            this.box.body.collides(this.ballCollisionGroup);

            this.box = boxes.create(i * 5 + 1270 - 60, 465, 'spr_box');
            this.box.body.static = true;
            this.box.scale.set(1);
            this.box.body.mass = 5;
            this.box.body.setCollisionGroup(this.boxCollisionGroup);
            this.box.body.collides(this.ballCollisionGroup);
        }
        for (var i = 0; i < 44; i++) {
            //  왼쪽 라인 박스
            this.box = boxes.create(4, i * 5 + 250, 'spr_box');
            this.box.body.static = true;
            this.box.scale.set(1);
            this.box.body.mass = 5;
            this.box.body.setCollisionGroup(this.boxCollisionGroup);
            this.box.body.collides(this.ballCollisionGroup);

            //  오른쪽 라인 박스
            this.box = boxes.create(1280 - 4, i * 5 + 250, 'spr_box');
            this.box.body.static = true;
            this.box.scale.set(1);
            this.box.body.mass = 5;
            this.box.body.setCollisionGroup(this.boxCollisionGroup);
            this.box.body.collides(this.ballCollisionGroup);
        }
        //#endregion

        //////////////////////////////////////////////////////////////////////////////////////////
        //#region 플레이어 설정
        //  플레이어1
        this.player_1 = game.add.sprite(game.world.centerX - 400, game.world.centerY, chr_sprite[chr_select_1]);
        this.player_1.anchor.set(0.5);
        this.player_1.scale.set(playerScale_1);

        game.physics.p2.enable(this.player_1, false);
        this.player_1.body.mass = 5;
        this.player_1.body.setCircle(this.player_1.width / 2);
        this.player_1.body.fixedRotation = true;
        this.player_1.body.damping = 0.75;
        this.player_1.body.setCollisionGroup(this.playerCollisionGroup);
        this.player_1.body.collides([this.ballCollisionGroup, this.playerCollisionGroup]);

        this.player_1.animations.add("stand", [0,1], 10 ,true);
        this.player_1.animations.add("walk", [2,3,4,5], 15 ,true);
        this.player_1.animations.add("win", [6], 10 ,true);
        this.player_1.animations.add("lose", [7,8], 10 ,true);

        this.playerHspd_1 = 1;
        this.isKick_1 = false;

        onPlayerName_1 = game.add.text(this.player_1.body.x,this.player_1.body.y-30,playerName_1,{
            font: '20px'
        });
        onPlayerName_1.anchor.set(0.5);

        //  플레이어2
        this.player_2 = game.add.sprite(game.world.centerX + 400, game.world.centerY, chr_sprite[chr_select_2]);
        this.player_2.anchor.set(0.5);
        this.player_2.scale.set(playerScale_2);

        game.physics.p2.enable(this.player_2, false);
        this.player_2.body.mass = 5;
        this.player_2.body.setCircle(this.player_2.width / 2);
        this.player_2.body.fixedRotation = true;
        this.player_2.body.damping = 0.75;
        this.player_2.body.setCollisionGroup(this.playerCollisionGroup);
        this.player_2.body.collides([this.ballCollisionGroup, this.playerCollisionGroup]);

        this.player_2.animations.add("stand", [0,1], 10 ,true);
        this.player_2.animations.add("walk", [2,3,4,5], 10 ,true);
        this.player_2.animations.add("win", [6], 10 ,true);
        this.player_2.animations.add("lose", [7,8], 10 ,true);

        this.playerHspd_2 = -1;
        this.isKick_2 = false;

        onPlayerName_2 = game.add.text(this.player_2.body.x,this.player_2.body.y-30,playerName_2,{
            font: '20px'
        });
        onPlayerName_2.anchor.set(0.5);

        //#endregion

        //////////////////////////////////////////////////////////////////////////////////////////
        //#region 공 설정
        this.ball = game.add.sprite(CANVAS_WIDTH / 2, game.world.centerY, 'spr_ball');
        this.ball.anchor.set(0.5);
        this.ball.scale.set(ballScale);

        game.physics.p2.enable(this.ball, false);
        this.ball.body.mass = 1;
        this.ball.body.damping = 0.7;
        this.ball.body.setCircle(this.ball.width / 2);
        this.ball.body.fixedRotation = false;
        this.ball.body.setCollisionGroup(this.ballCollisionGroup);
        this.ball.body.collides([this.playerCollisionGroup, this.boxCollisionGroup]);
        this.ball.body.createBodyCallback(this.player_1, this.kick, this);
        this.ball.body.createBodyCallback(this.player_2, this.kick2, this);
        //#endregion

        //////////////////////////////////////////////////////////////////////////////////////////
        //#region UI 설정
        //  점수
        this.scoreText = game.add.text(CANVAS_WIDTH / 2, 20, blueScore + " : " + orangeScore, {
            font: "35px BMJUA",
            fill: "#000000",
            align: "center"
        });
        this.scoreText.anchor.set(0.5);

        this.timerText = game.add.text(CANVAS_WIDTH / 2, 60, timerMin + " : " + timerSec, {
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
        if (this.isGameStart) {
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
        }

        onPlayerName_1.x = this.player_1.x;
        onPlayerName_1.y = this.player_1.y-30;

        onPlayerName_2.x = this.player_2.x;
        onPlayerName_2.y = this.player_2.y-30;

        //  애니메이션 설정
        if (Math.max(Math.abs(this.player_1.body.velocity.x), Math.abs(this.player_1.body.velocity.y)) < 10)
            this.player_1.animations.play("stand");
        else
            this.player_1.animations.play("walk");

        if (Math.max(Math.abs(this.player_2.body.velocity.x), Math.abs(this.player_2.body.velocity.y)) < 10)
            this.player_2.animations.play("stand");
        else
            this.player_2.animations.play("walk");

        //  방향 설정
        if (this.playerHspd_1 != 0)
            this.player_1.scale.x = this.playerHspd_1 * playerScale_1;
        if (this.playerHspd_2 != 0)
            this.player_2.scale.x = this.playerHspd_2 * playerScale_1;
    
        //  슛 해제
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
        if (this.isGoal == false && this.isTimeOver == false) {
            if (this.ball.body.x <= 48.3 && this.ball.body.y >= 252.5 && this.ball.body.y <= 447.6) {
                orangeScore++;
                this.isGoal = true;
                this.scoreText.alpha = 1;
                this.timer.stop();
                this.orangeGoalText();
                game.time.events.add(Phaser.Timer.SECOND * 5, this.restartGame);
            }
            if (this.ball.body.x >= 1232.9 && this.ball.body.y >= 252.5 && this.ball.body.y <= 447.6) {
                blueScore++;
                this.isGoal = true;
                this.scoreText.alpha = 1;
                this.timer.stop();
                this.blueGoalText();
                game.time.events.add(Phaser.Timer.SECOND * 5, this.restartGame);
            }
        }
        //#endregion

        //////////////////////////////////////////////////////////////////////////////////////////
        //#region 경기 종료
        if (timerMin == 0 && timerSec == '00' && this.isTimeOver == false) {
            this.timer.stop();
            this.isTimeOver = true;

            this.player_1.body.velocity.x = game.math.clamp(this.player_1.body.velocity.x, 0, 0);
            this.player_1.body.velocity.y = game.math.clamp(this.player_1.body.velocity.y, 0, 0);
            this.player_2.body.velocity.x = game.math.clamp(this.player_2.body.velocity.x, 0, 0);
            this.player_2.body.velocity.y = game.math.clamp(this.player_2.body.velocity.y, 0, 0);

            if (blueScore > orangeScore) {
                this.BlueWinText = game.add.text(CANVAS_WIDTH / 2, game.world.centerY, "Blue Team Win!", {
                    font: "bold 100px BMJUA",
                    fill: "#4834d4"
                });
                    this.BlueWinText.anchor.set(0.5);
            }
            if (blueScore < orangeScore) {
                this.OrangeWinText = game.add.text(CANVAS_WIDTH / 2, game.world.centerY, "Orange Team Win!", {
                    font: "bold 100px BMJUA",
                    fill: "#e67e22"
                });
                    this.OrangeWinText.anchor.set(0.5);
            }
            if (blueScore == orangeScore) {
                this.drawText = game.add.text(CANVAS_WIDTH / 2, game.world.centerY, "Draw!", {
                    font: "bold 100px BMJUA",
                    fill: "#000000"
                });
                    this.drawText.anchor.set(0.5);
            }
        }
        //#endregion

        //////////////////////////////////////////////////////////////////////////////////////////
        //#region UI
        this.scoreText.setText(blueScore + " : " + orangeScore);
        this.timerText.setText(timerMin + " : " + timerSec);
        //#endregion
    },

    //////////////////////////////////////////////////////////////////////////////////////////
    //#region 외부 함수
    startGame: function() {
        Game.isGameStart = true;
        Game.text_ready.destroy();
        console.log(this);
    },

    timerSecCnt: function() {
        if (Game.isGameStart) {
            timerSec--;
            if(timerSec == 0)
                timerSec = '00';
            if(timerSec < 0){
                timerMin--;
                timerSec = 59;
            }
        }
    },

    kick: function() {
        if (this.kickButton_1.isDown && this.isKick_1 == false) {
            this.ball.body.velocity.x *= playerShootPower;
            this.ball.body.velocity.y *= playerShootPower;
            this.isKick_1 = true;
        }
    },
    kick2: function() {
        if (this.kickButton_2.isDown && this.isKick_2 == false) {
            this.ball.body.velocity.x *= playerShootPower;
            this.ball.body.velocity.y *= playerShootPower;
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
    blueGoalText: function() {
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
    }
    //#endregion
}
