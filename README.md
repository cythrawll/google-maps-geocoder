# google-maps-geocoder

A light-weight wrapper for client-side google maps geocode lookups using promises rather than callbacks.

## Features

* Promise-based API calls instead of callbacks.
* Supports reversing latitude/longitude into a plain-text location (usually an address).

## Installing

Using npm:

```bash
$ npm install google-maps-geocoder
```

## Usage

```javascript
import googleMapsGeocoder from 'google-maps-geocoder';

const geocoder = googleMapsGeocoder('your-api-key-here');
geocoder.reverseGeocode(latitude, longitude).then((where) => console.log(where));
```

## Contributing

File an issue or submit a pull-request. Before submitting any pull-requests please ensure you've built the project and run the tests.

#### To build the project

`webpack`

#### Running the tests

`karma start`

#### Contribute a change by submitted a pull-request

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## License

MIT
