const _ = require('lodash')
const rTracer = require('cls-rtracer')

module.exports = ({ logger }) => {
    return async (ctx, next) => {
        const requestId = rTracer.id()
        const startTime = Date.now()

        ctx.log = logger.child({ requestId })

        ctx.log.info({
            request: _.pick(ctx.request, ['method', 'url', 'headers', 'query', 'body']),
        })

        await next()

        ctx.log.info({
            response: _.pick(ctx.response, ['status', 'message']),
            responseTime: Date.now() - startTime,
        })
    }
}
