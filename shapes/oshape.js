import { Shape } from "./shape.js"
export class oPiece extends Shape {
  constructor(start) {
    super(start)
    this.color = 'yellow'
    this.center = [this.startX, 1]

    this.calculatePieces()
  }

  calculatePieces() {
    this.bot = [ ...this.center ]
    this.bot[1] = this.bot[1] + 1

    this.botRight = [ ...this.center ]
    this.botRight.forEach((coord, index) => {
      this.botRight[index] = coord + 1
    })

    this.topRight = [ ...this.center ]
    this.topRight[0] = this.topRight[0] + 1

    this.tiles = [this.bot, this.botRight, this.center, this.topRight]
  }

  checkRotate() {
    this.rotate()
  }

  rotate() {
    console.log("Nothing happens ye fool")
  }

  undoPreviewView() {
    this.center = [this.startX, 2]
    this.calculatePieces()
  }

  reset() {
    this.center = [1, 1]
    this.calculatePieces()
  }
}