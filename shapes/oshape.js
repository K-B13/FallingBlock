export class oPiece {
  constructor(start) {
    this.color = 'yellow'
    this.active = true
    this.startX = start
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

  fall() {
    this.center[1] += 1
    this.calculatePieces()
  }

  checkRotate() {
    this.rotate()
  }

  rotate() {
    console.log("Nothing happens ye fool")
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

  undoPreviewView() {
    this.center = [this.startX, 2]
    this.calculatePieces()
  }

  reset() {
    this.center = [1, 1]
    this.calculatePieces()
  }
}