const attachEvent = (event, fireEvent, variation, clickLoc) => {
  const possibleUrls = {
    var1: 'https://gocardless.com/fr-fr/g/gcfr-exp/',
    var2: 'https://gocardless.com/fr-fr/g/gcfr-exp/',
    control: 'https://gocardless.com/fr-fr/g/gcfr-cont/',
  };

  const btnUrl = variation == 'control' ? possibleUrls.control : variation == '1' ? possibleUrls.var1 : possibleUrls.var2;

  const experimentConfig = (variation) => {
    const isGermany = location.pathname.indexOf('/de') !== -1;
    const isFrench = location.pathname.indexOf('/fr') !== -1;
    const data = {
      variation1: {
        ctaText: isGermany ? 'Kontakt aufnehmen' : isFrench ? 'Demander une démo' : 'Get a demo',
      },
      variation2: {
        ctaText: isGermany ? 'Vertrieb kontaktieren' : isFrench ? 'Contactez-nous' : 'Contact Sales',
      },
    };
    return variation === '1' ? data.variation1 : data.variation2;
  };

  const experimentData = experimentConfig(variation);
  const ctaText = experimentData.ctaText;

  if (event.target.closest(`a[href^="${btnUrl}"]`)) {
    fireEvent(`user clicked the "${ctaText}" button in ${clickLoc}`);
    fireEvent(`user clicked the primary CTA`);
  }
};

export default attachEvent;
