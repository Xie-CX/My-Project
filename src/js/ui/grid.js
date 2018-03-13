// 生成九宫格
const tool = require("../core/tool");
// const Generator = require("../core/generator");
const Sudoku = require("../core/sudoku");
const Checker = require("../core/checker");
/*const matrix = tool.makeMatrix();
console.log(matrix);*/

/*const a = Array.from({length: 9}, (v, i) => i);
console.log(a);*/
// console.log(tool.shuffle(a));

// 测试
/*const a = makeMatrix();
a[0][1] = 2;
console.log(a);*/

class Grid {
	constructor(container) {
		this._$container = container;
	}

	build(i) {
		// const matrix = tool.matrix.makeMatrix();
		/*const generator = new Generator();
		generator.generate();
		const matrix = generator.matrix;*/

		const sudoku = new Sudoku();
		sudoku.make(i);
		// const matrix = sudoku.solutionMatrix;
		const matrix = sudoku.puzzleMatrix;

		const rowGroupClasses = ["row_g_top" , "row_g_middle" , "row_g_bottom"] ;
		const colGroupClasses = ["col_g_left" , "col_g_center" , "col_g_right"] ;
		

		const $cells = matrix.map(rowValues => rowValues.map((cellValue , colIndex) => {
			return $("<span>").addClass(colGroupClasses[colIndex % 3]).addClass(cellValue ? "fixed" : "empty").text(cellValue)
		}));

		const $divArray = $cells.map(($spanArray , rowIndex) => {
			return $("<div>").addClass("row").addClass(rowGroupClasses[rowIndex % 3]).append($spanArray) ;
		}) ;

		this._$container.append($divArray);
	}

	/**
	 *	检查用户解谜的结果，成功则进行提示，失败显示错误的位置的标记
	*/

	check(){
		// 从界面获取需要检查的数据
		const $rows = this._$container.children();
		const data = $rows.map((rowIndex , div) => {
			return $(div).children().map((colIndex , span) => parseInt($(span).text()) || 0);
		}).toArray().map($data => $data.toArray());

		// console.log(data);

		const checker = new Checker(data);
		if(checker.check()){
			return true ;
		}
		// 检查不成功，进行标记
		const marks = checker.matrixMarks;
		this._$container.children().each((rowIndex , div) => {
			$(div).children().each((colIndex , span) => {
				const $span = $(span) ;
				if($span.is(".fixed") || marks[rowIndex][colIndex]){
					$span.removeClass("error") ;
				}else {
					$span.addClass("error");
				}
			}) ;
		}) ;

	}

	/**
	 *	重置当前谜盘到初始化状态
	*/

	reset(){
		this._$container.find("span:not(.fixed)").removeClass("error mark1 mark2").text(0).addClass("empty");
	}

	/**
	 *	清理错误标记
	*/

	clear(){
		this._$container.find("span.error").removeClass("error");
	}

	/**
	 *	重建新的谜盘，开始新的一局
	*/

	rebuild(i){
		this._$container.empty();
		this.build(i);
		this.layout();
	}

	layout() {
		const width = $("span:first" , this._$container).width();
		$("span" , this._$container).height(width).css({
			"line-height": `${width}px` ,
			"font-size": width < 32 ? `${width / 2}px` : ""
		}) ;
	}

	bindPopup(popupNumbers) {
		this._$container.on("click" , "span" , e =>{
			const $cell = $(e.target);
			if( $cell.is(".fixed")){
				return ;
			}
			popupNumbers.popup($cell);
		}) ;
	}
}

module.exports = Grid;