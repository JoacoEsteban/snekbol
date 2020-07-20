import ConnectionController from './ConnectionController'
window.CONNECTION = new ConnectionController()

require('../styles/scss/main.scss');
require('./mobilecheck')
window.axios = require('axios')
window._ = require('lodash')
window.$ = require('jquery')
window.Hammer = require('hammerjs')

require('./vue-app')