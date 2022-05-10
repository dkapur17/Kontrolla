import { useState, useEffect, useRef } from "react";
import io from 'socket.io-client';
import Keyboard from 'react-simple-keyboard';
import "react-simple-keyboard/build/css/index.css";

const layout = {
    'default': [
        '` 1 2 3 4 5 6 7 8 9 0 - = backspace',
        'tab q w e r t y u i o p [ ] \\',
        '{lock} a s d f g h j k l ; \' enter',
        '{shift} z x c v b n m , . / {media}',
        '@ {space}'
    ],
    'shift': [
        '~ ! @ # $ % ^ &amp; * ( ) _ + backspace',
        'tab Q W E R T Y U I O P { } |',
        '{lock} A S D F G H J K L : " enter',
        '{shift} Z X C V B N M &lt; &gt; ? {media}',
        '@ {space}'
    ],
    'media': [
        'audio_play audio_pause audio_prev audio_next',
        'audio_mute audio_vol_down audio_vol_up',
        'left up down right',
        'lights_mon_up lights_mon_down {letters}'
    ]
};

const display = {
    'backspace': '⌫',
    'enter': '⏎',
    'tab': '↹',
    '{shift}': '⇧',
    '{lock}': '⇪',
    '{media}': '✲',
    'audio_mute': '🔇',
    'audio_vol_down': '🔈',
    'audio_vol_up': '🔊',
    'audio_play': '▶',
    'audio_pause': '⏸',
    'audio_prev': '⏮',
    'audio_next': '⏭',
    'lights_mon_up': '🔅',
    'lights_mon_down': '🔆',
    'up': '↑',
    'down': '↓',
    'left': '←',
    'right': '→',
    '{letters}': '🄰',
    '{space}': ' '
}


const MouseControl = () => {

    const [singleClickEvent, setSingleClickEvent] = useState(undefined);
    const [showKeyboard, setShowKeyboard] = useState(false);
    const [keyboardLayout, setKeyboardLayout] = useState('default');
    const [socket, setSocket] = useState(undefined);
    const doubleClickThreshold = 250;
    const keyboard = useRef();


    useEffect(() => {
        fetch('/api/mouseHandler').finally(() => {
            const tempSocket = io();
            setSocket(tempSocket);
        })
    }, []);


    const handleLeftClick = (e) => {


        e.target.classList.add('clicked');
        setTimeout(() => e.target.classList.remove('clicked'), 80);

        // Sick double click logic
        if (singleClickEvent === undefined) {
            setSingleClickEvent(setTimeout(() => {
                setSingleClickEvent(undefined);
                console.log("Single Click");
                socket.emit('click', { button: 'left', double: false });
            }, doubleClickThreshold));
        }
        else {
            clearTimeout(singleClickEvent);
            setSingleClickEvent(undefined);
            console.log("Double Click");
            socket.emit('click', { button: 'left', double: true });
        }
    };

    const handleRightClick = (e) => {
        e.target.classList.add('clicked');
        setTimeout(() => e.target.classList.remove('clicked'), 80);
        socket.emit('click', { button: 'right', double: false });
    };


    const handleTouchStart = (e) => {

        [...e.changedTouches].forEach(touch => {
            const dot = document.createElement('div');
            dot.classList.add("dot");
            dot.style.top = `${touch.pageY}px`;
            dot.style.left = `${touch.pageX}px`;
            dot.id = touch.identifier;
            e.target.append(dot);
        });

    };

    const handleTouchMove = (e) => {

        if (e.touches.length == 1)
            handleMouseMove(e);
        else if (e.touches.length == 2)
            handleMouseScroll(e);
    };

    const handleMouseMove = (e) => {
        const touch = e.changedTouches[0];
        const dot = document.getElementById(touch.identifier);

        const currX = Number(dot.style.left.slice(0, -2));
        const currY = Number(dot.style.top.slice(0, -2));

        dot.style.top = `${touch.pageY}px`;
        dot.style.left = `${touch.pageX}px`;

        const newX = Number(dot.style.left.slice(0, -2));
        const newY = Number(dot.style.top.slice(0, -2));

        const xChange = newX - currX;
        const yChange = newY - currY;


        socket.emit('mouseMove', { xChange, yChange });
    };

    const handleMouseScroll = (e) => {

        [...e.changedTouches].forEach(touch => {
            const dot = document.getElementById(touch.identifier);

            const currX = Number(dot.style.left.slice(0, -2));
            const currY = Number(dot.style.top.slice(0, -2));

            dot.style.top = `${touch.pageY}px`;
            dot.style.left = `${touch.pageX}px`;

            const newX = Number(dot.style.left.slice(0, -2));
            const newY = Number(dot.style.top.slice(0, -2));

            const xChange = newX - currX;
            const yChange = newY - currY;

            if (touch.identifier == e.touches[1].identifier) {
                socket.emit('mouseScroll', { xChange, yChange });
            }
        });

    };

    const handleTouchEnd = (e) => {
        [...e.changedTouches].forEach(touch => {
            const dot = document.getElementById(touch.identifier);
            dot.remove();
        });
    };


    const handleShift = () => {
        const newLayoutName = keyboardLayout === "default" ? "shift" : "default";
        setKeyboardLayout(newLayoutName);
    };

    const handleMedia = () => {
        setKeyboardLayout('media');
    };

    const handleLetters = () => {
        setKeyboardLayout('default');
    };

    const handleKeyPress = button => {
        console.log("Button pressed", button);
        if (button === "{shift}" || button === "{lock}")
            handleShift();
        else if (button === '{media}')
            handleMedia();
        else if (button === '{letters}')
            handleLetters();
        else
            socket.emit('keypress', { key: button === '{space}' ? ' ' : button, shift: keyboardLayout === 'shift' });
    };

    const toggleKeyboard = (e) => {
        setShowKeyboard(!showKeyboard);
    };

    return (
        <>
            <button className="fab" onClick={toggleKeyboard}>
                <img src={showKeyboard ? "close.svg" : "keyboard.svg"} height="50px" width="50px" />
            </button>
            {
                showKeyboard && <div className="keyboard d-flex flex-row">
                    <Keyboard
                        layout={layout}
                        display={display}
                        keyboardRef={r => (keyboard.current = r)}
                        layoutName={keyboardLayout}
                        onKeyPress={handleKeyPress}
                    />
                </div>
            }
            <div className="mouse-control-container">

                <div className="trackpad"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    onTouchCancel={handleTouchEnd}
                    onClick={handleLeftClick}
                />

                <div className="d-flex flex-row buttons bg-dark">
                    <div className="clickbutton" onClick={handleLeftClick} />
                    <div className="clickbutton" onClick={handleRightClick} />
                </div>
            </div>
        </>
    );

};

export default MouseControl;