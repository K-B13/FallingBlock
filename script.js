class Game {
  constructor() {
    this.gameBoard = new Board
    this.gameBoard.createBoard()

    this.possiblePieces = [tPiece, tPiece]
    this.control = 0
    this.currentPiece = null

    this.generateNewPiece()
  }

  selectPiece() {
    const randomNumber = Math.floor(Math.random() * this.possiblePieces.length)
    const selectedPiece = this.possiblePieces[randomNumber]
    this.currentPiece = new selectedPiece
  }

  generateNewPiece() {
    this.selectPiece()
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

  moveTile() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        this.removeTiles(this.currentPiece)
        this.currentPiece.checkRight(this.gameBoard.grid);
        this.plotTile(this.currentPiece)
      }

      if (e.key === 'ArrowLeft') {
        this.removeTiles(this.currentPiece)
        this.currentPiece.checkLeft(this.gameBoard.grid);
        this.plotTile(this.currentPiece)
      }

      if (e.key === 'ArrowUp') {
        this.removeTiles(this.currentPiece)
        this.currentPiece.checkRotate(this.gameBoard.grid);
        this.plotTile(this.currentPiece)
      }

      if (e.key === 'ArrowDown') {
        this.removeTiles(this.currentPiece)
        this.currentPiece.checkFall(this.gameBoard.grid)
        // if (!this.currentPiece.active) this.generateNewPiece()
        // else this.plotTile(this.currentPiece)
        this.plotTile(this.currentPiece)
      }
    })
  }

  playGame() {
      setInterval(() => {
        
        if (!this.currentPiece.active) {
          this.generateNewPiece()
          this.removeTiles(this.currentPiece)
          // this.plotTile(this.currentPiece)
        } else {
          this.removeTiles(this.currentPiece)
          this.currentPiece.checkFall(this.gameBoard.grid)
          
        }
        this.plotTile(this.currentPiece)
        // -- Chris thought -- Try to calculate fall placement before it is removed
        
        // if (!this.currentPiece.active) this.generateNewPiece()
        
        this.control += 1
      }, 1000)
  }

  startGame() {
    this.moveTile()
    this.playGame()
  }
}

