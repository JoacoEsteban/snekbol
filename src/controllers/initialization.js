import ConnectionController from './ConnectionController'

window.CONNECTION = new ConnectionController()

require('../styles/scss/main.scss');
require('./mobilecheck')
window._ = require('lodash')
window.$ = require('jquery')
window.Hammer = require('hammerjs')

require('./GoogleAds')
require('./vue-app')