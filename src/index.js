const Koa = require('koa')
const pino = require('pino')
const rTracer = require('cls-rtracer')

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
    .use(middlewares.error)
    .use(router.routes())
    .use(router.allowedMethods())


async function main() {
    // Here we can open do several things before the server start
    // like opening a connection to a database

    // await db.connect()

    const port = process.env.API_PORT || 3000

    app.listen(port, error => {
        if (error) {
            throw error
        }

        logger.info(`Listening on port ${port} ...`)
    })
}

main()

process.on('uncaughtException', pino.final(logger, (err, finalLogger) => {
    finalLogger.fatal(err, 'uncaughtException')
    process.exit(1)
}))

process.on('unhandledRejection', pino.final(logger, (err, finalLogger) => {
    finalLogger.fatal(err, 'unhandledRejection')
    process.exit(1)
}))

module.exports = app
