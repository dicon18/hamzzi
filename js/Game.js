var game = new Phaser.Game(1280, 720, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

var player;
var ball;
var box;
var cursors;
var kickButton;
var isKickBool=false;

//  골대
var goleLineSize = 100;
var lineSize = 70;

function preload() {
    game.load.image('bg_field','assets/bg/bg_field.png');

    game.load.image('spr_player','assets/sprites/spr_player.png');
    game.load.image('spr_ball','assets/sprites/spr_ball.png');
    game.load.image('spr_box','assets/sprites/spr_box.png');
}

function create() {
    //물리 설정
    game.physics.startSystem(Phaser.Physics.P2JS); //물리 P2JS로 시작
    game.physics.p2.setImpactEvents(true); //충돌 콜백 방지용
    game.physics.p2.restitution = 0.8; // 조금 더 탄력있게(?)만듬

    
    //배경 설정
    game.stage.backgroundColor = "#7befb2";
    game.add.image(0,0,'bg_field');


    //충돌그룹 설정
    var playerCollisionGroup = game.physics.p2.createCollisionGroup();
    var ballCollisionGroup = game.physics.p2.createCollisionGroup();
    var boxCollisionGroup = game.physics.p2.createCollisionGroup();

    game.physics.p2.updateBoundsCollisionGroup();


    //축구장 라인 충돌 박스 설정
    var boxes = game.add.group(); //boxes에 그룹화
    boxes.enableBody = true; 
    boxes.physicsBodyType = Phaser.Physics.P2JS; //P2JS 적용
    for (var i = 0; i < 1150; i++){
        //윗쪽 라인 박스생성 후 고정
        box = boxes.create(i+70, 40, 'spr_box');
        box.body.static = true;

        box.body.setRectangle(1,1); //사각형 충돌 반경 설정
        box.body.setCollisionGroup(boxCollisionGroup);  //box에 충돌 그룹 설정
        box.body.collides(ballCollisionGroup);  //box랑 충돌할 그룹 설정

        //아래쪽 라인 박스생성 후 고정
        box = boxes.create(i+70, 680, 'spr_box');
        box.body.static = true;

        box.body.setRectangle(1,1); //사각형 충돌 반경 설정
        box.body.setCollisionGroup(boxCollisionGroup);  //box에 충돌 그룹 설정
        box.body.collides(ballCollisionGroup);  //box랑 충돌할 그룹 설정
    }
    for (var i = 0; i < 65; i++){
        //왼쪽 라인 박스생성 후 고정
        box = boxes.create(67, i*10+40, 'spr_box');
        box.body.static = true;

        box.body.setRectangle(1,1); //사각형 충돌 반경 설정
        box.body.setCollisionGroup(boxCollisionGroup);  //box에 충돌 그룹 설정
        box.body.collides(ballCollisionGroup);  //box랑 충돌할 그룹 설정

        //오른쪽 라인 박스생성 후 고정
        box = boxes.create(1280-70, i*10+40, 'spr_box');
        box.body.static = true;
        
        box.body.setRectangle(1,1); //사각형 충돌 반경 설정
        box.body.setCollisionGroup(boxCollisionGroup);  //box에 충돌 그룹 설정
        box.body.collides(ballCollisionGroup);  //box랑 충돌할 그룹 설정
    }
    

    //player 설정
    player = game.add.sprite(200, 200, 'spr_player'); //스프라이트 추가
    player.scale.set(1); //크기 설정
    //player.smoothed = false; 이미지 안티에일리언싱 false는 적용안함. 기본 값은 true
    game.physics.p2.enable(player, false);
    player.body.setCircle(33); //원으로 충돌 반경 설정
    player.body.fixedRotation = true; //회전 고정 설정
    //player.body.collideWorldBounds = true; //벽 충돌 설정
    player.body.setCollisionGroup(playerCollisionGroup); //player에 충돌 그룹 설정
    player.body.collides(ballCollisionGroup);   //player랑 충돌할 그룹 설정

    //축구공 ball 설정
    ball = game.add.sprite(664,game.world.centerY,'spr_ball'); //스프라이트 추가
    game.physics.p2.enable(ball, false); 
    ball.body.setCircle(17); //원으로 충돌 반경 설정
    ball.body.fixedRotation = false; //회전 고정 설정
    ball.body.damping = 0.9; //댐핑 설정 공이 느려짐
    //ball.body.collideWorldBounds = true; //벽 충돌 설정
    ball.body.setCollisionGroup(ballCollisionGroup);    //ball에 충돌 그룹 설정
    ball.body.collides([playerCollisionGroup, boxCollisionGroup]);  //ball이랑 충돌할 그룹 설정

    ball.body.createBodyCallback(player, hitBall, this); //공 차기

    //방향키
    cursors = game.input.keyboard.createCursorKeys();

    //스페이스바
    kickButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR); //kickButton에 스페이스바 추가
    game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR); //스페이스바가 브라우저 영향 못 미치게함
}

function kick(){
    ball.body.velocity.x *= 7;
    ball.body.velocity.y *= 7;
}

function hitBall(body1, body2) {
     if(kickButton.isDown){
        isKickBool=true;
     }

}

function update() {

    //player 속도 0으로 설정
    player.body.setZeroVelocity();

    //방향키로 움직이는 조건
    if (cursors.left.isDown)
    {
		player.body.moveLeft(150);
    }
    else if (cursors.right.isDown)
    {
		player.body.moveRight(150);
    }

    if (cursors.up.isDown)
    {
    	player.body.moveUp(150);
    }
    else if (cursors.down.isDown)
    {
        player.body.moveDown(150);
    }

    if(isKickBool == true){
        
        kick();
        
        isKickBool = false;
    }
}

function render() {
    game.debug.spriteInfo(ball, 32, 32);
}
