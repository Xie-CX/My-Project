/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 矩阵和数组相关工具
*/

var matrixTool = {
	makeRow: function makeRow() {
		var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

		var array = new Array(9);
		array.fill(v);
		return array;
	},
	makeMatrix: function makeMatrix() {
		var _this = this;

		var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

		var array = Array.from({ length: 9 }, function () {
			return _this.makeRow(v);
		});
		/*const array = Array.from({length: 9})
  	 .map(() => makeRow(v)) ;*/
		/*const array = new Array(9);
  array.fill(makeRow(v));*/
		return array;
	},


	/*
 * Fisher-Yates 洗牌算法
 */
	shuffle: function shuffle(array) {
		var length = array.length;
		var endIndex = array.length - 1;
		for (var i = 0; i < endIndex; i++) {
			var j = i + Math.floor(Math.random() * (array.length - i));
			var _ref = [array[j], array[i]];
			array[i] = _ref[0];
			array[j] = _ref[1];
		}
		return array;
	},


	/*
  * 检查这个位置是否可以填 n
 */
	checkFillable: function checkFillable(matrix, n, rowIndex, colIndex) {
		var row = matrix[rowIndex];
		var column = this.makeRow().map(function (v, i) {
			return matrix[i][colIndex];
		});

		var _boxTool$convertToBox = boxTool.convertToBoxIndex(rowIndex, colIndex),
		    boxIndex = _boxTool$convertToBox.boxIndex;

		var box = boxTool.getBoxCells(matrix, boxIndex);
		for (var i = 0; i < 9; i++) {
			if (row[i] === n || column[i] === n || box[i] === n) {
				return false;
			}
		}
		return true;
	}
};

/**
 * 宫坐标系工具
*/

var boxTool = {
	// TODO
	convertToBoxIndex: function convertToBoxIndex(rowIndex, colIndex) {
		return {
			boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
			cellIndex: rowIndex % 3 * 3 + colIndex % 3
		};
	},
	convertFromBoxIndex: function convertFromBoxIndex(boxIndex, cellIndex) {
		return {
			rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
			colIndex: boxIndex % 3 * 3 + cellIndex % 3
		};
	},
	getBoxCells: function getBoxCells(matrix, boxIndex) {
		var startRowIndex = Math.floor(boxIndex / 3) * 3;
		var startColIndex = boxIndex % 3 * 3;
		var result = [];
		for (var i = 0; i < 9; i++) {
			var rowIndex = startRowIndex + Math.floor(i / 3);
			var colIndex = startColIndex + Math.floor(i % 3);
			result.push(matrix[rowIndex][colIndex]);
		}
		return result;
	}
};

// 工具集

module.exports = function () {
	function Tool() {
		_classCallCheck(this, Tool);
	}

	_createClass(Tool, null, [{
		key: "matrix",


		/**
   * 矩阵和数组相关工具
  */
		get: function get() {
			return matrixTool;
		}

		/**
   * 宫坐标系工具
  */

	}, {
		key: "box",
		get: function get() {
			return boxTool;
		}
	}]);

	return Tool;
}();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Grid = __webpack_require__(2);
var PopupNumbers = __webpack_require__(6);

var grid = new Grid($("#container"));
grid.build(5);
grid.layout();

var popupNumbers = new PopupNumbers($("#popupNumbers"));
grid.bindPopup(popupNumbers);

$("#check").on("click", function (e) {
	if (grid.check()) {
		alert("成功！");
	}
});

$("#reset").on("click", function (e) {
	grid.reset();
});

$("#clear").on("click", function (e) {
	grid.clear();
});

$("#rebuild").on("click", function (e) {
	grid.rebuild(5);
});

$("#lowLevel").on("click", function (e) {
	grid.rebuild(3);
});

// $("#normalLevel").on("click" , e => {
// 	grid.rebuild(5);
// })

