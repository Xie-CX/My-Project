// 生成数独游戏

// 1.生成完成的解决方案：Generator
// 2.随机去除部分数据：按比例

const Generator = require("./generator");

module.exports = class Sudoku {
	constructor() {
		// 生成完成的解决方案
		const generator = new Generator();
		generator.generate();
		this.solutionMatrix = generator.matrix;
		console.log(this.solutionMatrix);
	}

	make(level) {
		// const shouldRid = Math.random() * 9 < level ;
		// 生成谜盘
		/*this.solutionMatrix.map(row => row.map(cell => {
			return Math.random() * 9 < level ? 0 : cell ;
		}))*/

		this.puzzleMatrix = this.solutionMatrix.map(row => {
			return row.map(cell => Math.random() * 9 < level ? 0 : cell);
		});

	}
} ;