import { on, off } from './events.js';

export class GameObject {
    constructor(p, scene) {
        this.p = p;
        this.scene = scene;
        this._listeners = [];
    }

    listen(event, fn, order) {
        const bound = fn.bind(this);

        this._listeners.push({ event, fn: bound });
        on(event, bound, order);
    }

    destroy() {
        for (const { event, fn } of this._listeners) {
            off(event, fn);
        }
        this._listeners.length = 0;
    }
}