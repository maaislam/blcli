const observeDOM = (targetSelectorString, callbackFunction, configObject) => {
  const target = document.querySelector(`${targetSelectorString}`);

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      callbackFunction(mutation);
    });
  });

  // configuration of the observer:

  const config = configObject || {
    attributes: true,
    attributeFilter: ['style'],
    childList: false,
    characterData: false,
    subtree: false,
  };

  observer.observe(target, config);
};

export default observeDOM;
