const observeDOM = (targetSelectorString, callbackFunction, configObject) => {
  const target = document.querySelector(`${targetSelectorString}`);

  const observer = new MutationObserver((mutations) => {
    callbackFunction(mutations);
    // mutations.forEach(function (mutation, index) {
    //   // const isLast = () => mutations.length - 1 == index;
    // });
  });

  // configuration of the observer:

  const config = configObject || { attributes: false, childList: true, characterData: false, subtree: false };

  observer.observe(target, config);
};

export default observeDOM;
