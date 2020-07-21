const merge = require('webpack-merge').merge;
const common = require('./webpack.common.js');
console.log('me', merge)

module.exports = merge(common, {
  mode: 'production',
});

