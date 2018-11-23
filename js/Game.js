//  인 게임
//#region 글로벌 변수
var playerName_1;
var playerName_2;

var playerSprite_1;
var playerSprite_2;

var player_1;
var player_2;
var ball;
var box;

var playerAccSpeed = 10;
var playerMaxSpeed = 150;

var cursors;
var kickButton, kickButton2;
var isKick = false, isKick2 = false;

var scoreText, timerText;
var timerSec = '00', timerMin = 3;
var orangeScore = 0, blueScore = 0;
var isGoal = false;
var isTimeOver = false;
//#endregion

var Game = {
    create: function () {
        //////////////////////////////////////////////////////////////////////////////////////////
        //#region 게임 설정
        //  물리
        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.setImpactEvents(true);
        game.physics.p2.restitution = 1;

        //  입력
        cursors = game.input.keyboard.createCursorKeys();
        kickButton = game.input.keyboard.addKey(Phaser.Keyboard.K);
        kickButton2 = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_5);

        //  배경
        game.stage.backgroundColor = "#7befb2";
        game.add.image(0, 0, 'bg_field');

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
            box = boxes.create(i * 5 + 68, 40, 'spr_box');
            box.body.static = true;
            box.scale.set(1);
            box.body.mass = 5;
            box.body.setCollisionGroup(boxCollisionGroup);
            box.body.collides(ballCollisionGroup);

            //  아래쪽 라인 박스
            box = boxes.create(i * 5 + 68, 680, 'spr_box');
            box.body.static = true;
            box.scale.set(1);
            box.body.mass = 5;
            box.body.setCollisionGroup(boxCollisionGroup);
            box.body.collides(ballCollisionGroup);
        }
        for (var i = 0; i < 43; i++) {
            //  왼쪽 라인 박스
            box = boxes.create(67, i * 5 + 40, 'spr_box');
            box.body.static = true;
            box.scale.set(1);
            box.body.mass = 5;
            box.body.setCollisionGroup(boxCollisionGroup);
            box.body.collides(ballCollisionGroup);

            //  오른쪽 라인 박스
            box = boxes.create(1280 - 70, i * 5 + 40, 'spr_box');
            box.body.static = true;
            box.scale.set(1);
            box.body.mass = 5;
            box.body.setCollisionGroup(boxCollisionGroup);
            box.body.collides(ballCollisionGroup);
        }
        for (var i = 0; i < 44; i++) {
            //  왼쪽 라인 박스
            box = boxes.create(67, i * 5 + 465, 'spr_box');
            box.body.static = true;
            box.scale.set(1);
            box.body.mass = 5;
            box.body.setCollisionGroup(boxCollisionGroup);
            box.body.collides(ballCollisionGroup);

            //  오른쪽 라인 박스
            box = boxes.create(1280 - 70, i * 5 + 465, 'spr_box');
            box.body.static = true;
            box.scale.set(1);
            box.body.mass = 5;
            box.body.setCollisionGroup(boxCollisionGroup);
            box.body.collides(ballCollisionGroup);
        }

        //  골대
        for (var i = 0; i < 14; i++) {
            //  윗쪽 라인 박스
            box = boxes.create(i * 5 + 3, 250, 'spr_box');
            box.body.static = true;
            box.scale.set(1);
            box.body.mass = 5;
            box.body.setCollisionGroup(boxCollisionGroup);
            box.body.collides(ballCollisionGroup);

            box = boxes.create(i * 5 + 1270 - 60, 250, 'spr_box');
            box.body.static = true;
            box.scale.set(1);
            box.body.mass = 5;
            box.body.setCollisionGroup(boxCollisionGroup);
            box.body.collides(ballCollisionGroup);

            //  아래쪽 라인 박스
            box = boxes.create(i * 5 + 3, 465, 'spr_box');
            box.body.static = true;
            box.scale.set(1);
            box.body.mass = 5;
            box.body.setCollisionGroup(boxCollisionGroup);
            box.body.collides(ballCollisionGroup);

            box = boxes.create(i * 5 + 1270 - 60, 465, 'spr_box');
            box.body.static = true;
            box.scale.set(1);
            box.body.mass = 5;
            box.body.setCollisionGroup(boxCollisionGroup);
            box.body.collides(ballCollisionGroup);
        }
        for (var i = 0; i < 44; i++) {
            //  왼쪽 라인 박스
            box = boxes.create(4, i * 5 + 250, 'spr_box');
            box.body.static = true;
            box.scale.set(1);
            box.body.mass = 5;
            box.body.setCollisionGroup(boxCollisionGroup);
            box.body.collides(ballCollisionGroup);

            //  오른쪽 라인 박스
            box = boxes.create(1280 - 4, i * 5 + 250, 'spr_box');
            box.body.static = true;
            box.scale.set(1);
            box.body.mass = 5;
            box.body.setCollisionGroup(boxCollisionGroup);
            box.body.collides(ballCollisionGroup);
        }
        //#endregion

        //////////////////////////////////////////////////////////////////////////////////////////
        //#region 플레이어 설정
        //  플레이어1
        player_1 = game.add.sprite(264, game.world.centerY, chr_sprite[chr_select_1]);
        player_1.anchor.set(0.5);
        player_1.scale.set(1);

        game.physics.p2.enable(player_1, false);
        player_1.body.mass = 5;
        player_1.body.setCircle(player_1.width / 2);
        player_1.body.fixedRotation = true;
        player_1.body.damping = 0.75;
        player_1.body.setCollisionGroup(playerCollisionGroup);
        player_1.body.collides([ballCollisionGroup, playerCollisionGroup]);

        //  플레이어2
        player_2 = game.add.sprite(1064, game.world.centerY, chr_sprite[chr_select_2]);
        player_2.anchor.set(0.5);
        player_2.scale.set(1);

        game.physics.p2.enable(player_2, false);
        player_2.body.mass = 5;
        player_2.body.setCircle(player_2.width / 2);
        player_2.body.fixedRotation = true;
        player_2.body.damping = 0.75;
        player_2.body.setCollisionGroup(playerCollisionGroup);
        player_2.body.collides([ballCollisionGroup, playerCollisionGroup]);
        //#endregion

        //////////////////////////////////////////////////////////////////////////////////////////
        //#region 공 설정
        ball = game.add.sprite(664, game.world.centerY, 'spr_ball');
        ball.anchor.set(0.5);

        game.physics.p2.enable(ball, false);
        ball.body.mass = 1;
        ball.body.damping = 0.7;
        ball.body.setCircle(ball.width / 2);
        ball.body.fixedRotation = false;
        ball.body.setCollisionGroup(ballCollisionGroup);
        ball.body.collides([playerCollisionGroup, boxCollisionGroup]);
        ball.body.createBodyCallback(player_1, this.kick, this);
        ball.body.createBodyCallback(player_2, this.kick2, this);
        //#endregion

        //////////////////////////////////////////////////////////////////////////////////////////
        //#region UI 설정
        //  점수
        scoreText = game.add.text(664, 20, blueScore + " : " + orangeScore, {
            font: "35px BMJUA",
            fill: "#000000",
            align: "center"
        });
        scoreText.anchor.setTo(0.5);

        timer = game.time.create(false);
        timerText = game.add.text(664, 60, timerMin + " : " + timerSec, {
            font: "30px BMJUA",
            fill: "#000000",
            backgroundColor: "#ffffff",
            align: "center"
        });
        timerText.anchor.setTo(0.5);
        timer.loop(1000, this.timerSecCnt,this);
        timer.start();
        //#endregion
    },

    update: function () {
        //////////////////////////////////////////////////////////////////////////////////////////
        //#region 플레이어
        //  플레이어 이동
        var pHspd = (game.input.keyboard.addKey(Phaser.Keyboard.D).isDown - game.input.keyboard.addKey(Phaser.Keyboard.A).isDown);
        player_1.body.velocity.x += pHspd * playerAccSpeed;
        var pVspd = (game.input.keyboard.addKey(Phaser.Keyboard.S).isDown - game.input.keyboard.addKey(Phaser.Keyboard.W).isDown);
        player_1.body.velocity.y += pVspd * playerAccSpeed;

        var p2Hspd = cursors.right.isDown - cursors.left.isDown;
        player_2.body.velocity.x += p2Hspd * playerAccSpeed;
        var p2vspd = cursors.down.isDown - cursors.up.isDown;
        player_2.body.velocity.y += p2vspd * playerAccSpeed;

        player_1.body.velocity.x = game.math.clamp(player_1.body.velocity.x, -playerMaxSpeed, playerMaxSpeed);
        player_1.body.velocity.y = game.math.clamp(player_1.body.velocity.y, -playerMaxSpeed, playerMaxSpeed);
        player_2.body.velocity.x = game.math.clamp(player_2.body.velocity.x, -playerMaxSpeed, playerMaxSpeed);
        player_2.body.velocity.y = game.math.clamp(player_2.body.velocity.y, -playerMaxSpeed, playerMaxSpeed);

        //  방향
        if (pHspd != 0)
            player_1.scale.x = pHspd;
        if (p2Hspd != 0)
            player_2.scale.x = p2Hspd;
    
        //  슛
        if (!kickButton.isDown)
            isKick = false;
        if (!kickButton2.isDown)
            isKick2 = false;
        //#endregion

        //////////////////////////////////////////////////////////////////////////////////////////            
        //#region 볼
        var ballMaxSpeed = 1000;
        ball.body.velocity.x = game.math.clamp(ball.body.velocity.x, -ballMaxSpeed, ballMaxSpeed);
        ball.body.velocity.y = game.math.clamp(ball.body.velocity.y, -ballMaxSpeed, ballMaxSpeed);
        //#endregion

        //////////////////////////////////////////////////////////////////////////////////////////
        //#region 골
        if (ball.body.x <= 48.3 && ball.body.y >= 252.5 && ball.body.y <= 447.6 && isGoal == false && isTimeOver == false) {
            timer.stop();
            this.orangeGoalText();
            orangeScore++;
            scoreText.alpha = 1;
            isGoal = true;
            game.time.events.add(Phaser.Timer.SECOND * 5, this.restartGame);
        }
        if (ball.body.x >= 1232.9 && ball.body.y >= 252.5 && ball.body.y <= 447.6 && isGoal == false && isTimeOver == false) {
            timer.stop();
            this.buleGoalText();
            blueScore++;
            scoreText.alpha = 1;
            isGoal = true;
            game.time.events.add(Phaser.Timer.SECOND * 5, this.restartGame);
        }
        scoreText.setText(blueScore + " : " + orangeScore);
        //#endregion

        //////////////////////////////////////////////////////////////////////////////////////////
        //#region 게임 오버
        if (timerMin == 0 && timerSec == '00'){
            timer.stop();

            player_1.body.velocity.x = game.math.clamp(player_1.body.velocity.x, 0, 0);
            player_1.body.velocity.y = game.math.clamp(player_1.body.velocity.y, 0, 0);
            player_2.body.velocity.x = game.math.clamp(player_2.body.velocity.x, 0, 0);
            player_2.body.velocity.y = game.math.clamp(player_2.body.velocity.y, 0, 0);

            if (blueScore > orangeScore && isTimeOver == false){
                var BlueWinText = game.add.text(664, game.world.centerY, "Blue Team Win!", {
                    font: "bold 100px BMJUA",
                    fill: "#4834d4",
                    backgroundColor: "#ffffff"
                });
                BlueWinText.anchor.set(0.5);
                isTimeOver = true;
            }
            if (blueScore < orangeScore && isTimeOver == false){
                var OrangeWinText = game.add.text(664, game.world.centerY, "Orange Team Win!", {
                    font: "bold 100px BMJUA",
                    fill: "#e67e22",
                    backgroundColor: "#ffffff"
                });
                OrangeWinText.anchor.set(0.5);
                isTimeOver = true;
            }
            if (blueScore == orangeScore && isTimeOver == false){
                var drawText = game.add.text(664, game.world.centerY, "Draw!", {
                    font: "bold 100px BMJUA",
                    fill: "#000000",
                    backgroundColor: "#ffffff"
                });
                drawText.anchor.set(0.5);
                isTimeOver = true;
            }
        }
        //#endregion

        //////////////////////////////////////////////////////////////////////////////////////////
        //#region UI
        //  타이머
        timerText.setText(timerMin + " : " + timerSec);
        //#endregion
    },

    //////////////////////////////////////////////////////////////////////////////////////////
    //#region 외부 함수
    timerSecCnt: function () {
        timerSec--;
        if(timerSec == 0)
            timerSec = '00';
        if(timerSec < 0){
            timerMin--;
            timerSec = 59;
        }
    },

    kick: function () {
        if (kickButton.isDown && isKick == false) {
            ball.body.velocity.x *= 3;
            ball.body.velocity.y *= 3;
            isKick = true;
        }
    },
    kick2: function () {
        if (kickButton2.isDown && isKick2 == false) {
            ball.body.velocity.x *= 3;
            ball.body.velocity.y *= 3;
            isKick2 = true;
        }
    },

    orangeGoalText: function () {
        var text;
        var style = {
            font: "bold 32px BMJUA",
            fill: "#e67e22",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };
        text = game.add.text(0, 0, "Orange Team GOAL!", style);
        text.setTextBounds(250, 100, 800, 100);
    },
    buleGoalText: function () {
        var text;
        var style = {
            font: "bold 32px BMJUA",
            fill: "#4834d4",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };
        text = game.add.text(0, 0, "Blue Team GOAL!", style);
        text.setTextBounds(250, 100, 800, 100);
    },

    restartGame: function () {
        game.state.restart();
        isGoal = false;
    }
    //#endregion
}
