



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
				//this creates the row array 
				if (wIndex === 0) {
					board[hIndex] = [];
				}

				//this pushes an object tothe row array 

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
		MINESWEEPER.DATA.detectMines(board, w, h);
		MINESWEEPER.DATA.sweepMines(board, w, h);


	};

	MINESWEEPER.DATA.populatMines = function(board, mines, w, h) {
		
		//you're going to need a more complex mine function 

		while (mines) {
			var row = MINESWEEPER.UTIL.random(1, h);
			var column = MINESWEEPER.UTIL.random(1, w);
			board[row -1][column -1].mine = true;
			mines--;
		}

	};

	MINESWEEPER.DATA.checkAdjacentMines = function(board, cell, w, h, cellProperty, ruleFunction) {
		// Create a grid surrounding this cell

		// Get boundaries
		var rowStart = (cell.row > 1) ?  cell.row - 1 : 1;
		var rowEnd = (cell.row < h) ?  cell.row + 1 : h;

		var columnStart = (cell.column > 1) ? cell.column - 1 : 1;
		var columnEnd = (cell.column < w) ? cell.column + 1 : w;		

		var cellCount = 0;

		// Loop through grid with boundaries
			//this two dimensional loop will only ever loop through coordinates within the detect mines boundaries

		//adds a mine count t

		for (var rowNum = rowStart; rowNum <= rowEnd; rowNum++) { 
			for (var column = columnStart; column <= columnEnd; column++) {

				//checks if same cell 
				if (rowNum === cell.row && column === cell.column) {
					continue; // Ignore if same cell
				}

				//adds to mine count 
				if(ruleFunction(board, cell, rowNum, column, cellProperty)) {
					cellCount += 1;
				}
			}
		} 
		return cellCount;	

	}; 

	MINESWEEPER.DATA.detectMines = function(board, w, h) {

		var rules = function(board, cell, rowNum, column, cellProperty) {
			if (board[rowNum -1][column - 1][cellProperty]) {
				return true;
			} else {
				return false; 
			}
		}

		board.forEach(function(row, rowIndex) {
			row.forEach(function(cell, columnIndex) {
				cell.sensor = MINESWEEPER.DATA.checkAdjacentMines(board, cell, w, h, 'mine', rules); 
			});
		});
	}

	MINESWEEPER.DATA.sweepMines = function(board, w, h) {
		
		var groupCounter = 0; 

		var rules = function(board, cell, rowNum, column, cellProperty) {

			if (board[rowNum -1][column - 1][cellProperty] === 0 && board[rowNum -1][column - 1]['mine'] === false) {
				board[rowNum -1][column - 1].group = groupCounter; 
				console.log(board[rowNum -1][column - 1]); 
			} else {
				return false; 
			}
		} 

		board.forEach(function(row, rowIndex) {
			row.forEach(function(cell, columnIndex) {
				if(cell.sensor === 0 && cell.mine === false) {
					console.log('[' + cell.column + ',' + cell.row + '] ----');
					MINESWEEPER.DATA.checkAdjacentMines(board, cell, w, h, 'sensor', rules);
					console.log(cell.group);
					groupCounter++; 
				} else {
					
				}
			});
		});

	}


	MINESWEEPER.DATA.updateCell = function() {

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

				//get corresponding cell with sweet data selectors!!!! 
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

				if (cell.group) {
					$cell.attr('data-group', cell.group);
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

			MINESWEEPER.EVENTS.sweepMines(cell); 
		}); 
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

MINESWEEPER.EVENTS.init('#game1', 9, 9, 20); 

































