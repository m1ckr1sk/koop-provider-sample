/*
  model.js

  This file is required. It must export a class with at least one public function called `getData`

  Documentation: http://koopjs.github.io/docs/specs/provider/
*/
const request = require('request').defaults({gzip: true, json: true})
const config = require('config')

function Model (koop) {}

// This is the only public function you need to implement
Model.prototype.getData = function (req, callback) {
  // Call the remote API with our developer key
  const date = config.crime.date
  const lat = config.crime.lat
  const lon = config.crime.lon
  request(`http://data.police.uk/api/crimes-street/all-crime?lat=${lat}&lng=${lon}&date=${date}`, (err, res, body) => {
    if (err) return callback(err)
    // translate the response into geojson
    const geojson = translate(body)
    // Cache data for 10 seconds at a time by setting the ttl or "Time to Live"
    geojson.ttl = 10
    // hand off the data to Koop
    callback(null, geojson)
  })
}

function translate (input) {
  // console.log(input)
  return {
    type: 'FeatureCollection',
    features: input.map(formatFeature)
  }
}

function formatFeature (crime) {
  // Most of what we need to do here is extract the longitude and latitude
  const feature = {
    type: 'Feature',
    properties: crime,
    geometry: {
      type: 'Point',
      coordinates: [Number(crime.location.longitude), Number(crime.location.latitude)]
    }
  }

  // But we also want to translate a few of the date fields so they are easier to use downstream
  const dateFields = ['month']
  dateFields.forEach(field => {
    feature.properties[field] = new Date(feature.properties[field]).toISOString()
  })
  return feature
}

module.exports = Model

/* Example raw API response
[
    {
        "category": "anti-social-behaviour",
        "location_type": "Force",
        "location": {
            "latitude": "50.917743",
            "street": {
                "id": 775315,
                "name": "On or near Supermarket"
            },
            "longitude": "-1.486118"
        },
        "context": "",
        "outcome_status": null,
        "persistent_id": "9a27c321edf4272818bfcb4a6770816b0f39cfc54ae1182fd074cd324de9065f",
        "id": 53951475,
        "location_subtype": "",
        "month": "2016-12"
    }
]
*/
