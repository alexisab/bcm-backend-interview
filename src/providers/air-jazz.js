module.exports = {
    name: 'AIR_JAZZ',
    apiEndpoint: 'https://my.api.mockaroo.com/air-jazz/flights',
    requestOptions: {
        headers: {
            'X-API-Key': 'dd764f40',
        },
    },
    responseMap: {
        price: 'price',
        departure_time: 'dtime',
        arrival_time: 'atime',
    },
}