const path = require('path');
const express = require('express');
const os = require('os');
const networkInterfaces = os.networkInterfaces();
const apiRouter = require('./routes');

const app = express();


const PORT = process.env.PORT || 5000;

app.use('/api', apiRouter);
app.use(express.static(path.resolve(__dirname, '../client/out/')));


app.listen(PORT, () => {
    console.log(`Server Up on`);
    Object.keys(networkInterfaces).forEach(device => {
        address = networkInterfaces[device].filter(address => address.family === 'IPv4');
        address.forEach(address => {
            console.log(`http://${address.address}:${PORT} (${device})`);
        });
    });
});
