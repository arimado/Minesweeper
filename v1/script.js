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

	MINESWEEPER.UTIL = {};
	
	MINESWEEPER.UTIL.random = function(min, max) {
	    if (max == null) {
	      max = min;
	      min = 0;
	    }
	    return min + Math.floor(Math.random() * (max - min + 1));
  	};

	MINESWEEPER.DATA.populateBoard = function(w, h, mines) {

		var board = MINESWEEPER.DATA.board;

		MINESWEEPER.DATA.w = w;
		MINESWEEPER.DATA.h = h;
		MINESWEEPER.DATA.mines = mines;

		// Fo each row - this loops h times 
		for(var hIndex = 0; hIndex < h; hIndex++) {
			//Fo each cell in row - this loops w times
			for(var wIndex = 0; wIndex < w; wIndex++) {

				//create array at start of index 
				if (wIndex === 0) {
					board[hIndex] = [];
				}
				
				board[hIndex].push({
					row: hIndex + 1, 
					column: wIndex + 1,
					mine: false,
					sensor: 0,
					open: false
				});	
			} 
		} 
		MINESWEEPER.DATA.populatMines(board, mines, w, h);
		MINESWEEPER.DATA.detectMines(board, w, h)

	};

	MINESWEEPER.DATA.populatMines = function(board, mines, w, h) {
		while (mines) {
			var row = MINESWEEPER.UTIL.random(1, h);
			var column = MINESWEEPER.UTIL.random(1, w);
			board[row -1][column -1].mine = true;
			mines--;
		}
	};

	MINESWEEPER.DATA.detectMines = function(board, w, h) {
		board.forEach(function(row, rowIndex) {
			row.forEach(function(cell, columnIndex) {


				// Create a grid surrounding this cell

				// Get boundaries
				var rowStart = (cell.row > 1) ?  cell.row - 1 : 1;
				var rowEnd = (cell.row < h) ?  cell.row + 1 : h;

				var columnStart = (cell.column > 1) ? cell.column - 1 : 1;
				var columnEnd = (cell.column < w) ? cell.column + 1 : w;		

				var mineCount = 0;

				// Loop through grid with boundaries
				for (var rowNum = rowStart; rowNum <= rowEnd; rowNum++) { 
					for (var column = columnStart; column <= columnEnd; column++) {
						if (rowNum === cell.row && column === cell.column) {
							continue; // Ignore if same cell
						}
						if (board[rowNum -1][column - 1].mine) {
							mineCount += 1;
						}
					}
				} 

				cell.sensor = mineCount;	
			})
		})
	}

	MINESWEEPER.DATA.updateCell = function() {

		//lol 

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

				var $cell = $('[data-row="' + cell.row + '"][data-column=' + cell.column + ']');

				//get cell contents 
				var cellText = 'c' +  cell.column + ', r' + cell.row;
				if (cell.mine) {
					cellText += '<br />*'; 
				}
				//put cell contents inside cell 
				$cell.html(cellText);

				if (cell.sensor > 0) {
					$cell.attr('data-sensor', cell.sensor);
				}
			}); 
			console.log('row----') 
		}); 
	};

	MINESWEEPER.EVENTS.registerCellClicks = function($board) {

		$board.on('click', '.cell', function () {
			var $cell = $(this);

			var row = parseInt($cell.data('row'), 10);
			var column = parseInt($cell.data('column'), 10);

			var cell = MINESWEEPER.DATA.board[row - 1][column - 1];  
			//why does this not work with $board but it does with MINESWEEPER.DATA.board? 
			//becuase $board is a jquery object not the data object 

			var tempString = cell.column + ' : ' + cell.row;
			if (cell.mine) {
				tempString += '  mine!!!!'; 
			}

			console.log(tempString); 
			//pass the cell into a sweepMines function  

		}); 

	};

	MINESWEEPER.EVENTS.sweepMines = function() {

		//get cell thats clicked
		//objective: reveal a random bunch of empty cells around it 
			//needs to be within bounds
			//cant reveal mines
			//cell clicked needs to be the

		//get data-cell thats clicked
			//we'll get a random bunch of cells around it
				//we can modify the detectMines function increase/randomise the bounds to make it look for cells without mines instead 
					//this is the hardest i reckon 
				//there needs to be a reveal property

				


	}

	MINESWEEPER.EVENTS.init = function(board, w, h, mines) {
		var $board = $(board); 
		MINESWEEPER.DATA.populateBoard(w, h, mines); 
		MINESWEEPER.RENDER.drawBoard($board);
		MINESWEEPER.RENDER.paintBoard($board);
		MINESWEEPER.EVENTS.registerCellClicks($board);
	}; 

	window.MINESWEEPER = MINESWEEPER;

}());

MINESWEEPER.EVENTS.init('#game1', 9, 9, 20); 

































