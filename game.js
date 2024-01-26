import { Board } from './board.js'
import { iPiece, oPiece, tPiece, lPiece, jPiece, zPiece, sPiece } from './shapes/allshapes.js'

export class Game {
  constructor() {
    // Create an instance of the board class
    this.gameBoard = new Board
    // Calls the method in the board class that creates the grid.
    this.gameBoard.createBoard()

    // Array of all the possible pieces. Will be randomly selected and then used to create the pieces.
    this.possiblePieces = [iPiece, oPiece, tPiece, lPiece, jPiece, zPiece, sPiece]
    // Keeps track of the "current piece", which is the piece that is being controlled by the user.
    this.currentPiece = null;
    // This is used to calculate where the new piece will start. It calculates the middle of the width and rounds up.
    this.startLocation = Math.floor(this.gameBoard.width / 2);
    // This calls the method to generate one piece when the game is started.
    this.gamePlay = null;
    this.ongoingGame = true;
    
    this.gamePieces = [];
    this.storedPiece = -1;
    this.generateStartingPieces();
  }

  // This method generates a random number up to the number of pieces in the array holding the piece classes. then the selected number is used to grab one of the piece classes from the array and create a piece setting the current piece to the new piece created.
  selectPiece() {
    const randomNumber = Math.floor(Math.random() * this.possiblePieces.length)
    const selectedPiece = this.possiblePieces[randomNumber]
    return new selectedPiece(this.startLocation)
  }

  generateStartingPieces() {
    for (let i = 0; i < 4; i++) {
      const piece = this.selectPiece()
      this.gamePieces.push(piece)
    }
    this.checkStartLocation()
  }

  // This calls the method that creates a new piece and then also calls the plot tile piece with the current piece being moved.
  generateNewPiece() {
    this.gamePieces.shift()
    const piece = this.selectPiece()
    this.gamePieces.push(piece)
    this.checkStartLocation()
    
  }

  // Before generating a new piece check the starting location.
  checkStartLocation() {
    let takenSpace = 'false'
    this.gamePieces[0].tiles.forEach(tile => {
      let [x, y] = tile
      if (takenSpace === 'false'){
        takenSpace = this.gameBoard.grid[y][x].getAttribute(['data-taken'])
      }
    })
    if (takenSpace === 'false'){
      this.plotTile(this.gamePieces[0])
    } else {
      this.ongoingGame = false
      clearInterval(this.gamePlay)
    }
  }

  // This method loops through the current pieces tile array which holds the coordinates of each point in the shape and then maps it onto the grid giving those grid positions the class name of the piece color.
  plotTile(piece) {
    piece.tiles.forEach((tile) => {
      const [x, y] = tile;
      this.gameBoard.grid[y][x].classList.add(piece.color)
    })
  }

  // This method loops throught the tiles of the current piece and then removes the color classname in each of those positions on the grid.
  removeTiles(piece) {
    piece.tiles.forEach((tile) => {
      const [x, y] = tile;
      this.gameBoard.grid[y][x].classList.remove(piece.color)
    })
  }

  // Method has the logic for reacting to the keypresses for the piece movement.
  moveTile() {
    // This reads the keys that are pressed
    document.addEventListener('keydown', (e) => {
      // This checks if the key pressed is right.
      if (e.key === 'ArrowRight' && this.ongoingGame) {
        // The tile is removed from its current location then the coordinates of the piece are moved to the right before the piece is replotted on the grid again.
        this.removeTiles(this.gamePieces[0])
        this.gamePieces[0].checkRight(this.gameBoard.grid);
        this.plotTile(this.gamePieces[0])
      }
      // The tile is removed from its current location then the coordinates of the piece are moved to the left before the piece is replotted on the grid again.
      if (e.key === 'ArrowLeft' && this.ongoingGame) {
        this.removeTiles(this.gamePieces[0])
        this.gamePieces[0].checkLeft(this.gameBoard.grid);
        this.plotTile(this.gamePieces[0])
      }
      // The tile is removed from its current location then the coordinates of the piece ared rotated before the piece is replotted on the grid again.
      if (e.key === 'ArrowUp' && this.ongoingGame) {
        this.removeTiles(this.gamePieces[0])
        this.gamePieces[0].checkRotate(this.gameBoard.grid);
        this.plotTile(this.gamePieces[0])
      }
      // The tile is removed from its current location then the coordinates of the piece are moved down one grid position before the piece is replotted on the grid again.
      if (e.key === 'ArrowDown' && this.ongoingGame) {
        this.removeTiles(this.gamePieces[0])
        this.gamePieces[0].checkFall(this.gameBoard.grid)
        this.plotTile(this.gamePieces[0])
      }

      if (e.key === 'm') {
        this.removeTiles(this.gamePieces[0])
        if (this.storedPiece !== -1) {
          const toStorage = this.gamePieces[0].number
          const fromStorage = this.possiblePieces[this.storedPiece]
          this.storedPiece = toStorage
          this.gamePieces[0] = new fromStorage(this.startLocation)
        } else {
          this.storedPiece = this.gamePieces[0].number
          this.gamePieces.shift()
          this.gamePieces.push(this.selectPiece())
        }
        this.plotTile(this.gamePieces[0])
      }
      
    })
  }

  playGame() {
        this.gamePlay = setInterval(() => {
        // checks if the piece is still active (when it is active it can move). If it is no longer active a new piece will be created and 
        if (!this.gamePieces[0].active) {
          this.gameBoard.checkRows(this.gamePieces[0])
          // Call the method here to check if a row should be removed.
          // this.gameBoard.checkRows(this.gamePieces[0])
          // Call the method to create a new piece.
          this.generateNewPiece()
          // Removes the tile coordinates so the new coordinates can be plotted.
          this.removeTiles(this.gamePieces[0])
        } else {
          // Removes the color class from the coordinates on the grid.
          this.removeTiles(this.gamePieces[0])
          // Moves the current piece's coordinates down by one on the grid.
          this.gamePieces[0].checkFall(this.gameBoard.grid)
          
        }
        // Re plots the current piece using its coordinates.
        if (this.ongoingGame) this.plotTile(this.gamePieces[0])
        console.log(this.gameBoard.score)        
      }, 500)
  }

  startGame() {
    this.moveTile()
    this.playGame()
  }
}