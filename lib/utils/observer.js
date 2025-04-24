/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/prefer-default-export */

/**
 * Function to add Mutation Observer to dom element and if mutation is true, fire function.
 * @param {string} target Will return first element so make sure there is only one, or your query is explicit.
 * @param {function} callBack This is the function you want to call once the target is available.
 * @param {string} callBackParam This is optional, if your function requires params, you can pass them in here.
 * @param {Array} extraConditions This is optional, if you require extra conditions e.g mobileDetection etc.
 * @param {Array} configOptions THis is optional, if you require different options pass array to update.
 */

export const observerMutation = (
  target,
  callBack,
  callBackParam,
  extraConditions,
  configOptions,
) => {
  // select the target node
  const targetObserver = document.querySelector(target);

  // create an observer instance, safari via webkit
  const MutationObserver =
    window.MutationObserver || window.WebKitMutationObserver;

  // create the observer
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (callBackParam) {
        if (extraConditions) {
          extraConditions.forEach((element) => {
            if (mutation && element) {
              callBack(callBackParam);
            }
          });
        } else if (mutation) {
          callBack(callBackParam);
        }
      } else if (extraConditions) {
        extraConditions.forEach((element) => {
          if (mutation && element) {
            callBack();
          }
        });
      } else if (mutation) {
        callBack();
      }
    });
  });

  // configuration of the observer:
  // only really need attributes
  let config = {};
  if (configOptions) {
    config = configOptions;
  } else {
    config = { attributes: true, childList: true, characterData: true };
  }

  // pass in the target node, as well as the observer options
  observer.observe(targetObserver, config);
};
