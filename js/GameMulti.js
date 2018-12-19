//  멀티플레이 게임 클라이언트
//  서버
var socket;     
var isConnected = false;
var isBalled = false;

//  플레이어
var playerName = "앙준하띠";
var playerScale = 2;
var playerAccSpeed = 1;
var playerMaxSpeed = 10;
var playerShootPower = 500;

var oPlayerList = [];

//  볼
var ball;

//#region main
var gameMulti = {
    init: function() {
        socket = io();
        game.stage.disableVisibilityChange = true;
    },

    create: function() {
        this.cursors = game.input.keyboard.createCursorKeys();
        this.kickButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        socket.on("connect", onConnected);
        socket.on("remove_player", onRemove_oPlayer);

        socket.on("create_oPlayer", onNew_oPlayer);
        socket.on("move_oPlayer", onMove_oPlayer);
        socket.on("move_player", onMove_player);

        socket.on("create_ball", onCreateBall);
        socket.on("update_ball", onUpdateBall);

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

            //  슛
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
        speed: playerAccSpeed, 
        speedMax: playerMaxSpeed,
        shootPower: playerShootPower,
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
//#endregion

//#region 볼
//  볼 생성
function onCreateBall(data) {
    ball = game.add.sprite(data.x, data.y, 'spr_ball');
    ball.angle = data.angle
    ball.anchor.setTo(0.5,0.5);

    isBalled = true;
}

//  볼 업데이트
function onUpdateBall(data) {
    if (isBalled == true) {
        ball.x = data.x;
        ball.y = data.y;
        ball.angle = data.angle;
    }
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