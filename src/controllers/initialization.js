require('./requires')

import App from './App'
import Game from './Game'

window.SnakeApp = new App()
SnakeApp.game = new Game()

require('./vue-app')