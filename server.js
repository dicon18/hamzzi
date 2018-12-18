//	게임 서버
var playerList = [];

//#region 모듈
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const p2 = require('p2');

app.use("/js", express.static(__dirname + "/js"));
app.use("/assets", express.static(__dirname + "/assets"));
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

server.listen(80, function() {
	console.log("Listening on port 80");
});
//#endregion

//#region 서버 물리 세계
var world = new p2.World({
    gravity : [0,0]
});

var playerMaterial = new p2.Material();
var ballMaterial = new p2.Material();
var boxMaterial = new p2.Material();

world.addContactMaterial(new p2.ContactMaterial(playerMaterial, ballMaterial, {
    friction: 0,
    restitution: 1
}));
world.addContactMaterial(new p2.ContactMaterial(ballMaterial, boxMaterial, {
    friction: 0,
    restitution: 1
}));

//#region 볼 생성
var ball = new p2.Body({
    mass: 1,
    damping: 0.1,
	position: [640, 360],
	angle: 0,
	velocity: [0, 0],
	angularVelocity: 0,
	fixedRotation: false
});
ball.addShape(new p2.Circle({ radius: 16, material: ballMaterial }));
world.addBody(ball);
//#endregion

//#region 충돌 박스 생성
var boxes = [];
boxes[0] = new p2.Body({ position: [640, 40] });
    boxes[0].addShape(new p2.Box({ width: 1140, height: 2, material: boxMaterial }));
boxes[1] = new p2.Body({ position: [640, 680] });
    boxes[1].addShape(new p2.Box({ width: 1140, height: 2, material: boxMaterial }));

boxes[2] =  new p2.Body({ position: [67, 145] });
    boxes[2].addShape(new p2.Box({ width: 2, height: 200, material: boxMaterial }));
boxes[3] =  new p2.Body({ position: [1210, 145] });
    boxes[3].addShape(new p2.Box({ width: 2, height: 200, material: boxMaterial }));
boxes[4] =  new p2.Body({ position: [67, 580] });
    boxes[4].addShape(new p2.Box({ width: 2, height: 200, material: boxMaterial }));
boxes[5] =  new p2.Body({ position: [1210, 580] });
    boxes[5].addShape(new p2.Box({ width: 2, height: 200, material: boxMaterial }));
    
boxes[6] =  new p2.Body({ position: [34, 250] });
    boxes[6].addShape(new p2.Box({ width: 68, height: 2, material: boxMaterial }));
boxes[7] =  new p2.Body({ position: [34, 465] });
    boxes[7].addShape(new p2.Box({ width: 68, height: 2, material: boxMaterial }));
boxes[8] =  new p2.Body({ position: [1244, 250] });
    boxes[8].addShape(new p2.Box({ width: 68, height: 2, material: boxMaterial }));
boxes[9] =  new p2.Body({ position: [1244, 465] });
    boxes[9].addShape(new p2.Box({ width: 68, height: 2, material: boxMaterial }));

boxes[10] =  new p2.Body({ position: [4, 232] });
    boxes[10].addShape(new p2.Box({ width: 2, height: 465, material: boxMaterial }));
boxes[11] =  new p2.Body({ position: [1276, 232] });
    boxes[11].addShape(new p2.Box({ width: 2, height: 465, material: boxMaterial }));

for (var i = 0; i < boxes.length; i++) {
    boxes[i].mass = 0;
    world.addBody(boxes[i]);
}
//#endregion

//#endregion

//#region main
io.on('connection', function(socket) {
    socket.on('new_player', onNewPlayer);
    socket.on('disconnect', onDisconnect);

    socket.on('player1_move', onPlayer1_move);
    // socket.on('player2_move', onPlayer2_move);

    // socket.on('player1_kick', onPlayer1_move);
    // socket.on('player2_kick', onPlayer1_move);

    //  Delta Time
    var lastTimeSeconds = (new Date).getTime();

    setInterval(function() {
        var dt = (new Date).getTime() - lastTimeSeconds;
        lastTimeSeconds = (new Date).getTime();
        world.step(1 / 60, dt, 10);
        
        //  Update
        //  플레이어 업데이트
        var movePlayer = find_playerID(socket.id);
        if (!movePlayer) {
            return;
        }
        socket.emit('move_player1', {
            x: movePlayer.body.position[0],
            y: movePlayer.body.position[1]
        });
        socket.broadcast.emit('move_oPlayer', {
            id: movePlayer.id,
            x: movePlayer.body.position[0],
            y: movePlayer.body.position[1]
        });
        
        //  볼 업데이트
        io.emit('update_ball', { x: ball.position[0], y: ball.position[1], angle: ball.angle });

    }, 1000/60);
});
//#endregion

//#region 함수
//  새로운 플레이어
function onNewPlayer(data) {
    var newPlayer = new Player(this.id, data.x, data.y, data.sprite, data.radius, data.speed);

    //  플레이어 물리 적용
    newPlayer.body = new p2.Body({
        mass: 5,
        damping: 0.1,
        position: [newPlayer.x, newPlayer.y],
        angle: 0,
        velocity: [0, 0],
        angularVelocity: 0,
        fixedRotation: true
    });
    newPlayer.body.addShape(new p2.Circle({ radius: newPlayer.radius }));
    world.addBody(newPlayer.body);
    for (var i = 0; i < boxes.length; i++) {
        world.disableBodyCollision(newPlayer.body, boxes[i]);
    }

    //  접속된 플레이어 정보 가져오기
    for (var i = 0; i < playerList.length; i++) {
        this.emit('create_oPlayer', {
            id: playerList[i].id,
            x: playerList[i].body.position[0],
            y: playerList[i].body.position[1],
            sprite: playerList[i].sprite
        });
    }

    //  나를 제외한 모든 소켓에게 나의 정보 전송
    this.broadcast.emit('create_oPlayer', {
        id: newPlayer.id, 
        x: newPlayer.x,
        y: newPlayer.y,
        sprite: newPlayer.sprite
    });
    playerList.push(newPlayer);

    //  볼 정보 전송
	this.emit('create_ball', { x: ball.position[0], y: ball.position[0], angle: ball.angle });

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

//  플레이어 이동
function onPlayer1_move(data) {
    var movePlayer = find_playerID(this.id); 
    movePlayer.body.velocity[0] += data.hspd * movePlayer.speed;
    movePlayer.body.velocity[1] += data.vspd * movePlayer.speed;
    movePlayer.body.velocity[0] = clamp(movePlayer.body.velocity[0], -10, 10);
    movePlayer.body.velocity[1] = clamp(movePlayer.body.velocity[1], -10, 10);
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
//#endregion

//#region 클래스
//  플레이어 클래스
var Player = function(id, startX, startY, sprite, radius, speed) {
    this.id = id;
    this.x = startX;
    this.y = startY;
    this.sprite = sprite;
    this.radius = radius;
    this.speed = speed;
}
//#endregion

//#region UTIL
function clamp(val, min, max) {
    if (val > max)
        return max
    if (val < min)
        return min
    return val
}
//#endregion