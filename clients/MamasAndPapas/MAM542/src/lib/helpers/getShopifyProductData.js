const getProductData = (urls) => {
  // Function to fetch data from an array of URLs and return a promise

  // Function to fetch data from a single URL using fetch and return a promise
  const fetchData = (url) => {
    return fetch(`${url}.js`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        throw error;
      });
  };

  // Map each URL to a promise using fetchData function
  const promises = urls.map((url) => fetchData(url));

  // Return a promise that resolves when all promises in the array have resolved
  return Promise.all(promises)
    .then((data) => {
      // All promises have resolved successfully
      console.log('All data fetched:', data);
      // Process the fetched data here if needed
      return data;
    })
    .catch((error) => {
      // One or more promises were rejected
      console.error('Error fetching all data:', error);
      throw error;
    });
};

export default getProductData;
