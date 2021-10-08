const request = require('postman-request')
//http://api.weatherstack.com/current?access_key=80a4bfff6c45c00867d630aede8555b0&query=-23.6789,-46.5367 
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=80a4bfff6c45c00867d630aede8555b0&query=' + latitude + ',' + longitude
    request ({url, json: true}, (error, {body}) => {
        if (error) {
            callback('No internet connection', undefined)
        } else if(body.error) {
            callback('Place Not Founded', undefined)
        } else {
            const current = body.current
            const send = {
                description: current.weather_descriptions[0],
                temperature: current.temperature,
                feelslike: current.feelslike,
                humidity: current.humidity
            }
            callback(undefined, send)
        }
    })
}

module.exports = forecast