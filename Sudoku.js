//	Samuel Barrett, 2021/08/24
//
// 	play a game of sudoku, and implements a sudoku solver bot

"use strict"

class Sudoku {
	constructor(board) {
		if(arguments.length > 0) {
			this._board = board		// expect 2D array of size [9][9]
		}
		else {
			this._board = null
		}
		this._columns = null
		this._rows = null
		this._boxes = null
	}
	// returns a random integer between min and max (inclusive)
	randomInt(min, max) {
		min = Math.ceil(min)
		max = Math.floor(max)
		return Math.floor(Math.random() * (max - min + 1)) + min
	}
	// generate a valid sudoku puzzle (we will not know if it is solvable)
	generate(difficulty) {
		let puzzle = emptyBoard
		let squaresFilled = 0
		let columns = [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set()]
		let rows = [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set()]
		let boxes = [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set()]
		// add numbers until reach desired % of filled squares.
		while( squaresFilled/81 < difficulty ) {
			let x = this.randomInt(0, 8)
			let y = this.randomInt(0, 8)
			// check if the square already contains a value
			if(puzzle[y][x] == ".") {
				var pieceAdded = false
				for(let i = 0; i < 9 && !pieceAdded; i++) {
					if( !columns[x].has(i) ) {
						if( !rows[y].has(i) ) {
							if( !boxes[3*Math.floor(y/3)+Math.floor(x/3)].has(i) ) {
								puzzle[y][x] = i	// add number to puzzle
								pieceAdded = true
								columns[x].add(i)
								rows[y].add(i)
								boxes[3*Math.floor(y/3)+Math.floor(x/3)].add(i)	// update Sets to keep track
							}
						}
					}
				}
				squaresFilled++
			}
		}
		this._board = new SudokuBoard(puzzle)
	}
	// check validity of the unsolved sudoku. Taken from Leetcode #36 - Valid Sudoku solution
	isValidSudoku() {
		for(let i = 0; i < 9; i++) {
			let row = new Set(),
				col = new Set(),
				box = new Set();
			
			for(let j = 0; j < 9; j++) {
				let _col = this._board[j][i]
				let _row = this._board[i][j]
				let _box = this._board[3*Math.floor(i/3)+Math.floor(j/3)][3*(i%3)+(j%3)]
				
				if(_col != '.') {
					if(col.has(_col)) return false
					col.add(_col)
				}
				if(_row != '.') {
					if(row.has(_row)) return false
					row.add(_row)
				}
				if(_box != '.') {
					if(box.has(_box)) return false
					box.add(_box)
				}
			}
		}
		return true
	}
	// solve the sudoku - brute force solution
	solve() {
		if(!this.isValidSudoku()) return null;	// check validity

		// create a list/table of unfilled squares
		var emptySquares = this.getEmptySquares()
		let iterateEmptySquares = emptySquares.iterator
		// iterate over the list, start by adding 1, if invalid try 2... etc
		// if able to place a number, either the puzzle is complete (last cell) or move on to the next cell.
		// if unable to fill square, recule one step and try again. If we're on the first cell, then there is no solution.

		while( iterateEmptySquares.hasNext ) {
			for( let i = 1; i < 10; i++ ) {

			}
		}

		
	}
	
	
}

let gameBoard = [["5","3",".",".","7",".",".",".","."],
			["6",".",".","1","9","5",".",".","."],
			[".","9","8",".",".",".",".","6","."],
			["8",".",".",".","6",".",".",".","3"],
			["4",".",".","8",".","3",".",".","1"],
			["7",".",".",".","2",".",".",".","6"],
			[".","6",".",".",".",".","2","8","."],
			[".",".",".","4","1","9",".",".","5"],
			[".",".",".",".","8",".",".","7","9"]]

let emptyBoard = [[".",".",".",".",".",".",".",".","."],
				[".",".",".",".",".",".",".",".","."],
				[".",".",".",".",".",".",".",".","."],
				[".",".",".",".",".",".",".",".","."],
				[".",".",".",".",".",".",".",".","."],
				[".",".",".",".",".",".",".",".","."],
				[".",".",".",".",".",".",".",".","."],
				[".",".",".",".",".",".",".",".","."],
				[".",".",".",".",".",".",".",".","."]]

let game = new Sudoku()

game.generate(0.35)

console.log(game.isValidSudoku())

game.print()


// ALTERNATE SOLVE METHOD: This was my original idea, and is also described at http://pi.math.cornell.edu/~mec/Summer2009/meerkamp/Site/Solving_any_Sudoku_I.html
// Keep track of columns, rows, boxes: Sets
		// Keep track of the valid potential numbers for each square: Sets
		// Iterate over the entire puzzle to set up initial Sets, so we can do everything in O(1) time when solving
		// Once a square has only 1 remaining possible value, add it to the puzzle.
		// Iterate over the board until either we solve the puzzle or cannot insert any more values (unsolvable)
		//		- iteration: over unfilled values only, we don't care about filled values. Iterate over a map/table that holds XY coords of each unfilled square?
		//		- unsolvable: if we didn't fill any values on the last go-around, then we won't find any on the next.

		// Something to keep in mind: Is there always guaranteed at least one square with only 1 possible value? The solution becomes much harder if not.