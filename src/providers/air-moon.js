module.exports = {
    name: 'AIR_MOON',
    apiEndpoint: 'https://my.api.mockaroo.com/air-moon/flights',
    requestOptions: {
        headers: {
            'X-API-Key': 'dd764f40',
        },
    },
    formatResponse: data => data.map(({ price, departure_time, arrival_time }) => ({
        price,
        departure_time,
        arrival_time,
    })),
}