$("#highLevel").on("click", function (e) {
	grid.rebuild(7);
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// 生成九宫格
var tool = __webpack_require__(0);
// const Generator = require("../core/generator");
var Sudoku = __webpack_require__(3);
var Checker = __webpack_require__(5);
/*const matrix = tool.makeMatrix();
console.log(matrix);*/

/*const a = Array.from({length: 9}, (v, i) => i);
console.log(a);*/
// console.log(tool.shuffle(a));

// 测试
/*const a = makeMatrix();
a[0][1] = 2;
console.log(a);*/

var Grid = function () {
	function Grid(container) {
		_classCallCheck(this, Grid);

		this._$container = container;
	}

	_createClass(Grid, [{
		key: "build",
		value: function build(i) {
			// const matrix = tool.matrix.makeMatrix();
			/*const generator = new Generator();
   generator.generate();
   const matrix = generator.matrix;*/

			var sudoku = new Sudoku();
			sudoku.make(i);
			// const matrix = sudoku.solutionMatrix;
			var matrix = sudoku.puzzleMatrix;

			var rowGroupClasses = ["row_g_top", "row_g_middle", "row_g_bottom"];
			var colGroupClasses = ["col_g_left", "col_g_center", "col_g_right"];

			var $cells = matrix.map(function (rowValues) {
				return rowValues.map(function (cellValue, colIndex) {
					return $("<span>").addClass(colGroupClasses[colIndex % 3]).addClass(cellValue ? "fixed" : "empty").text(cellValue);
				});
			});

			var $divArray = $cells.map(function ($spanArray, rowIndex) {
				return $("<div>").addClass("row").addClass(rowGroupClasses[rowIndex % 3]).append($spanArray);
			});

			this._$container.append($divArray);
		}

		/**
   *	检查用户解谜的结果，成功则进行提示，失败显示错误的位置的标记
  */

	}, {
		key: "check",
		value: function check() {
			// 从界面获取需要检查的数据
			var $rows = this._$container.children();
			var data = $rows.map(function (rowIndex, div) {
				return $(div).children().map(function (colIndex, span) {
					return parseInt($(span).text()) || 0;
				});
			}).toArray().map(function ($data) {
				return $data.toArray();
			});

			// console.log(data);

			var checker = new Checker(data);
			if (checker.check()) {
				return true;
			}
			// 检查不成功，进行标记
			var marks = checker.matrixMarks;
			this._$container.children().each(function (rowIndex, div) {
				$(div).children().each(function (colIndex, span) {
					var $span = $(span);
					if ($span.is(".fixed") || marks[rowIndex][colIndex]) {
						$span.removeClass("error");
					} else {
						$span.addClass("error");
					}
				});
			});
		}

		/**
   *	重置当前谜盘到初始化状态
  */

	}, {
		key: "reset",
		value: function reset() {
			this._$container.find("span:not(.fixed)").removeClass("error mark1 mark2").text(0).addClass("empty");
		}

		/**
   *	清理错误标记
  */

	}, {
		key: "clear",
		value: function clear() {
			this._$container.find("span.error").removeClass("error");
		}

		/**
   *	重建新的谜盘，开始新的一局
  */

	}, {
		key: "rebuild",
		value: function rebuild(i) {
			this._$container.empty();
			this.build(i);
			this.layout();
		}
	}, {
		key: "layout",
		value: function layout() {
			var width = $("span:first", this._$container).width();
			$("span", this._$container).height(width).css({
				"line-height": width + "px",
				"font-size": width < 32 ? width / 2 + "px" : ""
			});
		}
	}, {
		key: "bindPopup",
		value: function bindPopup(popupNumbers) {
			this._$container.on("click", "span", function (e) {
				var $cell = $(e.target);
				if ($cell.is(".fixed")) {
					return;
				}
				popupNumbers.popup($cell);
			});
		}
	}]);

	return Grid;
}();

module.exports = Grid;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// 生成数独游戏

// 1.生成完成的解决方案：Generator
// 2.随机去除部分数据：按比例

var Generator = __webpack_require__(4);

module.exports = function () {
	function Sudoku() {
		_classCallCheck(this, Sudoku);

		// 生成完成的解决方案
		var generator = new Generator();
		generator.generate();
		this.solutionMatrix = generator.matrix;
		console.log(this.solutionMatrix);
	}

	_createClass(Sudoku, [{
		key: "make",
		value: function make(level) {
			// const shouldRid = Math.random() * 9 < level ;
			// 生成谜盘
			/*this.solutionMatrix.map(row => row.map(cell => {
   	return Math.random() * 9 < level ? 0 : cell ;
   }))*/

			this.puzzleMatrix = this.solutionMatrix.map(function (row) {
				return row.map(function (cell) {
					return Math.random() * 9 < level ? 0 : cell;
				});
			});
		}
	}]);

	return Sudoku;
}();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// 生成数独解决方案
var tool = __webpack_require__(0);

module.exports = function () {
	function Generator() {
		_classCallCheck(this, Generator);
	}

	_createClass(Generator, [{
		key: "generate",
		value: function generate() {
			while (!this.internalGenerate()) {}
		}
	}, {
		key: "internalGenerate",
		value: function internalGenerate() {
			this.matrix = tool.matrix.makeMatrix();
			this.orders = tool.matrix.makeMatrix().map(function (row) {
				return row.map(function (v, i) {
					return i;
				});
			}).map(function (row) {
				return tool.matrix.shuffle(row);
			});

			for (var n = 1; n <= 9; n++) {
				if (!this.fillNumber(n)) {
					return false;
				}
			}
			return true;
		}
	}, {
		key: "fillNumber",
		value: function fillNumber(n) {
			return this.fillRow(n, 0);
		}
	}, {
		key: "fillRow",
		value: function fillRow(n, rowIndex) {
			if (rowIndex > 8) {
				return true;
			}

			var row = this.matrix[rowIndex];
			var orders = this.orders[rowIndex];

			for (var i = 0; i < 9; i++) {
				var colIndex = orders[i];
				// 如果这个位置已经有值，跳过
				if (row[colIndex]) {
					continue;
				}

				// 检查这个位置是否可以填 n
				if (!tool.matrix.checkFillable(this.matrix, n, rowIndex, colIndex)) {
					continue;
				}

				row[colIndex] = n;
				// 去下一行填写 n ，如果没填进去，就继续寻找当前行下一个位置
				if (!this.fillRow(n, rowIndex + 1)) {
					row[colIndex] = 0;
					continue;
				}

				return true;
			}
			return false;
		}
	}]);

	return Generator;
}();

/*const generator = new Generator();
generator.generate();
console.log(generator.matrix);*/

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// 检查数据解决方案

function checkArray(array) {
	var length = array.length;
	var marks = new Array(length);
	marks.fill(true);

	for (var i = 0; i < length - 1; i++) {
		if (!marks[i]) {
			continue;
		}

		var v = array[i];
		// 是否有效 ，0 表示无效
		if (!v) {
			marks[i] = false;
			continue;
		}
		// 是否有重复

		for (var j = i + 1; j < length; j++) {
			if (v === array[j]) {
				marks[i] = marks[j] = false;
			}
		}
	}

	return marks;
}

var tool = __webpack_require__(0);

// 输入：matrix ，用户完成的数独数据 9 × 9
// 处理：对 matrix 行、列、宫进行检查，并填写 marks
// 输出：检查是否成功、marks
module.exports = function () {
	function Checker(matrix) {
		_classCallCheck(this, Checker);

		this._matrix = matrix;
		this._matrixMarks = tool.matrix.makeMatrix(true);
	}

	_createClass(Checker, [{
		key: "check",
		value: function check() {
			this.checkRows();
			this.checkCols();
			this.checkBoxes();

			// 检查是否成功
			// Array.prototype.every()
			this._success = this._matrixMarks.every(function (row) {
				return row.every(function (mark) {
					return mark;
				});
			});
			return this._success;
		}
	}, {
		key: "checkRows",
		value: function checkRows() {
			for (var rowIndex = 0; rowIndex < 9; rowIndex++) {
				var row = this._matrix[rowIndex];
				var marks = checkArray(row);

				for (var colIndex = 0; colIndex < marks.length; colIndex++) {
					if (!marks[colIndex]) {
						this._matrixMarks[rowIndex][colIndex] = false;
					}
				}
			}
		}
	}, {
		key: "checkCols",
		value: function checkCols() {
			for (var colIndex = 0; colIndex < 9; colIndex++) {
				var cols = [];
				for (rowIndex = 0; rowIndex < 9; rowIndex++) {
					cols[rowIndex] = this._matrix[rowIndex][colIndex];
				}

				var marks = checkArray(cols);
				for (var rowIndex = 0; rowIndex < marks.length; rowIndex++) {
					if (!marks[rowIndex]) {
						this._matrixMarks[rowIndex][colIndex] = false;
					}
				};
			}
		}
	}, {
		key: "checkBoxes",
		value: function checkBoxes() {
			for (var boxIndex = 0; boxIndex < 9; boxIndex++) {
				var boxes = tool.box.getBoxCells(this._matrix, boxIndex);
				var marks = checkArray(boxes);
				for (var cellIndex = 0; cellIndex < 9; cellIndex++) {
					if (!marks[cellIndex]) {
						var _tool$box$convertFrom = tool.box.convertFromBoxIndex(boxIndex, cellIndex),
						    _rowIndex = _tool$box$convertFrom.rowIndex,
						    colIndex = _tool$box$convertFrom.colIndex;

						this._matrixMarks[_rowIndex][colIndex] = false;
					}
				}
			}
		}
	}, {
		key: "matrixMarks",
		get: function get() {
			return this._matrixMarks;
		}
	}, {
		key: "isSuccess",
		get: function get() {
			return this._success;
		}
	}]);

	return Checker;
}();

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

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// 处理弹出的操作面板

// cell --(click)--> popup

// popup --(click)--> n --(fill)--> cell

module.exports = function () {
	function PopupNumbers($panel) {
		var _this = this;

		_classCallCheck(this, PopupNumbers);

		this._$panel = $panel.hide().removeClass('hidden');

		this._$panel.on("click", "span", function (e) {
			var $cell = _this._$targetCell;

			var $span = $(e.target);
			if ($span.hasClass("mark1")) {
				// 回填样式
				if ($cell.hasClass("mark1")) {
					$cell.removeClass("mark1");
				} else {
					$cell.removeClass("mark2").addClass("mark1");
				}
			} else if ($span.hasClass("mark2")) {
				// 回填样式
				if ($cell.hasClass("mark2")) {
					$cell.removeClass("mark2");
				} else {
					$cell.removeClass("mark1").addClass("mark2");
				}
			} else if ($span.hasClass("empty")) {
				$cell.text(0).addClass("empty");
				// empty , 取消数字填写,取消
			} else {
				// 1-9 回填数字
				$cell.removeClass("empty").text($span.text());
			}

			$panel.hide();
		});
	}

	_createClass(PopupNumbers, [{
		key: "popup",
		value: function popup($cell) {
			this._$targetCell = $cell;

			var _$cell$position = $cell.position(),
			    left = _$cell$position.left,
			    top = _$cell$position.top;

			this._$panel.css({
				left: left + "px",
				top: top + "px"
			}).show();
		}
	}]);

	return PopupNumbers;
}();

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map