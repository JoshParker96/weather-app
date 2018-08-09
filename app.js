const yargs = require('yargs')
const axios = require('axios')

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

var encodedAddress = encodeURIComponent(argv.address)
var geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyBuTwPP0dg6zcB_zth2vhkHjXXUmLWEm6g`

axios.get(geocodeURL).then((response) => {

	if (response.data.status === "ZERO_RESULTS") {
		throw new Error("Could not found that addresss")
	}

	let lat = response.data.results[0].geometry.location.lat
	let lng = response.data.results[0].geometry.location.lng
	let weatherURL = `https://api.darksky.net/forecast/430cb39e2294501097e96ecb2d521042/${lat},${lng}`
	console.log(response.data.results[0].formatted_address)
	return axios.get(weatherURL)

}).then((response) => {

	let temperature = response.data.currently.temperature
	let apparentTemp = response.data.currently.apparentTemperature
	console.log(`The temperature is ${temperature}. But it feels like ${apparentTemp}`)

}).catch((e) => {

	if (e.code === "ENOTFOUND") {
		console.log("Unable to connect to servers")
	} else {
		console.log(e.message)
	}
})