const path = require('path');
const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


app.use(express.static(path.join(__dirname, 'public')));
let name = "";


io.on('connection', (socket) => {
    socket.on('message', (msg) => {
        io.emit('message', msg);
        console.log(msg);
    });
});

const port = process.env.PORT || 3000;
server.listen(3000, function() {
    console.log("listeing on port 3000");
});