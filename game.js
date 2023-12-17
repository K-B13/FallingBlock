import { Board } from './board.js'
import { iPiece, oPiece, tPiece, lPiece, jPiece, zPiece, sPiece } from './shapes/allshapes.js'

export class Game {
  constructor() {
    this.gameBoard = new Board
    this.gameBoard.createBoard()

    this.possiblePieces = [iPiece, oPiece, tPiece, lPiece, jPiece, zPiece, sPiece]
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