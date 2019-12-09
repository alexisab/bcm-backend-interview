module.exports = {
    name: 'AIR_MOON',
    apiEndpoint: 'https://my.api.mockaroo.com/air-moon/flights',
    requestOptions: {
        headers: {
            'X-API-Key': 'dd764f40',
        },
    },
    responseMap: {
        price: 'price',
        departure_time: 'departure_time',
        arrival_time: 'arrival_time',
    },
}
