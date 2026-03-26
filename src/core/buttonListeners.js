import { emit, EVENTS } from "./events.js";

export const buttonListeners = (p) => {
    p.keyPressed = () => {
        emit(EVENTS.KEY_PRESSED, {
            p,
            key: p.key,
            keyCode: p.keyCode
        });
    };

    p.keyReleased = () => {
        emit(EVENTS.KEY_RELEASED, {
            p,
            key: p.key,
            keyCode: p.keyCode
        });
    };

    p.mousePressed = () => {
        emit(EVENTS.MOUSE_DOWN, {
            p,
            x: p.mouseX,
            y: p.mouseY,
            button: p.mouseButton
        });
    };

    p.mouseReleased = () => {
        emit(EVENTS.MOUSE_UP, {
            p,
            x: p.mouseX,
            y: p.mouseY,
            button: p.mouseButton
        });
    };

    p.mouseDragged = () => {
        emit(EVENTS.MOUSE_DRAGGED, {
            p,
            x: p.mouseX,
            y: p.mouseY,
            button: p.mouseButton
        });
    };

    p.mouseMoved = () => {
        emit(EVENTS.MOUSE_MOVED, {
            p,
            x: p.mouseX,
            y: p.mouseY
        });
    };
};