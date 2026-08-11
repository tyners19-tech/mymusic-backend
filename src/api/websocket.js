const WebSocket = require('ws');
const clients = new Map();

function setupWebSocket(server) {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws, req) => {
        const userId = new URL(req.url, 'http://localhost').searchParams.get('userId');
        if (!userId) { ws.close(); return; }

        console.log(`🔗 WebSocket connected: ${userId}`);
        clients.set(userId, ws);

        ws.on('message', (message) => {
            try {
                const data = JSON.parse(message);
                switch (data.type) {
                    case 'offer':
                    case 'answer':
                    case 'candidate':
                        if (data.target && clients.has(data.target)) {
                            clients.get(data.target).send(JSON.stringify({ ...data, from: userId }));
                            console.log(`📤 Relay ${data.type} from ${userId} to ${data.target}`);
                        }
                        break;
                    case 'ping':
                        ws.send(JSON.stringify({ type: 'pong' }));
                        break;
                    default:
                        console.log(`📨 Unknown message from ${userId}:`, data.type);
                }
            } catch (e) {
                console.error('Parse error:', e);
            }
        });

        ws.on('close', () => {
            console.log(`🔌 WebSocket disconnected: ${userId}`);
            clients.delete(userId);
        });
    });

    return wss;
}

module.exports = { setupWebSocket, clients };
