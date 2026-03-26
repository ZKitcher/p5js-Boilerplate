import { emit, EVENTS } from "./core/events.js";
import { runLoop } from "./core/loop.js";
import { SceneManager } from "./core/SceneManager.js";
import MainScene from "./scenes/MainScene.js";

new p5((p) => {
    p.setup = () => {
        SceneManager.set(new MainScene(p));

        runLoop(p);
    };

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
});
