// Simple class to hold the XY coordinates of some object on some graph or plane
// Samuel Barrett, 2021/08/28

"use strict"

class Coordinate {
	constructor(x, y) {
		this._x = arguments.length == 2 ? x : null
		this._y = arguments.length == 2 ? y : null
	}
	get x() {
		return this._x
	}
	get y() {
		return this._y
	}
}