module.exports = {
    name: 'AIR_JAZZ',
    apiEndpoint: 'https://my.api.mockaroo.com/air-jazz/flights',
    requestOptions: {
        headers: {
            'X-API-Key': 'dd764f40',
        },
    },
    formatResponse: data => data.map(({ price, dtime, atime }) => ({
        price: Number(price),
        departure_time: dtime,
        arrival_time: atime,
    })),
}
