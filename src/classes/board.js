class Board {
    constructor() {
        this.whitePieces = [];
        this.blackPieces = [];
        this.score = 0;
        this.setupPieces();

        this.lastMove = {
            to: null,
            from: null
        };

        this.tileSize = 100;

        this.moving = false;
        this.movingPiece = null;
        this.whitesMove = true;
        this.orientation = true;

        this.dragging = false;

        // this.whiteAI = false;
        // this.blackAI = true;

        this.highlight = null;
    }

    setupPieces() {
        this.whitePieces.push(new King(4, 7, true));
        this.whitePieces.push(new Queen(3, 7, true));
        this.whitePieces.push(new Bishop(2, 7, true));
        this.whitePieces.push(new Bishop(5, 7, true));
        this.whitePieces.push(new Knight(1, 7, true));
        this.whitePieces.push(new Knight(6, 7, true));
        this.whitePieces.push(new Rook(0, 7, true));
        this.whitePieces.push(new Rook(7, 7, true));

        this.whitePieces.push(new Pawn(0, 6, true));
        this.whitePieces.push(new Pawn(1, 6, true));
        this.whitePieces.push(new Pawn(2, 6, true));
        this.whitePieces.push(new Pawn(3, 6, true));
        this.whitePieces.push(new Pawn(4, 6, true));
        this.whitePieces.push(new Pawn(5, 6, true));
        this.whitePieces.push(new Pawn(6, 6, true));
        this.whitePieces.push(new Pawn(7, 6, true));

        //black pieces
        this.blackPieces.push(new King(4, 0, false));
        this.blackPieces.push(new Queen(3, 0, false));
        this.blackPieces.push(new Bishop(2, 0, false));
        this.blackPieces.push(new Bishop(5, 0, false));
        this.blackPieces.push(new Knight(1, 0, false));
        this.blackPieces.push(new Knight(6, 0, false));
        this.blackPieces.push(new Rook(0, 0, false));
        this.blackPieces.push(new Rook(7, 0, false));

        this.blackPieces.push(new Pawn(0, 1, false));
        this.blackPieces.push(new Pawn(1, 1, false));
        this.blackPieces.push(new Pawn(2, 1, false));
        this.blackPieces.push(new Pawn(3, 1, false));
        this.blackPieces.push(new Pawn(4, 1, false));
        this.blackPieces.push(new Pawn(5, 1, false));
        this.blackPieces.push(new Pawn(6, 1, false));
        this.blackPieces.push(new Pawn(7, 1, false));
    }

    isPieceAt(x, y) {
        for (let i = 0; i < this.whitePieces.length; i++) {
            if (!this.whitePieces[i].taken && this.whitePieces[i].matrixPosition.x == x && this.whitePieces[i].matrixPosition.y == y) {
                return true;
            }
        }
        for (let i = 0; i < this.blackPieces.length; i++) {
            if (!this.blackPieces[i].taken && this.blackPieces[i].matrixPosition.x == x && this.blackPieces[i].matrixPosition.y == y) {
                return true;
            }
        }
        return false;
    }

    getPieceAt(x, y) {
        for (let i = 0; i < this.whitePieces.length; i++) {
            if (!this.whitePieces[i].taken && this.whitePieces[i].matrixPosition.x == x && this.whitePieces[i].matrixPosition.y == y) {
                return this.whitePieces[i];
            }
        }
        for (let i = 0; i < this.blackPieces.length; i++) {
            if (!this.blackPieces[i].taken && this.blackPieces[i].matrixPosition.x == x && this.blackPieces[i].matrixPosition.y == y) {
                return this.blackPieces[i];
            }
        }
        return null;
    }

    generateNewBoardsWhitesTurn() {
        let boards = [];
        for (let i = 0; i < this.whitePieces.length; i++) {
            if (!this.whitePieces[i].taken) {
                let tempArr = this.whitePieces[i].generateNewBoards(this);
                for (let j = 0; j < tempArr.length; j++) {
                    boards.push(tempArr[j]);
                }
            }
        }
        return boards;
    }

    generateNewBoardsBlacksTurn() {
        let boards = [];
        for (let i = 0; i < this.blackPieces.length; i++) {
            if (!this.blackPieces[i].taken) {
                let tempArr = this.blackPieces[i].generateNewBoards(this);
                for (let j = 0; j < tempArr.length; j++) {
                    boards.push(tempArr[j]);
                }
            }
        }
        return boards;
    }

    setScore() {
        this.score = 0;
        for (let i = 0; i < this.whitePieces.length; i++) {
            if (!this.whitePieces[i].taken) {
                this.score -= this.whitePieces[i].value;
            } else {
                //print("something");
            }
        }

        for (let i = 0; i < this.blackPieces.length; i++) {
            if (!this.blackPieces[i].taken) {
                this.score += this.blackPieces[i].value;
            } else {
                //print("something");
            }
        }

    }

    move(from, to) {
        let pieceToMove = this.getPieceAt(from.x, from.y);
        if (pieceToMove == null) {
            return;
        }
        // if (pieceToMove.canMove(to.x, to.y, this)) {
        pieceToMove.move(to.x, to.y, this);
        // }
    }

    handleHighlight() {
        let x = floor(mouseX / board.tileSize);
        let y = floor(mouseY / board.tileSize);
        if (x >= 0 && y >= 0 && x < 8 && y < 8) {
            if (x === this.highlight?.x && y === this.highlight?.y) {
                this.highlight = null;
            } else {
                this.highlight = {
                    x: x,
                    y: y
                }
            }
        }
    }

    handlePieceMove(pressed) {
        if (board.isDone()) return;
        let x = floor(mouseX / board.tileSize);
        let y = floor(mouseY / board.tileSize);

        if (pressed) {
            //on Click
            if (this.movingPiece === null) {
                this.movingPiece = board.getPieceAt(x, y);
                if (!this.movingPiece) {
                    return
                }
                this.movingPiece.movingThisPiece = true;
                if (this.movingPiece?.white != this.whitesMove) {
                    this.movingPiece.movingThisPiece = false;
                    this.movingPiece = null;
                    return
                }
            } else {
                if (x === this.movingPiece.matrixPosition.x && y === this.movingPiece.matrixPosition.y) {
                    this.movingPiece.movingThisPiece = true;
                } else if (this.movingPiece.canMove(x, y, board)) {
                    this.movingPiece.move(x, y, board);
                    this.movingPiece.movingThisPiece = false;
                    this.whitesMove = !this.whitesMove;
                    this.movingPiece = null
                } else {
                    if (board.getPieceAt(x, y)) {
                        this.movingPiece = board.getPieceAt(x, y);
                        this.movingPiece.movingThisPiece = true;
                        if (this.movingPiece?.white != this.whitesMove) {
                            this.movingPiece.movingThisPiece = false;
                            this.movingPiece = null;
                            return
                        }
                    } else {
                        this.movingPiece.movingThisPiece = false;
                        this.movingPiece = null
                    }
                }
            }
        } else {
            if (this.movingPiece) {
                if (x === this.movingPiece.matrixPosition.x && y === this.movingPiece.matrixPosition.y) {
                    this.movingPiece.movingThisPiece = false;
                    return
                }
                if (this.movingPiece.canMove(x, y, board)) {
                    this.movingPiece.move(x, y, board);
                    this.movingPiece.movingThisPiece = false;
                    this.whitesMove = !this.whitesMove;
                    this.movingPiece = null
                } else {
                    this.movingPiece.movingThisPiece = false;
                }
            }
        }
    }

    flip() {
        this.orientation = !this.orientation;
        for (let i = 0; i < this.blackPieces.length; i++) {
            let x = this.blackPieces[i].matrixPosition.x;
            let y = this.blackPieces[i].matrixPosition.y;
            this.blackPieces[i].matrixPosition.x = 7 - x;
            this.blackPieces[i].matrixPosition.y = 7 - y;

            if (this.blackPieces[i].enPassant) {
                let x = this.blackPieces[i].enPassant.matrixPosition.x;
                let y = this.blackPieces[i].enPassant.matrixPosition.y;
                this.blackPieces[i].enPassant.matrixPosition.x = 7 - x;
                this.blackPieces[i].enPassant.matrixPosition.y = 7 - y;
            }
        }
        for (let i = 0; i < this.whitePieces.length; i++) {
            let x = this.whitePieces[i].matrixPosition.x;
            let y = this.whitePieces[i].matrixPosition.y;
            this.whitePieces[i].matrixPosition.x = 7 - x;
            this.whitePieces[i].matrixPosition.y = 7 - y;
            if (this.whitePieces[i].enPassant) {
                let x = this.whitePieces[i].enPassant.matrixPosition.x;
                let y = this.whitePieces[i].enPassant.matrixPosition.y;
                this.whitePieces[i].enPassant.matrixPosition.x = 7 - x;
                this.whitePieces[i].enPassant.matrixPosition.y = 7 - y;
            }
        }
    }

    clone() {
        let clone = new Board();
        for (let i = 0; i < this.whitePieces.length; i++) {
            clone.whitePieces[i] = this.whitePieces[i].clone();
        }
        for (let i = 0; i < this.blackPieces.length; i++) {
            clone.blackPieces[i] = this.blackPieces[i].clone();
        }
        return clone;
    }

    isDone() {
        return this.whitePieces[0].taken || this.blackPieces[0].taken;
    }

    isDead() {
        if (whiteAI && this.whitesMove) {
            return this.whitePieces[0].taken;
        }
        if (blackAI && !this.whitesMove) {
            return this.blackPieces[0].taken;
        }

        return false;
    }

    hasWon() {
        if (whiteAI && this.whitesMove) {
            return this.blackPieces[0].taken;
        }
        if (blackAI && !this.whitesMove) {
            return this.whitePieces[0].taken;
        }

        return false;
    }

    render() {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if ((i + j) % 2 == 1) {
                    // fill(0);
                    fill(238, 238, 212);
                } else {
                    // fill(240);
                    fill(124, 149, 91);
                }
                noStroke();
                rect(i * this.tileSize, j * this.tileSize, this.tileSize, this.tileSize);
            }
        }

        if (this.lastMove.to) {
            fill(255, 255, 0, 75)
            rect(
                this.lastMove.from.matrixPosition.x * board.tileSize,
                this.lastMove.from.matrixPosition.y * board.tileSize,
                board.tileSize,
                board.tileSize
            );
            rect(
                this.lastMove.to.matrixPosition.x * board.tileSize,
                this.lastMove.to.matrixPosition.y * board.tileSize,
                board.tileSize,
                board.tileSize
            );
        }

        if (this.highlight) {
            fill(245, 152, 66, 150)
            rect(
                this.highlight.x * board.tileSize,
                this.highlight.y * board.tileSize,
                board.tileSize,
                board.tileSize
            );
        }

        this.movingPiece?.showPossibleMoves(board);

        for (let i = 0; i < this.blackPieces.length; i++) {
            this.blackPieces[i].render(this);
        }
        for (let i = 0; i < this.whitePieces.length; i++) {
            this.whitePieces[i].render(this);
        }

        this.movingPiece?.render(this);
    }
}