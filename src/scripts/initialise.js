let targetFrameRate = 60;
let customLoop = false;
let frameInterval;

const checkFramerate = (target = 60) => {
    targetFrameRate = target
    getRefresh()
}

const getRefresh = times => {
    let found = false;
    if (times === undefined) times = [];
    window.requestAnimationFrame(() => {
        const now = performance.now();
        while (times.length > 0 && times[0] <= now - 200) {
            times.shift();
            found = true;
        }
        if (found) {
            let fps = times.length * 5;
            console.log('Framerate:', '~' + fps + 'fps')
            if (fps <= targetFrameRate - 10) enableCustomLoop();
        } else {
            times.push(now);
            getRefresh(times);
        }
    });
};

const enableCustomLoop = () => {
    console.log('Setting custom framerate targeting:', targetFrameRate + 'fps');
    frameInterval = 1000 / targetFrameRate;
    noLoop();
    customLoop = true;
}

const disableCustomLoop = () => {
    loop();
    customLoop = false;
}