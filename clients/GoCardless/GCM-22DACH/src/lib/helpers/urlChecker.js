function runExperiment() {
  var notAllowedCountryList = ['/fr', '/en-nz/', '/da-dk/', '/en-au/', '/sv-eu/', '/nl', '/es-es/', '/en-us', '/en-ie/'];

  return !notAllowedCountryList.some(function (item) {
    return location.pathname.indexOf(item) !== -1;
  });
}
//used in Google optimize audience targetting
'/en-us/solutions/success-plus/',
  '/en-au/solutions/success-plus/',
  '/en-nz/solutions/success-plus/',
  '/fr-fr/solutions/success-plus/',
  '/de-de/loesungen/success-plus/',
  '/es-es/soluciones/success-plus/',
  '/sv-se/solutions/success-plus/',
  '/g/success-plus-customers/',
  '/en-us/g/success-plus-customers/',
  '/en-au/g/success-plus-customers/',
  '/en-nz/g/success-plus-customers/',
  '/fr-fr/g/success-plus-customers/',
  '/de-de/g/success-plus-customers/',
  '/es-es/g/success-plus-customers/',
  '/g/success-plus-plum/',
  '/en-us/g/success-plus-plum/',
  '/en-au/g/success-plus-plum/',
  '/en-nz/g/success-plus-plum/',
  '/fr-fr/g/success-plus-plum/',
  '/de-de/g/success-plus-plum/',
  '/es-es/g/success-plus-plum/',
  '/g/success-plus-save-time/',
  '/en-us/g/success-plus-save-time/',
  '/en-au/g/success-plus-save-time/',
  '/en-nz/g/success-plus-save-time/',
  '/fr-fr/g/success-plus-save-time/',
  '/de-de/g/success-plus-save-time/',
  '/es-es/g/success-plus-save-time/',
  '/g/success-plus-new/',
  '/en-us/g/success-plus-new/',
  '/en-au/g/success-plus-new/',
  '/en-nz/g/success-plus-new/',
  '/fr-fr/g/success-plus-new/',
  '/de-de/g/success-plus-new/',
  '/es-es/g/success-plus-new/';
