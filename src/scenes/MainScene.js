import Background from '../core/Background.js';
import { EVENTS, on } from '../core/events.js';
import { isPaused, setPaused } from '../core/loop.js';
import Scene from '../core/Scene.js';
import DoublePendulum from '../entities/DoublePendulum.js';
import KEYCODE from '../utility/KeyCode.js';

export default class MainScene extends Scene {
    constructor(p) {
        super(p);

        this.add(new Background(p, this));
        this.add(new DoublePendulum(p, this));

        on(EVENTS.KEY_PRESSED, ({ keyCode }) => {
            if (keyCode === KEYCODE.SPACE) {
                setPaused(!isPaused());
            }
        });
    }
}