const request = require('request')

var getWeather = (lat, long, callback) => {
	request({
		url: `https://api.darksky.net/forecast/430cb39e2294501097e96ecb2d521042/${lat},${long}`,
		json: true
	}, (error, response, body) => {

		if (!error && response.statusCode === 200) {
			callback(undefined, {
				temperature: body.currently.temperature
			})
		} else if (error) {
			callback("API Error")
		} else if (response.statusCode > 400) {
			callback("Client Error")
		} else {
			callback("Hmmmmmmmmmmm")
		}
	})
}

module.exports = {
	getWeather
}