const checkRefresh = () => {
    window.requestAnimationFrame(getRefresh);
}

let targetFrameRate = 60;
let customLoop = false;
let t = [];
let frameInterval;
const getRefresh = now => {
    t.unshift(now);
    if (t.length > 10) {
        let t0 = t.pop();
        let fps = Math.floor(1000 * 10 / (now - t0));
        console.log('FrameRate:', fps)
        if (fps <= 30) {
            enableCustomLoop()
        }
    } else {
        window.requestAnimationFrame(getRefresh);
    }
};

const enableCustomLoop = () => {
    console.log('Setting custom framerate.')
    frameInterval = 1000 / targetFrameRate;
    noLoop();
    customLoop = true;
}

const disableCustomLoop = () => {
    loop();
    customLoop = false;
}