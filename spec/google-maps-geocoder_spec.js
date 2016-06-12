import geocoder from '../src/google-maps-geocoder';

describe('geocoder', function() {

  describe('when no apiKey is supplied', function() {

    beforeEach(function() {
      this.loader = () => geocoder();
    });

    it('throws an error', function() {
      expect(this.loader).to.throw(Error);
    });

  });

  describe('reverseGeocode', function() {

    beforeEach(function() {
      this.loader = () => geocoder('doesntmatter');
    });

    describe('when the google maps sdk fails to load', function() {

      beforeEach(function() {
        sinon.stub(window.document, 'createElement').throws(new Error('bang'));
      });

      afterEach(function() {
        window.document.createElement.restore();
      });

      it('returns a rejecting promise', function() {
        return expect(this.loader().reverseGeocode(0, 0)).to.eventually.be.rejected;
      });

    });

    describe('when the sdk is loaded', function() {

      class StubGeocoder {
        geocode() {}
      }

      beforeEach(function() {
        sinon.stub(window.document, 'getElementById').returns({});
        window.google = {
          maps: {
            Geocoder: StubGeocoder,
            GeocoderStatus: {
              OK: 'OK',
              ERROR: 'ERROR'
            }
          }
        };
      });

      afterEach(function() {
        window.document.getElementById.restore();
      });

      describe('when reverse geocode fails', function() {

        beforeEach(function() {
          sinon.stub(StubGeocoder.prototype, 'geocode', function(query, callback) {
            callback([], window.google.maps.GeocoderStatus.ERROR);
          });
        });

        afterEach(function() {
          StubGeocoder.prototype.geocode.restore();
        });

        it('returns a rejecting promise', function() {
          return expect(this.loader().reverseGeocode(0, 0)).to.eventually.be.rejected;
        });

      });

      describe('when reverse geocode succeeds', function() {

        beforeEach(function() {
          this.formattedAddress = 'stuff';
          sinon.stub(StubGeocoder.prototype, 'geocode', (query, callback) => {
            /* eslint-disable camelcase */
            const result = { formatted_address: this.formattedAddress };
            /* eslint-enable camelcase */
            callback([result], window.google.maps.GeocoderStatus.OK);
          });
        });

        afterEach(function() {
          StubGeocoder.prototype.geocode.restore();
        });

        it('returns a resolving promise with the formatted address', function() {
          return expect(this.loader().reverseGeocode(0, 0)).to.eventually.deep.equal(this.formattedAddress);
        });

      });

    });

  });

});
