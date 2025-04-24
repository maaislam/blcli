var urlMatched = function () {
  var allowedUrl = [
    '/g/dont-stop-now-finance/',
    '/de-de/g/ihr-unternehmen-waechst-sooo-schnell/',
    '/de-de/g/de-ihr-unternehmen-waechst-sooo-schnell/',
    '/de-de/g/hoeren-sie-jetzt-nicht-auf-c-suite/',
    '/fr-fr/g/ne-vous-arretez-pas-en-si-bon-chemin-finance/',
    '/en-us/g/dont-stop-now-finance/',
    '/en-au/g/dont-stop-now-finance/',
    '/en-nz/g/dont-stop-now-finance/',
    '/g/growing-sooo-fast-product/',
    '/de-de/g/growing-sooo-fast-product/',
    '/fr-fr/g/vous-grandissez-si-vite-produit/',
    '/en-us/g/growing-sooo-fast-product/',
    '/en-au/g/growing-sooo-fast-product/',
    '/en-nz/g/growing-sooo-fast-product/',
    '/g/dont-stop-now-c-suite/',
    '/de-de/g/dont-stop-now-c-suite/',
    '/fr-fr/g/e-vous-arretez-pas-en-si-bon-chemin-csuite/',
    '/en-us/g/dont-stop-now-c-suite/',
    '/en-au/g/dont-stop-now-c-suite/',
    '/en-nz/g/dont-stop-now-c-suite/',
  ];

  return allowedUrl.indexOf(location.pathname) !== -1;
};
