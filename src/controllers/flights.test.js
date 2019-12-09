const _ = require('lodash')
const Joi = require('@hapi/joi')

const providers = require('../providers')
const { request, token } = require('../test-util')

describe('flights', () => {
    it("doesn't work if I am not authenticated", async () => {
        await request()
            .get('/api/flights')
            .expect(401)
    })

    it('works', async function() {
        this.timeout(10000)

        await request()
            .get('/api/flights')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .expect(({ body }) => {
                Joi.assert(body, Joi
                    .array()
                    .length(50)
                    .sort({
                        order: 'ascending',
                        by: 'price',
                    })
                    .items(
                        Joi.object({
                            provider: Joi.string().allow(...providers.map(provider => provider.name)),
                            price: Joi.number(),
                            departure_time: Joi.string(),
                            arrival_time: Joi.string(),
                        }),
                    ))
            })
    })

    it('fails if the request limit is reached', async function() {
        this.timeout(10000)

        await Promise.all(
            _.range(10).map(() => request().get('/api/flights').set('Authorization', `Bearer ${token}`)),
        )

        await request()
            .get('/api/flights')
            .set('Authorization', `Bearer ${token}`)
            .expect(429)
    })
})
