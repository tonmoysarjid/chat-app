const path = require('path');
const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    socket.on('message', (msg, id, name) => {
        let msgObj = { "id": id, "msg": msg, "name": name };
        io.emit('message', msgObj);
    });
});

const port = process.env.PORT || 3000;
server.listen(port, function() {
    console.log("listeing on port - " + port);
});