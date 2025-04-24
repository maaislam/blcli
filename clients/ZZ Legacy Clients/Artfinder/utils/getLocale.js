const locales = {
    'GDP': 'en-gb',
    'USD': 'en-us',
    'EUR': 'en-de',
    'CAD': 'en-gb',
    'AUD': 'en-gb',
};

export default () => {
    const locale = locales[window.AF?.analyticsData?.currency];
    return locale;
};
