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

var sudoku = new Sudoku;
// TODO init setup for test suite
var oTest = new SudokuTest(sudoku);
for (var m in SudokuTest.prototype) {
	if (typeof m === "string" && m.length > 4 && m.substring(0, 4) === "test") {
		oTest[m]();
	}
}
