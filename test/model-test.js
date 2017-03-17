/*
  model-test.js

  This file is optional, but is strongly recommended. It tests the `getData` function to ensure its translating
  correctly.
*/

const test = require('tape')
const Model = require('../model')
const model = new Model()
const nock = require('nock')

test('should properly fetch from the API and translate features', t => {
  nock('http://data.police.uk')
  .get('/api/crimes-street/all-crime?lat=50.91877&lng=-1.49037&date=2016-12')
  .reply(200, require('./fixtures/input.json'))

  model.getData({}, (err, geojson) => {
    t.error(err)
    t.equal(geojson.type, 'FeatureCollection', 'creates a feature collection object')
    t.ok(geojson.features, 'has features')
    const feature = geojson.features[0]
    t.equal(feature.type, 'Feature', 'has proper type')
    t.equal(feature.geometry.type, 'Point', 'creates point geometry')
    t.deepEqual(feature.geometry.coordinates, [-1.486118, 50.917743], 'translates geometry correctly')
    t.ok(feature.properties, 'creates attributes')
    t.equal(feature.properties.month, new Date('2016-12').toISOString(), 'translates expires field correctly')
    t.end()
  })
})
