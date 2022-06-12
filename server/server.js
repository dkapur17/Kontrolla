const express = require('express');
const { Server } = require('socket.io');
const path = require('path');
const os = require('os');
const networkInterfaces = os.networkInterfaces();
const wsRouter = require('./routes');

const app = express();
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`Server Up on`);
    Object.keys(networkInterfaces).forEach(device => {
        address = networkInterfaces[device].filter(address => address.family === 'IPv4');
        address.forEach(address => {
            console.log(`http://${address.address}:${PORT} (${device})`);
        });
    });
});

const io = new Server(server, {
    cors: {
        origin: `http://localhost:${PORT}`,
        methods: ["GET", "POST"],
        transports: ["websocket", "polling"],
        credentials: true
    },
    allowEIO3: true
});

app.use(express.static(path.resolve(__dirname, '../client/out/')));
app.use('/api', wsRouter);
app.set('socket.io', io);
