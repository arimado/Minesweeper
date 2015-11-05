// $(document).ready(function() {
	
// 	function renderBoard(width, height) {
// 		var totalGrid = width * height; 


// 		$("#boxWrapper").append('<div class="box"></div>');  

// 	}

// })




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
		var minesAvaliable = mines;

		// Fo each row
		for(var hIndex = 0; hIndex < h; hIndex++) {

			//Fo each cell in row
			for(var wIndex = 0; wIndex < w; wIndex++) {

				if (wIndex === 0) {
					board[hIndex] = [];
				}

				if (minesAvaliable) {
					board[hIndex].push({
						row: hIndex + 1,
						column: wIndex + 1,
						mine: Math.random() > 0.5
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

	};

	MINESWEEPER.DATA.updateCell = function() {

	};

	MINESWEEPER.RENDER.drawBoard = function($board) {

		MINESWEEPER.DATA.board.forEach(function(row){
			var $row = $('<div class="row"></div>');

			row.forEach(function(cell){
				var $cell = $('<div class="cell"></div>');


				// Celltext belongs in the paint function!
				var cellText = cell.row + ', ' + cell.column;
				if (cell.mine) {
					cellText += '<br />*';
				}
				$cell.html(cellText);

				$row.append($cell); 

			});

			$board.append($row);


		});	

	};

	MINESWEEPER.RENDER.paintBoard = function() {
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

MINESWEEPER.EVENTS.init('#game1', 9, 6, 10);








































