/// 게임 서버
var express = require("express");
var app = express();

app.use("/js", express.static(__dirname + "/js"));
app.use("/assets", express.static(__dirname + "/assets"));
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})

var server = app.listen(80, function () {
    console.log("Listening on " + server.address().port);
})
