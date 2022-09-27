const { proxy } = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(
        proxy('/houses', {
            target: 'https://api.intern.d-tt.nl/api',
            secure: false,
            changeOrigin: true,
        })
    )
}
