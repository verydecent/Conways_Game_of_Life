import React from 'react';
import './Games.css';


const CELL_SIZE = 20;
const WIDTH = 800;
const HEIGHT = 600;

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
            board[x] = 0;
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

    render() {
        return (
            <div>
                <div className='Board'
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
