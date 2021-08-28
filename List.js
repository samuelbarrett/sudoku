// Doubly-linked list class
//
// Samuel Barrett, 2021/08/28

"use strict"

class List {
	constructor() {
		this._head = null
		this._current = null
	}
	append(content) {
		if(this._head === null) {
			this._head = new Node(content)
			this._current = this._head
		}
		else {
			this._current.next = new Node(content, this._current)
			this._current = this._current.next
		}
	}
	get isEmpty() {
		return this._head === null
	}
	get iterator() {
		return new Iterator(this._head)
	}
}

// Node class for building a Linked List
class Node {
	constructor(content, prev, next) {
		if(arguments.length >= 3) {
			this._content = content
			this._previous = prev
			this._next = next
		}
		else if(arguments.length == 2) {
			this._content = content
			this._previous = prev
			this._next = null
		}
		else if(arguments.length == 1) {
			this._content = content
			this._prev = null
			this._next = null
		}
	}
	// accessors for Node elements
	get next() {
		return this._next
	}
	get prev() {
		return this._previous
	}
	get content() {
		return this._content
	}
}

// Iterator class for a List. Called by get iterator() method in List.
class Iterator {
	constructor(head) {
		this._head = head
		this._current = head
	}
	// check for next/previous element existence
	get hasNext() {
		return this._current !== null
	}
	get hasPrev() {
		return this._current.prev !== null
	}
	// get the next element's content
	next() {
		let next = null
		if(this.hasNext) {
			next = this._current.content
			this._current = this._current.next
		}
		return next
	}
	// get the previous element's content
	prev() {
		let prev = null
		if(this.hasPrev) {
			this._current = this._current.prev
			prev = this._current.content
		}
		return prev
	}
	// return to the start of the list
	reset() {
		this._current = this._head
	}
}