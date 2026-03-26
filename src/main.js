import { buttonListeners } from "./core/buttonListeners.js";
import { runLoop } from "./core/loop.js";
import { SceneManager } from "./core/SceneManager.js";
import MainScene from "./scenes/MainScene.js";

new p5((p) => {
    p.setup = () => {
        SceneManager.set(new MainScene(p));

        runLoop(p);
        buttonListeners(p);
    };
});
