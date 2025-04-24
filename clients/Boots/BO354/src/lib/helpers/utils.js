import shared from '../../../../../../core-files/shared';

const { ID } = shared;

export const applySelectedClass = () => {
  const params = new URLSearchParams(window.location.search);

  params.forEach((value, key) => {
    const match = key.match(/^criteria\.(.+)$/);
    if (!match) return;

    const paramName = match[1];
    const values = value.includes('---') ? value.split('---') : [value];

    document.querySelectorAll(`li[data-filtername="${paramName}"]`).forEach((li) => {
      const checkbox = li.querySelector('input[type="checkbox"]');
      if (checkbox) {
        checkbox.checked = values.includes(li.dataset.filtervalue);
      }
    });
  });
};

export const updateURLFilter = (filterName, filterValue, searchTerm) => {
  const params = new URLSearchParams(window.location.search);
  const key = `criteria.${filterName}`;
  let values = params.get(key) ? params.get(key).split('---') : [];

  if (values.includes(filterValue)) {
    values = values.filter((v) => v !== filterValue);
  } else {
    values.push(filterValue);
  }

  // Update or remove the param
  values.length ? params.set(key, values.join('---')) : params.delete(key);

  // Update URL without reloading
  const newUrl = `${window.location.pathname}?${params.toString()}`;

  //find same element in control and click it

  const findElementByText = (text, selector = '*') => {
    return [...document.querySelectorAll(selector)].find(
      (el) =>
        el.childNodes[0].textContent.trim().toLowerCase() === text.toLowerCase() &&
        !el.classList.contains(`${ID}__filter-result-label`)
    );
  };

  const controlElem = findElementByText(filterValue, '[data-testid="checkbox-label"]');

  if (controlElem) {
    controlElem.click();
    return;
  }
  sessionStorage.setItem('lastFilterSearch', searchTerm);
  window.location.href = newUrl;
};

export const throttle = (func, limit) => {
  let lastFunc;
  let lastRan;

  return function (...args) {
    const context = this;

    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};

export const onUrlChange = (callback, onError = null) => {
  if (typeof callback !== 'function') {
    throw new Error('Callback function must be provided');
  }
  const mutationConfig = {
    childList: true,
    subtree: true,
  };

  let oldHref = window.location.href;
  //Create a new MutationObserver instance to observe changes to the document body
  const observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach((mutation) => {
      //Store the current URL in a separate variable to make the code more concise
      //const currentUrl = window.location.href;
      //Check if the URL has changed since the last observation
      if (oldHref !== window.location.href) {
        //const oldHref = observer.previousUrl;
        //Update the previous URL and execute the callback function
        oldHref = window.location.href;
        //console.log('URL changed!');
        observer.disconnect();
        try {
          setTimeout(() => {
            callback(oldHref, mutation);
          }, 500);
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

export const safeToFireEvent = () => {
  const previousPathname = sessionStorage.getItem('previousPathname') || '';
  const currentPathname = window.location.pathname;

  return currentPathname !== previousPathname || previousPathname === '';
};
