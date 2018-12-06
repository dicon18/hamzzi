var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use("/js", express.static(__dirname + "/js"));
app.use("/assets", express.static(__dirname + "/assets"));
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

server.listen(80, function() {
  console.log("Listening on port 80");
});

io.on('connection', function(socket) {
  setInterval(function() { io.emit("ping") }, 1000);
})