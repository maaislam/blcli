export const getParentCategory = () => {
  const breadcrumbs = document.querySelectorAll('[data-qaid="breadcrumb-qa"] li');
  const pageTypeConfig = {
    c: 'plp',
    p: 'pdp',
  };
  const domainEnd = location.href.indexOf('.com') + 5;
  const pageType = pageTypeConfig[location.href.charAt(domainEnd)];
  //console.log(pageType);
  const parentCategories = [];
  breadcrumbs.forEach((item) => {
    const href = item.querySelector('a')?.href;
    //console.log(href);
    if (href && href !== location.origin && href !== location.origin + '/' && item.querySelector('a').title) {
      parentCategories.push(item.querySelector('a').title);
    }
  });
  const data = {
    pageType,
    parentCategories,
  };

  console.log('data', data);
  return data;
};
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
