//	게임 서버
var playerList = [];

//  볼
var ballScale = 1.5;
var isGoal = false;

//  환경
var orangeScore = 77;
var blueScore = 77;

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
    restitution: 0.5
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
ball.addShape(new p2.Circle({ radius: 16 * ballScale, material: ballMaterial }));
world.addBody(ball);
//#endregion

//#region 충돌 박스 생성
var boxes = [];
boxes[0] = new p2.Body({ position: [640, 40] });
    boxes[0].addShape(new p2.Box({ width: 1140, height: 2, material: boxMaterial }));
boxes[1] = new p2.Body({ position: [640, 680] });
    boxes[1].addShape(new p2.Box({ width: 1140, height: 2, material: boxMaterial }));

boxes[2] = new p2.Body({ position: [67, 145] });
    boxes[2].addShape(new p2.Box({ width: 2, height: 200, material: boxMaterial }));
boxes[3] = new p2.Body({ position: [1210, 145] });
    boxes[3].addShape(new p2.Box({ width: 2, height: 200, material: boxMaterial }));
boxes[4] = new p2.Body({ position: [67, 580] });
    boxes[4].addShape(new p2.Box({ width: 2, height: 200, material: boxMaterial }));
boxes[5] = new p2.Body({ position: [1210, 580] });
    boxes[5].addShape(new p2.Box({ width: 2, height: 200, material: boxMaterial }));
    
boxes[6] = new p2.Body({ position: [34, 250] });
    boxes[6].addShape(new p2.Box({ width: 68, height: 2, material: boxMaterial }));
boxes[7] = new p2.Body({ position: [34, 465] });
    boxes[7].addShape(new p2.Box({ width: 68, height: 2, material: boxMaterial }));
boxes[8] = new p2.Body({ position: [1244, 250] });
    boxes[8].addShape(new p2.Box({ width: 68, height: 2, material: boxMaterial }));
boxes[9] = new p2.Body({ position: [1244, 465] });
    boxes[9].addShape(new p2.Box({ width: 68, height: 2, material: boxMaterial }));

boxes[10] = new p2.Body({ position: [4, 232] });
    boxes[10].addShape(new p2.Box({ width: 2, height: 465, material: boxMaterial }));
boxes[11] = new p2.Body({ position: [1276, 232] });
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

    socket.on('player_move', onPlayer_move);
    socket.on('player_kick', onPlayer_kick);

    //  Delta Time
    var lastTimeSeconds = (new Date).getTime();

    //  Update
    setInterval(function() {
        //  플레이어
        var movePlayer = find_playerID(socket.id);
        if (!movePlayer) {
            return;
        }
        //console.log(Math.atan2(movePlayer.body.position[0] - ball.position[0], movePlayer.body.position[1] - ball.position[1]) * 180 / Math.PI);
        socket.emit('move_player', {
            x: movePlayer.body.position[0],
            y: movePlayer.body.position[1]
        });
        socket.broadcast.emit('move_oPlayer', {
            id: movePlayer.id,
            x: movePlayer.body.position[0],
            y: movePlayer.body.position[1]
        });

        movePlayer.body.position[0] = clamp(movePlayer.body.position[0], 0, 1280);
        movePlayer.body.position[1] = clamp(movePlayer.body.position[1], 0, 720);

        //  볼
        io.emit('update_ball', { x: ball.position[0], y: ball.position[1], angle: ball.angle });
        ball.velocity[0] = clamp(ball.velocity[0], -30, 30);
        ball.velocity[1] = clamp(ball.velocity[1], -30, 30);
        ball.angle += (Math.abs(ball.velocity[0]) > Math.abs(ball.velocity[1]) ? ball.velocity[0] : ball.velocity[1]) / 10;

        //  골
        if (isGoal == false) {
            if (ball.position[0] >= 1232.9 && ball.position[1] >= 252.5 && ball.position[1] <= 447.6) {
                //  블루팀 골
                isGoal = true;
                blueScore++;
                io.emit("blueGoal");
                setTimeout(function() {
                    ball.position[0] = 640;
                    ball.position[1] = 360;
                    ball.velocity[0] = 0;
                    ball.velocity[1] = 0;
                    isGoal = false;
                    io.emit("reset");
                }, 3000)
            }
            // if (this.ball.body.x <= 48.3 && this.ball.body.y >= 252.5 && this.ball.body.y <= 447.6) {
            //     //  오렌지팀 골
            // }
        }

        //  월드
        var dt = (new Date).getTime() - lastTimeSeconds;
        lastTimeSeconds = (new Date).getTime();
        world.step(1 / 60, dt, 10);

    }, 1000/60);
});
//#endregion

//#region 함수
//  새로운 플레이어
function onNewPlayer(data) {
    var newPlayer = new Player(this.id, data.x, data.y, data.sprite, data.radius, data.scale, data.speed, data.speedMax, data.kickPower, data.name);

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
            sprite: playerList[i].sprite,
            name: playerList[i].name
        });
    }

    //  나를 제외한 모든 소켓에게 나의 정보 전송
    this.broadcast.emit('create_oPlayer', {
        id: newPlayer.id, 
        x: newPlayer.x,
        y: newPlayer.y,
        sprite: newPlayer.sprite,
        name: newPlayer.name
    });
    playerList.push(newPlayer);

    //  서버 정보 전송
	this.emit('server_info', {
        //  볼 좌표
        ball_x: ball.position[0],
        ball_y: ball.position[0],
        ball_angle: ball.angle,
        orangeScore: orangeScore,
        blueScore: blueScore
    });

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
function onPlayer_move(data) {
    var movePlayer = find_playerID(this.id); 
    movePlayer.body.velocity[0] += data.hspd * movePlayer.speed;
    movePlayer.body.velocity[1] += data.vspd * movePlayer.speed;
    movePlayer.body.velocity[0] = clamp(movePlayer.body.velocity[0], -movePlayer.speedMax, movePlayer.speedMax);
    movePlayer.body.velocity[1] = clamp(movePlayer.body.velocity[1], -movePlayer.speedMax, movePlayer.speedMax);
}

//  플레이어 킥
function onPlayer_kick() {
    var kickPlayer = find_playerID(this.id);
    if (!kickPlayer) {
        return;
    }

    if (p2.Broadphase.boundingRadiusCheck(kickPlayer.body, ball)) {
        ball.angle = (Math.atan2(ball.position[1] - kickPlayer.body.position[1], ball.position[0] - kickPlayer.body.position[0]) * 180 / Math.PI) + 90;
        ball.velocity[0] = Math.cos(ball.angle) * 1000;
        ball.velocity[1] = Math.sin(ball.angle) * 1000;
    }
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
var Player = function(id, startX, startY, sprite, radius, scale, speed, speedMax, kickPower, name) {
    this.id = id;
    this.x = startX;
    this.y = startY;
    this.sprite = sprite;
    this.radius = radius;
    this.scale = scale;
    this.speed = speed;
    this.speedMax = speedMax;
    this.kickPower = kickPower;
    this.name = name;
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
function sign(val) {
    if (val > 0) 
        return 1;
    else if (val < 0)
        return -1;   
    else
        return 0;
}
//#endregion