const axios = require('axios')
const rTracer = require('cls-rtracer')
const NodeCache = require('node-cache')

const logger = require('./logger')

const cache = new NodeCache({
    stdTTl: 30, // Cache results for 30 seconds, can be adjusted if needed
    checkperiod: 15,
})

// This function is used to fetch flights using the provider object
// It also includes a basic in-memory cache mechanism
module.exports = provider => new Promise((resolve, reject) => {
    // Thanks to cls-rtracer module we can retrieve the request ID and use it in our log lines
    const requestId = rTracer.id()
    logger.info({ requestId, provider: provider.name }, 'Fetching flights')


    // We first check if the value is cached
    const inCache = cache.get(provider.name)
    if (inCache) {
        logger.info({ requestId }, 'Data were cached')
        return resolve(inCache)
    }

    logger.info({ requestId }, "Data weren't cached, fetching from api endpoint")

    // If it's not yet cached we fetch flights by calling the endpoint
    axios({
        method: 'GET',
        url: provider.apiEndpoint,

        ...(provider.requestOptions || {}),
    })
        .then(({ data }) => {
            const formatedData = provider
                .formatResponse(data)
                .map(data => ({ ...data, provider: provider.name  }))

            // We cache the formated data
            cache.set(provider.name, data)

            resolve(formatedData)
        })
        .catch(error => reject(error))
})
