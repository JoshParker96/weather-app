const yargs = require('yargs')
const geocode = require('./geocode/geocode')
const weather = require('./weather/weather')

const argv = yargs
	.options({
		a: {
			demand: true,
			alias: 'address',
			describe: 'Address to fetch waether for',
			string: true			
		}
	})
	.help()
	.alias('help', 'h')
	.argv

var geo = geocode.getGeoCode(argv.address, (errorMessage, response) => {
	if (errorMessage) {
		console.log(errorMessage)
	} else {
		console.log(response.address)

		weather.getWeather(response.latitude, response.longitude, (errorMessage, response) => {
		if (errorMessage) {
			console.log(errorMessage)
		} else {
			console.log(`The temperature is ${response.temperature}.`)
		}
	})
	}
})