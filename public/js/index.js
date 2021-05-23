let socket = io();
let messages = document.getElementById('messages');
let form = document.getElementById('form');
let messageText = document.getElementById('message_text');
let submitText = document.querySelector('.message_input');
let button = document.querySelector('.send_message');
let userName = "";
const identify = Date.now() + Math.round(Math.random() * 100000);

const pushMsg = new PushMsg();
submitText.addEventListener("keyup", function(e) {
    e.preventDefault();
    let key = e.which || e.keyCode || 0;
    if (key === 13) emitMsg();
});
button.addEventListener("click", (e) => emitMsg());

socket.on("message", (msg) => {
    let message = msg.name + ":\n" + msg.msg;
    let message_side = "left";
    if (msg.id == identify) message_side = "right";
    pushMsg.sendMessage(message, message_side);
});

function emitMsg() {
    if (messageText.value) {
        socket.emit('message', messageText.value, identify, userName);
    }
    messageText.value = "";
}

function saveChatName() {

    let chatName = document.querySelector('#chat_name');
    if (chatName.value) {
        userName = chatName.value;
        $('.modal').hide();
    }

}