import lame from '@flat/lame';
import mumble from 'mumble';
import fs from 'node:fs';
import dotenv from 'dotenv';

dotenv.config();

const unique = Date.now() % 10;

const options = {
    key: fs.readFileSync('cert-key.pem'),
    cert: fs.readFileSync('cert-key.pem')
};
if (!process.env.MUMBLE_URL) {
    console.error('Environment variable MUMBLE_URL is not set. Please ensure it is set before running the application.');
    process.exit(1);
}

const mumbleUrl = process.env.MUMBLE_URL;

mumble.connect(mumbleUrl, options, (error, client) => {
    if (error) {
        console.error('Connection error:', error);
        
        process.exit(1);
    }

    client.authenticate(`mp3-${unique}`);
    client.on('initialized', () => {
        const user = client.userById(0);

        startStream(user)
        //user.outputStream().pipe( user.inputStream() );
    });
});

var startStream = client => {
    const decoder = new lame.Decoder();

    const stream = process.stdin.pipe(decoder);

    decoder.on('format', format => {
        console.log(format);

        stream.pipe(client.inputStream({
            channels: format.channels,
            sampleRate: format.sampleRate,
            gain: 0.25
        }));
    });
};
