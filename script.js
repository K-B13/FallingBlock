import { Game } from './game.js'




const game = new Game

const btn = document.querySelector('button')
btn.onclick = () => {
  game.startGame()
}

const btn2 = document.querySelector('.test-btn')
btn2.onclick = () => {
  game.generateNewPiece()
  // console.log('test')
}
