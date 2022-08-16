var t = [];
const getRefresh = (now) => {
    t.unshift(now);
    if (t.length > 10) {
        let t0 = t.pop();
        let fps = Math.floor(1000 * 10 / (now - t0));
        console.log(fps) 
    }

    window.requestAnimationFrame(getRefresh);
};

window.requestAnimationFrame(getRefresh);