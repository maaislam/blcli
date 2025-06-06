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

export const setCookie = (cName, cValue, expDays) => {
  var date = new Date();

  date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000);

  var expires = 'expires=' + date.toUTCString();

  document.cookie = cName + '=' + cValue + '; ' + expires;
};

export const getCookie = (name) => {
  var value = '; ' + document.cookie;

  var parts = value.split(`; ${name}=`);

  if (parts.length == 2) {
    return parts.pop().split(';').shift();
  }
};
