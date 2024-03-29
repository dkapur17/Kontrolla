# Kontrolla

<div align="center">
    <img src="assets/Logo.png" width=300>
</div>

A web-based remote controller for your computer on any touch based device on the same network.
![UI](assets/UI.png)

Kontrolla has a minimal UI that allows for mouse, keyboard and media (to some extent) control of your computer using any touch device on the same network (smartphone, iPad, etc).

The system uses Next.js for the frontend UI, Node.js with Express for the Backend, Socket.io for real time communication and Robot.js and Nut.js for Native UI control on the system. The web-based stack allows for easy cross-platform compatibility without requiring specialized knowledge and hardware to make it usable on different devices.

During development, the API route in the Next project is used (lying in the `client` directory). During production, the server logic from the Next app is moved to the Express app in the `server` directory, and the Next project is build like a static site, discarding the Next Server. The Express app then serves the static webpage built by next.

### Usage

Currently still under construction (and will be for a while), so to run it:

```
git clone https://github.com/dkapur17/Kontrolla.git
cd Kontrolla
bash build.sh
node server/server.js
```

The server tells you the IP address that the App is hosted on, along with the port. Plug in that IP address and port into the address bar of your browser on the touch device you want to use for control. For example `192.168.0.75:5000`.

Enjoy.

### Future Plans

While the basic functionality is in place, the UI/UX needs a lot more polishing:

1. A better layout and key selection for the virtual keyboard.
2. Dark theme for the virtual keyboard.
3. Create a unified package.json at the root of the project that handles installs and builds.
4. Overall better styling and CSS (I'm pretty bad at design :)).
5. Add keyboard combinations

### Why?

I'm too lazy to get out of bed to turn of the computer when it is connected to a monitor sitting far away from me ;).
