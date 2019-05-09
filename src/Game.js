import React from 'react';
import './Game.css';


const CELL_SIZE = 20;
const WIDTH = 800;
const HEIGHT = 600;

class Cell extends React.Component {
    render() {
        const { x, y } = this.props;
        return (
            <div 
            className="Cell"
            style={{
                left: `${CELL_SIZE * x + 1}px`,
                top:  `${CELL_SIZE * y + 1}px`,
                width: `${CELL_SIZE - 1}px`,
                height: `${CELL_SIZE - 1}px`,
            }}>

            </div>
        )
    }
}

class Game extends React.Component {
    constructor() {
        super();
        this.rows = HEIGHT/CELL_SIZE;
        this.columns = WIDTH/CELL_SIZE;
        this.board = this.makeEmptyBoard();
    }

    state = {
        cells: []
    }

    makeEmptyBoard() {
        let board = [];
        for (let x = 0; x < this.rows; x++) {
            board[x] = [];
            for (let y = 0; y < this.columns; y++) {
                board[x][y] = false;
            }
        }
        return board;
    }

    makeCells() {
        let cells = [];
        for (let x = 0; x < this.rows; x++) {
            for (let y = 0; y <this.columns; y++) {
                if (this.board[x][y]) {
                    cells.push({ y, x})
                }
            }
        }
        return cells;
    }

    getElementOffset() {
        const rect = this.boardRef.getBoundingClientRect();
        const doc = document.documentElement;

        return {
            x: (rect.top + window.pageYOffset) - doc.clientTop,
            y: (rect.left + window.pageXOffset) - doc.clientLeft, 
        }
    }

    handleClick = (event) => {
        const elemOffset = this.getElementOffset();
        const offsetX = event.clientX - elemOffset.x;
        const offsetY = event.clientY - elemOffset.y;

        const x = Math.floor(offsetX / CELL_SIZE);
        const y = Math.floor(offsetY / CELL_SIZE);

        if (x >= 0 && x <= this.columns && y >= 0 && y <= this.rows) {
            this.board[y][x] = !this.board[y][x];
        }

        this.setState({ cells: this.makeCells() });
    }

    render() {
        return (
            <div>
                <div 
                className='Board'
                onClick={this.handleClick}
                ref={(n) => { this.boardRef = n; }}
                style={{
                    width: WIDTH, height: HEIGHT,
                    backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`
                }}>
                </div>
            </div>
        )
    }
}

export default Game;
