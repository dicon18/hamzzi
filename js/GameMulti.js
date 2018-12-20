//  멀티플레이 게임 클라이언트
//#region 글로벌 변수
//  서버
var socket;     
var isConnected = false;

//  플레이어
var playerName = "";
var playerScale = 2;

var oPlayerList = [];

var timerSec = "00";
var timerMin = 3;
//#endregion

//#region main
var gameMulti = {
    init: function() {
        socket = io();
        game.stage.disableVisibilityChange = true;
    },

    create: function() {
        //  씬 전환 효과
        this.camera.flash("#000000");

        //  환경
        this.blueScore = 0;
        this.orangeScore = 0;
        this.isPause = false;
        if (playerName == "") {
            playerName = "플레이어";
        }

        //  키 설정
        this.cursors = game.input.keyboard.createCursorKeys();
        this.kickButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        //  소켓 수신
        socket.on("connect", onConnected);
        socket.on("remove_player", onRemove_oPlayer);

        socket.on("create_oPlayer", onNew_oPlayer);
        socket.on("move_oPlayer", onMove_oPlayer);
        socket.on("move_player", onMove_player);

        socket.on("server_info", onServerInfo);
        socket.on("update_ball", onUpdateBall);
        socket.on("update_timer", onUpdateTimer);

        socket.on("blueGoal", onBlueGoal);
        socket.on("orangeGoal", onOrangeGoal);

        socket.on("waitPlayer", onWaitPlayer);
        socket.on("reset", onReset);
        socket.on("restart", onRestart);

        socket.on("destroy_winText", function() {
            gameMulti.winText.destroy();
        });
        socket.on("destroy_goalText", function() {
            gameMulti.goalText.destroy();
        });
        socket.on("destroy_waitText", function() {
            gameMulti.waitText.destroy();
        });
        socket.on("sound_kick", function() {
            sfx_kick.play();
        });

        //  배경
        this.background = game.add.image(0, 0, bg_sprite[0]);

        //  볼
        this.ball = game.add.sprite(0, 0, 'spr_ball');
        this.ball.anchor.set(0.5);
        this.ball.scale.set(1.5);
        
        //#region 플레이어
        //  플레이어 생성
        this.player = game.add.sprite(0, 0, chr_sprite[chr_select]);
            this.player.anchor.set(0.5);
            this.player.scale.set(playerScale);

        //  플레이어 이름
        this.onPlayerName = game.add.text(0, 0, playerName, {
            font: "bold 20px BMJUA",
            fill: "#ffffff"
        });
            this.onPlayerName.anchor.set(0.5);
            this.onPlayerName.stroke = "#ffffff";
            this.onPlayerName.strokeThickness = 3;
            this.onPlayerName.bringToTop();

        this.isKick = false;
        //#endregion 플레이어

        //#region UI
        //  타이머
        this.timerText = game.add.text(CANVAS_WIDTH / 2, 50, timerMin + " : " + timerSec, {
            font: "50px BMJUA",
            fill: "#000000"
        });
            this.timerText.anchor.set(0.5);
            this.timerText.stroke = "#ffffff";
            this.timerText.strokeThickness = 3;
            this.timerText.bringToTop();

        //  점수
        this.scoreText = game.add.text(CANVAS_WIDTH / 2, 90, this.blueScore + " : " + this.orangeScore, {
            font: "30px BMJUA",
            fill: "#000000"
        });
            this.scoreText.addColor("#4834d4", 0);
            this.scoreText.addColor("#000000", 2);
            this.scoreText.addColor("#e67e22", 4);
            this.scoreText.anchor.set(0.5);
            this.scoreText.stroke = "#ffffff";
            this.scoreText.strokeThickness = 3;
            this.scoreText.bringToTop();
        //#endregion

        console.log("Client started");
    },

    update: function() {
        if (isConnected) {
            //  이동
            var player_hspd = (game.input.keyboard.addKey(Phaser.Keyboard.D).isDown - game.input.keyboard.addKey(Phaser.Keyboard.A).isDown);
            var player_vspd = (game.input.keyboard.addKey(Phaser.Keyboard.S).isDown - game.input.keyboard.addKey(Phaser.Keyboard.W).isDown);
            
            if ((player_hspd != 0 || player_vspd != 0) && this.isPause == false) {
                socket.emit("player_move", {
                    hspd: player_hspd,
                    vspd: player_vspd
                });
            }

            //  킥
            if (this.kickButton.isDown) {
                socket.emit("player_kick");
            }
            if (!this.kickButton.isDown)
                this.isKick = false;

            //  UI
            //  플레이어 이름
            this.onPlayerName.x = this.player.x;
            this.onPlayerName.y = this.player.y - 30;

            //  외부 플레이어 이름
            for (var i = 0; i < oPlayerList.length; i++) {
                oPlayerList[i].onPlayerName.x = oPlayerList[i].player.x;
                oPlayerList[i].onPlayerName.y = oPlayerList[i].player.y - 30;
            }

            this.scoreText.setText(blueScore + " : " + orangeScore);
            this.timerText.setText(timerMin + " : " + timerSec);

            //  경기 종료
            if (timerMin == 0 && timerSec == "00" && this.isPause == false) {
                if (blueScore > orangeScore) {
                    this.winText = game.add.text(CANVAS_WIDTH / 2, game.world.centerY, "블루팀 승리", {
                        font: "100px BMJUA",
                        fill: "#4834d4"
                    });
                        this.winText.anchor.set(0.5);
                        this.winText.stroke = "#ffffff";
                        this.winText.strokeThickness = 3;
                        this.winText.bringToTop();
                    this.isPause = true;
                }
                if (blueScore < orangeScore) {
                    this.winText = game.add.text(CANVAS_WIDTH / 2, game.world.centerY, playerName_2 + "오렌지팀 승리", {
                        font: "100px BMJUA",
                        fill: "#e67e22"
                    });
                        this.winText.anchor.set(0.5);
                        this.winText.stroke = "#ffffff";
                        this.winText.strokeThickness = 3;
                        this.winText.bringToTop();
                    this.isPause = true;
                }
                if (blueScore == orangeScore) {
                    this.winText = game.add.text(CANVAS_WIDTH / 2, game.world.centerY, "무승부", {
                        font: "100px BMJUA",
                        fill: "#000000"
                    });
                        this.winText.stroke = "#ffffff";
                        this.winText.strokeThickness = 3;
                        this.winText.anchor.set(0.5);
                        this.winText.bringToTop();
                    this.isPause = true;
                }
                sfx_endWhistle.play();
            }
        }
    },
}
//#endregion

