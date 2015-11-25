




board.forEach(function(row, rowIndex) {
	row.forEach(function(cell, columnIndex) {


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

