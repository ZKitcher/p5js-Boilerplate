const listeners = {};

export const on = (event, fn, order = 1) => {
    if (!listeners[event]) listeners[event] = [];

    listeners[event].push({ order, fn });

    listeners[event].sort((a, b) => a.order - b.order);
};

export const off = (event, fn) => {
    if (!listeners[event]) return;

    listeners[event] = listeners[event].filter(l => l.fn !== fn);
};

export const emit = async (event, data) => {
    if (!listeners[event]) return;

    for (const { fn } of listeners[event]) {
        await fn(data);
    }
};

export const EVENTS = {
    FRAME: 'frame',
    KEY_PRESSED: 'keyPressed',
    KEY_RELEASED: 'keyReleased',
    MOUSE_DOWN: 'mousePressed',
    MOUSE_UP: 'mouseReleased',
    INPUT: 0,
    UPDATE: 10,
    LATE_UPDATE: 20,
    RENDER: 100
};