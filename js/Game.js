//  인 게임
//#region 변수
var player;
var player2;
var ball;
var box;

var cursors;
var kickButton, kickButton2;

var scoreText;
var orangeScore = 0, blueScore = 0;
var isGoal = 0;
//#endregion 변수

var boot = {
    preload: function () {

    },

    create: function () {
        //물리 설정
        game.physics.startSystem(Phaser.Physics.P2JS); //물리 P2JS로 시작
        game.physics.p2.setImpactEvents(true); //충돌 콜백 방지용
        game.physics.p2.restitution = 1; // 조금 더 탄력있게(?)만듬

        //#region key setting
        //방향키
        cursors = game.input.keyboard.createCursorKeys();

        //킥 버튼
        kickButton = game.input.keyboard.addKey(Phaser.Keyboard.K); //kickButton에 K 추가
        kickButton2 = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_0); //kickButton2에 넘패드 0 추가

        game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR); //스페이스바가 브라우저 영향 못 미치게함
        //#endregion key setting

        //배경 설정
        game.stage.backgroundColor = "#7befb2";
        game.add.image(0, 0, 'bg_field');


        //#region set collision group
        //충돌그룹 설정
        var playerCollisionGroup = game.physics.p2.createCollisionGroup();
        var ballCollisionGroup = game.physics.p2.createCollisionGroup();
        var boxCollisionGroup = game.physics.p2.createCollisionGroup();
        game.physics.p2.updateBoundsCollisionGroup();
        //#endregion set collision group

        //////////////////////////////////////////////////////////////////////////////////////////
        //#region collision box
        //축구장 라인 충돌 박스 설정
        var boxes = game.add.group(); //boxes에 그룹화
        boxes.enableBody = true;
        boxes.physicsBodyType = Phaser.Physics.P2JS; //P2JS 적용
        for (var i = 0; i < 228; i++) {
            //윗쪽 라인 박스생성 후 고정
            box = boxes.create(i * 5 + 68, 40, 'spr_box');
            box.body.static = true;

            box.body.setRectangle(1, 1); //사각형 충돌 반경 설정
            box.body.setCollisionGroup(boxCollisionGroup);  //box에 충돌 그룹 설정
            box.body.collides(ballCollisionGroup);  //box랑 충돌할 그룹 설정

            //아래쪽 라인 박스생성 후 고정
            box = boxes.create(i * 5 + 68, 680, 'spr_box');
            box.body.static = true;

            box.body.setRectangle(1, 1); //사각형 충돌 반경 설정
            box.body.setCollisionGroup(boxCollisionGroup);  //box에 충돌 그룹 설정
            box.body.collides(ballCollisionGroup);  //box랑 충돌할 그룹 설정
        }
        for (var i = 0; i < 43; i++) {
            //왼쪽 라인 박스생성 후 고정
            box = boxes.create(67, i * 5 + 40, 'spr_box');
            box.body.static = true;

            box.body.setRectangle(1, 1); //사각형 충돌 반경 설정
            box.body.setCollisionGroup(boxCollisionGroup);  //box에 충돌 그룹 설정
            box.body.collides(ballCollisionGroup);  //box랑 충돌할 그룹 설정

            //오른쪽 라인 박스생성 후 고정
            box = boxes.create(1280 - 70, i * 5 + 40, 'spr_box');
            box.body.static = true;

            box.body.setRectangle(1, 1); //사각형 충돌 반경 설정
            box.body.setCollisionGroup(boxCollisionGroup);  //box에 충돌 그룹 설정
            box.body.collides(ballCollisionGroup);  //box랑 충돌할 그룹 설정
        }
        for (var i = 0; i < 44; i++) {
            //왼쪽 라인 박스생성 후 고정
            box = boxes.create(67, i * 5 + 465, 'spr_box');
            box.body.static = true;

            box.body.setRectangle(1, 1); //사각형 충돌 반경 설정
            box.body.setCollisionGroup(boxCollisionGroup);  //box에 충돌 그룹 설정
            box.body.collides(ballCollisionGroup);  //box랑 충돌할 그룹 설정

            //오른쪽 라인 박스생성 후 고정
            box = boxes.create(1280 - 70, i * 5 + 465, 'spr_box');
            box.body.static = true;

            box.body.setRectangle(1, 1); //사각형 충돌 반경 설정
            box.body.setCollisionGroup(boxCollisionGroup);  //box에 충돌 그룹 설정
            box.body.collides(ballCollisionGroup);  //box랑 충돌할 그룹 설정
        }
        //////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////
        //골대 충돌 박스
        for (var i = 0; i < 14; i++) {
            //윗쪽 라인 박스생성 후 고정
            box = boxes.create(i * 5 + 3, 250, 'spr_box');
            box.body.static = true;

            box.body.setRectangle(1, 1); //사각형 충돌 반경 설정
            box.body.setCollisionGroup(boxCollisionGroup);  //box에 충돌 그룹 설정
            box.body.collides(ballCollisionGroup);  //box랑 충돌할 그룹 설정

            box = boxes.create(i * 5 + 1270 - 60, 250, 'spr_box');
            box.body.static = true;

            box.body.setRectangle(1, 1); //사각형 충돌 반경 설정
            box.body.setCollisionGroup(boxCollisionGroup);  //box에 충돌 그룹 설정
            box.body.collides(ballCollisionGroup);  //box랑 충돌할 그룹 설정

            //아래쪽 라인 박스생성 후 고정
            box = boxes.create(i * 5 + 3, 465, 'spr_box');
            box.body.static = true;

            box.body.setRectangle(1, 1); //사각형 충돌 반경 설정
            box.body.setCollisionGroup(boxCollisionGroup);  //box에 충돌 그룹 설정
            box.body.collides(ballCollisionGroup);  //box랑 충돌할 그룹 설정

            box = boxes.create(i * 5 + 1270 - 60, 465, 'spr_box');
            box.body.static = true;

            box.body.setRectangle(1, 1); //사각형 충돌 반경 설정
            box.body.setCollisionGroup(boxCollisionGroup);  //box에 충돌 그룹 설정
            box.body.collides(ballCollisionGroup);  //box랑 충돌할 그룹 설정
        }
        for (var i = 0; i < 44; i++) {
            //왼쪽 라인 박스생성 후 고정
            box = boxes.create(4, i * 5 + 250, 'spr_box');
            box.body.static = true;

            box.body.setRectangle(1, 1); //사각형 충돌 반경 설정
            box.body.setCollisionGroup(boxCollisionGroup);  //box에 충돌 그룹 설정
            box.body.collides(ballCollisionGroup);  //box랑 충돌할 그룹 설정

            //오른쪽 라인 박스생성 후 고정
            box = boxes.create(1280 - 4, i * 5 + 250, 'spr_box');
            box.body.static = true;

            box.body.setRectangle(1, 1); //사각형 충돌 반경 설정
            box.body.setCollisionGroup(boxCollisionGroup);  //box에 충돌 그룹 설정
            box.body.collides(ballCollisionGroup);  //box랑 충돌할 그룹 설정
        }
        //#endregion collision box
        //////////////////////////////////////////////////////////////////////////////////////////

        //#region player setting
        player = game.add.sprite(264, game.world.centerY, 'spr_player'); //스프라이트 추가
        player.anchor.set(0.5);
        player.scale.set(1); //크기 설정
        game.physics.p2.enable(player, false);
        player.body.setCircle(33); //원으로 충돌 반경 설정
        player.body.fixedRotation = true; //회전 고정 설정
        player.body.damping = 0.75;
        player.body.mass = 1000;
        player.body.setCollisionGroup(playerCollisionGroup); //player에 충돌 그룹 설정
        player.body.collides([ballCollisionGroup, playerCollisionGroup]);   //player랑 충돌할 그룹 설정
        //#endregion player setting

        //#region player2 setting
        player2 = game.add.sprite(1064, game.world.centerY, 'spr_player2'); //스프라이트 추가
        player2.anchor.set(0.5);
        player2.scale.set(1); //크기 설정
        game.physics.p2.enable(player2, false);
        player2.body.setCircle(33); //원으로 충돌 반경 설정
        player2.body.fixedRotation = true; //회전 고정 설정
        player2.body.damping = 0.75;
        player2.body.mass = 1000;
        player2.body.setCollisionGroup(playerCollisionGroup); //player에 충돌 그룹 설정
        player2.body.collides([ballCollisionGroup, playerCollisionGroup]);   //player랑 충돌할 그룹 설정
        //#endregion player2 setting

        //#region ball setting
        ball = game.add.sprite(664, game.world.centerY, 'spr_ball'); //스프라이트 추가
        ball.anchor.set(0.5);
        game.physics.p2.enable(ball, false);
        ball.body.setCircle(17); //원으로 충돌 반경 설정
        ball.body.fixedRotation = false; //회전 고정 설정
        ball.body.damping = 0.5; //댐핑 설정 공이 느려짐
        //ball.body.collideWorldBounds = true; //벽 충돌 설정
        ball.body.setCollisionGroup(ballCollisionGroup);    //ball에 충돌 그룹 설정
        ball.body.collides([playerCollisionGroup, boxCollisionGroup]);  //ball이랑 충돌할 그룹 설정
        ball.body.createBodyCallback(player, kick, this); //ball 차기
        ball.body.createBodyCallback(player2, kick2, this); //ball 차기
        //#endregion ball setting

        //점수
        scoreText = game.add.text(664, 40, blueScore + " : " + orangeScore, {
            font: "65px BMJUA",
            fill: "#000000",
            backgroundColor: "#ffffff",
            align: "center"
        });
        scoreText.anchor.setTo(0.5, 0.5);
        game.time.events.add(Phaser.Timer.SECOND * 5, scoreTextAlpha1);
        game.time.events.add(Phaser.Timer.SECOND * 5.1, scoreTextAlpha2);
        game.time.events.add(Phaser.Timer.SECOND * 5.2, scoreTextAlpha3);
        game.time.events.add(Phaser.Timer.SECOND * 5.3, scoreTextAlpha4);
        game.time.events.add(Phaser.Timer.SECOND * 5.4, scoreTextAlpha5);
    },

    scoreTextAlpha1: function () {
        scoreText.alpha = 0.9;
    },
    scoreTextAlpha2: function () {
        scoreText.alpha = 0.8;
    },
    scoreTextAlpha3: function () {
        scoreText.alpha = 0.7;
    },
    scoreTextAlpha4: function () {
        scoreText.alpha = 0.6;
    },
    scoreTextAlpha5: function () {
        scoreText.alpha = 0.5;
    },

    kick: function () {
        if (kickButton.isDown) {
            for (var i = 0; i < 2; i++) {
                ball.body.velocity.x *= 2;
                ball.body.velocity.y *= 2;
            }
        }
    },
    kick2: function () {
        if (kickButton2.isDown) {
            for (var i = 0; i < 2; i++) {
                ball.body.velocity.x *= 2;
                ball.body.velocity.y *= 2;
            }
        }
    },

    orangeGoalText: function() {
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
    buleGoalText: function() {
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

    restartGame: function() {
        game.state.restart();
        isGoal = 0;
    },

    update: function() {
        //#region players move
        var pVelocity = player.body.velocity;
        var p2Velocity = player2.body.velocity;

        if (game.input.keyboard.addKey(Phaser.Keyboard.A).isDown && pVelocity.x >= -120) {
            pVelocity.x -= 5;
        }
        else if (game.input.keyboard.addKey(Phaser.Keyboard.D).isDown && pVelocity.x <= 120) {
            pVelocity.x += 5;
        }
        if (game.input.keyboard.addKey(Phaser.Keyboard.W).isDown && pVelocity.y >= -120) {
            pVelocity.y -= 5;
        }
        else if (game.input.keyboard.addKey(Phaser.Keyboard.S).isDown && pVelocity.y <= 120) {
            pVelocity.y += 5;
        }

        if (cursors.left.isDown && p2Velocity.x >= -120) {
            p2Velocity.x -= 5;
        }
        else if (cursors.right.isDown && p2Velocity.x <= 120) {
            p2Velocity.x += 5;
        }
        if (cursors.up.isDown && p2Velocity.y >= -120) {
            p2Velocity.y -= 5;
        }
        else if (cursors.down.isDown && p2Velocity.y <= 120) {
            p2Velocity.y += 5;
        }
        //#endregion players move
        if (ball.body.velocity.x > 100) {
            ball.body.velocity.x -= 5;
        }
        if (ball.body.velocity.x < -100) {
            ball.body.velocity.x += 5;
        }
        if (ball.body.velocity.y > 100) {
            ball.body.velocity.y -= 5;
        }
        if (ball.body.velocity.y < -100) {
            ball.body.velocity.y += 5;
        }

        if (ball.body.x <= 48.3 && ball.body.y >= 252.5 && ball.body.y <= 447.6 && isGoal == 0) {
            orangeGoalText();
            orangeScore++;
            scoreText.alpha = 1;
            isGoal++;
            game.time.events.add(Phaser.Timer.SECOND * 5, restartGame);
        }
        if (ball.body.x >= 1232.9 && ball.body.y >= 252.5 && ball.body.y <= 447.6 && isGoal == 0) {
            buleGoalText();
            blueScore++;
            scoreText.alpha = 1;
            isGoal++;
            game.time.events.add(Phaser.Timer.SECOND * 5, restartGame);
        }
        scoreText.setText(blueScore + " : " + orangeScore);
    },

    render: function() {

    }
}
