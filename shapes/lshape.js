import { Shape } from "./shape.js"
export class lPiece extends Shape {
  constructor(start) {
    super(start)
    this.color = 'orange'
    this.center = [this.startX, 2]
    this.rotateIndex = 0

    this.rotations = [this.calculateOriginalRotation, this.calculate90Rotation, this.calculate180Rotation, this.calculate270Rotation]

    this.calculatePieces()
  }

  calculatePieces() {
    this.top = [ ...this.center ]
    this.bot = [ ...this.center ]
    this.botRight = [ ...this.center ]
    switch (this.rotateIndex) {
      case (0):
        this.calculateOriginalRotation(this.top, this.bot, this.botRight)
        break
      case (1):
        this.calculate90Rotation(this.top, this.bot, this.botRight)
        break
      case (2):
        this.calculate180Rotation(this.top, this.bot, this.botRight)
        break
      case (3):
        this.calculate270Rotation(this.top, this.bot, this.botRight)
        break
    }
    this.tiles = [this.top, this.center, this.bot, this.botRight]
  }

  calculateOriginalRotation(firstTile, secondTile, thirdTile) {
    firstTile[1] -= 1
    secondTile[1] += 1
    thirdTile[0] += 1
    thirdTile[1] += 1
  }

  calculate90Rotation(firstTile, secondTile, thirdTile) {
    firstTile[0] -= 1
    secondTile[0] += 1
    thirdTile[0] += 1
    thirdTile[1] -= 1
  }

  calculate180Rotation(firstTile, secondTile, thirdTile) {
    firstTile[1] += 1
    secondTile[1] -=1
    thirdTile[0] -= 1
    thirdTile[1] -= 1
  }

  calculate270Rotation(firstTile, secondTile, thirdTile) {
    firstTile[0] += 1
    secondTile[0] -= 1
    thirdTile[0] -= 1
    thirdTile[1] += 1
  }

  checkRotate(grid) {
    let canNotRotate = 'false'
    const rotationAmount = (this.rotateIndex + 1) % 4
    let fakeTop = [ ...this.center ]
    let fakeBot = [ ...this.center ]
    let fakeBotRight = [ ...this.center ]
    this.rotations[rotationAmount](fakeTop, fakeBot, fakeBotRight)
    const fakeTiles = [fakeTop, fakeBot, fakeBotRight]
    fakeTiles.forEach((tile) => {
      let [x, y] = tile
      if(canNotRotate === 'false') {
        canNotRotate = grid[y][x].getAttribute(['data-taken'])
      }
    })
    if (canNotRotate === 'false') {
      this.rotate()
    }
  }

  rotate() {
    if (this.active) {
      this.rotateIndex = (this.rotateIndex + 1) % 4
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

