// Samuel Barrett, 2021/08/28
//
// Defines a game board for Sudoku. Allows for examination of columns, rows and boxes using Set objects.
// 		- board is expected to be a 2D array of size 9 by 9.

"use strict"

class SudokuBoard {
	constructor(board) {
		if(arguments.length == 1) {
			this._board = board
		} else {
			this._board = emptyBoardTemplate
		}
		this._columns = null	// auxiliary data sets for fast traversal/validating
		this._rows = null
		this._boxes = null
		this.parse()
	}
	// accessors for row/col/box information
	get row(i) {
		return this._rows[i]
	}
	get column(j) {
		return this._column[j]
	}
	get box(k) {
		return this._boxes[k]
	}
	// print the board
	print() {
		// iterate through the board
		this._board.forEach((row, index) => {
			row.forEach((element, index) => {
				process.stdout.write(" " + element)
			})
			console.log()
		})
	}
	// initialize the board's auxiliary data sets
	parse() {
		this._rows = [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set()]
		this._columns = [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set()]
		this._boxes = [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set()]
		// fill the data sets
		for(let i = 0; i < 9; i++) {
			for(let j = 0; j < 9; j++) {
				this._rows[i].add(board[i][j])
				this._columns[j].add(board[i][j])
				this._boxes[3*Math.floor(y/3)+Math.floor(x/3)].add(board[i][j])
			}
		}
	}
	// finds all unsolved squares and returns a List object containing Coordinate objects for each unfilled square.
	getEmptySquares() {
		var emptySquares = new List()
		for(let i = 0; i < 9; i++) {
			for(let j = 0; j < 9; j++) {
				if(this._board[i][j] == ".") {
					emptySquares.append(new Coordinate(i, j))
				}
			}
		}
		return emptySquares
	}
}

// template for an empty board. Used in case of default (un-specified) creation of a SudokuBoard object
let emptyBoardTemplate = [[".",".",".",".",".",".",".",".","."],
						[".",".",".",".",".",".",".",".","."],
						[".",".",".",".",".",".",".",".","."],
						[".",".",".",".",".",".",".",".","."],
						[".",".",".",".",".",".",".",".","."],
						[".",".",".",".",".",".",".",".","."],
						[".",".",".",".",".",".",".",".","."],
						[".",".",".",".",".",".",".",".","."],
						[".",".",".",".",".",".",".",".","."]]