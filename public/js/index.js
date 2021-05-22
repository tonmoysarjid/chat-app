let socket = io();
let messages = document.getElementById('messages');
let form = document.getElementById('form');
let messageText = document.getElementById('message_text');

let submitText = document.querySelector('.message_input');
let button = document.querySelector('.send_message');

submitText.addEventListener("keyup", function(e) {
    event.preventDefault();
    let key = e.which || e.keyCode || 0;
    if (key === 13) {
        EmitMsg();
    }

    button.addEventListener("click", function(e) {
        EmitMsg();
    });

});

socket.on("message", (msg) => {
    sendMessage(msg);
});

function EmitMsg() {
    if (messageText.value) {
        socket.emit('message', messageText.value);
    }
    messageText.value = "";
}