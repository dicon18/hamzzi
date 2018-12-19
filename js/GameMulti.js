//  멀티플레이 게임 클라이언트
//#region 글로벌 변수
//  서버
var socket;     
var isConnected = false;
var isBall_exist = false;

//  플레이어
var playerName = "앙준하띠";
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
        //  환경
        this.blueScore = 0;
        this.orangeScore = 0;
        this.isPause = false;

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

        socket.on("blueGoal", onBlueGoal);
        socket.on("reset", onReset);

        //  배경
        game.add.image(0, 0, bg_sprite[0]);

        //#region 플레이어
        //  플레이어 생성
        this.player = game.add.sprite(getRandomInt(0, CANVAS_WIDTH), getRandomInt(0, CANVAS_HEIGHT), chr_sprite[0]);
            this.player.anchor.setTo(0.5,0.5);
            this.player.scale.set(playerScale);

        //  플레이어 이름
        this.onPlayerName = game.add.text(0, 0, playerName, {
            font: "bold 20px BMJUA",
            fill: "#4834d4"
        });
            this.onPlayerName.anchor.set(0.5);
            this.onPlayerName.stroke = "#ffffff";
            this.onPlayerName.strokeThickness = 3;
            this.onPlayerName.bringToTop();

        this.isKick = false;
        //#endregion 플레이어

        //#region UI
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
        //#endregion

        console.log("Client started");
    },

    update: function() {
        if (isConnected) {
            //  이동
            var player_hspd = (game.input.keyboard.addKey(Phaser.Keyboard.D).isDown - game.input.keyboard.addKey(Phaser.Keyboard.A).isDown);
            var player_vspd = (game.input.keyboard.addKey(Phaser.Keyboard.S).isDown - game.input.keyboard.addKey(Phaser.Keyboard.W).isDown);
            if (player_hspd != 0 || player_vspd != 0) {
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
            this.onPlayerName.x = this.player.x;
            this.onPlayerName.y = this.player.y - 30;

            for (var i = 0; i < oPlayerList.length; i++) {
                oPlayerList[i].onPlayerName.x = oPlayerList[i].player.x;
                oPlayerList[i].onPlayerName.y = oPlayerList[i].player.y - 30;
                console.log(oPlayerList[i].onPlayerName.x);
            }

            this.scoreText.setText(blueScore + " : " + orangeScore);
        }
    },
}
//#endregion

//#region 함수
//  접속 완료
function onConnected() {
    socket.emit("new_player", { 
        x: gameMulti.player.x,
        y: gameMulti.player.y,
        sprite: chr_sprite[0],
        radius: gameMulti.player.width / 2,
        scale: playerScale,
        speed: 2, 
        speedMax: 15,
        kickPower: playerKickPower,
        name: playerName
    });

    isConnected = true;
    console.log("Connected to server");
}

//#region 플레이어
//  외부 플레이어 생성
function onNew_oPlayer(data) {
    var new_player = new Player(data.id, data.x, data.y, data.sprite, data.name);
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
}

//  내 플레이어 위치 받기
function onMove_player(data) {
    gameMulti.player.x = data.x;
    gameMulti.player.y = data.y;
}
function onMove_player2(data) {
    player2.x = data.x;
    player2.y = data.y;
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
    gameMulti.ball = game.add.sprite(data.ball_x, data.ball_y, 'spr_ball');
        gameMulti.ball.angle = data.ball_angle
        gameMulti.ball.anchor.setTo(0.5, 0.5);
        gameMulti.ball.scale.set(ballScale);
    orangeScore = data.orangeScore;
    blueScore = data.blueScore;

    isBall_exist = true;
}

//  볼 업데이트
function onUpdateBall(data) {
    if (isBall_exist == true) {
        gameMulti.ball.x = data.x;
        gameMulti.ball.y = data.y;
        gameMulti.ball.angle = data.angle;
    }
}

//  골
function onBlueGoal() {
    var style = {
        font: "100px BMJUA",
        fill: "#4834d4",
        align: "center"
    };
    this.text = game.add.text(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, "블루팀 득점", style);
        this.text.anchor.set(0.5);
        this.text.stroke = "#ffffff";
        this.text.strokeThickness = 3;
        this.text.bringToTop();
    this.isPause = true;
    blueScore++;
}

//  게임 초기화
function onReset() {
    this.isPause = false;
    this.text.destroy();
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
var Player = function(id, startX, startY, sprite, name) {
    this.id = id;

    //  외부 플레이어 생성
    this.player = game.add.sprite(startX, startY, sprite);
    this.player.anchor.setTo(0.5,0.5);
    this.player.scale.set(playerScale);

    //  외부 플레이어 이름 생성
    this.onPlayerName = game.add.text(this.player.x, this.player.y - 30, name, {
        font: "bold 20px BMJUA",
        fill: "#4834d4"
    });
        this.onPlayerName.anchor.set(0.5);
        this.onPlayerName.stroke = "#ffffff";
        this.onPlayerName.strokeThickness = 3;
        this.onPlayerName.bringToTop();
}
//#endregion