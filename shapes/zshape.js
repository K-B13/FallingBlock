import { Shape } from "./shape.js"
export class zPiece extends Shape {
  constructor(start) {
    super(start)
    this.color = 'red'
    this.center = [this.startX, 1]
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

