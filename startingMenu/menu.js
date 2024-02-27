import { Game } from '../game.js'

export class StartingMenu {
  constructor(){
    this.startBtn = document.querySelector('.start-game');
    this.homePageBtn = document.querySelector('.home-btn')
    this.restartBtn = document.querySelector('.play-again-btn')
    this.addListeners()
  }

  startTheGame() {
    this.openScreen = document.querySelector('.open-screen')
    this.game = new Game
    const newName = document.querySelector('.name')
    document.querySelector('.player-display').innerText = newName.value
    newName.value = ''
    this.openScreen.classList.add('hidden')
    this.game.startGame()
  }

  returnToHome() {
    this.openScreen = document.querySelector('.open-screen')
    this.closeScreen = document.querySelector('.close-screen')
    this.openScreen.classList.remove('hidden')
    this.closeScreen.classList.add('hidden')
    this.resetGameState()
    this.game = null
    
  }

  playAgain() {
    this.closeScreen = document.querySelector('.close-screen')
    this.closeScreen.classList.add('hidden')
    this.resetGameState()
    this.game = new Game
    this.game.startGame()
  }

  resetGameState() {
    document.querySelectorAll('.row').forEach(row => {
      row.remove()
    })
    document.querySelectorAll('.side-row').forEach(row => {
      row.remove()
    })
  }


  addListeners() {
    this.startBtn.addEventListener('click', this.startTheGame)
    this.homePageBtn.addEventListener('click', this.returnToHome.bind(this))
    this.restartBtn.addEventListener('click', this.playAgain.bind(this))
  }

}