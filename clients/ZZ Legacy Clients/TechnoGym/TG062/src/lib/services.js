import translations from './translations';

/**
 * Helper get language
 */
export const getLanguage = () => {
  const result = window.location.pathname.substring(1).match(/^it|gb|fr|de|es/);
  return result ? result[0] : 'gb';
};

/**
 * Translation
 * @param {string} str String to translate
 * @param {object} templates Object to find and replace content from string
 */
export const translate = (str, templates) => {
  let value = str;
  if (translations[str]) {
    const t = translations[str][getLanguage()];
    if (typeof t === 'string') value = t;
  }

  // Replace templates with values
  if (templates) {
    Object.keys(templates).forEach((key) => {
      const replacement = templates[key];
      const regex = new RegExp(key, 'g');
      value = value.replace(regex, replacement);
    });
  }

  return value;
};
