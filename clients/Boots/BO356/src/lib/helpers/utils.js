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

export const obsIntersection = (selector, threshold, callback) => {
  const target = document.querySelector(selector);
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

export const getProducts = (productsArr) => {
  return fetch(`https://www.boots-optimisation.co.uk/prod-info/model/${productsArr.join('&')}`, {
    method: 'GET',
    headers: {
      accept: '*/*',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      //console.log(data);
      return data;
    });
};

export const getProductId = (url) => {
  let [pathname, queryString] = url.split('?');

  // Check for productId in query parameters
  if (queryString) {
    let params = new URLSearchParams(queryString);
    if (params.has('productId')) {
      return params.get('productId');
    }
  }

  // Extract product ID from the last numeric part of the pathname
  const pathSegments = pathname.split('-').filter((segment) => segment.trim() !== '');
  let lastSegment = pathSegments[pathSegments.length - 1];

  // If lastSegment is empty or not a number, find the last numeric segment
  if (!/^\d+$/.test(lastSegment)) {
    lastSegment = pathSegments.reverse().find((segment) => /^\d+$/.test(segment)) || null;
  }

  return lastSegment;
};

export const getStarRating = (rating) => {
  let fullStars = Math.floor(rating); // Full stars
  let fractionalPart = rating % 1; // The decimal part (e.g., 0.6 for 4.6)
  let emptyStars = 5 - Math.ceil(rating); // Remaining empty stars

  let fullStarElem = `
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path d="M7.23528 0.638057L9.345 4.85751L9.40358 4.97467L9.53325 4.99319L13.7197 5.59126L10.7209 8.73996L10.6252 8.84046L10.6599 8.97484L11.8608 13.6284L7.341 11.5192L7.23528 11.4698L7.12955 11.5192L2.60976 13.6284L3.81068 8.97484L3.84536 8.84046L3.74964 8.73996L0.750876 5.59126L4.9373 4.99319L5.06697 4.97467L5.12555 4.85751L7.23528 0.638057Z" fill="#FFCC00" stroke="#767676" stroke-width="0.5"/>
    </svg>
  `;

  let emptyStarElem = `
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path d="M7.23526 0.638057L9.34499 4.85751L9.40357 4.97467L9.53324 4.99319L13.7197 5.59126L10.7209 8.73996L10.6252 8.84046L10.6599 8.97484L11.8608 13.6284L7.34098 11.5192L7.23526 11.4698L7.12954 11.5192L2.60975 13.6284L3.81066 8.97484L3.84534 8.84046L3.74963 8.73996L0.750861 5.59126L4.93728 4.99319L5.06695 4.97467L5.12553 4.85751L7.23526 0.638057Z" fill="#E6E6ED" stroke="#767676" stroke-width="0.5"/>
    </svg>
  `;

  let partialStarElem =
    fractionalPart > 0
      ? `
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
      <defs>
        <linearGradient id="partial-star">
          <stop offset="${fractionalPart * 100}%" stop-color="#FFCC00"/>
          <stop offset="${fractionalPart * 100}%" stop-color="#E6E6ED"/>
        </linearGradient>
      </defs>
      <path d="M7.23528 0.638057L9.345 4.85751L9.40358 4.97467L9.53325 4.99319L13.7197 5.59126L10.7209 8.73996L10.6252 8.84046L10.6599 8.97484L11.8608 13.6284L7.341 11.5192L7.23528 11.4698L7.12955 11.5192L2.60976 13.6284L3.81068 8.97484L3.84536 8.84046L3.74964 8.73996L0.750876 5.59126L4.9373 4.99319L5.06697 4.97467L5.12555 4.85751L7.23528 0.638057Z" fill="url(#partial-star)" stroke="#767676" stroke-width="0.5"/>
    </svg>
  `
      : '';

  return fullStarElem.repeat(fullStars) + partialStarElem + emptyStarElem.repeat(emptyStars);
};

export const getCleanPathAndSearch = () => {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);

  // Remove params that contain "at_preview"
  params.forEach((_, key) => {
    if (key.includes('at_preview')) {
      params.delete(key);
    }
  });

  return url.pathname + (params.toString() ? '?' + params.toString() : '');
};
