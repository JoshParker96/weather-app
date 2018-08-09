const yargs = require('yargs')
const geocode = require('./geocode/geocode')
const weather = require('./weather/weather')

const argv = yargs
	.options({
		a: {
			demand: true,
			alias: 'address',
			describe: 'Address to fetch weather for',
			string: true			
		}
	})
	.help()
	.alias('help', 'h')
	.argv

geocode.getGeocode(argv.address).then((res) => {
	console.log(res.address)
	return weather.getWeather(res.latitude, res.longitude)
}).then((res) => {
	console.log(`The current temperature is ${res.temperature}. But it feels like ${res.apparentTemperature}`)
}).catch((errorMessage) => {
	console.log(errorMessage)
})