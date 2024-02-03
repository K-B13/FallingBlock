export class Board {
  constructor() {
    // Create the grid variable, will be filled in lates.
    this.grid = [];
    // Sets the width of the grid
    this.width = 13;
    // Sets the height of the grid
    this.height = 22;
    // Grabs the board dom element so I can create elements within the board container class.
    this.board = document.querySelector('.board-container');

    this.score = 0;

    this.fullRows = []

  }
  
  createBoard(){
    for (let i = 0; i < this.height; i++){
      // Creates a div element which will be the row and will contain further divs within it.
      const row = document.createElement('div');
      // Adds the class called row to the newly created element.
      row.classList.add('row');
      // Adds the row number as a data value.
      // row.dataset.rowNumber = `${i}`
      this.board.appendChild(row);
      // Loop to create each column within the rows which completes the grid.
      for (let j = 0; j < this.width; j++){
        // Creates the column element
        const tile = document.createElement('div');
        // tile.dataset.tileNumber = `${j}`\
        // Checks if it is a border tile.
        if (j === 0 || j=== this.width - 1 || i === 0 || i === this.height - 1) {
          // If it is a border tile it is given the data taken of true which will be used to prevent the current piece from going out of bounds. Also adds the class of border which will allow me to make the border look different.
          tile.dataset.taken = 'true'
          tile.classList.add('border');
        } else tile.dataset.taken = 'false';
        // Adds the class list with name of row followed by the row number
        tile.classList.add(`row${i}`, 'tile');
        // The new column is appended into the row.
        row.appendChild(tile);
      }
      // Creates an array of arrays each item in the arrays is linked ot the corresponding space on the grid.
      const entireRow = Array.from(document.querySelectorAll(`.row${i}`));
      this.grid.push(entireRow)
    }
  }

  createSideRows(className) {
    const sideBoard = document.querySelector(`.${className}`)
    for (let i = 0; i < 4; i++) {
      const row = document.createElement('div');
      row.classList.add('side-row');
      sideBoard.appendChild(row);
      for (let j = 0; j < 3; j++) {
        const tile = document.createElement('div');
        tile.classList.add('side-tile');
        row.appendChild(tile);
      }
    }
  }



  // Have an array of all unique y coordinates
  // 
  checkRows(piece) {
    const uniqueYCoordinates = []
    let fullRow;
    piece.tiles.forEach(tile => {
      if (!uniqueYCoordinates.includes(tile[1])){
        fullRow = this.grid[tile[1]].filter((gridSpot) => {
          return gridSpot.dataset.taken === 'false'
        })
        if (!fullRow.length) {
          uniqueYCoordinates.push(tile[1])
        }
      }
    })
    // Loop through grid backwards from a y coordinate
    if (uniqueYCoordinates.length){
      uniqueYCoordinates.sort((a, b) => a - b)
      uniqueYCoordinates.forEach((gridPosition) => {
        for (let i = gridPosition; i > 1; i--) {
          for (let j = 1; j < this.width - 1; j++) {
            this.grid[i][j].classList.value = this.grid[i-1][j].classList.value
            this.grid[i][j].dataset.taken = this.grid[i-1][j].dataset.taken
          }
        }
        this.score += 1000;
      })
    }
  }

  createNewRow() {
    this.grid[1].forEach((gridPosition, index) => {
      if (index !== 0 || index !== this.width - 1) {
        gridPosition.dataset.taken = 'false'
        gridPosition.classList.value = 'row0'
      }
    })
  }
}

  
