let socket = io();
let messages = document.getElementById('messages');
let form = document.getElementById('form');
let form_name = document.getElementById('form-name');
let input = document.getElementById('input');
let input_name = document.getElementById('input_name');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
        socket.emit('message', input.value);
        input.value = '';
    }
});

form_name.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input_name.value) {
        socket.emit('set_name', input_name.value);
        input_name.value = '';
    }
});

socket.on('message', function(msg) {
    let item = document.createElement('li');
    item.textContent = msg.name + " : " + msg.msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});