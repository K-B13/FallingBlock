import { Board } from './board.js'
import { iPiece, oPiece, tPiece, lPiece, jPiece, zPiece, sPiece } from './shapes/allshapes.js'

export class Game {
  constructor() {
    // Create an instance of the board class
    this.gameBoard = new Board
    // Calls the method in the board class that creates the grid.
    this.gameBoard.createBoard()

    // Array of all the possible pieces. Will be randomly selected and then used to create the pieces.
    this.possiblePieces = [sPiece, iPiece, jPiece, lPiece, tPiece, oPiece, zPiece]

    this.endScreen = document.querySelector('.close-screen')
    // This is used to calculate where the new piece will start. It calculates the middle of the width and rounds up.
    this.startLocation = Math.floor(this.gameBoard.width / 2);
    // This calls the method to generate one piece when the game is started.
    this.gamePlay = null;
    this.ongoingGame = true;
    
    this.gamePieces = [];
    this.storedPiece = - 1;
    this.generateStartingPieces();

    this.sideGrids = ['reserve-piece', 'first-future-piece', 'second-future-piece','third-future-piece']
    this.createExtraDisplays();
    this.updateSideTiles()
  }

  createExtraDisplays() {
    this.sideGrids.forEach(indivGrid => {
      this.gameBoard.createSideRows(indivGrid)
    })
  }

  plotSideTiles(className, piece) {
    const sideGrid = document.querySelector(`.${className}`).children
    piece.reset()
    piece.tiles.forEach((tile) => {
      const [x, y] = tile
      sideGrid[y].children[x].classList.add(piece.color)
    })
  }

  clearSideTiles(className, parentDiv) {
    document.querySelector(`.${className}`).remove()
    const newDiv = document.createElement('div')
    newDiv.classList.add(className)
    document.querySelector(`.${parentDiv}`).appendChild(newDiv)
    this.gameBoard.createSideRows(className)

  }

  updateSideTiles() {
    for(let i = 1; i < this.gamePieces.length; i++) {
      this.clearSideTiles(this.sideGrids[i], 'future-pieces')
      this.plotSideTiles(this.sideGrids[i], this.gamePieces[i])
    }
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
  }

  // This calls the method that creates a new piece and then also calls the plot tile piece with the current piece being moved.
  generateNewPiece() {
    this.gamePieces.shift()
    this.gamePieces[0].undoPreviewView()
    this.checkStartLocation()
    const piece = this.selectPiece()
    this.gamePieces.push(piece)
    this.updateSideTiles()
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
      this.gamePlay = null
      this.endScreen.classList.remove('hidden')
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
      this.gameBoard.grid[y][x].dataset.taken = 'false'
    })
  }

  endGame() {
    document.removeEventListener('keydown',this.keyListeners.bind(this))
  }

  // Method has the logic for reacting to the keypresses for the piece movement.
  moveTile() {
    // This reads the keys that are pressed
    document.addEventListener('keydown', this.keyListeners.bind(this))
  }

  keyListeners(e) {
    // This checks if the key pressed is right.
    if (e.key === 'ArrowRight' && this.gamePieces[0].active && this.ongoingGame) {
      // The tile is removed from its current location then the coordinates of the piece are moved to the right before the piece is replotted on the grid again.
      this.removeTiles(this.gamePieces[0])
      this.gamePieces[0].checkRight(this.gameBoard.grid);
      this.plotTile(this.gamePieces[0])
    }
    // The tile is removed from its current location then the coordinates of the piece are moved to the left before the piece is replotted on the grid again.
    if (e.key === 'ArrowLeft' && this.gamePieces[0].active && this.ongoingGame) {
      this.removeTiles(this.gamePieces[0])
      this.gamePieces[0].checkLeft(this.gameBoard.grid);
      this.plotTile(this.gamePieces[0])
    }
    // The tile is removed from its current location then the coordinates of the piece ared rotated before the piece is replotted on the grid again.
    if (e.key === 'ArrowUp' && this.gamePieces[0].active && this.ongoingGame) {
      this.removeTiles(this.gamePieces[0])
      this.gamePieces[0].checkRotate(this.gameBoard.grid);
      this.plotTile(this.gamePieces[0])
    }
    // The tile is removed from its current location then the coordinates of the piece are moved down one grid position before the piece is replotted on the grid again.
    if (e.key === 'ArrowDown' && this.gamePieces[0].active &&  this.ongoingGame) {
      this.removeTiles(this.gamePieces[0])
      this.gamePieces[0].checkFall(this.gameBoard.grid)
      this.plotTile(this.gamePieces[0])
    }

    if (e.key === 'm' && this.gamePieces[0].active && this.ongoingGame) {
      // Clear the piece from the board before I do anything else
      this.removeTiles(this.gamePieces[0])
      // Check if there is a piece in storage. If there is a piece stored run this code.
      if (this.storedPiece !== -1) {
        const toStorage = this.gamePieces[0]
        const fromStorage = this.storedPiece
        // Store the current piece in storage.
        this.storedPiece = toStorage
        // Set the current piece to what was being stored.
        this.gamePieces[0] = fromStorage
        // Clear the side tile for reserved pieces.
        this.clearSideTiles('reserve-piece', 'reserve-container')
      } else {
        // Sets the current piece to storage.
        this.storedPiece = this.gamePieces[0]
        // removes the current piece from the list of game Pieces
        this.gamePieces.shift()
        // Adds a new piece to the end of gamePieces.
        this.gamePieces.push(this.selectPiece())
      }
      // Plots the new stored piece in the reserve piece menu.
      this.plotSideTiles('reserve-piece', this.storedPiece)
      // The new piece that has become the current piece needs its coordinates reset for the big board.
      this.gamePieces[0].undoPreviewView()
      // Draw the new piece on the board.
      this.plotTile(this.gamePieces[0])
      // Update all the side grids so they now display the currect upcoming pieces.
      this.updateSideTiles()
    }

    if (e.key === 'p') {
      // checks it the game is ongoing. If it is run the code.
      if (this.ongoingGame) {
        // Stops the interval timer. The parameter fed is the variable containing the setInterval running the game.
        clearInterval(this.gamePlay)
        this.ongoingGame = false
      } else {
        // Restarts the game if the game is currently paused.
        this.playGame()
      }
    }

    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
    }
  }

  playGame() {
    this.gamePlay = setInterval(() => {
      this.ongoingGame = true
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
      }, 500)
  }

  startGame() {
    this.moveTile()
    this.playGame()
  }
}