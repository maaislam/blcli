export const fetchProductData = (url) => {
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'text/html',
      Accept: 'text/html',
    },
    credentials: 'include', // Include cookies for authenticated access
  })
    .then((response) => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.text();
    })
    .then((htmlText) => {
      // Parse the HTML content
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, 'text/html');
      const formWrapper = doc.querySelector('#formBookRoom .js-form-update');

      if (!formWrapper) {
        //return;
      }

      const resultArray = [];
      const inputElements = formWrapper.querySelectorAll('input[type="hidden"]');

      inputElements.forEach((input) => {
        const encodedKey = encodeURIComponent(input.name);
        const encodedValue = encodeURIComponent(input.value);
        resultArray.push(`${encodedKey}=${encodedValue}`);
      });
      return resultArray.join('&');
    });
};

export const addBooking = (queryString) => {
  // Base URL
  const baseURL = 'https://www.travelodge.co.uk/basket/add-booking';
  // Full URL with parameters
  const url = `${baseURL}?${queryString}`;
  // Fetch configuration
  const fetchOptions = {
    method: 'POST',
  };

  // Execute the fetch request
  return fetch(url, fetchOptions).then((response) => response.json);
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
