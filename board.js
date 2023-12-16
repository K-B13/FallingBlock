export class Board {
  constructor() {
    this.grid = [];
    this.width = 11;
    this.height = 12;
    this.board = document.querySelector('.board-container');
  }
  
  createBoard(){
    for (let i = 0; i < this.height; i++){
      const row = document.createElement('div');
      row.classList.add('row');
      row.dataset.rowNumber = `${i}`
      this.board.appendChild(row);
      for (let j = 0; j < this.width; j++){
        const tile = document.createElement('div');
        tile.dataset.tileNumber = `${j}`
        if (j === 0 || j=== this.width - 1 || i === 0 || i === this.height - 1) {
          tile.dataset.taken = 'true'
          tile.classList.add('border');
        } else tile.dataset.taken = 'false';
        tile.classList.add(`row${i}`);
        row.appendChild(tile);
      }

      const entireRow = Array.from(document.querySelectorAll(`.row${i}`));
      this.grid.push(entireRow)
    }
  }
}
