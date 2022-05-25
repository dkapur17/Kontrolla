const path = require('path');
const express = require('express');
const ip = require('ip');

const app = express();

const PORT = process.env.PORT || 5000;


app.use('/views', express.static(path.resolve(__dirname, './views')));

app.listen(PORT, () => {
    console.log(`Server Up on Port ${PORT}`);
    console.log(`Local IP: ${ip.address()}`);
});