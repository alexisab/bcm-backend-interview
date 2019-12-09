module.exports = {
    name: 'AIR_BEAM',
    apiEndpoint: 'https://my.api.mockaroo.com/air-beam/flights',
    requestOptions: {
        headers: {
            'X-API-Key': 'dd764f40',
        },
    },
    responseMap: {
        price: 'p',
        departure_time: 'departure_time',
        arrival_time: 'arrival_time',
    },
}
