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

// const board = new Board

// board.createBoard()
// console.log(board.grid)