const SDK_URL_BASE = '//maps.googleapis.com/maps/api/js';
const SCRIPT_ID = 'google-maps';
const CALLBACK_NAME = 'googleMapsInit';

function isLoaded(document) {
  return !!document.getElementById(SCRIPT_ID);
}

function insertSDK(document, apiKey) {
  const scriptTag = document.createElement('script');
  scriptTag.id = SCRIPT_ID;
  scriptTag.src = SDK_URL_BASE + '?key=' + apiKey + '&callback=' + CALLBACK_NAME;

  const firstScript = document.getElementsByTagName('script')[0];
  firstScript.parentNode.insertBefore(scriptTag, firstScript);
}

function load(apiKey, document) {
  return new Promise((resolve, reject) => {
    try {
      window[CALLBACK_NAME] = function() {
        resolve(window.google.maps);
      };
      if (isLoaded(document)) {
        resolve(window.google.maps);
        return;
      }
      insertSDK(document, apiKey);
    } catch (error) {
      reject(error);
    }
  });
}

export default function(apiKey, document = window.document) {
  if (!apiKey) {
    throw new Error('apiKey must be specified.');
  }

  const loaded = load(apiKey, document);

  return {

    reverseGeocode(latitude, longitude) {
      return loaded.then((sdk) => new Promise((resolve, reject) => {
        const query = {
          location: { lat: latitude, lng: longitude }
        };
        const geocoder = new sdk.Geocoder;
        geocoder.geocode(query, function(results, status) {
          if (status === sdk.GeocoderStatus.OK && results[0]) {
            resolve(results[0].formatted_address);
          } else {
            reject(new Error('Geocoder failed to reverse lookup.'));
          }
        });
      }));
    }

  };

}
