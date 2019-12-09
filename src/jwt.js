const jwt = require('jsonwebtoken')

// We encapsulate calls to jwt methods into a function that returns a promise
function verify(token) {
    return new Promise(resolve => {
        jwt.verify(token, process.env.API_JWT_SECRET || 'secret', (error, payload) => {
            if (error) {
                return resolve(null)
            }

            resolve(payload)
        })
    })
}

module.exports = {
    verify,
}
