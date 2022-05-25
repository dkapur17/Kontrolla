import { Server } from 'socket.io'
import robot from 'robotjs';
import { mouse } from '@nut-tree/nut-js';

const ioHandler = (req, res) => {
    if (!res.socket.server.io) {
        console.log('*First use, starting socket.io')

        const io = new Server(res.socket.server, {
            cors: {
                origin: "http://localhost:3000",
                methods: ["GET", "POST"],
                transports: ['websocket', 'polling'],
                credentials: true
            },
            allowEIO3: true
        });

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
        })


        res.socket.server.io = io
    } else {
        console.log('socket.io already running');
    }
    res.end()
}

export default ioHandler;