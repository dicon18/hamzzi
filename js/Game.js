
//#region 변수
var player;
var ball;
var box;
var cursors;
var kickButton;
var isKickBool=false;
var playerSpeed = 150;
var scoreText;
var orangeScore=0, blueScore=0;
var goalCount=0;
//#endregion 변수

function preload() {
    game.load.image('bg_field','assets/bg/bg_field.png');

    game.load.image('spr_player','assets/sprites/spr_player.png');
    game.load.image('spr_ball','assets/sprites/spr_ball.png');
    game.load.image('spr_box','assets/sprites/spr_transbox.png');
}

function create() {
    //물리 설정
    game.physics.startSystem(Phaser.Physics.P2JS); //물리 P2JS로 시작
    game.physics.p2.setImpactEvents(true); //충돌 콜백 방지용
    game.physics.p2.restitution = 0.8; // 조금 더 탄력있게(?)만듬

    //#region key setting
    //방향키
    cursors = game.input.keyboard.createCursorKeys();

    //스페이스바
    kickButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR); //kickButton에 스페이스바 추가
    game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR); //스페이스바가 브라우저 영향 못 미치게함
    //#endregion key setting
    
    //배경 설정
    game.stage.backgroundColor = "#7befb2";
    game.add.image(0,0,'bg_field');


    //#region set collision group
    //충돌그룹 설정
    var playerCollisionGroup = game.physics.p2.createCollisionGroup();
    var ballCollisionGroup = game.physics.p2.createCollisionGroup();
    var boxCollisionGroup = game.physics.p2.createCollisionGroup();

    game.physics.p2.updateBoundsCollisionGroup();
    //#endregion set collision group

    //////////////////////////////////////////////////////////////////////////////////////////
    //#region collision box
    //축구장 라인 충돌 박스 설정
    var boxes = game.add.group(); //boxes에 그룹화
    boxes.enableBody = true; 
    boxes.physicsBodyType = Phaser.Physics.P2JS; //P2JS 적용
    for (var i = 0; i < 228; i++){
        //윗쪽 라인 박스생성 후 고정
        box = boxes.create(i*5+68, 40, 'spr_box');
        box.body.static = true;

        box.body.setRectangle(1,1); //사각형 충돌 반경 설정
        box.body.setCollisionGroup(boxCollisionGroup);  //box에 충돌 그룹 설정
        box.body.collides(ballCollisionGroup);  //box랑 충돌할 그룹 설정

        //아래쪽 라인 박스생성 후 고정
        box = boxes.create(i*5+68, 680, 'spr_box');
        box.body.static = true;

        box.body.setRectangle(1,1); //사각형 충돌 반경 설정
        box.body.setCollisionGroup(boxCollisionGroup);  //box에 충돌 그룹 설정
        box.body.collides(ballCollisionGroup);  //box랑 충돌할 그룹 설정
    }
    for (var i = 0; i < 43; i++){
        //왼쪽 라인 박스생성 후 고정
        box = boxes.create(67, i*5+40, 'spr_box');
        box.body.static = true;

        box.body.setRectangle(1,1); //사각형 충돌 반경 설정
        box.body.setCollisionGroup(boxCollisionGroup);  //box에 충돌 그룹 설정
        box.body.collides(ballCollisionGroup);  //box랑 충돌할 그룹 설정

        //오른쪽 라인 박스생성 후 고정
        box = boxes.create(1280-70, i*5+40, 'spr_box');
        box.body.static = true;
        
        box.body.setRectangle(1,1); //사각형 충돌 반경 설정
        box.body.setCollisionGroup(boxCollisionGroup);  //box에 충돌 그룹 설정
        box.body.collides(ballCollisionGroup);  //box랑 충돌할 그룹 설정
    }
    for (var i = 0; i < 44; i++){
        //왼쪽 라인 박스생성 후 고정
        box = boxes.create(67, i*5+465, 'spr_box');
        box.body.static = true;

        box.body.setRectangle(1,1); //사각형 충돌 반경 설정
        box.body.setCollisionGroup(boxCollisionGroup);  //box에 충돌 그룹 설정
        box.body.collides(ballCollisionGroup);  //box랑 충돌할 그룹 설정

        //오른쪽 라인 박스생성 후 고정
        box = boxes.create(1280-70, i*5+465, 'spr_box');
        box.body.static = true;
        
        box.body.setRectangle(1,1); //사각형 충돌 반경 설정
        box.body.setCollisionGroup(boxCollisionGroup);  //box에 충돌 그룹 설정
        box.body.collides(ballCollisionGroup);  //box랑 충돌할 그룹 설정
    }
    //////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////
    //골대 충돌 박스
    for (var i = 0; i < 14; i++){
        //윗쪽 라인 박스생성 후 고정
        box = boxes.create(i*5+3, 250, 'spr_box');
        box.body.static = true;

        box.body.setRectangle(1,1); //사각형 충돌 반경 설정
        box.body.setCollisionGroup(boxCollisionGroup);  //box에 충돌 그룹 설정
        box.body.collides(ballCollisionGroup);  //box랑 충돌할 그룹 설정

        box = boxes.create(i*5+1270-60, 250, 'spr_box');
        box.body.static = true;

        box.body.setRectangle(1,1); //사각형 충돌 반경 설정
        box.body.setCollisionGroup(boxCollisionGroup);  //box에 충돌 그룹 설정
        box.body.collides(ballCollisionGroup);  //box랑 충돌할 그룹 설정

        //아래쪽 라인 박스생성 후 고정
        box = boxes.create(i*5+3, 465, 'spr_box');
        box.body.static = true;

        box.body.setRectangle(1,1); //사각형 충돌 반경 설정
        box.body.setCollisionGroup(boxCollisionGroup);  //box에 충돌 그룹 설정
        box.body.collides(ballCollisionGroup);  //box랑 충돌할 그룹 설정

        box = boxes.create(i*5+1270-60, 465, 'spr_box');
        box.body.static = true;

        box.body.setRectangle(1,1); //사각형 충돌 반경 설정
        box.body.setCollisionGroup(boxCollisionGroup);  //box에 충돌 그룹 설정
        box.body.collides(ballCollisionGroup);  //box랑 충돌할 그룹 설정
    }
    for (var i = 0; i < 44; i++){
        //왼쪽 라인 박스생성 후 고정
        box = boxes.create(4, i*5+250, 'spr_box');
        box.body.static = true;

        box.body.setRectangle(1,1); //사각형 충돌 반경 설정
        box.body.setCollisionGroup(boxCollisionGroup);  //box에 충돌 그룹 설정
        box.body.collides(ballCollisionGroup);  //box랑 충돌할 그룹 설정

        //오른쪽 라인 박스생성 후 고정
        box = boxes.create(1280-4, i*5+250, 'spr_box');
        box.body.static = true;
        
        box.body.setRectangle(1,1); //사각형 충돌 반경 설정
        box.body.setCollisionGroup(boxCollisionGroup);  //box에 충돌 그룹 설정
        box.body.collides(ballCollisionGroup);  //box랑 충돌할 그룹 설정
    }
    //#endregion collision box
    //////////////////////////////////////////////////////////////////////////////////////////

    //#region player setting
    player = game.add.sprite(200, 200, 'spr_player'); //스프라이트 추가
    player.scale.set(1); //크기 설정
    //player.smoothed = false; 이미지 안티에일리언싱 false는 적용안함. 기본 값은 true
    game.physics.p2.enable(player, false);
    player.body.setCircle(33); //원으로 충돌 반경 설정
    player.body.fixedRotation = true; //회전 고정 설정
    //player.body.collideWorldBounds = true; //벽 충돌 설정
    player.body.setCollisionGroup(playerCollisionGroup); //player에 충돌 그룹 설정
    player.body.collides(ballCollisionGroup);   //player랑 충돌할 그룹 설정
    //#endregion player setting

    //#region ball setting
    ball = game.add.sprite(664,game.world.centerY,'spr_ball'); //스프라이트 추가
    game.physics.p2.enable(ball, false); 
    ball.body.setCircle(17); //원으로 충돌 반경 설정
    ball.body.fixedRotation = false; //회전 고정 설정
    ball.body.damping = 0.9; //댐핑 설정 공이 느려짐
    //ball.body.collideWorldBounds = true; //벽 충돌 설정
    ball.body.setCollisionGroup(ballCollisionGroup);    //ball에 충돌 그룹 설정
    ball.body.collides([playerCollisionGroup, boxCollisionGroup]);  //ball이랑 충돌할 그룹 설정
    ball.body.createBodyCallback(player, hitBall, this); //플레이어와 공이 충돌했을때 발생 함수
    //#endregion ball setting

    //점수
    scoreText = game.add.text(664, 40,blueScore+" : "+orangeScore,{font: "65px Arial", fill: "#000000", align: "center"});
    scoreText.anchor.setTo(0.5,0.5);
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

