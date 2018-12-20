//  싱글/멀티 선택
var selectMode = {
    create: function(){
        //  씬 전환 효과
        this.camera.flash("#000000");

        //  배경
        this.bg_background = this.game.add.tileSprite(0, this.game.height - this.game.cache.getImage("bg_loby").height,
            this.game.width, this.game.cache.getImage("bg_loby").height, "bg_loby");

        //  문구
        this.text_title = game.add.text(CANVAS_WIDTH / 2, 100, "게임 모드 선택", {
            font: "bold 60px BMJUA"
        });
            this.text_title.anchor.set(0.5);
            this.text_title.stroke = "#ffffff";
            this.text_title.strokeThickness = 6;
            
        //  싱글 로고
        this.singleLogo = game.add.image(CANVAS_WIDTH / 2 - 300, CANVAS_HEIGHT / 2,"spr_singleLogo");
            this.singleLogo.anchor.set(0.5);
            this.singleLogo.scale.set(0.7);
        
        //  멀티 로고
        this.multiLogo = game.add.image(CANVAS_WIDTH / 2 + 300, CANVAS_HEIGHT / 2,"spr_multiLogo");
            this.multiLogo.anchor.set(0.5);
        
        //  싱글 버튼
        this.bt_single = game.add.button(CANVAS_WIDTH / 2 - 300, 600, "spr_singleButton", this.single, this);
            this.bt_single.anchor.set(0.5);
            this.bt_single.scale.set(0.5);
        
        //  멀티 버튼
        this.bt_multi = game.add.button(CANVAS_WIDTH / 2 + 300, 600, "spr_multiButton", this.multi, this);
            this.bt_multi.anchor.set(0.5);
            this.bt_multi.scale.set(0.5);            
    },

    update: function(){
    // 배경 이동
    this.bg_background.tilePosition.x -= 6;

    //  로고
    this.singleLogo.angle = Math.cos((game.time.totalElapsedSeconds() * 2)) * 5;
    this.multiLogo.angle = Math.sin((game.time.totalElapsedSeconds() * 2)) * 5;

    //  싱글 버튼
    if (this.bt_single.input.pointerOver()){
        this.bt_single.alpha = 1;
    }
    else{
        this.bt_single.alpha = 0.8;
    }

    //  멀티 버튼
    if (this.bt_multi.input.pointerOver()){
        this.bt_multi.alpha = 1;
    }
    else{
        this.bt_multi.alpha = 0.8;
    }
    },

    single: function(){
        sfx_button.play();
        gameMode = "single";
        console.log(`gameMode : ${gameMode}`);
        game.state.start("singleCustom");
    },

    multi: function(){
        sfx_button.play();
        gameMode = "multi";
        console.log(`gameMode : ${gameMode}`);
        game.state.start("multiCustom");
    }
} 