export class zPiece {
  constructor(start) {
    this.color = 'red'
    this.active = true
    this.center = [start, 1]
    this.rotateIndex = 0

    this.rotations = [this.calculateOriginalRotation, this.calculate90Rotation]

    this.calculatePieces()
  }

  calculatePieces() {
    this.leftTop = [ ...this.center ]
    this.bot = [ ...this.center ]
    this.botRight = [ ...this.center ]
    switch (this.rotateIndex) {
      case (0):
        this.calculateOriginalRotation(this.leftTop, this.bot, this.botRight)
        break
      case (1):
        this.calculate90Rotation(this.leftTop, this.bot, this.botRight)
        break
    }

    this.tiles = [this.leftTop, this.center, this.bot, this.botRight]
  }

  calculateOriginalRotation(firstTile, secondTile, thirdTile) {
    firstTile[0] -= 1
    secondTile[1] += 1
    thirdTile[0] += 1
    thirdTile[1] += 1
  }

  calculate90Rotation(firstTile, secondTile, thirdTile) {
    firstTile[1] += 1
    secondTile[0] += 1
    thirdTile[0] += 1
    thirdTile[1] -= 1
  }
  

  checkRotate(grid) {
    let check = 'false'
    const rotationAmount = (this.rotateIndex + 1) % 2
    let testLeft = [ ...this.center ]
    let testBot = [ ...this.center ]
    let testBotRight = [ ...this.center ]
    this.rotations[rotationAmount](testLeft, testBot, testBotRight)
    const fakeTiles = [testLeft, testBot, testBotRight]
    fakeTiles.forEach((tile) => {
      let [x, y] = tile
      if(check === 'false') {
        check = grid[y][x].getAttribute(['data-taken'])
      }
    })
    if (check === 'false') {
      this.rotate()
    }
  }

  rotate() {
    if (this.active) {
      this.rotateIndex = (this.rotateIndex + 1) % 2
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
    if (this.active) {
      this.center[1] += 1
      this.calculatePieces()
    }
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

