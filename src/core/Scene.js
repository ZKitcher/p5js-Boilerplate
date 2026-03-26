import { GameObject } from "./GameObject.js";

export default class Scene extends GameObject {
    constructor(p) {
        super(p);
        this.objects = [];
    }

    add(obj) {
        this.objects.push(obj);
        return obj;
    }

    destroy() {
        super.destroy();

        for (const obj of this.objects) {
            obj.destroy?.();
        }

        this.objects = [];
    }
}