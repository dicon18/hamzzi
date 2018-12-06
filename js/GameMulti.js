var socket;     

//  접속 완료
function onConnected() {
    console.log("Connected to server");
}

var gameMulti = {
    init: function() {
        socket = io();
        game.stage.disableVisibilityChange = true;
    },

    create: function() {
        socket.on("ping", function() {
            console.log("pong");
        });
        console.log("Client started");
    },
}