const express = require('express');
const cors = require('cors');
const http = require('http');
const config = require('./config');
const tracksApi = require('./api/tracks');
const usersApi = require('./api/users');
const { setupWebSocket } = require('./api/websocket');

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/tracks', tracksApi);
app.use('/api/users', usersApi);

setupWebSocket(server);

server.listen(config.port, () => {
    console.log(`🚀 HTTP Server: http://localhost:${config.port}`);
    console.log(`🔊 WebSocket Server: ws://localhost:${config.wsPort}`);
});
