let socket = io();
let messages = document.getElementById('messages');
let form = document.getElementById('form');
let messageText = document.getElementById('message_text');
let submitText = document.querySelector('.message_input');
let button = document.querySelector('.send_message');

const identify = Date.now() + Math.round(Math.random() * 100000);

console.log(identify);

const pushMsg = new PushMsg();
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
    let message = msg.name + ":\n" + msg.msg;
    let message_side = "left";
    if (msg.id == identify) message_side = "right";
    pushMsg.sendMessage(message, message_side);
});

function EmitMsg() {
    if (messageText.value) {
        socket.emit('message', messageText.value, identify);
    }
    messageText.value = "";
}

function saveChatName() {

    let chatName = document.querySelector('#chat_name');
    if (chatName.value) {
        socket.emit('setname', chatName.value);
        $('.modal').hide();
    }

}