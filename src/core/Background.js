import { EVENTS, on } from './events.js';

export default class Background {
    constructor(p) {
        this.p = p;

        p.createCanvas(window.innerWidth, window.innerHeight);
        on(EVENTS.FRAME, ({ p }) => this.render(p), 0); // run before all other listeners
    }

    render(p) {
        p.background(51);

        p.push();
        p.fill('#FFF');
        p.text(`${p.frameRate().toFixed(0)}`, p.width - 20, 13);
        p.pop();
    }
}
