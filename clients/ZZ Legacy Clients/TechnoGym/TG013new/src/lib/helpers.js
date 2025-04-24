import translations from './translations';

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
  console.log(result);
};

export {getLanguage};

/**
 * Translation
 */
export let __ = (str) => {
    if(translationsMap.indexOf(str) == -1) {
      translationsMap.push(str);
    }

    if(translations[str]) {
        var t = translations[str][getLanguage()];
        if(t) {
            return t;
        }
    }

    return str;
};

/**
 * Generate list of translatable terms, can be added to spreadsheet
 */
window.TG013_translations_list = function() {
  translationsMap.sort();
  console.log(translationsMap.join('\n'));
}

/**
 * Generate object to use in translations.csv
 */
window.TG013_translations_object = function() {
  translationsMap.sort();
  const modifiedMap = translationsMap.map((item) => {

    return `'${item}': {
  it: 'xx',
  es: 'yy',
  de: 'zz',
  fr: 'aa',
  us: 'bb',
},`;

  });

  console.log(modifiedMap.join('\n'));
}
