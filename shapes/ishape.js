export class iPiece {
  constructor(start) {
    this.color = 'lightblue'
    this.rotateIndex = 1
    this.active = true
    this.center = [start, 2]

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
    let check = 'false'
    // Some calculations to find out if its rotated position will be free. The x coordinate will be changed by the xRotateAmount will the y will be changes by the inverse of the xRotateAmount.
    // xRotateIncrement will change the xRotateAmount each iteration.
    // Add a Turnery 0 falsey value
    let xRotateAmount = - 1
    let xRotateIncrement = 1
    // Checking if the piece is at a different orientation and just uses the inverse for xRotateAmount and xRotateIncrement
    if (this.rotateIndex === 0) {
      xRotateAmount = 1
      xRotateIncrement = - 1
    }
    this.tiles.forEach(tile => {
      if(check === 'false') {
        let [x, y] = tile
        x += xRotateAmount
        y += (xRotateAmount * - 1)
      // Checks to see if a position has already been found to be taken, if there hasn't been a spot taken yet it will check the current tile. 
        check = grid[y][x].getAttribute(['data-taken'])
        xRotateAmount += xRotateIncrement
      }
    })
    if (check === 'false') {
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
    if (this.active) {
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
    if (this.active) {
      this.center[0] = this.center[0] + 1
      this.calculatePieces()
    }
  }

  reset(start) {
    this.center = [start, 2]
    this.rotateIndex = 1
    this.calculatePieces()
  }
}