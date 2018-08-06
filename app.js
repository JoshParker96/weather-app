const yargs = require('yargs')
const geocode = require('./geocode/geocode')

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

geocode.geoAddress(argv.address, (errorMessage, response) => {
	if (errorMessage) {
		console.log(errorMessage)
	} else {
		console.log(response)
	}
})