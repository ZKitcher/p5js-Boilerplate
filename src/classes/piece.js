class Piece {
    constructor(x, y, isWhite, letter, pic) {
        this.matrixPosition = createVector(x, y);
        // this.pixelPosition = createVector(x, y);

        this.taken = false;
        this.white = isWhite;
        this.letter = letter;
        this.pic = pic;
        this.movingThisPiece = false;
        this.firstTurn = true;
        this.value = 0;

        this.id = Math.random();
    }

    generateNewBoards(currentBoard) {
        let boards = [];                                    //all boards created from moving this piece
        let moves = this.generateMoves(currentBoard);       //all the posible moves this piece can do, as vectors
        for (let i = 0; i < moves.length; i++) {            //for each move
            boards[i] = currentBoard.clone();               //create a new board
            boards[i].move(this.matrixPosition, moves[i]);  //move this piece to the mvoe location
        }
        return boards;
    }

    onTheBoard(x, y) {
        if (x >= 0 && y >= 0 && x < 8 && y < 8) {
            return true;
        }
        return false;
    }

    canMove(x, y, board) {
        if (!this.onTheBoard(x, y)) {
            return false;
        }

        let move = false;
        this.generateMoves(board).forEach(e => {
            if (e.x === x && e.y === y) move = true
        })
        return move;
    }

    move(x, y, board) {
        board.lastMove.from = this.clone()
        let attacking = board.getPieceAt(x, y);
        if (attacking != null) {
            attacking.taken = true;
        }
        if (this.enPassant && this.enPassant.matrixPosition.x === x) {
            board.getPieceAt(this.enPassant.matrixPosition.x, this.enPassant.matrixPosition.y).taken = true
        }
        this.matrixPosition = createVector(x, y);
        board.lastMove.to = this.clone();
        this.firstTurn = false;

        if (this.promotable && y === 0 || y === 7) {
            let promote = new Queen(this.matrixPosition.x, this.matrixPosition.y, this.white);
            promote.firstTurn = this.firstTurn;
            if (this.white) {
                const index = board.whitePieces.findIndex(e => e.id === this.id);
                board.whitePieces[index] = promote
            } else {
                const index = board.blackPieces.findIndex(e => e.id === this.id);
                board.blackPieces[index] = promote
            }
        }
    }

    attackingAllies(x, y, board) {
        let attacking = board.getPieceAt(x, y);
        if (attacking != null) {
            if (attacking.white == this.white) {
                return true;
            }
        }
        return false;
    }

    moveThroughPieces(x, y, board) {
        let stepDirectionX = x - this.matrixPosition.x;
        if (stepDirectionX > 0) {
            stepDirectionX = 1;
        } else if (stepDirectionX < 0) {
            stepDirectionX = -1;
        }
        let stepDirectionY = y - this.matrixPosition.y;
        if (stepDirectionY > 0) {
            stepDirectionY = 1;
        } else if (stepDirectionY < 0) {
            stepDirectionY = -1;
        }
        let tempPos = createVector(this.matrixPosition.x, this.matrixPosition.y);
        tempPos.x += stepDirectionX;
        tempPos.y += stepDirectionY;
        while (tempPos.x != x || tempPos.y != y) {
            if (board.getPieceAt(tempPos.x, tempPos.y) != null) {
                return true;
            }
            tempPos.x += stepDirectionX;
            tempPos.y += stepDirectionY;
        }
        return false;
    }

    showPossibleMoves(board) {
        fill(255, 255, 0, 100)
        rect(this.matrixPosition.x * board.tileSize, this.matrixPosition.y * board.tileSize, board.tileSize, board.tileSize);

        this.generateMoves(board)
            .forEach(e => {
                fill(150, 150, 150, 150);
                ellipseMode(CENTER);
                circle(e.x * board.tileSize + board.tileSize / 2, e.y * board.tileSize + board.tileSize / 2, board.tileSize / 3);
                fill(201, 86, 69)
                if (board.getPieceAt(e.x, e.y)) {
                    rect(
                        e.x * board.tileSize,
                        e.y * board.tileSize,
                        board.tileSize,
                        board.tileSize
                    );
                }
                if (this.enPassant) {
                    rect(
                        this.enPassant.matrixPosition.x * board.tileSize,
                        this.enPassant.matrixPosition.y * board.tileSize,
                        board.tileSize,
                        board.tileSize
                    );
                }
            });
    }

    ////////// GET MOVES //////////
    getKingMoves(board, moves) {
        if (!moves) {
            moves = [];
        }
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                let x = this.matrixPosition.x + i;
                let y = this.matrixPosition.y + j;
                if (this.onTheBoard(x, y)) {
                    if (i != 0 || j != 0) {
                        if (!this.attackingAllies(x, y, board)) {
                            moves.push(createVector(x, y))
                        }
                    }
                }
            }
        }
        return moves;
    }

    getHorizontalMoves(board, moves) {
        for (let i = 0; i < 8; i++) {
            let x = i;
            let y = this.matrixPosition.y;
            if (x != this.matrixPosition.x) {
                if (!this.attackingAllies(x, y, board)) {
                    if (!this.moveThroughPieces(x, y, board)) {
                        moves.push(createVector(x, y));
                    }
                }
            }
        }
        return moves;
    }

    getVerticalMoves(board, moves) {
        for (let i = 0; i < 8; i++) {
            let x = this.matrixPosition.x;;
            let y = i;
            if (i != this.matrixPosition.y) {
                if (!this.attackingAllies(x, y, board)) {
                    if (!this.moveThroughPieces(x, y, board)) {
                        moves.push(createVector(x, y));
                    }
                }
            }
        }
        return moves;
    }

    getDiagonalMoves(board, moves) {
        for (let i = 0; i < 8; i++) {
            let x = i;
            let y = this.matrixPosition.y - (this.matrixPosition.x - i);
            if (x != this.matrixPosition.x) {
                if (this.onTheBoard(x, y)) {
                    if (!this.attackingAllies(x, y, board)) {
                        if (!this.moveThroughPieces(x, y, board)) {
                            moves.push(createVector(x, y));
                        }
                    }
                }
            }
        }

        for (let i = 0; i < 8; i++) {
            let x = this.matrixPosition.x + (this.matrixPosition.y - i);
            let y = i;
            if (x != this.matrixPosition.x) {
                if (this.onTheBoard(x, y)) {
                    if (!this.attackingAllies(x, y, board)) {
                        if (!this.moveThroughPieces(x, y, board)) {
                            moves.push(createVector(x, y));
                        }
                    }
                }
            }
        }
        return moves;
    }

    getKnightMoves(board, moves) {
        if (!moves) {
            moves = [];
        }
        for (let i = -2; i < 3; i += 4) {
            for (let j = -1; j < 2; j += 2) {

                let x = i + this.matrixPosition.x;
                let y = j + this.matrixPosition.y;
                if (!this.attackingAllies(x, y, board)) {
                    if (this.onTheBoard(x, y)) {
                        moves.push(createVector(x, y));
                    }
                }
            }
        }
        for (let i = -1; i < 2; i += 2) {
            for (let j = -2; j < 3; j += 4) {
                let x = i + this.matrixPosition.x;
                let y = j + this.matrixPosition.y;
                if (this.onTheBoard(x, y)) {
                    if (!this.attackingAllies(x, y, board)) {
                        moves.push(createVector(x, y));
                    }
                }
            }
        }
        return moves;
    }

    getPawnMoves(board, moves) {
        if (!moves) {
            moves = [];
        }
        this.enPassant = null;
        if (board.lastMove.to instanceof Pawn && board.lastMove.to.firstTurn && this.matrixPosition.y === 3 || this.matrixPosition.y === 4) {
            for (let i = -1; i < 2; i += 2) {
                let x = this.matrixPosition.x + i;
                let y = this.matrixPosition.y;
                if (x !== board.lastMove.to.matrixPosition.x) continue
                if (board.getPieceAt(x, y)) {
                    if (!this.attackingAllies(x, y, board)) {
                        board.orientation ?
                            this.white ? y -= 1 : y += 1 :
                            this.white ? y += 1 : y -= 1;
                        moves.push(createVector(x, y));
                        this.enPassant = board.lastMove.to;
                    }
                }
            }
        }

        for (let i = -1; i < 2; i += 2) {
            let x = this.matrixPosition.x + i;
            let y = this.matrixPosition.y
            board.orientation ?
                this.white ? y -= 1 : y += 1 :
                this.white ? y += 1 : y -= 1;
            if (board.getPieceAt(x, y)) {
                if (!this.attackingAllies(x, y, board)) {
                    moves.push(createVector(x, y));
                }
            }
        }

        let x = this.matrixPosition.x;
        let y = this.matrixPosition.y
        board.orientation ?
            this.white ? y -= 1 : y += 1 :
            this.white ? y += 1 : y -= 1;

        if (!board.isPieceAt(x, y) && this.onTheBoard(x, y)) {
            moves.push(createVector(x, y));
        }

        if (this.firstTurn) {
            let y = this.matrixPosition.y
            board.orientation ?
                this.white ? y -= 2 : y += 2 :
                this.white ? y += 2 : y -= 2;
            if (!board.isPieceAt(x, y) && this.onTheBoard(x, y)) {
                if (!this.moveThroughPieces(x, y, board)) {
                    moves.push(createVector(x, y));
                }
            }
        }
        return moves;
    }


    render(board) {
        if (!this.taken) {
            // textSize(40);
            // strokeWeight(5);
            // if (this.white) {
            //     fill(255);
            //     stroke(0);
            // } else {
            //     fill(30);
            //     stroke(255);
            // }
            // textAlign(CENTER, CENTER);
            imageMode(CENTER);
            if (this.movingThisPiece) {
                // text(this.letter, mouseX, mouseY);
                image(
                    this.pic,
                    mouseX,
                    mouseY,
                    board.tileSize * 1.2,
                    board.tileSize * 1.2
                );
            } else {
                image(
                    this.pic,
                    this.matrixPosition.x * board.tileSize + board.tileSize / 2,
                    this.matrixPosition.y * board.tileSize + board.tileSize / 2,
                    board.tileSize, board.tileSize
                );
            }
        }
    }
}

