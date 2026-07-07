import lame from '@flat/lame';
import mumble from 'mumble';
import fs from 'node:fs';
import dotenv from 'dotenv';

dotenv.config();

const unique = Date.now() % 10;

// cert-key.pem is a combined PEM bundle containing both the private key
// and the certificate blocks, so the same file feeds key and cert.
let pem;
try {
    pem = fs.readFileSync('cert-key.pem');
} catch (error) {
    console.error(
        `Could not read 'cert-key.pem'. Please ensure the combined certificate/key file exists in the project directory. (${error.message})`
    );
    process.exit(1);
}

const options = {
    key: pem,
    cert: pem
};
if (!process.env.MUMBLE_URL) {
    console.error(
        'Environment variable MUMBLE_URL is not set. Please ensure it is set before running the application.'
    );
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

        startStream(user);
        //user.outputStream().pipe( user.inputStream() );
    });
});

var startStream = client => {
    const decoder = new lame.Decoder();

    const stream = process.stdin.pipe(decoder);

    process.stdin.on('error', error => {
        console.error('stdin error:', error);
    });

    decoder.on('error', error => {
        console.error('MP3 decode error:', error);
    });

    decoder.on('format', format => {
        console.log(format);

        const input = client.inputStream({
            channels: format.channels,
            sampleRate: format.sampleRate,
            gain: 0.25
        });

        input.on('error', error => {
            console.error('Mumble input stream error:', error);
        });

        stream.pipe(input);
    });
};
