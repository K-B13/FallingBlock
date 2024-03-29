import { Shape } from "./shape.js"
export class iPiece extends Shape {
  constructor(start) {
    super(start)
    this.color = 'lightblue'
    this.center = [this.startX, 2]
    this.rotateIndex = 1
    
    this.calculatePieces()
  }

  // Calculate the 3 coordinates that are not the center
  calculatePieces() {
    // Copy the center coordinates so the coordinate can be calculated off of it.
    this.top = [ ...this.center ]
    // The rotate index will be between 1 and 0 which will target the x or the y of the piece.
    // Then the x or y coordinate is subtracted by one to give the coordinate for the relavent tile, the other tiles will be offset by a different amount.
    this.top[this.rotateIndex] = this.top[this.rotateIndex] - 1
    this.botMiddle = [ ...this.center ]
    this.botMiddle[this.rotateIndex] = this.botMiddle[this.rotateIndex] + 1
    this.bot = [ ...this.center ]
    this.bot[this.rotateIndex] = this.bot[this.rotateIndex] + 2

    // An array of all the spots of the piece.
    this.tiles = [this.top, this.center, this.botMiddle, this.bot]
  }

  checkRotate(grid) {
    // This will be a flag to check if all spots are free if at least one is not free then it will change to true.
    let canNotRotate = 'false'
    // Some calculations to find out if its rotated position will be free. The x coordinate will be changed by the xRotateAmount will the y will be changes by the inverse of the xRotateAmount.
    // xRotateIncrement will change the xRotateAmount each iteration.
    // Checking if the piece is at a different orientation and just uses the inverse for xRotateAmount and xRotateIncrement
    let xRotateAmount = this.rotateIndex ? - 1: 1
    let xRotateIncrement = this.rotateIndex ? 1: - 1

    this.tiles.forEach(tile => {
      if(canNotRotate === 'false') {
        let [x, y] = tile
        x += xRotateAmount
        y += (xRotateAmount * - 1)
      // Checks to see if a position has already been found to be taken, if there hasn't been a spot taken yet it will check the current tile. 
      canNotRotate = grid[y][x].getAttribute(['data-taken'])
        xRotateAmount += xRotateIncrement
      }
    })
    if (canNotRotate === 'false') {
      this.rotate()
    }
  }

  // Change the rotate index between 0 and 1 so the piece can figure out which
  // orientation it is
  rotate() {
    if (this.active) {
      this.rotateIndex = (this.rotateIndex + 1) % 2
      this.calculatePieces()
    }
  }

  undoPreviewView() {
    this.center = [this.startX, 2]
    this.calculatePieces()
  }
  
  reset() {
    this.center = [1, 1]
    this.rotateIndex = 1
    this.calculatePieces()
  }

}