# Kontrolla

A web-based remote controller for your computer on any touch based device on the same network.

Kontrolla has a minimal UI that allows for mouse, keyboard and media (to some extent) control of your computer using any touch device on the same network (smartphone, iPad, etc).

The system uses Next.js for the frontend UI and backend, WebSockets for real time communication and Robot.js for Native UI control on the system. The web-based stack allows for easy cross-platform compatibility without requiring specialized knowledge and hardware (I'm looking at you Apple) to make it usable on different devices.

### Usage

Currently still under construction (and will be for a while), so to run it:

```
git clone https://github.com/dkapur17/Kontrolla.git
cd Kontrolla
npm install
npm run dev
```

Then find your system's IP address on the local network (`ifconfig` for Linux, `ipconfig` for Windows). Next, plug in that IP address followed by `:3000` into the address bar of your browser on the touch device you want to use for control. For example `192.168.0.75:3000`.

Enjoy.

### Future Plans

While the basic functionality is in place, the UI/UX needs a lot more polishing:

1. A better layout and key selection for the virtual keyboard.
2. Dark theme for the virtual keyboard.
3. Implement scroll with mouse (currently limited by Robot.js, and the lack of functionality therein. Frontend logic for the same is already in place).
4. Overall better styling and CSS (I'm pretty bad at design :)).

Will probably port to Nut.js because Robot.js is currently unmaintained and lacking functionality.

### Why?

I'm too lazy to get out of bed to turn of the computer when it is connected to a monitor sitting far away from me ;).
