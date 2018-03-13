/**
 * 矩阵和数组相关工具
*/

const matrixTool = {
	makeRow(v = 0){
		const array = new Array(9);
		array.fill(v);
		return array;
	} ,

	makeMatrix(v = 0){
		const array = Array.from({length: 9} , () => this.makeRow(v));
		/*const array = Array.from({length: 9})
			 .map(() => makeRow(v)) ;*/
		/*const array = new Array(9);
		array.fill(makeRow(v));*/
		return array;
	} ,

	/*
	* Fisher-Yates 洗牌算法
	*/
	shuffle(array) {
		const length = array.length;
		const endIndex = array.length - 1 ;
		for(let i = 0; i < endIndex ; i++){
			const j = i + Math.floor(Math.random() * (array.length - i));
			[array[i] , array[j]] = [array[j] , array[i]];
		}
		return array ;
	} ,

	/*
	 * 检查这个位置是否可以填 n
	*/
	checkFillable(matrix , n , rowIndex , colIndex){
		const row = matrix[rowIndex] ;
		const column = this.makeRow().map((v , i) => matrix[i][colIndex]);
		const { boxIndex } = boxTool.convertToBoxIndex(rowIndex , colIndex);
		const box = boxTool.getBoxCells(matrix , boxIndex);
		for(let i = 0 ; i < 9 ; i++){
			if(row[i] === n || column[i] === n || box[i] === n){
				return false;
			}
		}
		return true;
	}
} ;

/**
 * 宫坐标系工具
*/

const boxTool = {
	// TODO
	convertToBoxIndex(rowIndex , colIndex){
		return {
			boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
			cellIndex: rowIndex % 3 * 3 + colIndex % 3
		}
	},

	convertFromBoxIndex(boxIndex , cellIndex){
		return {
			rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
			colIndex: boxIndex % 3 * 3 + cellIndex % 3
		}
	},

	getBoxCells(matrix , boxIndex){
		const startRowIndex = Math.floor(boxIndex / 3) * 3 ;
		const startColIndex = boxIndex % 3 * 3 ;
		const result = [];
		for( let i = 0 ; i < 9 ; i++){
			const rowIndex = startRowIndex + Math.floor( i / 3) ;
			const colIndex = startColIndex + Math.floor( i % 3) ;
			result.push(matrix[rowIndex][colIndex]) ;
		}
		return result ;
	}
} ;


// 工具集

module.exports = class Tool{

	/**
	 * 矩阵和数组相关工具
	*/
	static get matrix(){
		return matrixTool;
	}

	/**
	 * 宫坐标系工具
	*/
	static get box(){
		return boxTool;
	}
};
