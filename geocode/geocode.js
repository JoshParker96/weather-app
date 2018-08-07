const request = require('request')

var getGeoCode = (address, callback) => {
	var encodedAddress = encodeURIComponent(address)

	request({
		url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyBuTwPP0dg6zcB_zth2vhkHjXXUmLWEm6g`,
		json: true
	}, (error, response, body) => {

		if (error) {
			console.log(error)
			callback("Unable to connect to google servers")
		} else if (body.status === "ZERO_RESULTS") {
			callback("Can not find that address.")
		} else if (body.status === "OK") {
			callback(undefined, {
				address: body.results[0].formatted_address,
				latitude: body.results[0].geometry.location.lat,
				longitude: body.results[0].geometry.location.lng
		})
		}
	})
}

module.exports = {
	getGeoCode
}