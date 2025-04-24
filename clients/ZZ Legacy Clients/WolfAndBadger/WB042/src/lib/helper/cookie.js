export const localStorageSave = (key, value) => {
  localStorage.setItem(key, value);
};

/**
 * Remove element from local storage.
 * @param string key
 */
export const localStorageRemove = (key) => {
  localStorage.removeItem(key);
};

/**
 * Retrive an object from local storage.
 * @param  string key
 * @return mixed
 */
export const localStorageGet = (key) => {
  var item = localStorage.getItem(key);

  if (!item) return;

  if (item[0] === '{' || item[0] === '[') return JSON.parse(item);

  return item;
};
