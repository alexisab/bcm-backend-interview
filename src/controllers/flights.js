const router = require('@koa/router')()

router
    .get('/', async ctx => {
        ctx.body = 'ok'
    })

module.exports = router
