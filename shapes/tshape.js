export class tPiece {
  constructor(start) {
    // Color of the piece. Used for the class name that will design the tPiece.
    this.color = 'purple'
    // This is used to know whether the player should be able to move the piece or not.
    this.active = true
    // The center coordinate for the piece. The start parameter will be the center column and the 1 means it will start 1 space off of the top.
    this.center = [start, 1]
    // This will be used to understand which orientation the piece is currently.
    this.rotateIndex = 0

    this.number = 2

    // Used to calculate all points of the shape when it is first created giving it shape.
    this.calculatePieces()
  }

  calculatePieces() {
    // First I give the other coordinates the center coordinates. The spread operater is used to give it the values and not just a reference to where the center variable is stored.
    this.leftCenter = [ ...this.center ]
    this.botCenter = [ ...this.center ]
    this.rightCenter = [ ...this.center ]
    // Switch statement is used with the rotate Index to calculate the other points off of the center point.
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

    // An array with all the coordinates of the piece.
    this.tiles = [this.leftCenter, this.center, this.botCenter, this.rightCenter]
  }

  // Method to calculate to the left of the center.
  calculateLeft(piece) {
    piece[0] -= 1
  }

  // Method to calculate just below the center.
  calculateBot(piece) {
    piece[1] += 1
  }

  // Method to calulate to the right of the center.
  calculateRight(piece) { 
    piece[0] += 1
  }

  // Method to calculate just above the center.
  calculateTop(piece) {
    piece[1] -= 1
  }

  checkRotate(grid) {
    // Sets a variable false this will be used to identify whether each new coordinate is free to use.
    let check = 'false'
    // An array with all the possible coordinates of the points which are not the center point.
    const rotateDifferences = [[1, 1], [1, -1], [-1, -1], [-1, 1]]
    // Used an alternative variable instead of the actual rotateIndex 
    let rotateIndexCheck = this.rotateIndex
    this.tiles.forEach((tile, index) => {
      if (index !== 1) {
        let [x, y] = tile
        x += rotateDifferences[rotateIndexCheck][0]
        y += rotateDifferences[rotateIndexCheck][1]
        if(check === 'false') {
          check = grid[y][x].getAttribute(['data-taken'])
        }
        rotateIndexCheck = (rotateIndexCheck + 1) % 4 
      }
    })
    if (check === 'false') {
      this.rotate()
    }
  }

  rotate() {
    if (this.active) {
      this.rotateIndex = (this.rotateIndex + 1) % 4
      this.calculatePieces()
    }
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
      this.active = false
      this.tiles.forEach(tile => {
        const [x, y] = tile
        grid[y][x].dataset.taken = 'true'
      })
    } else {
      this.fall()
    }
  }

  fall() {
    this.center[1] += 1
    this.calculatePieces()
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
    if (this.active) {
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
    if (this.active) {
      this.center[0] += 1
      this.calculatePieces()
    }
  }

}