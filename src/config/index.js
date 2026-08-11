require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    wsPort: process.env.WS_PORT || 8080,
    nodeEnv: process.env.NODE_ENV || 'development',
};
