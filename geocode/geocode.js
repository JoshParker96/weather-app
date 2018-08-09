const request = require('request')

var getGeocode = (address) => {
	return new Promise((resolve, reject) => {
		let encodedAddress = encodeURIComponent(address)

		request({
			url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyBuTwPP0dg6zcB_zth2vhkHjXXUmLWEm6g`,
			json: true
		}, (error, response, body) => {
			if (body.status === "OK") {
				resolve({
					address: body.results[0].formatted_address,
					latitude: body.results[0].geometry.location.lat,
					longitude: body.results[0].geometry.location.lng
				})
			} else if (body.status === "ZERO_RESULTS") {
				reject("Can not found that address")
			} else {
				reject("Could not connect to google servers")
			}
		})
	})
}

module.exports = {
	getGeocode
}