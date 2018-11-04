var game = new Phaser.Game(1280, 720, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

var player;
var ball;
var box;
var cursors;


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


    //충돌 박스 설정
    var boxes = game.add.group(); //boxes에 그룹화
    boxes.enableBody = true; 
    boxes.physicsBodyType = Phaser.Physics.P2JS; //P2JS 적용
    for (var i = 0; i < 115; i++){
        //윗쪽 라인 박스생성 후 고정
        box = boxes.create(i*10+70, 40, 'spr_box').body.static=true;
        //아래쪽 라인 박스생성 후 고정
        box = boxes.create(i*10+70, 680, 'spr_box').body.static=true;
        box.body.setCollisionGroup(boxCollisionGroup);
        box.body.collides(ballCollisionGroup);
    }
    for (var i = 0; i < 65; i++){
        //왼쪽 라인 박스생성 후 고정
        box = boxes.create(67, i*10+40, 'spr_box').body.static=true;
        //오른쪽 라인 박스생성 후 고정
        box = boxes.create(1280-70, i*10+40, 'spr_box').body.static=true;
        box.body.setCollisionGroup(boxCollisionGroup);
        box.body.collides(ballCollisionGroup);
    }
    

    //player 설정
    player = game.add.sprite(200, 200, 'spr_player'); //스프라이트 추가
    player.scale.set(1); //크기 설정
    //player.smoothed = false; 이미지 안티에일리언싱 false는 적용안함. 기본 값은 true
    game.physics.p2.enable(player, false);
    player.body.setCircle(33); //원으로 충돌 반경 설정
    //player.body.collideWorldBounds = true; //벽 충돌 설정
    player.body.setCollisionGroup(playerCollisionGroup);
    player.body.collides(ballCollisionGroup);


    //ball 설정
    ball = game.add.sprite(664,game.world.centerY,'spr_ball'); //스프라이트 추가
    game.physics.p2.enable(ball, false); //물리 적용
    ball.body.setCircle(17); //원으로 충돌 반경 설정
    //ball.body.collideWorldBounds = true; //벽 충돌 설정
    ball.body.setCollisionGroup(ballCollisionGroup);
    ball.body.collides([playerCollisionGroup, boxCollisionGroup]);

    //방향키
    cursors = game.input.keyboard.createCursorKeys();
}
function update() {

    //player 속도 0으로 설정
    player.body.setZeroVelocity();

    //방향키로 움직이는 조건
    if (cursors.left.isDown)
    {
		player.body.moveLeft(200);
    }
    else if (cursors.right.isDown)
    {
		player.body.moveRight(200);
    }

    if (cursors.up.isDown)
    {
    	player.body.moveUp(200);
    }
    else if (cursors.down.isDown)
    {
        player.body.moveDown(200);
    }
}

function render() {

}
