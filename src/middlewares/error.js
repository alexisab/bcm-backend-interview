// Simple error middleware
module.exports = async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        ctx.status = error.status || 500
        ctx.body = {
            message: error.message,
        }
    }
}
