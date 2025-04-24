// import translations from "./translations"; // @TODO comment

/**
 * Helper get language
 */
const getLanguage = () => {
  const result =
    window.location.pathname.substring(1).match(/gc|fr|de|au/) + "";
  return result ? result : "gc";
};

export { getLanguage };

/**
 * Translation
 */
export let __ = (str) => {
  if (window.translations[str]) {
    const t = window.translations[str][getLanguage()];
    if (t) {
      return t;
    }
  }

  return str;
};
