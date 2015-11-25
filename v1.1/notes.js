




board.forEach(function(row, rowIndex) {
	row.forEach(function(cell, columnIndex) {

		//if cell is empty, or has any other restrictions 
		if(cell is empty) {

				//emptyCells 
				var emptyCells = [];

				//adjacent loop 
				for (var rowNum = rowStart; rowNum <= rowEnd; rowNum++) { 
						//if empty
						if(cell is empty) {
							emptyCells.push(currentCell); 
						}	
				} 

				//EMPTY ARRAY LOOP
				emptyCells.forEach(cell, index) {
					//emptyAdjacent cells 
					var emptyCells = [];
					//adjacent loop 
					for (var rowNum = rowStart; rowNum <= rowEnd; rowNum++) { 
						//if empty
						if(cell is empty) {
							emptyCells.push(currentCell); 
						}
						
					} 	

					//EMPTY ARRAY LOOP 2 
					emptyCells.forEach(cell, index) {
						//emptyAdjacent cells 
						var emptyCells = [];
						//adjacent loop 
						for (var rowNum = rowStart; rowNum <= rowEnd; rowNum++) { 
							//if empty
							if(cell is empty) {
								emptyCells.push(currentCell); 
							}
							
						} 	
					} 

				} 

				}
			}
		}
	}
}




function checkAdjacentMines(board, cell) {


	// Create a grid surrounding this cell

	// Get boundaries
	var rowStart = (cell.row > 1) ?  cell.row - 1 : 1;
	var rowEnd = (cell.row < h) ?  cell.row + 1 : h;

	var columnStart = (cell.column > 1) ? cell.column - 1 : 1;
	var columnEnd = (cell.column < w) ? cell.column + 1 : w;		

	var mineCount = 0;

	// Loop through grid with boundaries
		//this two dimensional loop will only ever loop through coordinates within the detect mines boundaries

	//adds a mine count t

	for (var rowNum = rowStart; rowNum <= rowEnd; rowNum++) { 
		for (var column = columnStart; column <= columnEnd; column++) {

			//checks if same cell 
			if (rowNum === cell.row && column === cell.column) {
				continue; // Ignore if same cell
			}


			//this needs to depend on a variable 

			//adds to mine count 
			if (board[rowNum -1][column - 1].mine) {
				mineCount += 1;
			}
	}


	//this needs to depend on a variable 
	return mineCount; 



}


MINESWEEPER.DATA.detectMines = function(board, w, h) {

	board.forEach(function(row, rowIndex) {
		row.forEach(function(cell, columnIndex) {
			
			cell.sensor = MINESWEEPER.DATA.checkAdjacentMines(board, cell); 

		}
	}

}




	//objective: reveal a random bunch of empty cells around it 
			//needs to be within bounds
			//cant reveal mines	


		//get cell that is clicked on board 
		//search cells around it
			//ignore mines
		//activate clicked state value 

		// ------------------------------------------------------------




		// ------------------------------------------------------------

		//get data-cell thats clicked
			//we'll get a random bunch of cells around it
				//we can modify the detectMines function increase/randomise the bounds to make it look for cells without mines instead 
					//this is the hardest i reckon 
				//there needs to be a reveal property
















