function orangeGoalText(){
    var text;
    var style = {font:"bold 32px Arial",fill:"#e67e22",boundsAlignH:"center",boundsAlignV:"middle"};
    text=game.add.text(0,0,"Orange Team GOAL!",style);
    text.setTextBounds(250, 100,800,100);
}

function buleGoalText(){
    var text;
    var style = {font:"bold 32px Arial",fill:"#4834d4",boundsAlignH:"center",boundsAlignV:"middle"};
    text=game.add.text(0,0,"Blue Team GOAL!",style);
    text.setTextBounds(250, 100,800,100);
}

function restartGame(){
    game.state.restart();
    goalCount=0;
}

function update() {

    //player 속도 0으로 설정
    player.body.setZeroVelocity();

    
    //console.log(playerSpeed)
    //플레이어 드리블시 속도 낮춤 안그럴시 원래속도로 복원
    if (Phaser.Rectangle.intersects (player.getBounds(), ball.getBounds())){
        playerSpeed=130;
    } 
    else if(Phaser.Rectangle.intersects (player.getBounds(), ball.getBounds()) == false){
        playerSpeed=150;
    }

    //방향키로 움직이는 조건
    if (cursors.left.isDown){
		player.body.moveLeft(playerSpeed);
    }
    else if (cursors.right.isDown){
		player.body.moveRight(playerSpeed);
    }

    if (cursors.up.isDown){
    	player.body.moveUp(playerSpeed);
    }
    else if (cursors.down.isDown){
        player.body.moveDown(playerSpeed);
    }

    if(isKickBool == true){
        kick(); 
        isKickBool = false;
    }
    
    if(ball.body.x<=31.4&&ball.body.y>=252.5&&ball.body.y<=431.5&&goalCount==0){
        orangeGoalText();
        orangeScore++;
        goalCount++;
        game.time.events.add(Phaser.Timer.SECOND * 5,restartGame);
    }
    if(ball.body.x>=1215.5&&ball.body.y>=252&&ball.body.y<=431.5&&goalCount==0){
        buleGoalText();
        blueScore++;
        goalCount++;
        game.time.events.add(Phaser.Timer.SECOND * 5,restartGame);
    }
    scoreText.setText(blueScore+" : "+orangeScore);
}

function render() {
    //game.debug.spriteInfo(ball, 32, 32);
}
