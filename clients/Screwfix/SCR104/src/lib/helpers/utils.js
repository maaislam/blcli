/*eslint-disable no-prototype-builtins */
export const fetchSkus = () => {
  return fetch('https://www.screwfix.com/jsp/account/allPurchasesPage.jsp?sortBy=freq', {
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
      console.log('🚀 ~ .then ~ doc:', doc.querySelectorAll('a.lii__bullets--wrp'));

      const prodUrls = Array.from(doc.querySelectorAll('a.lii__bullets--wrp'))
        .map((prodUrl) => {
          return prodUrl.href;
        })
        .filter(Boolean);

      return prodUrls; // Return the array of SKUs
    });
};

// Function to get product data based on SKUs

const getSKUFromURL = (url) => {
  const parts = url.split('/'); // Split the URL by '/'
  return parts[parts.length - 1]; // Return the last part
};

const parsedfromResponse = (info, url) => {
  const productTitle = info.querySelector('[data-qaid="pdp-product-name"]');
  const priceContainer = info.querySelector('[data-qaid="product-price"]');
  const reviewContainer = info.querySelector('[data-qaid="rating-stars_number-reviews"]');

  // console.log('priceContainer', priceContainer);
  // console.log('reviewContainer', reviewContainer);

  if (productTitle && priceContainer && reviewContainer) {
    return {
      sku: getSKUFromURL(url),
      url,
      title: productTitle,
      price: priceContainer,
      review: reviewContainer,
    };
  }
};

export const getProductsData = (urls) => {
  const promises = urls.map((url) => fetch(url));
  return Promise.all(promises)
    .then((results) => Promise.all(results.map((response) => response.text())))
    .then((data) => {
      const parser = new DOMParser();
      const info = [];
      data.forEach((el, index) => {
        if (el) {
          const parsed = parser.parseFromString(el, 'text/html');
          const url = urls[index];
          info.push(parsedfromResponse(parsed, url));
        }
      });
      return info;
    });
};

// Fetch SKUs and then fetch product data

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
