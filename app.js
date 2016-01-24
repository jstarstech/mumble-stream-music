"use strict";

// Usage:
// npm install lame
// node mp3.js < file.mp3

var lame = require( 'lame' );
var mumble = require( 'mumble' );
var unique = Date.now() % 10;

var fs = require('fs');

var options = {
    key: fs.readFileSync( 'cert-key.pem' ),
    cert: fs.readFileSync( 'cert-key.pem' )
}

var server = http.createServer(app);
var io = require('socket.io').listen( server );

mumble.connect( 'mumble://192.168.99.10', options, function( error, client ) {
    if( error ) { throw new Error( error ); }

    client.authenticate('mp3-' + unique);
    client.on( 'initialized', function() {
        //start( client );
        var user = client.userById(0);
        start1(user)
        //user.outputStream().pipe( user.inputStream() );
    });
});

var start1 = function( client ) {

    var decoder = new lame.Decoder();

    var stream;
    decoder.on( 'format', function( format ) {
        console.log( format );

        stream.pipe( client.inputStream({
            channels: format.channels,
            sampleRate: format.sampleRate,
            gain: 0.25
        }));
    });

    stream = process.stdin.pipe( decoder );
};

var start = function( client ) {

    var input = client.inputStream();
    var decoder = new lame.Decoder();

    var stream;
    decoder.on( 'format', function( format ) {
        console.log( format );

        stream.pipe( client.inputStream({
            channels: format.channels,
            sampleRate: format.sampleRate,
            gain: 0.25
        }));
    });

    stream = process.stdin.pipe( decoder );
};
