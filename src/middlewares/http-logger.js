const _ = require('lodash')
const rTracer = require('cls-rtracer')


// HTTP logger that logs request and response.
// It automatically includes a unique request ID to track all related log lines for the same request.
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
