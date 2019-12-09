const _ = require('lodash')
const router = require('@koa/router')()

const fetcher = require('../fetcher')
const providers = require('../providers')

router
    .get('/', async ctx => {
        const providerData = await Promise.all(
            providers.map(fetcher),
        )

        ctx.body = _(providerData)
            .flatten()
            .sortBy(['price'])
            .take(50)
            .value()
    })

module.exports = router
