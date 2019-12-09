const pino = require('pino')

const logger = require('./logger')

async function main() {
    // Here we can open do several things before the server start
    // like opening a connection to a database

    // await db.connect()

    await require('./app').listen()
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
