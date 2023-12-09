class Board {
  constructor() {
    this.grid = [];
    this.width = 11;
    this.height = 11;
    this.board = document.querySelector('.board-container');
  }
  
  createBoard(){
    for (let i = 0; i < this.height; i++){
      let row = document.createElement('div');
      row.classList.add('row');
      row.dataset.rowNumber = `${i}`
      this.board.appendChild(row);
      for (let j = 0; j < this.width; j++){
        let tile = document.createElement('div');
        tile.dataset.tileNumber = `${j}`
        tile.dataset.taken = false;
        tile.classList.add(`row${i}`);
        row.appendChild(tile);
      }
      let entireRow = Array.from(document.querySelectorAll(`.row${i}`));
      this.grid.push(entireRow)
    }
  }
}

class iPiece {
  constructor() {
    this.color = 'lightblue'
    this.rotateIndex = 1
    this.center = [5, 1]

    this.calculatePieces()
    this.tiles = [this.top, this.center, this.botMiddle, this.bot]
  }

  // Calculate the 3 coordinates that are not the center
  calculatePieces() {
    this.top = [ ...this.center ]
    this.top[this.rotateIndex] = this.top[this.rotateIndex] - 1
    this.botMiddle = [ ...this.center ]
    this.botMiddle[this.rotateIndex] = this.botMiddle[this.rotateIndex] + 1
    this.bot = [ ...this.center ]
    this.bot[this.rotateIndex] = this.bot[this.rotateIndex] + 2
  }

  // Change the rotate index between 0 and 1 so the piece can figure out which
  // orientation it is
  rotate() {
    this.rotateIndex = (this.rotateIndex + 1) % 2
    this.calculatePieces()
  }

  // Method to lower the shape, make sure the shape doesn't go out of the bottom of the screen. The center is decreased by one and then the rest are recalculated.
  fall() {
    if (this.bot[1] < 11) {
      this.center[1] += 1
      this.calculatePieces()
    }
  }

  // Method to move the shape to the left, make sure the shape doesn't go out of the left of the screen. The center is moved by one to the left and then the rest are recalculated.
  left() {
    if (this.top[0] > 0){
      this.center[0] = this.center[0] - 1
      this.calculatePieces()
    }
  }

  // Method to move the shape to the right, make sure the shape doesn't go out of the right of the screen. The center is moved by one to the right and then the rest are recalculated.
  right() {
    if (this.bot[0] < 10) {
      this.center[0] = this.center[0] + 1
      this.calculatePieces()
    }
  }
}

// const newPiece = new iPiece
// const board = new Board

// board.createBoard()
// console.log(board.grid)