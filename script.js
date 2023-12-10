class Game {
  constructor() {
    this.gameBoard = new Board
    this.gameBoard.createBoard()

    this.possiblePieces = [iPiece, oPiece]
    this.control = 0
    this.activeGame = true

    this.selectPiece()
  }

  selectPiece() {
    const randomNumber = Math.floor(Math.random() * this.possiblePieces.length)
    const selectedPiece = this.possiblePieces[randomNumber]
    this.currentPiece = new selectedPiece
  }

  generateNewPiece() {
    this.plotTile(this.currentPiece)
  }

  plotTile(piece) {
    piece.tiles.forEach((tile) => {
      const [x, y] = tile;
      this.gameBoard.grid[y][x].classList.add(piece.color)
    })
  }

  removeTiles(piece) {
    piece.tiles.forEach((tile) => {
      const [x, y] = tile;
      this.gameBoard.grid[y][x].classList.remove(piece.color)
    })
  }

  moveTile(interval) {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        this.removeTiles(this.currentPiece)
        this.currentPiece.right();
        this.plotTile(this.currentPiece)
        this.control += 1
        console.log(this.control)
      }
      if (e.key === 'ArrowLeft') {
        this.removeTiles(this.currentPiece)
        this.currentPiece.left();
        this.plotTile(this.currentPiece)
        
      }
    })
    clearInterval(interval)
    this.playGame()
  }

  playGame() {
    // while (this.activeGame) {
      const interval = setInterval(() => {
        this.removeTiles(this.currentPiece)
        this.currentPiece.fall()
        this.plotTile(this.currentPiece)
        this.control += 1
        this.moveTile(interval)
      }, 1000)
    // }
  }
}

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
  }

  // Calculate the 3 coordinates that are not the center
  calculatePieces() {
    this.top = [ ...this.center ]
    this.top[this.rotateIndex] = this.top[this.rotateIndex] - 1
    this.botMiddle = [ ...this.center ]
    this.botMiddle[this.rotateIndex] = this.botMiddle[this.rotateIndex] + 1
    this.bot = [ ...this.center ]
    this.bot[this.rotateIndex] = this.bot[this.rotateIndex] + 2
    this.tiles = [this.top, this.center, this.botMiddle, this.bot]
  }

  // Change the rotate index between 0 and 1 so the piece can figure out which
  // orientation it is
  rotate() {
    this.rotateIndex = (this.rotateIndex + 1) % 2
    this.calculatePieces()
  }

  // Method to lower the shape, make sure the shape doesn't go out of the bottom of the screen. The center is decreased by one and then the rest are recalculated.
  fall() {
    if (this.bot[1] < 10) {
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
      console.log(this.center)
    }
  }
}

class oPiece {
  constructor() {
    this.color = 'yellow'
    this.center = [5, 0]
    this.calculatePieces()
  }

  calculatePieces() {
    this.bot = [ ...this.center ]
    this.bot[1] = this.bot[1] + 1

    this.botRight = [ ...this.center ]
    this.botRight.forEach((coord, index) => {
      this.botRight[index] = coord + 1
    })

    this.topRight = [ ...this.center ]
    this.topRight[0] = this.topRight[0] + 1
    this.tiles = [this.bot, this.botRight, this.center, this.topRight]
  }

  fall() {
    if (this.bot[1] < 10) {
      this.center[1] += 1
      this.calculatePieces()
    }
  }

  left() {
    if (this.center[0] > 0) {
      this.center[0] -= 1
      this.calculatePieces()
    }
  }

  right() {
    if (this.topRight[0] < 10) {
      this.center[0] += 1
      this.calculatePieces()
    }
  }
}

// const newPiece = new oPiece()
// console.log(newPiece.center)
// console.log(newPiece.tiles)
// newPiece.fall()
// console.log(newPiece.center)
// console.log(newPiece.tiles)

// const newPiece = new iPiece()
// newPiece.tiles.forEach((tile) => {
//   console.log(tile)
// })
// newPiece.left()
// newPiece.tiles.forEach((tile) => {
//   console.log(tile)
// })

// const board = new Board

// board.createBoard()
// console.log(board.grid)

const game = new Game
game.generateNewPiece()

const btn = document.querySelector('button')
btn.onclick = () => {
  game.playGame()
}

const btn2 = document.querySelector('.test-btn')
btn2.onclick = () => {
  // console.log(game.currentPiece)
  game.activeGame = !game.activeGame
}
