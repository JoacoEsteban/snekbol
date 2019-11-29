const sass = require('sass')
const fs = require('fs')
const { watch } = require('gulp')
const sassfile = 'styles/scss/main.scss'

function renderSass () {
    sass.render({
        file: sassfile
    }, function(err, result) {
        if (err) throw err
        fs.writeFileSync('styles/css/compiled.css', result.css)
    })
}

watch([sassfile], function(cb) {
console.log(1, cb)
  renderSass()
  cb()
})

function defaultTask(cb) {
    cb()
}

exports.default = defaultTask
