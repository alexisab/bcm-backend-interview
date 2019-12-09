module.exports = {
    name: 'AIR_BEAM',
    apiEndpoint: 'https://my.api.mockaroo.com/air-beam/flights',
    requestOptions: {
        headers: {
            'X-API-Key': 'dd764f40',
        },
    },
    // This is an extremly simple CSV "parser"
    // It transforms CSV string into an array of objects
    // This function induces that the data is well formatted, we should use a more robust CSV parser
    formatResponse: data => {
        return data
            .substring(data.indexOf('\n') + 1) // we remove the header
            .split('\n')
            .map(line => {
                const [price, departure_time, arrival_time] = line.split(',').slice(1)

                return {
                    price: Number(price),
                    departure_time,
                    arrival_time,
                }
            })
    },
}
