const request = require('request')

var getWeather = (lat, long) => {
	return new Promise((resolve, reject) =>

		request({
			url: `https://api.darksky.net/forecast/430cb39e2294501097e96ecb2d521042/${lat},${long}`,
			json: true
		}, (error, response, body) => {

			if (response.statusCode === 200) {
				resolve({
					temperature: body.currently.temperature,
					apparentTemperature: body.currently.apparentTemperature
				})
			} else if (response.statusCode === 400) {
				reject(body.error)
			} else {
				reject("Could not connect to forecast io servers")
			}
		}
	)
)}

module.exports = {
	getWeather
}