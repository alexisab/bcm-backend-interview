const pino = require('pino')

const { NODE_ENV } = process.env

module.exports = pino({
    level: NODE_ENV === 'production' ? 'info' : 'trace',
    enabled: NODE_ENV !== 'test',
    prettyPrint: NODE_ENV === 'development',
})
