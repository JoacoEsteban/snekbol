require('./requires')

import App from './App'
import Game from './Game'
import ConnectionController from './ConnectionController'

window.SnakeApp = new App()
SnakeApp.game = new Game()
window.CONNECTION = new ConnectionController()

require('./vue-app')