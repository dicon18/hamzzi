//  게임 서버
var express = require("express");
var p2 = require('p2');
var app = express();

app.use("/js", express.static(__dirname + "/js"));
app.use("/assets", express.static(__dirname + "/assets"));
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})

var server = app.listen(80, function () {
    console.log("Listening on " + server.address().port);
})

//  플레이어 리스트
var playerList = [];

//  실시간 물리 적용
var startTime = (new Date()).getTime();
var lastTime;
var timeStep = 1 / 60; 
var world = new p2.World({
    gravity : [0,0]
});

function physics_hanlder() {
	var currentTime = (new Date).getTime();
	timeElapsed = currentTime - startTime;
	var dt = lastTime ? (timeElapsed - lastTime) / 1000 : 0;
    dt = Math.min(1 / 10, dt);
    world.step(timeStep);
}
setInterval(physics_hanlder, 1000/60);

//  플레이어 클래스
var Player = function(id, startX, startY, sprite, radius, speed) {
    this.id = id;
    this.x = startX;
    this.y = startY;
    this.sprite = sprite;
    this.radius = radius;
    this.speed = speed;

    this.isInputDelay = true;
}

//  새로운 플레이어
function onNewPlayer(data) {
    var newPlayer = new Player(this.id, data.x, data.y, data.sprite, data.radius, data.speed);

    //  플레이어 물리 적용
    playerBody = new p2.Body({
        mass: 1,
        position: [newPlayer.x, newPlayer.y],
        angle: 0,
        velocity: [0, 0],
        angularVelocity: 0,
        fixedRotation: true
    });
    playerBody.addShape(new p2.Circle({ radius: newPlayer.radius }));

    newPlayer.playerBody = playerBody;
    world.addBody(newPlayer.playerBody);

    //  플레이어 정보
    var current_info = {
        id: newPlayer.id, 
        x: newPlayer.x,
        y: newPlayer.y,
        sprite: newPlayer.sprite,
    }

    //  접속된 플레이어 정보 가져오기
    for (var i = 0; i < playerList.length; i++) {
        existPlayer = playerList[i];
        var player_info = {
            id: existPlayer.id,
            x: existPlayer.x,
            y: existPlayer.y,
            sprite: existPlayer.sprite,
        };
        this.emit('new_oPlayer', player_info);
    }

    //  나를 제외한 모든 소켓에게 나의 정보 전송
    this.broadcast.emit('new_oPlayer', current_info);
    playerList.push(newPlayer);

    console.log("created new player with id " + this.id);
}

//  연결 끊김
function onDisconnect() {
    var removePlayer = find_playerID(this.id);
    if (removePlayer) {
        playerList.splice(playerList.indexOf(removePlayer), 1);
    }
    this.broadcast.emit('remove_player', { id: this.id });
    
    console.log("disconnect player " + this.id);
}

function onInputFired(data) {
    var movePlayer = find_playerID(this.id); 
    if (!movePlayer || !movePlayer.isInputDelay) {
        return;
    }
    //  입력 지연
    setTimeout(function() { movePlayer.isInputDelay = true }, 10);
    movePlayer.isInputDelay = false;

    //  플레이어 이동
    movePlayer.playerBody.velocity[0] = data.hspd * movePlayer.speed;
    movePlayer.playerBody.velocity[1] = data.vspd * movePlayer.speed;
    movePlayer.x = movePlayer.playerBody.position[0];
    movePlayer.y = movePlayer.playerBody.position[1];

    var info = {
		x: movePlayer.x,
		y: movePlayer.y
    }
    var movePlayerData = {
        id: movePlayer.id,
		x: movePlayer.x,
		y: movePlayer.y
    }
	this.emit("input_recieved", info);
	this.broadcast.emit('move_oPlayer', movePlayerData);
}

//  플레이어 ID 찾기
function find_playerID(id) {
	for (var i = 0; i < playerList.length; i++) {
		if (playerList[i].id == id) {
			return playerList[i]; 
		}
	}
	return false; 
}

//  소켓 측
var io = require('socket.io').listen(server);

io.on('connection', function(socket) {
    socket.on('new_player', onNewPlayer);
    socket.on('disconnect', onDisconnect);
    socket.on('input_fired', onInputFired);
})
