var game = new Phaser.Game(1280, 720, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

var player;
var ball;
var cursors;

function preload() {
    game.load.image('spr_player','assets/sprites/spr_player.png');
    game.load.image('spr_ball','assets/sprites/spr_ball.png');
}

function create() {
    //물리 설정
    game.physics.startSystem(Phaser.Physics.P2JS); //물리 P2JS로 시작
    game.physics.p2.restitution = 0.8; // 조금 더 탄력있게(?)만듬

    //배경색 설정
    game.stage.backgroundColor = "#7befb2";

    //player 설정
    player = game.add.sprite(200, 200, 'spr_player'); //스프라이트 추가
    player.scale.set(1); //크기 설정
    //player.smoothed = false; 이미지 안티에일리언싱 false는 적용안함. 기본 값은 true
    game.physics.p2.enable(player); //물리 적용
    player.body.setCircle(33); //원으로 충돌 반경 설정
    player.body.collideWorldBounds = true; //벽 충돌 설정
    cursors = game.input.keyboard.createCursorKeys(); //방향키

    //ball 설정
    ball = game.add.sprite(game.world.centerX,game.world.centerY,'spr_ball'); //스프라이트 추가
    game.physics.p2.enable(ball); //물리 적용
    ball.body.setCircle(17); //원으로 충돌 반경 설정
    ball.body.collideWorldBounds = true; //벽 충돌 설정
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
