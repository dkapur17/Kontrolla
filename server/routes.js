const express = require('express');

const apiRouter = express.Router();

apiRouter.get('/inputHandler', (req, res) => {
    console.log("Websocket connection request recieved");
});

module.exports = apiRouter;
