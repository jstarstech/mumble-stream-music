import lame from '@flat/lame';
import mumble from 'mumble';
import fs from 'fs';

const unique = Date.now() % 10;

const options = {
    key: fs.readFileSync('cert-key.pem'),
    cert: fs.readFileSync('cert-key.pem')
};

mumble.connect('mumble://192.168.99.10', options, (error, client) => {
    if (error) {
        throw new Error(error);
    }

    client.authenticate(`mp3-${unique}`);
    client.on('initialized', () => {
        //start( client );
        const user = client.userById(0);
        start1(user)
        //user.outputStream().pipe( user.inputStream() );
    });
});

var start1 = client => {
    const decoder = new lame.Decoder();

    let stream;
    decoder.on('format', format => {
        console.log(format);

        stream.pipe(client.inputStream({
            channels: format.channels,
            sampleRate: format.sampleRate,
            gain: 0.25
        }));
    });

    stream = process.stdin.pipe(decoder);
};

const start = client => {
    const input = client.inputStream();
    const decoder = new lame.Decoder();

    let stream;
    decoder.on('format', format => {
        console.log(format);

        stream.pipe(client.inputStream({
            channels: format.channels,
            sampleRate: format.sampleRate,
            gain: 0.25
        }));
    });

    stream = process.stdin.pipe(decoder);
};
