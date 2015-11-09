(function () {

	var MINESWEEPER = {};

	MINESWEEPER.DATA = {};
	MINESWEEPER.RENDER = {};
	MINESWEEPER.EVENTS = {};

	MINESWEEPER.DATA.height = 0; 
	MINESWEEPER.DATA.width = 0; 
	MINESWEEPER.DATA.mines = 0;
	MINESWEEPER.DATA.minesAvaliable = 0;

	MINESWEEPER.DATA.board = [];

	MINESWEEPER.DATA.populateBoard = function(w, h, mines) {

		var board = MINESWEEPER.DATA.board;

		MINESWEEPER.DATA.w = w;
		MINESWEEPER.DATA.h = h;
		MINESWEEPER.DATA.mines = mines;
		var minesAvaliable = w * h;

		// Fo each row - this loops h times 
		for(var hIndex = 0; hIndex < h; hIndex++) {
			//Fo each cell in row - this loops w times
			for(var wIndex = 0; wIndex < w; wIndex++) {

				//create array at start of index 
				if (wIndex === 0) {
					board[hIndex] = [];
				} 

				//push to created array at hIndex
					//either push a cell with or without a mine 
				if (minesAvaliable > 0) {
					console.log('push')
					board[hIndex].push({
						row: hIndex + 1,
						column: wIndex + 1,
						mine: Math.random() > 0.5 //creates boolean value because of the greater than operator 
					});	

					minesAvaliable--;
				} else {
					board[hIndex].push({
						row: hIndex + 1, 
						column: wIndex + 1,
						mine: false
					});	
				} 
			} 
		} 

		MINESWEEPER.DATA.detectMines(board, w, h)

	};

	MINESWEEPER.DATA.detectMines = function(board, w, h) {
		board.forEach(function(row) {
			row.forEach(function(cell) {
				if((cell.column > 1 && cell.column < w) && (cell.row > 1 && cell.row < h)) {
					
					console.log('coors - ' + cell.column + ' ' + cell.row);

					console.log('coorx - ' + (cell.column - 1) + ' ' + (cell.row - 1)); 

					// var topLeftCell = board[cell.column-1][cell.row-1];  
					// console.log('the topLeftCell to - ' + cell.column + ' ' + cell.row + ' - is - ' + cell.column-1 + ' ' + cell.row-1);
				}

				//detect mines function
				//get all cells around cell
					//relative to coordinate 

					//add the mine to a counter somehow 
						//have a counter on top of a stack of if statments
							//than incerement whenever an if satisify's a value 
								//than add it to the counter 

					//if cell column width or cell height is = 0 or is greater than the limits than dont count them 




				//if on edge the 
				
			})
		})
	}

	MINESWEEPER.DATA.updateCell = function() {

		// 

	};

	MINESWEEPER.RENDER.drawBoard = function($board) {

		//loop through each element of board array
		MINESWEEPER.DATA.board.forEach(function(row){
			var $row = $('<div class="row"></div>'); //create div for each element
			row.forEach(function(cell){ // loop through each element in the 'row' array (which isnt defined)
				var $cell = $('<div class="cell" data-column="' + cell.column + '"data-row="' + cell.row + '"></div>'); 
				$row.append($cell); 
			}); 
			$board.append($row); 
		});	 
	};

	MINESWEEPER.RENDER.paintBoard = function($board) {
		// Celltext belongs in the paint function!
		MINESWEEPER.DATA.board.forEach(function(row){
			row.forEach(function(cell){

				//get corresponding cell 
				var $cell = $('.row:nth-child(' + cell.row + ')').children('[data-column=' + cell.column + ']');  

				//get cell contents 
				var cellText = cell.column + ', ' + cell.row; 
				if (cell.mine) {
					cellText += '<br />*'; 
				}
				//put cell contents inside cell 
				$cell.html(cellText); 
			}); 
			console.log('row----') 
		});
		
	};

	MINESWEEPER.EVENTS.registerCellClicks = function() {

	};

	MINESWEEPER.EVENTS.init = function(board, w, h, mines) {
		var $board = $(board); 
		MINESWEEPER.DATA.populateBoard(w, h, mines); 
		MINESWEEPER.RENDER.drawBoard($board);
		MINESWEEPER.RENDER.paintBoard($board);
		MINESWEEPER.EVENTS.registerCellClicks($board);
	}; 

	window.MINESWEEPER = MINESWEEPER;

}());

MINESWEEPER.EVENTS.init('#game1', 9, 6, 20); 

































