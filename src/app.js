const Koa = require('koa')
const rTracer = require('cls-rtracer')
const ratelimit = require('koa-ratelimit')

const middlewares = require('./middlewares')

const app = new Koa()
const logger = require('./logger')
const router = require('./controllers')

app
    .use(async (ctx, next) => {
        if (!ctx.request.headers['content-type']) {
            ctx.request.headers['content-type'] = 'application/json'
        }

        await next()
    })

    .use(require('koa-helmet')())
    .use(require('koa-bodyparser')({ enableTypes: ['json'] }))
    .use(rTracer.koaMiddleware())
    .use(middlewares.httpLogger({ logger }))
    .use(ratelimit({
        driver: 'memory',
        db: new Map(),
        max: 10, // We can increase this setting if it's too restrictive
    }))
    .use(middlewares.error)
    .use(router.routes())
    .use(router.allowedMethods())

module.exports = {
    listen: () => new Promise((resolve, reject) => {
        const port = process.env.API_PORT || 3000

        app.listen(port, error => {
            if (error) {
                reject(error)
            }

            logger.info(`Listenning on port ${port} ...`)

            resolve(app)
        })
    }),

    app,
}
