export const addCssToHead = (hrefUrl) => {
  const link = document.createElement('link');
  link.href = hrefUrl;
  link.rel = 'stylesheet';
  link.type = 'text/css';
  document.head.appendChild(link);
};
export const addScriptToHead = (srcUrl) => {
  const script = document.createElement('script');
  script.src = srcUrl;
  script.type = 'text/javascript';
  script.async = true;
  document.head.appendChild(script);
};

export const observeDOM = (targetSelectorString, callbackFunction, configObject) => {
  const target = document.querySelector(`${targetSelectorString}`);

  const observer = new MutationObserver((mutations) => {
    mutations.forEach(function (mutation, index) {
      callbackFunction(mutation);
    });
  });

  // configuration of the observer:

  const config = configObject || { attributes: false, childList: true, characterData: false, subtree: false };

  observer.observe(target, config);
};

export const getProducts = (productsArr) => {
  return fetch(`https://www.boots-optimisation.co.uk/prod-info/model/${productsArr.join('&')}`, {
    method: 'GET',
    headers: {
      accept: '*/*',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
};

export const obsIntersection = (target, threshold, callback) => {
  var observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // if (entry.intersectionRatio > 0 && entry.isIntersecting && entry.boundingClientRect.y > 0) {

        // }
        callback(entry);
      });
    },
    { root: null, threshold: threshold }
  );

  observer?.observe(target);
};
