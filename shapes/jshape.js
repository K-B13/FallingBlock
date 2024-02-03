import { Shape } from "./shape.js"
export class jPiece extends Shape {
  constructor(start) {
    super(start)
    this.color = 'dark-blue'
    this.center = [this.startX, 2]
    this.rotateIndex = 0

    this.rotations = [this.calculateOriginalRotation, this.calculate90Rotation, this.calculate180Rotation, this.calculate270Rotation]

    this.calculatePieces()
  }

  calculatePieces() {
    this.top = [ ...this.center ]
    this.bot = [ ...this.center ]
    this.botLeft = [ ...this.center ]
    switch (this.rotateIndex) {
      case (0):
        this.calculateOriginalRotation(this.top, this.bot, this.botLeft)
        break
      case (1):
        this.calculate90Rotation(this.top, this.bot, this.botLeft)
        break
      case (2):
        this.calculate180Rotation(this.top, this.bot, this.botLeft)
        break
      case (3):
        this.calculate270Rotation(this.top, this.bot, this.botLeft)
        break
    }
    this.tiles = [this.top, this.center, this.bot, this.botLeft]
  }

  calculateOriginalRotation(firstTile, secondTile, thirdTile) {
    firstTile[1] -= 1
    secondTile[1] += 1
    thirdTile[0] -= 1
    thirdTile[1] += 1
  }

  calculate90Rotation(firstTile, secondTile, thirdTile) {
    firstTile[0] -= 1
    secondTile[0] += 1
    thirdTile[0] += 1
    thirdTile[1] += 1
  }

  calculate180Rotation(firstTile, secondTile, thirdTile) {
    firstTile[1] += 1
    secondTile[1] -=1
    thirdTile[0] += 1
    thirdTile[1] -= 1
  }

  calculate270Rotation(firstTile, secondTile, thirdTile) {
    firstTile[0] += 1
    secondTile[0] -= 1
    thirdTile[0] -= 1
    thirdTile[1] -= 1
  }

  checkRotate(grid) {
    let check = 'false'
    const rotationAmount = (this.rotateIndex + 1) % 4
    let testTop = [ ...this.center ]
    let testBot = [ ...this.center ]
    let testBotLeft = [ ...this.center ]
    this.rotations[rotationAmount](testTop, testBot, testBotLeft)
    const fakeTiles = [testTop, testBot, testBotLeft ]
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
      this.rotateIndex = (this.rotateIndex + 1) % 4
      this.calculatePieces()
    }
  }

  fall() {
    if (this.active) {
      this.center[1] += 1
      this.calculatePieces()
    }
  }

  left() {
    if (this.active) {
      this.center[0] -= 1
      this.calculatePieces()
    }
  }

  right() {
    if (this.active) {
      this.center[0] += 1
      this.calculatePieces()
    }
  }

  undoPreviewView() {
    this.center = [this.startX, 2]
    this.calculatePieces()
  }

  reset() {
    this.center = [1, 1]
    this.rotateIndex = 0
    this.calculatePieces()
  }
}