class Board {
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

class iPiece {
  constructor() {
    this.color = 'lightblue'
    this.rotateIndex = 1
    this.active = true
    this.center = [5, 2]

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

  checkRotate(grid) {
    let check = 'false'
    let xRotateAmount = - 1
    let xRotateIncrement = + 1
    if (this.rotateIndex === 0) {
      xRotateAmount = + 1
      xRotateIncrement = - 1
    }
    this.tiles.forEach(tile => {
      let [x, y] = tile
      x += xRotateAmount
      y = y + (xRotateAmount * - 1)
      if(check === 'false') {
        check = grid[y][x].getAttribute(['data-taken'])
      }
      xRotateAmount += xRotateIncrement
    })
    if (check === 'false') {
      this.rotate()
    }
  }

  // Change the rotate index between 0 and 1 so the piece can figure out which
  // orientation it is
  rotate() {
  // if (this.bot[0] > 9 || this.top[0] < 1)
    this.rotateIndex = (this.rotateIndex + 1) % 2
    this.calculatePieces()
  }

  // Method to check if the shape can move down then the method fall will be called if not then it will return false.
  checkFall(grid) {
    let check = 'false'
    this.tiles.forEach(tile => {
      let [x, y] = tile
      y += 1
      if(check === 'false') {
        check = grid[y][x].getAttribute(['data-taken'])
      }
    })
    if (check === 'true') {
      this.tiles.forEach(tile => {
        const [x, y] = tile
        grid[y][x].dataset.taken = 'true'
      })
      this.active = false
    } else {
      this.fall()
    }
  }

  // Method to lower the shape, make sure the shape doesn't go out of the bottom of the screen. The center is decreased by one and then the rest are recalculated.
  fall() {
    // if (this.bot[1] < 10) {
      this.center[1] += 1
      this.calculatePieces()
    // }
  }

  checkLeft(grid) {
    let check = 'false'
    this.tiles.forEach(tile => {
      let [x, y] = tile
      x -= 1
      if(check === 'false') {
        check = grid[y][x].getAttribute(['data-taken'])
      }
    })
    if (check === 'false') {
      this.left()
    }
  }

  // Method to move the shape to the left, make sure the shape doesn't go out of the left of the screen. The center is moved by one to the left and then the rest are recalculated.
  left() {
    if (this.top[0] > 0){
      this.center[0] = this.center[0] - 1
      this.calculatePieces()
    }
  }

  checkRight(grid) {
    let check = 'false'
    this.tiles.forEach(tile => {
      let [x, y] = tile
      x += 1
      if(check === 'false') {
        check = grid[y][x].getAttribute(['data-taken'])
      }
    })
    if (check === 'false') {
      this.right()
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

class oPiece {
  constructor() {
    this.color = 'yellow'
    this.active = true
    this.center = [5, 1]

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

  checkFall(grid) {
    let check = 'false'
    this.tiles.forEach(tile => {
      let [x, y] = tile
      y += 1
      if(check === 'false') {
        check = grid[y][x].getAttribute(['data-taken'])
      }
    })
    if (check === 'true') {
      this.tiles.forEach(tile => {
        const [x, y] = tile
        grid[y][x].dataset.taken = 'true'
      })
      this.active = false
    } else {
      this.fall()
    }
  }

  fall() {
    if (this.bot[1] < 10) {
      this.center[1] += 1
      this.calculatePieces()
    }
  }

  checkRotate() {
    this.rotate()
  }

  rotate() {
    console.log("Nothing happens ye fool")
  }

  checkLeft(grid) {
    let check = 'false'
    this.tiles.forEach(tile => {
      let [x, y] = tile
      x -= 1
      if(check === 'false') {
        check = grid[y][x].getAttribute(['data-taken'])
      }
    })
    if (check === 'false') {
      this.left()
    }
  }

  left() {
    if (this.center[0] > 0) {
      this.center[0] -= 1
      this.calculatePieces()
    }
  }

  checkRight(grid) {
    let check = 'false'
    this.tiles.forEach(tile => {
      let [x, y] = tile
      x += 1
      if(check === 'false') {
        check = grid[y][x].getAttribute(['data-taken'])
      }
    })
    if (check === 'false') {
      this.right()
    }
  }

  right() {
    if (this.topRight[0] < 10) {
      this.center[0] += 1
      this.calculatePieces()
    }
  }
}

class tPiece {
  constructor() {
    this.color = 'purple'
    this.active = true
    this.center = [5, 1]
    this.rotateIndex = 0


    this.calculatePieces()
  }

  calculatePieces() {
    this.leftCenter = [ ...this.center ]
    this.botCenter = [ ...this.center ]
    this.rightCenter = [ ...this.center ]
    switch (this.rotateIndex) {
      case (0):
        this.calculateLeft(this.leftCenter);
        this.calculateBot(this.botCenter);
        this.calculateRight(this.rightCenter);
        break
      case(1):
        this.calculateBot(this.leftCenter);
        this.calculateRight(this.botCenter);
        this.calculateTop(this.rightCenter);
        break
      case(2):
        this.calculateRight(this.leftCenter);
        this.calculateTop(this.botCenter);
        this.calculateLeft(this.rightCenter);
      break
      case(3):
        this.calculateTop(this.leftCenter);
        this.calculateLeft(this.botCenter);
        this.calculateBot(this.rightCenter);
      break
    }

    this.tiles = [this.leftCenter, this.center, this.botCenter, this.rightCenter]
  }

  calculateLeft(piece) {
    piece[0] -= 1
  }

  calculateBot(piece) {
    piece[1] += 1
  }

  calculateRight(piece) { 
    piece[0] += 1
  }

  calculateTop(piece) {
    piece[1] -= 1
  }

  rotate() {
    this.rotateIndex = (this.rotateIndex + 1) % 4
    this.calculatePieces()
  }

  checkFall() {
    this.fall()
  }

  fall() {
    this.center[1] += 1
    this.calculatePieces()
  }

  checkLeft() {
    this.left()
  }

  left() {
    this.center[0] -= 1
    this.calculatePieces()
  }

  checkRight() {
    this.right()
  }

  right() {
    this.center[0] += 1
    this.calculatePieces()
  }

}

const game = new Game

const btn = document.querySelector('button')
btn.onclick = () => {
  game.startGame()
}

const btn2 = document.querySelector('.test-btn')
btn2.onclick = () => {
  game.generateNewPiece()
  // console.log('test')
}
