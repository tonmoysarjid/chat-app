const path = require('path');
const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', (req, res) => {
//     //res.sendFile(__dirname + '/index.html');
// });
let name = "";

io.on('connection', (socket) => {
    socket.on('set_name', (msg) => {
        name = msg;
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

io.on('connection', (socket) => {
    socket.on('message', (msg) => {
        let obj = {
            msg: msg,
            name: name
        };
        io.emit('message', obj);
    });
});

const port = process.env.PORT || 3000;
server.listen(3000, function() {
    console.log("listeing on port 3000");
});