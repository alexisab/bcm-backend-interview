const router = require('@koa/router')()

// This piece of code allows us to automatically mount controllers using their file name as path
'flights'
    .split(' ')
    .map(name => router.use(`/api/${name}`, require(`./${name}`).routes()))

module.exports = router
