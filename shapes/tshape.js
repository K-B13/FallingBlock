export class tPiece {
  constructor() {
    this.color = 'purple'
    this.active = true
    this.center = [7, 1]
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

  checkRotate(grid) {
    let check = 'false'
    const rotateDifferences = [[1, 1], [1, -1], [-1, -1], [-1, 1]]
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