//#region 함수
//  접속 완료
function onConnected() {
    socket.emit("new_player", { 
        sprite: chr_sprite[chr_select],
        radius: gameMulti.player.width / 2,
        scale: playerScale,
        speed: 2, 
        speedMax: 15,
        kickPower: 3,
        name: playerName
    });

    isConnected = true;
    console.log("Connected to server");
}

//#region 플레이어
//  외부 플레이어 생성
function onNew_oPlayer(data) {
    var new_player = new Player(data.id, data.x, data.y, data.sprite,  data.xdir, data.name, data.team);
    oPlayerList.push(new_player);
}

//  외부 플레이어 이동
function onMove_oPlayer(data) {         
    var movePlayer = find_playerID(data.id); 
	if (!movePlayer) {  
		return;
    }
	movePlayer.player.x = data.x;
    movePlayer.player.y = data.y;
    movePlayer.player.scale.x = data.xdir * playerScale;
}

//  내 플레이어 위치 받기
function onMove_player(data) {
    gameMulti.player.x = data.x;
    gameMulti.player.y = data.y;
    gameMulti.player.scale.x = data.xdir * playerScale;
}

//  플레이어 제거
function onRemove_oPlayer(data) {
    var removePlayer = find_playerID(data.id);
	if (!removePlayer) {
		return;
	}
	removePlayer.player.destroy();
	removePlayer.onPlayerName.destroy();
	oPlayerList.splice(oPlayerList.indexOf(removePlayer), 1);
}

