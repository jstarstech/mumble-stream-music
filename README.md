# Mumble Stream Music

This project is a Mumble client that streams music using Node.js.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- A Mumble server
- Build tools for compiling native addons:
    ```sh
    sudo apt-get install build-essential
    ```

## Installation

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd mumble-stream-music
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```
3. Copy the `.env.example` file to `.env` and set the `MUMBLE_URL` environment variable:
    ```sh
    cp .env.example .env
    ```

4. Ensure you have `cert-key.pem` in the project directory.

## Usage

1. Start the application:
    ```sh
    node app.js
    ```

2. The application will connect to the Mumble server at `mumble://192.168.99.10` and start streaming music from the standard input.
