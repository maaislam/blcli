const mapPoller = (elements, cb, options) => {
  const settings = {
    wait: 50,
    multiplier: 1.1,
    timeout: 0
  };

  const now = Date.now || function () {
    return new Date().getTime();
  };

  if (options) {
    // Overwrite defaults with values from options
    for (let option in options) {
      settings[option] = options[option];
    }
  } else {
    options = settings;
  }

  const timeout = settings.timeout ? new Date(now() + settings.timeout) : false;
  const wait = settings.wait;
  const multiplier = settings.multiplier;

  const successful = [];
  const cache = new Map();
  let time;
  let eleLength = 0;
  
  const pollForElement = (condition, time) => {
    if (timeout && now() > timeout) {
      return false;
    }
    time = time || wait;

    const conditionIsTrue = (function () {
      const type = typeof condition;
      let toReturn;

      if (type === 'function') {
        toReturn = condition();
      } else if (type === 'object') {
        for (let key in condition) {
          const curr = document.querySelector(condition[key]);
          if (curr) {
            cache.set(key, curr);
            delete condition[key];
          } else {
            eleLength += 1;
          }
        }
        if (eleLength === 0) {
          return true;
        } else {
          toReturn = document.querySelector(condition);
        }
      } else {
        toReturn = true;
      }

      return toReturn;
    }());

    if (conditionIsTrue) {
      successful.push(true);
      if (successful.length === elements.length) cb(cache);
    } else {
      setTimeout(function () {
        pollForElement(condition, time * multiplier);
      }, time);
    }
  };

  for (let i = 0; i < elements.length; i += 1) {
    pollForElement(elements[i]);
  }
};

export default mapPoller;