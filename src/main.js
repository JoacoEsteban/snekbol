// const importAll = (r) => r.keys().forEach(r)
// importAll(require.context('.', true, /\.js$/));

if (window.INITIALIZED) return
require('./controllers/initialization')
window.INITIALIZED = true