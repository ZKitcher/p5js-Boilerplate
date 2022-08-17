let demo;

function setup() {
    checkFramerate();
    createCanvas(window.innerWidth, window.innerHeight);
    
    demo = new Demo();
}

function draw() {
    if (customLoop) setTimeout(redraw, frameInterval);
    push();
    background(51);
    pop();

    run();
    render()
}

const run = () => {
    // Run/Update objects here
    demo.run();
}

const render = () => {
    renderText();
}

const renderText = () => {
    // Render text at the bottom left of the screen.
    push();
    fill('#FFF');
    [
        `Framerate : ${frameRate().toFixed(0)}`,
    ].reverse().forEach((e, i) => text(e, 10, height - (13 * (i + 1))));
    pop();
}

function keyPressed() {
    // Switch case for key pressed event listeners.
    switch (key.toLowerCase()) {
        case 'c':
            createCanvas(window.innerWidth, window.innerHeight);
            break;
    }
}

function mouseClicked() {
    // Function fired on mouse click events.
    demo.angle1Velocity += demo.angle1Velocity > 0 ? 0.05 : -0.05;
}
