import ConnectionController from './ConnectionController'
// const url = '192.168.100.15:5000'
let url;
window.CONNECTION = new ConnectionController(url)

require('../styles/scss/main.scss');
require('./mobilecheck')
window.axios = require('axios')
window._ = require('lodash')
window.$ = require('jquery')
window.Hammer = require('hammerjs')

require('./vue-app')