class King extends Piece {
    constructor(x, y, isWhite) {
        super(x, y, isWhite);
        this.letter = "K";
        if (isWhite) {
            this.pic = images[0];
        } else {
            this.pic = images[6];
        }
        this.value = 99;
    }

    clone() {
        let clone = new King(this.matrixPosition.x, this.matrixPosition.y, this.white);
        clone.taken = this.taken;
        clone.firstTurn = this.firstTurn;
        return clone;
    }

    generateMoves(board) {
        return this.getKingMoves(board);
    }
}

class Queen extends Piece {
    constructor(x, y, isWhite) {
        super(x, y, isWhite);
        this.letter = "Q";
        if (isWhite) {
            this.pic = images[1];

        } else {
            this.pic = images[7];
        }
        this.value = 9;
    }

    generateMoves(board) {
        let moves = [];
        this.getHorizontalMoves(board, moves);
        this.getVerticalMoves(board, moves);
        this.getDiagonalMoves(board, moves)
        return moves;
    }

    clone() {
        let clone = new Queen(this.matrixPosition.x, this.matrixPosition.y, this.white);
        clone.taken = this.taken;
        clone.firstTurn = this.firstTurn;
        return clone;
    }
}

class Bishop extends Piece {
    constructor(x, y, isWhite) {
        super(x, y, isWhite);
        this.letter = "B";
        if (isWhite) {
            this.pic = images[2];

        } else {
            this.pic = images[8];
        }
        this.value = 3;
    }

