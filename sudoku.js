(function() {
alert("debug");
function Sudoku() {
	this.rows = new Array(9);
	for (var i = 0; i < 9; i++) {
		this.rows[i] = new Array(9);
	}
}

Sudoku.prototype.getRow = function(index) {
	// return a row, index starts from 0
	return this.rows[index];
}

Sudoku.prototype.getColumn = function(index) {
	// return a column, index starts from 0
	var column = new Array(9);
	for (var i = 0; i < 9; i++) {
		column[i] = this.rows[i][index];
	}
	return column;
}

Sudoku.prototype.getCube = function(index) {
	// return a 3*3 cube, index starts from 0
	var cube = new Array(9);
	var rowIndex = (index - index % 3);
	var colIndex = (index % 3) * 3;
	
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			cube[i * 3 + j] = this.rows[rowIndex + i][colIndex + j];
		}
	}
}

Sudoku.prototype.verifyAll = function() {
	for (var i = 0; i < 9; i++) {
		if (!Sudoku.verify(this.getRow(i)) || !Sudoku.verify(this.getColumn(i)) || !Sudoku.verify(this.getCube(i)))
			return false;
	}
	return true;
}

Sudoku.verify = function(arr) {
	for (var i = 0; i < 9; i++) {
		var temp = arr[i];
		if (temp > 0 && temp < 10) {
			for (var j = i; j >= 0; j--) {
				if (arr[j] == temp)
					return false;
			}
		}
	}
	return true;
}

Sudoku.prototype.getCubeIndex = function(rowIndex, colIndex) {
	return (rowIndex - rowIndex % 3) + (colIndex % 3);
}

Sudoku.prototype.findPossibleValuesOfSlot = function(x, y) {
	var possValsOfRow = this.findPossibleValues(this.getRow(x));
	var possValsOfCol = this.findPossibleValues(this.getColumn(y));
	var possValsOfCube = this.findPossibleValues(this.getCubeIndex(x, y));
	
	// intersect 3 possible arrays
	return Sudoku.intersect(possValsOfRow, possValsOfCol, possValsOfCube);
}

Sudoku.prototype.findPossibleValues = function(unit) {
	var mark = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
	for (var i = 0; i < 9; i++) {
		mark[unit[i]] = 0;
	}
	
	var result = [];
	for (var j = 1; j <= 9; j++) {
		if (mark[j] > 0) {
			result.push(j);
		}
	}
	return result;
}

Sudoku.prototype.setSlotValue = function(r, c, val) {
	this.rows[r][c] = val;
}

Sudoku.prototype.tryValues = function(r, c, values) {
	for (var i = 0; i < values.length; i++) {
		this.setSlotValue(r, c, values[i]);
		if (this.tryResolve()) {
			return true;
		} else {
			// TODO rollback
		}
	}
}

// this method accepts a parameter(breakEarly) to indicate whether it breaks immediately once a resolution or not?
Sudoku.prototype.traverseOnce = function() {
	
}

Sudoku.prototype.resolve = function() {
}

Sudoku.prototype.resolveUnit = function() {
	
}

Sudoku._RESOLVED = "123456789";

Sudoku.prototype.isUnitResolved = function(unit) {
	return (unit.clone().sort().join("") === Sudoku._RESOLVED);
}

Sudoku.prototype.getUnResolvedIndexes = function(unit) {
	if (!this.isUnitResolved(unit)) {
		var count = 0;
		for (var i = 0; i < 9 && unit[i] == 0; i++) {
			count++;
		}
		return count;
	} else
		return 0;
}

Sudoku.prototype.tryResolveUnit = function(unit) {
	var unresolved = this.getUnResolvedCount(unit);
	if (unresolved > 0) {
		if (unresolved == 1) {
			// resolve it!
			return true;
		} else {
			// ?
		}
	}
	return true;
}

Sudoku.prototype.resolveUnit = function(unit) {
	
}

Sudoku.prototype.tryResolve = function() {
	var rowsCopy = this.rows;
	for (var r = 0; r < 9; r++) {
		for (var c = 0; c < 9; c++) {
			var slot = this.rows[r][c];
			if (slot > 0 && slot < 9)
				continue;
			if (!this.tryResolveSlot(r, c)) {
				// TODO
			}
		}
	}
}

Sudoku.prototype.tryResolveSlot = function(r, c) {
	var possibleValues = this.findPossibleValues(r, c);
	if (possibleValues != null && possibleValues.length == 1) {
		this.rows[r][c] = possibleValues[0];
		return true;
	}
	return false;
}

Sudoku.intersect = function() {
	// intersects the given arrays passed as arguments and returns an array (set) as result
	var all = [];
	for (var i = 0; i < arguments.length; i++) {
		all.concat(arguments[i]);
	}
	return all.uniq();
}

// remove duplicated elements
Array.prototype.uniq = function() {
	while (_uniq(this)) {
	}
	return this;
}

Array.prototype.clone = function() {
	return this.slice(0);
}

function _uniq(arr) {
	if (arr == null || !arr.length) return false;
	for (var i = 0 ; i < arr.length; i++) {
		for (var j = i + 1; j < arr.length; j++) {
			if (arr[j] === arr[i]) {
				arr.splice(j, 1);
				return true;
			}
		}
	}
	return false;
}

function SudokuTest(sudokuObject) {
	this.sudoku = sudokuObject;
}

SudokuTest.prototype.assertEquals = function(target, expectedResult) {
	var result = target;
	if (typeof target == "function") {
		result = target.call(this.sudoku);
	}
	alert(result === expectedResult);
}

SudokuTest.prototype.testIsUnitResolved = function() {
	this.assertEquals(this.sudoku.isUnitResolved([1,2,3,4,5,6,7,8,9]), true);
	this.assertEquals(this.sudoku.isUnitResolved([9,2,3,4,5,6,1,8,7]), true);
	this.assertEquals(this.sudoku.isUnitResolved([0,2,3,4,5,6,7,8,9]), false);
	this.assertEquals(this.sudoku.isUnitResolved([1,2,3,4,0,6,7,8,9]), false);
}

var iUnitTest = new SudokuTest(new Sudoku);
iUnitTest.testIsUnitResolved();
/*
*/
})();