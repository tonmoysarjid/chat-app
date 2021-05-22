const path = require('path');
const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

let name = {};

io.on('connection', (socket) => {
    socket.on('message', (msg, id) => {
        if (!name[id])
            name[id] = "random-User";
        let msgObj = { "id": id, "msg": msg, "name": name[id] };
        io.emit('message', msgObj);
    });
    socket.on('setname', (msg, id) => {
        name[id] = msg;
    });
});


const port = process.env.PORT || 3000;
server.listen(port, function() {
    console.log("listeing on port - " + port);
});