[![Build Status](https://travis-ci.org/koopjs/koop-provider-sample.svg?branch=master)](https://travis-ci.org/koopjs/koop-provider-sample) [![Greenkeeper badge](https://badges.greenkeeper.io/koopjs/koop-provider-sample.svg)](https://greenkeeper.io/)


# Koop UK Crime Provider

This is provider was created from the koop sample that demonstrates how to build a Koop Provider. Full documentation is provided [here](https://koopjs.github.io/docs/specs/provider/).

The data source in this case is the [UK Police Street Level Crime API](https://data.police.uk/). 

[License](https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/) 

## Files

| File | | Description |
| --- | --- | --- |
| `index.js` | Mandatory | Configures provider for usage by Koop |
| `model.js` | Mandatory | Translates remote API to GeoJSON |
| `routes.js` | Optional | Specifies additional routes to be handled by this provider |
| `controller.js` | Optional | Handles additional routes specified in `routes.js` |
| `server.js` | Optional | Reference implementation for the provider |
| `test/model-test.js` | Optional | tests the `getData` function on the model |
| `test/fixtures/input.json` | Optional | a sample of the raw input from the 3rd party API |
| `config/default.json` | Optional | used for advanced configuration, usually API keys. |

## Test it out
Run server:
- `npm install`
- `npm start`

Example API Query:
- `curl localhost:8080/ukcrime/FeatureServer/0/query?returnCountOnly=true`

Tests:
- `npm test`

## With Docker

- `docker build -t koop-provider-ukcrime .`
- `docker run -it -p 8080:8080 koop-provider-ukcrime`

