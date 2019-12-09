const { listen } = require('./app')
const { init: initTest } = require('./test-util')

describe('Flights API', () => {
    let server

    before(done => {
        listen()
            .then(_server => {
                initTest(_server)

                server = _server
            })
            .then(() => done())
    })

    after(() => {
        server.close()
    })

    require('./controllers/index.test')
})
