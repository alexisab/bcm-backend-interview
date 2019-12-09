const fs = require('fs')
const Joi = require('@hapi/joi')


// This piece of code allows us to load flights providers.
// We use the sync method because this code is only executed once when the server starts.
// To add a new provider just add a new js file following the structure of the others.
module.exports = fs
    .readdirSync(__dirname)
    .filter(filename => filename !== 'index.js')
    .map(filename => {
        const provider = require(`./${filename}`)

        // We validate provider objects to be sure that required informations are presents
        // If there is an error, the validation will fail and the server won't start
        Joi.attempt(provider, Joi.object({
            name: Joi.string().required(),
            apiEndpoint: Joi.string().uri().required(),
            requestOptions: Joi.object().optional(),
            formatResponse: Joi.function().required(),
        }))

        return provider
    })
