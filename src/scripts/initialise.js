const checkRefresh = () => {
    window.requestAnimationFrame(getRefresh);
}

let customLoop = false;
let t = []
let frameInterval = 16;
const getRefresh = (now) => {
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
    noLoop();
    customLoop = true;
}

const disableCustomLoop = () => {
    loop();
    customLoop = false;
}