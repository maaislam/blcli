import { fireEvent } from '../../../../../../core-files/services';
import { pollerLite } from '../../../../../../lib/utils';

export const onUrlChange = (callback, onError = null) => {
  if (typeof callback !== 'function') {
    throw new Error('Callback function must be provided');
  }
  const mutationConfig = {
    childList: true,
    subtree: true,
  };
  //Create a new MutationObserver instance to observe changes to the document body
  const observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach((mutation) => {
      //Store the current URL in a separate variable to make the code more concise
      const currentUrl = window.location.href;
      //Check if the URL has changed since the last observation
      if (observer.previousUrl !== currentUrl) {
        const oldHref = observer.previousUrl;
        //Update the previous URL and execute the callback function
        observer.previousUrl = currentUrl;
        //console.log('URL changed!');
        observer.disconnect();
        try {
          setTimeout(() => {
            callback(oldHref, mutation);
          }, 1000);
        } catch (error) {
          console.log(`Error in callback function: ${error}`);
        }
        observer.observe(document.documentElement, mutationConfig);
      }
    });
  });

  //Initialize the previous URL to the current URL

  try {
    observer.previousUrl = window.location.href;
    //Start observing changes to the document documentElement to detect URL changes
    observer.observe(document.documentElement, mutationConfig);
  } catch (error) {
    if (onError && typeof onError === 'function') {
      onError(error);
    } else {
      console.log(`Error starting onUrlChange observer: ${error}`);
    }
  }
};

export const obsIntersection = (target, threshold, callback) => {
  const observer = new IntersectionObserver(
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

export const setCSSVariable = (variable, value) => {
  const root = document.documentElement;
  root.style.setProperty(variable, value);
};

export const activateSearchFunctionality = (searchValue) => {
  const headerSearch = document.querySelector('[data-qaid="header-search"] [name="mobile-search-button"]');
  const controlButton = document.querySelector('[data-qaid="search-button"]');
  const controlInput = document.querySelector('#keyword-search');
  const formWrapper = controlInput.closest('form[role="search"]');
  headerSearch.click(); //

  pollerLite([() => document.querySelector('.suggestion-overlay')], () => {
    const suggestionOverlay = document.querySelector('.suggestion-overlay');
    formWrapper.style.visibility = 'hidden';
    suggestionOverlay.visibility = 'hidden';

    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    nativeInputValueSetter.call(controlInput, searchValue);

    fireEvent('used search within the modal');
    const event = new Event('input', { bubbles: true });
    controlInput.dispatchEvent(event);
    controlInput.value = searchValue;
    controlButton.click();

    formWrapper.removeAttribute('style');
    suggestionOverlay.removeAttribute('style');
  });
};
