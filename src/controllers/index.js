const router = require('@koa/router')()

const middlewares = require('../middlewares')


// This piece of code allows us to automatically mount controllers using their file name as path
// It also applies the auth middleware. Only protected routes must be mounted here
'flights'
    .split(' ')
    .map(name => router.use(`/api/${name}`, middlewares.auth, require(`./${name}`).routes()))

module.exports = router
