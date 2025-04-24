/**
 * Helper append JS to page
 */
export const addJsToPage = (src, id, cb, classes) => {
  if (document.querySelector(`#${id}`)) {
    return;
  }

  const s = document.createElement('script');
  if (typeof cb === 'function') {
    s.onload = cb;
  }

  if (classes) {
    s.className = classes;
  }

  s.src = src;
  s.setAttribute('id', id);
  document.head.appendChild(s);
};

export const observeDOM = (targetSelectorString, callbackFunction, configObject) => {
  const target = document.querySelector(`${targetSelectorString}`);

  if (!target) return;
  //configuration of the observer:

  const config = configObject || {
    attributes: true,
    attributeFilter: ['value'],
  };
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      //console.log(mutation);
      observer.disconnect();
      setTimeout(() => {
        callbackFunction(mutation);
        observer.observe(target, config);
      }, 1000);
    });
  });

  observer.observe(target, config);
};
