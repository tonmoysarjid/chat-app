const Message = function(arg) {
    this.text = arg.text, this.message_side = arg.message_side;
    this.draw = function(_this) {
        return function() {
            var $message;
            $message = $($('.message_template').clone().html());
            $message.addClass(_this.message_side).find('.text').html(_this.text);
            $('.messages').append($message);
            return setTimeout(function() {
                return $message.addClass('appeared');
            }, 0);
        };
    }(this);
    return this;
};

let getMessageText, message_side, sendMessage;
message_side = 'right';
sendMessage = function(text) {
    var $messages, message;
    if (text.trim() === '') {
        return;
    }
    $('.message_input').val('');
    $messages = $('.messages');
    message_side = message_side === 'left' ? 'right' : 'left';
    message = new Message({
        text: text,
        message_side: message_side
    });
    message.draw();
    $messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
};