//  멀티플레이 게임 클라이언트
var socket;     
var isConnected = false;
var isBalled = false;

var oPlayerList = [];

var player1, player2;
var ball;

//#region main
var gameMulti = {
    init: function() {
        socket = io();
        game.stage.disableVisibilityChange = true;
    },

    create: function() {
        this.cursors = game.input.keyboard.createCursorKeys();
        
        socket.on("connect", onConnected);
        socket.on("remove_player", onRemove_oPlayer);

        socket.on("create_oPlayer", onNew_oPlayer);
        socket.on("move_oPlayer", onMove_oPlayer);

        socket.on("move_player1", onMove_player1);
        socket.on("move_player2", onMove_player2);

        socket.on("create_ball", onCreateBall);
        socket.on("update_ball", onUpdateBall);

        //  배경
        game.add.image(0, 0, bg_sprite[0]);

        console.log("Client started");
    },

    update: function() {
        if (isConnected) {
            //  이동
            var player1_hspd = (game.input.keyboard.addKey(Phaser.Keyboard.D).isDown - game.input.keyboard.addKey(Phaser.Keyboard.A).isDown);
            var player1_vspd = (game.input.keyboard.addKey(Phaser.Keyboard.S).isDown - game.input.keyboard.addKey(Phaser.Keyboard.W).isDown);
            if (player1_hspd != 0 || player1_vspd != 0) {
                socket.emit("player1_move", {
                    hspd: player1_hspd,
                    vspd: player1_vspd
                });
            }
            // var player2_hspd = (this.cursors.right.isDown - this.cursors.left.isDown);
            // var player2_vspd = (this.cursors.down.isDown - this.cursors.up.isDown);
            // socket.emit("player2_move", {
            //     hspd: player2_hspd,
            //     vspd: player2_vspd
            // });
        }
    },
}
//#endregion

//#region 함수
//  접속 완료
function onConnected() {
    isConnected = true;
    player1 = game.add.sprite(getRandomInt(0, CANVAS_WIDTH), getRandomInt(0, CANVAS_HEIGHT), chr_sprite[0]);
    player1.anchor.setTo(0.5,0.5);
    player1.scale.set(2);
    socket.emit("new_player", { x: player1.x, y: player1.y, sprite: chr_sprite[0], radius: player1.width, speed: 1 });

    console.log("Connected to server");
}

//#region 플레이어
//  외부 플레이어 생성
function onNew_oPlayer(data) {
    var new_player = new Player(data.id, data.x, data.y, data.sprite);
    oPlayerList.push(new_player);
}

//  외부 플레이어 이동
function onMove_oPlayer(data) {         
    var movePlayer = find_playerID(data.id); 
	if (!movePlayer) {
		return;
    }
	movePlayer.player1.x = data.x;
    movePlayer.player1.y = data.y;
}

//  내 플레이어 위치 받기
function onMove_player1(data) {
    player1.x = data.x;
    player1.y = data.y;
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
	removePlayer.player1.destroy();
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
var Player = function(id, startX, startY, sprite) {
    this.id = id;
    this.player1 = game.add.sprite(startX, startY, sprite);
    this.player1.anchor.setTo(0.5,0.5);
}
//#endregion