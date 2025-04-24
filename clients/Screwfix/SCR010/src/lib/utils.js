export const obsIntersection = (target, threshold, callback) => {
  var observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // if (entry.intersectionRatio > 0 && entry.isIntersecting && entry.boundingClientRect.y > 0) {

        // }
        callback(entry);
      });
    },
    { threshold: threshold }
  );
  if (!target) {
    return;
  }

  observer?.observe(target);
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
