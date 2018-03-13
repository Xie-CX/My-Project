// 检查数据解决方案

function checkArray(array){
	const length =array.length;
	const marks = new Array(length);
	marks.fill(true);

	for (var i = 0; i < length - 1 ; i++) {
		if(!marks[i]){
			continue;
		}

		const v = array[i] ;
		// 是否有效 ，0 表示无效
		if(!v){
			marks[i] = false ;
			continue;
		}
		// 是否有重复

		for (var j = i + 1; j < length ; j++) {
			if(v === array[j]) {
				marks[i] = marks[j] = false ;
			}
		}
	}

	return marks;
}


const tool = require("./tool");


// 输入：matrix ，用户完成的数独数据 9 × 9
// 处理：对 matrix 行、列、宫进行检查，并填写 marks
// 输出：检查是否成功、marks
module.exports = class Checker {

	constructor(matrix) {
		this._matrix = matrix;
		this._matrixMarks = tool.matrix.makeMatrix(true);
	}

	get matrixMarks(){
		return this._matrixMarks;
	}

	get isSuccess(){
		return this._success;
	}

	check() {
		this.checkRows();
		this.checkCols();
		this.checkBoxes();

		// 检查是否成功
		// Array.prototype.every()
		this._success = this._matrixMarks.every(row => row.every(mark => mark))
		return this._success;
	}

	checkRows() {
		for(var rowIndex = 0; rowIndex < 9; rowIndex++){
			const row = this._matrix[rowIndex];
			const marks = checkArray(row);

			for(var colIndex = 0 ; colIndex < marks.length; colIndex++){
				if(!marks[colIndex]){
					this._matrixMarks[rowIndex][colIndex] = false;
				}
			}
		}
	}

	checkCols() {
		for(var colIndex = 0; colIndex < 9; colIndex++){
			const cols = [];
			for(rowIndex = 0 ; rowIndex < 9; rowIndex++){
				cols[rowIndex] = this._matrix[rowIndex][colIndex] ;
			}

			const marks = checkArray(cols) ;
			for (var rowIndex = 0; rowIndex < marks.length; rowIndex++) {
				if(!marks[rowIndex]){
					this._matrixMarks[rowIndex][colIndex] = false;
				}
			};
		}
	}


	checkBoxes() {
		for(var boxIndex = 0; boxIndex < 9; boxIndex++){
			const boxes = tool.box.getBoxCells(this._matrix , boxIndex);
			const marks = checkArray(boxes);
			for(var cellIndex = 0 ; cellIndex < 9 ; cellIndex++){
				if(!marks[cellIndex]){
					const {rowIndex , colIndex } = tool.box.convertFromBoxIndex(boxIndex , cellIndex) ;
					this._matrixMarks[rowIndex][colIndex] = false;
				}
			}
		}
	}
}

/*console.log(checkArray([1,2,3,4,5,6,7,8,9]));
console.log(checkArray([1,2,3,4,0,6,7,8,9]));
console.log(checkArray([1,2,3,4,0,6,2,8,9]));*/
/*

const Generator = require('./generator') ;
const gen = new Generator();
gen.generate();
const matrix = gen.matrix;

const checker = new Checker(matrix) ;
console.log("check result" , checker.check());
console.log(checker.matrixMarks) ;

matrix[1][1] = 0;
// matrix[2][3] = matrix[3][5] = 5;
const checker2 = new Checker(matrix) ;
console.log("check result" , checker2.check());
console.log(checker2.matrixMarks) ;*/