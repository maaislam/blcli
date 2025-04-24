import config from './config';

const translationsMap = [];

/**
 * Helper get language
 */
const getLanguage = () => {
  let result = 'gb';
  if(!!window.location.hostname.match(/technogym.ru/)) {
    result = 'ru';
  } else {
    result = window.location.pathname.substring(1).match(/^it|gb|fr|de|es|us/) + '';
  }

  return result;
};

export {getLanguage};

/**
 * Helper translate string
 * @param {String} str
 */
const __ = (str) => {
  if(translationsMap.indexOf(str) == -1) {
    translationsMap.push(str);
  }

  const lang = getLanguage();
  return ( ( (config.strings[str] || {})[lang] ) || str );
};

export {__};

/**
 * Generate list of translatable terms, can be added to spreadsheet
 */
window.TG023_translations_list = function() {
  translationsMap.sort();
  console.log(translationsMap.join('\n'));
}

/**
 * Generate object to use in translations.csv
 */
window.TG023_translations_object = function() {
  translationsMap.sort();
  const modifiedMap = translationsMap.map((item) => {

    return `'${item}': {
  it: '',
  es: '',
  de: '',
  fr: '',
  us: '${item}',
  ru: '',
},`;

  });

  console.log(modifiedMap.join('\n'));
}