//  서버 정보 수신
function onServerInfo(data) {
    gameMulti.background.loadTexture(bg_sprite[data.background_index]);

    //  내 정보
    if (data.team == "blue")
        gameMulti.onPlayerName.fill = "#4834d4"
    if (data.team == "orange")
        gameMulti.onPlayerName.fill = "#e67e22"

    //  점수
    orangeScore = data.orangeScore;
    blueScore = data.blueScore;
}

//  업데이트
function onUpdateBall(data) {
    gameMulti.ball.x = data.x;
    gameMulti.ball.y = data.y;
    gameMulti.ball.angle = data.angle;
}
function onUpdateTimer(data) {
    timerSec = data.timerSec;
    timerMin = data.timerMin;
}

//  골
function onBlueGoal() {
    var style = {
        font: "100px BMJUA",
        fill: "#4834d4",
        align: "center"
    };
    gameMulti.goalText = game.add.text(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, "블루팀 득점", style);
        gameMulti.goalText.anchor.set(0.5);
        gameMulti.goalText.stroke = "#ffffff";
        gameMulti.goalText.strokeThickness = 3;
        gameMulti.goalText.bringToTop();
    gameMulti.isPause = true;
    sfx_cheer.play();
    blueScore++;
}
function onOrangeGoal() {
    var style = {
        font: "100px BMJUA",
        fill: "#e67e22",
        align: "center"
    };
    gameMulti.goalText = game.add.text(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, "오렌지팀 득점", style);
        gameMulti.goalText.anchor.set(0.5);
        gameMulti.goalText.stroke = "#ffffff";
        gameMulti.goalText.strokeThickness = 3;
        gameMulti.goalText.bringToTop();
    gameMulti.isPause = true;
    sfx_cheer.play();
    orangeScore++;
}

//  게임 상태
function onWaitPlayer() {
    gameMulti.waitText = game.add.text(CANVAS_WIDTH / 2, game.world.centerY, "다른 플레이어를 기다리는중입니다", {
        font: "60px BMJUA",
        fill: "#000000"
    });
        gameMulti.waitText.stroke = "#ffffff";
        gameMulti.waitText.strokeThickness = 3;
        gameMulti.waitText.anchor.set(0.5);
        gameMulti.waitText.bringToTop();
}
function onReset() {
    gameMulti.isPause = false;
}
function onRestart(background_index) {
    gameMulti.camera.flash("#000000");
    gameMulti.background.loadTexture(bg_sprite[background_index])
    timerSec = "00";
    timerMin = 3;
    blueScore = 0;
    orangeScore = 0;
    gameMulti.isPause = false;
    sfx_startWhistle.play();
}
//#endregion

//#region UTIL
//  플레이어 ID 찾기
function find_playerID(id) {
    for (var i = 0; i < oPlayerList.length; i++) {
        if (oPlayerList[i].id == id) {
            return oPlayerList[i]; 
        }
    }
}
//#endregion

//#endregion

//#region 클래스
//  외부 플레이어 클래스
var Player = function(id, startX, startY, sprite, xdir, name, team) {
    this.id = id;

    //  외부 플레이어 생성
    this.player = game.add.sprite(startX, startY, sprite);
    this.player.anchor.setTo(0.5,0.5);
    this.player.scale.set(playerScale);
    this.player.scale.x = xdir * playerScale;

    //  외부 플레이어 이름 생성
    if (team == "blue")
        var color = "#4834d4"
    if (team == "orange")
        var color = "#e67e22"

    this.onPlayerName = game.add.text(this.player.x, this.player.y - 30, name, {
        font: "bold 20px BMJUA",
        fill: color
    });
        this.onPlayerName.anchor.set(0.5);
        this.onPlayerName.stroke = "#ffffff";
        this.onPlayerName.strokeThickness = 3;
        this.onPlayerName.bringToTop();
}
//#endregion