    generateMoves(board) {
        let moves = [];
        this.getDiagonalMoves(board, moves)
        return moves;
    }

    clone() {
        let clone = new Bishop(this.matrixPosition.x, this.matrixPosition.y, this.white);
        clone.taken = this.taken;
        clone.firstTurn = this.firstTurn;
        return clone;
    }
}

class Rook extends Piece {
    constructor(x, y, isWhite) {
        super(x, y, isWhite);
        this.letter = "R";
        if (isWhite) {
            this.pic = images[4];

        } else {
            this.pic = images[10];
        }
        this.value = 5;
    }

    generateMoves(board) {
        let moves = [];
        this.getHorizontalMoves(board, moves);
        this.getVerticalMoves(board, moves);
        return moves;
    }

    clone() {
        let clone = new Rook(this.matrixPosition.x, this.matrixPosition.y, this.white);
        clone.taken = this.taken;
        clone.firstTurn = this.firstTurn;
        return clone;
    }
}

class Knight extends Piece {
    constructor(x, y, isWhite) {
        super(x, y, isWhite);
        this.letter = "Kn";
        if (isWhite) {
            this.pic = images[3];

        } else {
            this.pic = images[9];
        }
        this.value = 3;

    }

    generateMoves(board) {
        return this.getKnightMoves(board);
    }

    clone() {
        let clone = new Knight(this.matrixPosition.x, this.matrixPosition.y, this.white);
        clone.taken = this.taken;
        clone.firstTurn = this.firstTurn;
        return clone;
    }
}

class Pawn extends Piece {
    constructor(x, y, isWhite) {
        super(x, y, isWhite);
        this.letter = "p";
        if (isWhite) {
            this.pic = images[5];
        } else {
            this.pic = images[11];
        }
        this.value = 1;
        this.enPassant = null;
        this.promotable = true;
    }

    generateMoves(board) {
        return this.getPawnMoves(board);
    }

    clone() {
        let clone = new Pawn(this.matrixPosition.x, this.matrixPosition.y, this.white);
        clone.taken = this.taken;
        clone.firstTurn = this.firstTurn;
        return clone;
    }
}