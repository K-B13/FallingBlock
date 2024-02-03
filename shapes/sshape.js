import { Shape } from './shape.js'
export class sPiece extends Shape {
  constructor(start) {
    super(start)
    this.color = 'green'
    this.center = [this.startX, 1]
    this.rotateIndex = 0

    this.rotations = [this.calculateOriginalRotation, this.calculate90Rotation]

    this.calculatePieces()
  }

  calculatePieces() {
    this.rightTop = [ ...this.center ]
    this.bot = [ ...this.center ]
    this.botLeft = [ ...this.center ]
    switch (this.rotateIndex) {
      case (0):
        this.calculateOriginalRotation(this.rightTop, this.bot, this.botLeft)
        break
      case (1):
        this.calculate90Rotation(this.rightTop, this.bot, this.botLeft)
        break
    }
    this.tiles = [this.rightTop, this.center, this.bot, this.botLeft]
  }

  calculateOriginalRotation(firstTile, secondTile, thirdTile) {
    firstTile[0] += 1
    secondTile[1] += 1
    thirdTile[0] -= 1
    thirdTile[1] += 1
  }

  calculate90Rotation(firstTile, secondTile, thirdTile) {
    firstTile[1] -= 1
    secondTile[0] += 1
    thirdTile[0] += 1
    thirdTile[1] += 1
  }
  

  checkRotate(grid) {
    let canNotRotate = 'false'
    const rotationAmount = (this.rotateIndex + 1) % 2
    let fakeLeft = [ ...this.center ]
    let fakeBot = [ ...this.center ]
    let fakeBotRight = [ ...this.center ]
    this.rotations[rotationAmount](fakeLeft, fakeBot, fakeBotRight)
    const fakeTiles = [fakeLeft, fakeBot, fakeBotRight ]
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
      this.rotateIndex = (this.rotateIndex + 1) % 2
      this.calculatePieces()
    }
  }

  undoPreviewView() {
    this.center = [this.startX, 1]
    this.calculatePieces()
  }

  reset() {
    this.center = [1, 1]
    this.rotateIndex = 0
    this.calculatePieces()
  }
}

