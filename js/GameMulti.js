//  멀티플레이 게임 클라이언트
var socket;     
var isConnected = false;
var isBalled = false;

var oPlayerList = [];

var player, ball;

//#region main
var gameMulti = {
    init: function() {
        socket = io();
        game.stage.disableVisibilityChange = true;
    },

    create: function() {
        this.cursors = game.input.keyboard.createCursorKeys();
        
        socket.on("connect", onConnected);
        socket.on("remove_player", onRemovePlayer);
        socket.on("new_oPlayer", onNewPlayer);
        socket.on("input_recieved", onInputRecieved);
        socket.on("move_oPlayer", onMovePlayer);
        socket.on("createBall", onCreateBall);
        socket.on("updateBall", onUpdateBall);

        //  배경
        game.add.image(0, 0, "bg_inGame_1");

        console.log("Client started");
    },

    update: function() {
        if (isConnected) {
            //  움직이기
            socket.emit("input_fired", {
                hspd: (this.cursors.right.isDown - this.cursors.left.isDown),
                vspd: (this.cursors.down.isDown - this.cursors.up.isDown) 
            });
        }
    },
}
//#endregion

//#region 함수
//  접속 완료
function onConnected() {
    isConnected = true;
    player = game.add.sprite(getRandomInt(0, CANVAS_WIDTH), getRandomInt(0, CANVAS_HEIGHT), chr_sprite[0]);
    player.anchor.setTo(0.5,0.5);
    socket.emit("new_player", { x: player.x, y: player.y, sprite: chr_sprite[0], radius: player.width, speed: 20 });

    console.log("Connected to server");
}

//  외부 플레이어 생성
function onNewPlayer(data) {
    var new_player = new Player(data.id, data.x, data.y, data.sprite);
    oPlayerList.push(new_player);
}

//  내 플레이어 위치 받기
function onInputRecieved(data) {
    player.x = data.x;
    player.y = data.y;
}

//  외부 플레이어 이동
function onMovePlayer(data) {         
    var movePlayer = find_playerID(data.id); 
	if (!movePlayer) {
		return;
    }
	movePlayer.player.x = data.x;
    movePlayer.player.y = data.y;
}

//  플레이어 제거
function onRemovePlayer(data) {
    var removePlayer = find_playerID(data.id);
	if (!removePlayer) {
		return;
	}
	removePlayer.player.destroy();
	oPlayerList.splice(oPlayerList.indexOf(removePlayer), 1);
}

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

//  플레이어 ID 찾기
function find_playerID(id) {
    for (var i = 0; i < oPlayerList.length; i++) {
        if (oPlayerList[i].id == id) {
            return oPlayerList[i]; 
        }
    }
}
//#endregion

//#region 클래스
//  외부 플레이어 클래스
var Player = function(id, startX, startY, sprite) {
    this.id = id;
    this.player = game.add.sprite(startX, startY, sprite);
    this.player.anchor.setTo(0.5,0.5);
}
//#endregion