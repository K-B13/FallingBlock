export class iPiece {
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