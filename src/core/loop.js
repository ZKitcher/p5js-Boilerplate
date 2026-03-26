import { emit } from "./events.js";

let paused = false;

export const setPaused = (v) => paused = v;
export const isPaused = () => paused;

export const runLoop = (p) => {
    p.draw = () => {
        if (!isPaused()) {
            p.clear();

            emit('frame', {
                p,
                deltaTime: p.deltaTime,
                frameCount: p.frameCount
            });
        }
    };
};