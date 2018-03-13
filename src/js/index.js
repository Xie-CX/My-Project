const Grid = require("./ui/grid");
const PopupNumbers = require("./ui/popupnumbers");

const grid = new Grid($("#container")) ;
grid.build(5);
grid.layout();

const popupNumbers = new PopupNumbers($("#popupNumbers"));
grid.bindPopup(popupNumbers);

$("#check").on("click" , e => {
	if(grid.check()){
		alert("成功！");
	}
}) ;

$("#reset").on("click" , e => {
	grid.reset();
}) ;

$("#clear").on("click" , e => {
	grid.clear();
}) ;

$("#rebuild").on("click" , e => {
	grid.rebuild(5);
}) ;

$("#lowLevel").on("click" , e => {
	grid.rebuild(3);
}) ;

// $("#normalLevel").on("click" , e => {
// 	grid.rebuild(5);
// })

$("#highLevel").on("click" , e => {
	grid.rebuild(7);
}) ;