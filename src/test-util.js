const supertest = require('supertest')

let _app = null

module.exports = {
    init: app => {
        if (!_app) {
            _app = app
        }
    },

    request: () => supertest(_app),

    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTYiLCJpYXQiOjE1NzU5MDkwNTIsImV4cCI6MTU3ODUwMTA1Mn0.Z0yZR4YI9YCRVuTwrgR-8EPkU1OTkZatotaWUzzKsfo',
}
