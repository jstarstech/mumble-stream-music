var rtcc = require('webrtc-connect');

rtcc.createServer(function(channel){
    channel.on('data', function(data){
        console.log('received message - ', data);
        channel.send('good and you?');
    });

}).listen('9999');

rtcc.connect({url: 'http://localhost', port: 9999}, function(err, channel) {
    if (err)
        return console.log('err', err);
    channel.send('hey! how are you?');
    channel.on('data', function(data){
        console.log('received message - ', data);
    });
});
