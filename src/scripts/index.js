let board;

let moveCounter = 10;
let images = [];

let depthPara;
let depthPlus;
let depthMinus;
let tempMaxDepth = 3;


function setup() {
    checkFramerate();
    createCanvas(window.innerWidth, window.innerHeight);
    // tileSize = height / 8;

    for (let i = 1; i < 10; i++) {
        images.push(loadImage("assets/images/2000px-Chess_Pieces_Sprite_0" + i + ".png"));
    }
    for (let i = 10; i < 13; i++) {
        images.push(loadImage("assets/images/2000px-Chess_Pieces_Sprite_" + i + ".png"));
    }

    board = new Board();

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

}

const render = () => {
    board.render();
    renderText();
}

const renderText = () => {
    // Render text at the bottom left of the screen.
    push();
    fill('#FFF');
    strokeWeight(0);
    textSize(12);
    textAlign(LEFT, CENTER);
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
        case 'f':
            board.flip();
            break;
    }
}

function mouseClicked() {
    board.handleHighlight()
}
function mousePressed() {
    board.handlePieceMove(true)
}
function mouseReleased() {
    board.handlePieceMove(false)
}



// function runAIs() {
//     maxDepth = tempMaxDepth;
//     if (!test.isDead() && !test.hasWon()) {
//         if (blackAI) {
//             if (!whitesMove) {
//                 if (moveCounter < 0) {
//                     test = maxFunAB(test, -400, 400, 0);
//                     // test = maxFun(test, 0);
//                     print(test);
//                     whitesMove = true;
//                     moveCounter = 10;
//                 } else {
//                     moveCounter--;
//                 }
//             }
//         }
//         if (whiteAI) {
//             if (whitesMove) {
//                 if (moveCounter < 0) {
//                     test = minFunAB(test, -400, 400, 0);
//                     // test = minFun(test, 0);
//                     print("test", test);
//                     whitesMove = false;
//                     moveCounter = 10;
//                 } else {
//                     moveCounter--;
//                 }
//             }
//         }
//     }
// }