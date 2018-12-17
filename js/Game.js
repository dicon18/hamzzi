//  인 게임
//#region 글로벌 변수
//  플레이어
var playerName_1 = "";
var playerName_2 = "";
var playerScale_1 = 2;
var playerScale_2 = 2;
var playerAccSpeed = 10;
var playerMaxSpeed = 150;
var playerShootPower = 5;

//  볼
var ballMaxSpeed = 1000;
var ballScale = 1.5;

// 킥 효과
var ef_kick_1;
var ef_kick_2;

//  환경
var timerSec = "00";
var timerMin = 3;
var orangeScore = 0;
var blueScore = 0;
//#endregion

var Game = {
    create: function() {
        //  씬 전환 효과
        this.camera.flash("#000000");

        //////////////////////////////////////////////////////////////////////////////////////////
        //#region 게임 설정
        //  물리
        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.setImpactEvents(true);
        game.physics.p2.restitution = 0.5;

        //  배경
        game.add.image(0, 0, bg_sprite[bg_select]);

        //  입력
        this.cursors = game.input.keyboard.createCursorKeys();
        this.kickButton_1 = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.kickButton_2 = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

        //  충돌 그룹
        this.playerCollisionGroup = game.physics.p2.createCollisionGroup();
        this.ballCollisionGroup = game.physics.p2.createCollisionGroup();
        this.boxCollisionGroup = game.physics.p2.createCollisionGroup();
        game.physics.p2.updateBoundsCollisionGroup();

        //  초기화
        this.isGoal = false;
        this.isTimeOver = false;
        game.time.events.add(Phaser.Timer.SECOND * 3, this.startGame);

        this.isGameStart = false;
        this.text_ready = game.add.text(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, "준비", {
            font: "100px BMJUA",
            fill: "#000000",
        });
            this.text_ready.anchor.set(0.5);
            this.text_ready.stroke = "#ffffff";
            this.text_ready.strokeThickness = 6;
        
        //  예외 처리
        if (playerName_1 == "") {
            playerName_1 = "플레이어1";
        }
        if (playerName_2 == "") {
            playerName_2 = "플레이어2";
        }
        //#endregion

        //////////////////////////////////////////////////////////////////////////////////////////
        //#region 충돌 박스 생성
        var boxes = game.add.group();
            boxes.enableBody = true;
            boxes.physicsBodyType = Phaser.Physics.P2JS;

        //  라인
        for (var i = 0; i < 228; i++) {
            //  윗쪽 라인 박스
            this.box = boxes.create(i * 5 + 68, 40, "spr_box");
            this.box.alpha = 0;
            this.box.body.static = true;
            this.box.scale.set(1);
            this.box.body.mass = 5;
            this.box.body.setCollisionGroup(this.boxCollisionGroup);
            this.box.body.collides(this.ballCollisionGroup);

            //  아래쪽 라인 박스
            this.box = boxes.create(i * 5 + 68, 680, "spr_box");
            this.box.alpha = 0;
            this.box.body.static = true;
            this.box.scale.set(1);
            this.box.body.mass = 5;
            this.box.body.setCollisionGroup(this.boxCollisionGroup);
            this.box.body.collides(this.ballCollisionGroup);
        }
        for (var i = 0; i < 43; i++) {
            //  왼쪽 라인 박스
            this.box = boxes.create(67, i * 5 + 40, "spr_box");
            this.box.alpha = 0;
            this.box.body.static = true;
            this.box.scale.set(1);
            this.box.body.mass = 5;
            this.box.body.setCollisionGroup(this.boxCollisionGroup);
            this.box.body.collides(this.ballCollisionGroup);

            //  오른쪽 라인 박스
            this.box = boxes.create(1280 - 70, i * 5 + 40, "spr_box");
            this.box.alpha = 0;
            this.box.body.static = true;
            this.box.scale.set(1);
            this.box.body.mass = 5;
            this.box.body.setCollisionGroup(this.boxCollisionGroup);
            this.box.body.collides(this.ballCollisionGroup);
        }
        for (var i = 0; i < 44; i++) {
            //  왼쪽 라인 박스
            this.box = boxes.create(67, i * 5 + 465, "spr_box");
            this.box.alpha = 0;
            this.box.body.static = true;
            this.box.scale.set(1);
            this.box.body.mass = 5;
            this.box.body.setCollisionGroup(this.boxCollisionGroup);
            this.box.body.collides(this.ballCollisionGroup);

            //  오른쪽 라인 박스
            this.box = boxes.create(1280 - 70, i * 5 + 465, "spr_box");
            this.box.alpha = 0;
            this.box.body.static = true;
            this.box.scale.set(1);
            this.box.body.mass = 5;
            this.box.body.setCollisionGroup(this.boxCollisionGroup);
            this.box.body.collides(this.ballCollisionGroup);
        }

        //  골대
        for (var i = 0; i < 14; i++) {
            //  윗쪽 라인 박스
            this.box = boxes.create(i * 5 + 3, 250, "spr_box");
            this.box.alpha = 0;
            this.box.body.static = true;
            this.box.scale.set(1);
            this.box.body.mass = 5;
            this.box.body.setCollisionGroup(this.boxCollisionGroup);
            this.box.body.collides(this.ballCollisionGroup);

            this.box = boxes.create(i * 5 + 1270 - 60, 250, "spr_box");
            this.box.alpha = 0;
            this.box.body.static = true;
            this.box.scale.set(1);
            this.box.body.mass = 5;
            this.box.body.setCollisionGroup(this.boxCollisionGroup);
            this.box.body.collides(this.ballCollisionGroup);

            //  아래쪽 라인 박스
            this.box = boxes.create(i * 5 + 3, 465, "spr_box");
            this.box.alpha = 0;
            this.box.body.static = true;
            this.box.scale.set(1);
            this.box.body.mass = 5;
            this.box.body.setCollisionGroup(this.boxCollisionGroup);
            this.box.body.collides(this.ballCollisionGroup);

            this.box = boxes.create(i * 5 + 1270 - 60, 465, "spr_box");
            this.box.alpha = 0;
            this.box.body.static = true;
            this.box.scale.set(1);
            this.box.body.mass = 5;
            this.box.body.setCollisionGroup(this.boxCollisionGroup);
            this.box.body.collides(this.ballCollisionGroup);
        }
        for (var i = 0; i < 44; i++) {
            //  왼쪽 라인 박스
            this.box = boxes.create(4, i * 5 + 250, "spr_box");
            this.box.alpha = 0;
            this.box.body.static = true;
            this.box.scale.set(1);
            this.box.body.mass = 5;
            this.box.body.setCollisionGroup(this.boxCollisionGroup);
            this.box.body.collides(this.ballCollisionGroup);

            //  오른쪽 라인 박스
            this.box = boxes.create(1280 - 4, i * 5 + 250, "spr_box");
            this.box.alpha = 0;
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

        game.physics.p2.enable(this.player_1, false);
        this.player_1.body.mass = 5;
        this.player_1.body.fixedRotation = true;
        this.player_1.body.damping = 0.75;
        this.player_1.scale.set(playerScale_1);
        this.player_1.body.setCircle(this.player_1.width / 2);
        this.player_1.body.setCollisionGroup(this.playerCollisionGroup);
        this.player_1.body.collides([this.ballCollisionGroup, this.playerCollisionGroup]);

        this.player_1.animations.add("stand", [0,1], 10 ,true);
        this.player_1.animations.add("walk", [2,3,4,5], 15 ,true);
        this.player_1.animations.add("win", [6], 10 ,true);
        this.player_1.animations.add("lose", [7,8], 10 ,true);

        this.playerHspd_1 = 1;
        this.isKick_1 = false;

        //  플레이어2
        this.player_2 = game.add.sprite(game.world.centerX + 400, game.world.centerY, chr_sprite[chr_select_2]);
        this.player_2.anchor.set(0.5);

        game.physics.p2.enable(this.player_2, false);
        this.player_2.body.mass = 5;
        this.player_2.body.fixedRotation = true;
        this.player_2.body.damping = 0.75;
        this.player_2.scale.set(playerScale_2);
        this.player_2.body.setCircle(this.player_2.width / 2);
        this.player_2.body.setCollisionGroup(this.playerCollisionGroup);
        this.player_2.body.collides([this.ballCollisionGroup, this.playerCollisionGroup]);

        this.player_2.animations.add("stand", [0,1], 10 ,true);
        this.player_2.animations.add("walk", [2,3,4,5], 10 ,true);
        this.player_2.animations.add("win", [6], 10 ,true);
        this.player_2.animations.add("lose", [7,8], 10 ,true);

        this.playerHspd_2 = -1;
        this.isKick_2 = false;
        //#endregion

        //////////////////////////////////////////////////////////////////////////////////////////
        //#region 공 설정
        this.ball = game.add.sprite(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, "spr_ball");
        this.ball.anchor.set(0.5);

        game.physics.p2.enable(this.ball, false);
        this.ball.body.mass = 1;
        this.ball.body.damping = 0.7;
        this.ball.body.fixedRotation = false;
        this.ball.scale.set(ballScale);
        this.ball.body.setCircle(this.ball.width / 2);
        this.ball.body.setCollisionGroup(this.ballCollisionGroup);
        this.ball.body.collides([this.playerCollisionGroup, this.boxCollisionGroup]);
        // this.ball.body.createBodyCallback(this.player_1, this.kick, this);
        // this.ball.body.createBodyCallback(this.player_2, this.kick2, this);

        //  이펙트 초기화
        this.ball.scale.set(ballScale * 5);
        this.ball.alpha = 0;
        //#endregion

        //////////////////////////////////////////////////////////////////////////////////////////
        //#region UI 설정
        //  타이머
        this.timerText = game.add.text(CANVAS_WIDTH / 2, 50, timerMin + " : " + timerSec, {
            font: "50px BMJUA",
            fill: "#000000"
        });
            this.timerText.anchor.set(0.5);
            this.timerText.stroke = "#ffffff";
            this.timerText.strokeThickness = 3;
            
        this.timer = game.time.create(false);
        this.timer.loop(1000, this.timerSecCnt,this);
        this.timer.start();

        //  점수
        this.scoreText = game.add.text(CANVAS_WIDTH / 2, 90, blueScore + " : " + orangeScore, {
            font: "30px BMJUA",
            fill: "#000000"
        });
            this.scoreText.addColor("#4834d4", 0);
            this.scoreText.addColor("#000000", 2);
            this.scoreText.addColor("#e67e22", 4);
            this.scoreText.anchor.set(0.5);
            this.scoreText.stroke = "#ffffff";
            this.scoreText.strokeThickness = 3;

        /// 플레이어 이름
        //  플레이어1
        this.onPlayerName_1 = game.add.text(this.player_1.body.x, this.player_1.body.y - 30, playerName_1, {
            font: "bold 20px BMJUA",
            fill: "#4834d4"
        });
            this.onPlayerName_1.anchor.set(0.5);
            this.onPlayerName_1.stroke = "#ffffff";
            this.onPlayerName_1.strokeThickness = 3;

        //  플레이어2
        this.onPlayerName_2 = game.add.text(this.player_2.body.x, this.player_2.body.y - 30, playerName_2, {
            font: "bold 20px BMJUA",
            fill: "#e67e22"
        });
            this.onPlayerName_2.anchor.set(0.5);
            this.onPlayerName_2.stroke = "#ffffff";
            this.onPlayerName_2.strokeThickness = 3;

        //  킥 버튼 효과
        this.ef_kick_1 = game.add.sprite(this.player_1.x, this.player_1.y);
        this.ef_kick_1.anchor.set(0.5);
        this.ef_kick_1.width = 40;
        this.ef_kick_1.height = 40;
        this.ef_kick_1.alpha = 0;

        this.ef_kick_2 = game.add.sprite(this.player_2.x, this.player_2.y);
        this.ef_kick_2.anchor.set(0.5);
        this.ef_kick_2.width = 40;
        this.ef_kick_2.height = 40;
        this.ef_kick_2.alpha = 0;

        //  깊이
        this.onPlayerName_2.bringToTop();
        this.onPlayerName_1.bringToTop();
        this.timerText.bringToTop();
        this.scoreText.bringToTop();
        //#endregion
    },

    update: function() {
        //////////////////////////////////////////////////////////////////////////////////////////
        //#region 플레이어
        if (this.isGameStart && this.isTimeOver == false && this.isGoal == false) {
            //  이동
            this.playerHspd_1 = (game.input.keyboard.addKey(Phaser.Keyboard.D).isDown - game.input.keyboard.addKey(Phaser.Keyboard.A).isDown);
                this.player_1.body.velocity.x += this.playerHspd_1 * playerAccSpeed;
            this.playerVspd_1 = (game.input.keyboard.addKey(Phaser.Keyboard.S).isDown - game.input.keyboard.addKey(Phaser.Keyboard.W).isDown);
                this.player_1.body.velocity.y += this.playerVspd_1 * playerAccSpeed;

            this.playerHspd_2 = this.cursors.right.isDown - this.cursors.left.isDown;
                this.player_2.body.velocity.x += this.playerHspd_2 * playerAccSpeed;
            this.playerVspd_2 = this.cursors.down.isDown - this.cursors.up.isDown;
                this.player_2.body.velocity.y += this.playerVspd_2 * playerAccSpeed;

            //  애니메이션 설정
            if (Math.max(Math.abs(this.player_1.body.velocity.x), Math.abs(this.player_1.body.velocity.y)) < 10)
                this.player_1.animations.play("stand");
            else
                this.player_1.animations.play("walk");

            if (Math.max(Math.abs(this.player_2.body.velocity.x), Math.abs(this.player_2.body.velocity.y)) < 10)
                this.player_2.animations.play("stand");
            else
                this.player_2.animations.play("walk");
        }

        //  속도 제한
        this.player_1.body.velocity.x = game.math.clamp(this.player_1.body.velocity.x, -playerMaxSpeed, playerMaxSpeed);
        this.player_1.body.velocity.y = game.math.clamp(this.player_1.body.velocity.y, -playerMaxSpeed, playerMaxSpeed);
        this.player_2.body.velocity.x = game.math.clamp(this.player_2.body.velocity.x, -playerMaxSpeed, playerMaxSpeed);
        this.player_2.body.velocity.y = game.math.clamp(this.player_2.body.velocity.y, -playerMaxSpeed, playerMaxSpeed);

        //  이름표
        this.onPlayerName_1.x = this.player_1.x;
        this.onPlayerName_1.y = this.player_1.y - 30;
        this.onPlayerName_2.x = this.player_2.x;
        this.onPlayerName_2.y = this.player_2.y - 30;

        //  킥 버튼 효과
        this.ef_kick_1.x = this.player_1.x;
        this.ef_kick_1.y = this.player_1.y;

        this.ef_kick_2.x = this.player_2.x;
        this.ef_kick_2.y = this.player_2.y;

        if(this.kickButton_1.isDown && this.isKick_1 == false)
            this.ef_kick_1.alpha = 1;
        else
            this.ef_kick_1.alpha = 0;
        
        if(this.kickButton_2.isDown && this.isKick_2 == false)
            this.ef_kick_2.alpha = 1;
        else
            this.ef_kick_2.alpha = 0;

        //  방향 설정
        if (this.playerHspd_1 != 0)
            this.player_1.scale.x = this.playerHspd_1 * playerScale_1;
        if (this.playerHspd_2 != 0)
            this.player_2.scale.x = this.playerHspd_2 * playerScale_1;
    
        //  슛 해제
        // if (!this.kickButton_1.isDown)
        //     this.isKick_1 = false;
        // if (!this.kickButton_2.isDown)
        //     this.isKick_2 = false;

        // 충돌 범위 확인(킥 기능)
        if (Phaser.Rectangle.intersects (this.player_1.getBounds(), this.ball.getBounds())){
            if (this.kickButton_1.isDown && this.isKick_1 == false) {
                sfx_kick.play();
                // this.ball.body.velocity.x = Math.sign(this.ball.body.velocity.x) * playerShootPower;
                // this.ball.body.velocity.y = Math.sign(this.ball.body.velocity.y) * playerShootPower;
                this.ball.body.velocity.x *= playerShootPower;
                this.ball.body.velocity.y *= playerShootPower;
                this.isKick_1 = true;
            }
            else if(!this.kickButton_1.isDown)
                this.isKick_1 = false;
        } 
        else if(Phaser.Rectangle.intersects (this.player_1.getBounds(), this.ball.getBounds()) == false && !this.kickButton_1.isDown){
            this.isKick_1 = false;
        }

        if (Phaser.Rectangle.intersects (this.player_2.getBounds(), this.ball.getBounds())){
            if (this.kickButton_2.isDown && this.isKick_2 == false) {
                sfx_kick.play();
                // this.ball.body.velocity.x = Math.sign(this.ball.body.velocity.x) * playerShootPower;
                // this.ball.body.velocity.y = Math.sign(this.ball.body.velocity.y) * playerShootPower;
                this.ball.body.velocity.x *= playerShootPower;
                this.ball.body.velocity.y *= playerShootPower;
                this.isKick_2 = true;
            }
            else if(!this.kickButton_2.isDown)
                this.isKick_2 = false;
        } 
        else if(Phaser.Rectangle.intersects (this.player_2.getBounds(), this.ball.getBounds()) == false && !this.kickButton_2.isDown){
            this.isKick_2 = false;
        }

        //#endregion

        //////////////////////////////////////////////////////////////////////////////////////////            
        //#region 볼
        //  시작 이펙트
        if (this.isGameStart) {
            if (this.ball.scale.x > ballScale) {
                if (this.ball.scale.x + 1 / 10 > ballScale) {
                    this.ball.scale.x -= 1 / 10;
                    this.ball.scale.y -= 1 / 10;
                }
                else {
                    this.ball.scale.x = ballScale;
                    this.ball.scale.y = ballScale;
                }
            }
            this.ball.alpha = Math.min(1, ballScale / this.ball.scale.x);
        }

        //  속도 제한
        this.ball.body.velocity.x = game.math.clamp(this.ball.body.velocity.x, -ballMaxSpeed, ballMaxSpeed);
        this.ball.body.velocity.y = game.math.clamp(this.ball.body.velocity.y, -ballMaxSpeed, ballMaxSpeed);

        //  각도 설정
        this.ball.body.angle += (Math.abs(this.ball.body.velocity.x) > Math.abs(this.ball.body.velocity.y) ? this.ball.body.velocity.x : this.ball.body.velocity.y) / 20;
        //#endregion

        //////////////////////////////////////////////////////////////////////////////////////////
        //#region 골
        if (this.isGoal == false && this.isTimeOver == false) {
            if (this.ball.body.x >= 1232.9 && this.ball.body.y >= 252.5 && this.ball.body.y <= 447.6) {
                blueScore++;
                sfx_cheer.play();
                this.player_1.animations.play("win");
                this.player_2.animations.play("lose");
                this.blueGoalText();
                this.isGoal = true;
                this.timer.stop();
                this.scoreText.stroke = "#ffffff";
                this.scoreText.strokeThickness = 3;
                game.time.events.add(Phaser.Timer.SECOND * 6, this.restartGame);           
            }
            if (this.ball.body.x <= 48.3 && this.ball.body.y >= 252.5 && this.ball.body.y <= 447.6) {
                orangeScore++;
                sfx_cheer.play();
                this.player_1.animations.play("lose");
                this.player_2.animations.play("win");
                this.orangeGoalText();
                this.isGoal = true;
                this.timer.stop();
                game.time.events.add(Phaser.Timer.SECOND * 6, this.restartGame);
            }
        }
        //#endregion

        //////////////////////////////////////////////////////////////////////////////////////////
        //#region 경기 종료
        if (timerMin == 0 && timerSec == "00" && this.isTimeOver == false) {
            if (blueScore > orangeScore) {
                this.BlueWinText = game.add.text(CANVAS_WIDTH / 2, game.world.centerY, playerName_1 + "팀 승리", {
                    font: "100px BMJUA",
                    fill: "#4834d4"
                });
                    this.BlueWinText.anchor.set(0.5);
                    this.scoreText.stroke = "#ffffff";
                    this.scoreText.strokeThickness = 3;
                this.player_1.animations.play("win");
                this.player_2.animations.play("lose");
                this.BlueWinText.bringToTop();
            }
            if (blueScore < orangeScore) {
                this.OrangeWinText = game.add.text(CANVAS_WIDTH / 2, game.world.centerY, playerName_2 + "팀 승리", {
                    font: "100px BMJUA",
                    fill: "#e67e22"
                });
                    this.OrangeWinText.anchor.set(0.5);
                    this.scoreText.stroke = "#ffffff";
                    this.scoreText.strokeThickness = 3;
                this.player_1.animations.play("lose");
                this.player_2.animations.play("win");
                this.OrangeWinText.bringToTop();
            }
            if (blueScore == orangeScore) {
                this.drawText = game.add.text(CANVAS_WIDTH / 2, game.world.centerY, "무승부", {
                    font: "100px BMJUA",
                    fill: "#000000"
                });
                    this.scoreText.stroke = "#ffffff";
                    this.scoreText.strokeThickness = 3;
                    this.drawText.anchor.set(0.5);
                this.player_1.animations.play("stand");
                this.player_2.animations.play("stand");
                this.drawText.bringToTop();
            }
            this.timer.stop();
            this.isTimeOver = true;
            sfx_endWhistle.play();
            game.time.events.add(Phaser.Timer.SECOND * 5, this.resetGame);
        }
        //#endregion

        //////////////////////////////////////////////////////////////////////////////////////////
        //#region UI
        this.timerText.setText(timerMin + " : " + timerSec);
        this.scoreText.setText(blueScore + " : " + orangeScore);
        //#endregion
    },

    //////////////////////////////////////////////////////////////////////////////////////////
    //#region 외부 함수
    startGame: function() {
        Game.isGameStart = true;
        Game.text_ready.destroy();
        sfx_startWhistle.play();
    },

    timerSecCnt: function() {
        if (Game.isGameStart) {
            timerSec--;
            if(timerSec == 0)
                timerSec = "00";
            if(timerSec < 0) {
                timerMin--;
                timerSec = 59;
            }
        }
    },

    // kick: function() {
    //     if (this.kickButton_1.isDown && this.isKick_1 == false) {
    //         sfx_kick.play();
    //         this.ball.body.velocity.x = Math.sign(this.ball.body.velocity.x) * playerShootPower;
    //         this.ball.body.velocity.y = Math.sign(this.ball.body.velocity.y) * playerShootPower;
    //         this.isKick_1 = true;
    //     }
    // },
    // kick2: function() {
    //     if (this.kickButton_2.isDown && this.isKick_2 == false) {
    //         sfx_kick.play();
    //         this.ball.body.velocity.x = Math.sign(this.ball.body.velocity.x) * playerShootPower;
    //         this.ball.body.velocity.y = Math.sign(this.ball.body.velocity.y) * playerShootPower;
    //         this.isKick_2 = true;
    //     }
    // },

    orangeGoalText: function() {
        var style = {
            font: "100px BMJUA",
            fill: "#e67e22",
            align: "center"
        };
        this.text = game.add.text(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, playerName_2 + "팀 득점", style);
            this.text.anchor.set(0.5);
            this.text.stroke = "#ffffff";
            this.text.strokeThickness = 3;
            this.text.bringToTop();
    }, 
    blueGoalText: function() {
        var style = {
            font: "100px BMJUA",
            fill: "#4834d4",
            align: "center"
        };
        this.text = game.add.text(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, playerName_1 + "팀 득점", style);
            this.text.anchor.set(0.5);
            this.text.stroke = "#ffffff";
            this.text.strokeThickness = 3;
            this.text.bringToTop();
    },

    restartGame: function() {
        game.state.restart();
    },

    resetGame: function() {
        timerSec = "00";
        timerMin = 3;
        orangeScore = 0;
        blueScore = 0;
        game.state.start("custom");
    }
    //#endregion
}
