// 处理弹出的操作面板

// cell --(click)--> popup

// popup --(click)--> n --(fill)--> cell

module.exports = class PopupNumbers{
	constructor($panel){
		this._$panel = $panel.hide().removeClass('hidden') ;
		
		this._$panel.on("click" , "span" , e =>{
			const $cell = this._$targetCell ;

			const $span = $(e.target);
			if ($span.hasClass("mark1")){
				// 回填样式
				if ($cell.hasClass("mark1")){
					$cell.removeClass("mark1") ;
				} else {
					$cell.removeClass("mark2").addClass("mark1") ;
				}
			}else if ($span.hasClass("mark2")){
				// 回填样式
				if ($cell.hasClass("mark2")){
					$cell.removeClass("mark2") ;
				} else {
					$cell.removeClass("mark1").addClass("mark2") ;
				}
			}else if ($span.hasClass("empty")){
				$cell.text(0).addClass("empty");
				// empty , 取消数字填写,取消
			}else{
				// 1-9 回填数字
				$cell.removeClass("empty").text($span.text());
			}

			$panel.hide();
		}) ;
	}

	popup($cell){
		this._$targetCell = $cell ;
		const { left , top } = $cell.position();
		this._$panel.css({
			left : `${left}px`,
			top : `${top}px`
		}).show();
	}
} ;


// 1:A    A    A    A    B    B    B
// 2:A×   B×   C×   D    A    B    C
// 3:A    C×                      	A
// 4:A    C×   A    B         		C 
// 5:C    D×   A    B    C    D    A 
// 6:A    C×        A    B    		C
// 7:D    D×   D    D    D    D    D
// 8:A    A×   A    A    A    A    A
// 9      A×             C    		B
// 10     B×        B         D    A          