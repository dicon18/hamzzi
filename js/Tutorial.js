var gameMode,tutorial={create:function(){this.camera.flash("#000000"),game.add.image(0,0,"spr_tutorial"),game.time.events.add(5*Phaser.Timer.SECOND,this.startGame)},startGame:function(){"single"==gameMode?game.state.start("Game"):"multi"==gameMode&&game.state.start("gameMulti")}};