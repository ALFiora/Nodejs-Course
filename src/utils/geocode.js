const request = require('postman-request')

//https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiYWxmaW9yYSIsImEiOiJja3U1azg4ZzkyOHZuMnZvd2h3MWR2N3htIn0.hPrWjDZsGqURaT1C_MncEQ&limit=1

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWxmaW9yYSIsImEiOiJja3U1azg4ZzkyOHZuMnZvd2h3MWR2N3htIn0.hPrWjDZsGqURaT1C_MncEQ&limit=1'
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location server!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location, Try another', undefined)
        } else {
            const features = body.features[0]
            const send = {
                latitude: features.center[1],
                longitude: features.center[0],
                location: features.place_name
            }
            callback(undefined,send)
        }
    })
}

module.exports = geocode