export const getProductData = (url = location.pathname) => {
  const fetchUrl = url + '.js';
  return fetch(fetchUrl).then((response) => response.json());
};
