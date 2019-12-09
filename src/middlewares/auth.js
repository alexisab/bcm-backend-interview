const jwt = require('../jwt')

// This is a simple middleware to check authentication
// We can enhance this middleware to include in the request context (ctx)
// informations contained in the jwt payload (like the user's ID for example)
// It could be useful later in controllers to fetch data from the database for example
module.exports = async (ctx, next) => {
    const { authorization } = ctx.request.headers

    if (!authorization || !authorization.startsWith('Bearer ')) {
        ctx.throw(401)
    }

    const token = authorization.slice('Bearer '.length)
    const payload = await jwt.verify(token)

    if (!payload) {
        ctx.throw(401)
    }

    await next()
}
