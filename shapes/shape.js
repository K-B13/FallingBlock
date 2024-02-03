export class Shape {
  constructor(start) {
    this.active = true
    this.startX = start
  }

  checkFall(grid) {
    let canNotFall = 'false'
    this.tiles.forEach(tile => {
      let [x, y] = tile
      y += 1
      if(canNotFall === 'false') {
        canNotFall = grid[y][x].getAttribute(['data-taken'])
      }
    })
    if (canNotFall === 'true') {
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
    let canNotLeft = 'false'
    this.tiles.forEach(tile => {
      let [x, y] = tile
      x -= 1
      if(canNotLeft === 'false') {
        canNotLeft = grid[y][x].getAttribute(['data-taken'])
      }
    })
    if (canNotLeft === 'false') {
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
    let canNotRight = 'false'
    this.tiles.forEach(tile => {
      let [x, y] = tile
      x += 1
      if(canNotRight === 'false') {
        canNotRight = grid[y][x].getAttribute(['data-taken'])
      }
    })
    if (canNotRight === 'false') {
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