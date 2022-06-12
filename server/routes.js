const express = require('express');
const robot = require('robotjs');
const { mouse } = require('@nut-tree/nut-js');
const wsRouter = express.Router();

wsRouter.get('/inputHandler', (req, res) => {
    const io = req.app.get('socket.io');

    if (!res.socket.server.io) {

        io.on('connection', socket => {

            socket.on('click', (args) => {
                const { button, double } = args;
                robot.mouseClick(button, double);
            });
            socket.on('mouseMove', (args) => {
                const { xChange, yChange } = args;
                const { x, y } = robot.getMousePos();
                robot.moveMouse(x + xChange, y + yChange);
            });
            socket.on('mouseScroll', async (args) => {
                const { xChange, yChange } = args;
                mouse.scrollUp(yChange);
                await mouse.scrollRight(xChange);
            });
            socket.on('keypress', (args) => {
                const { key, shift } = args;
                try {
                    if (shift)
                        robot.keyTap(key, 'shift')
                    else
                        robot.keyTap(key);
                }
                catch (e) {
                    console.log(`Function not supported on ${process.platform}`);
                }
            });

        });

        res.socket.server.io = io;
    }
    else {
        console.log("Socket Is already Running");
    }

    res.end();
});

module.exports = wsRouter;
