const lastViewedURLScraper = () => {
    let cache = window.sessionStorage.BOUrls;

    let cachedCatData = cache ? JSON.parse(cache) : [];
    let newURL = true;
  
    // get data from page
    const data = {
      link: window.location.href,
    };
  
    for (let i = 0; i < cachedCatData.length; i += 1) {
      const cachedData = cachedCatData[i];
      if (data.link === cachedData.link) {
        // Product already exists, move it to the end of the array
        const urlToMove = cachedCatData.splice(i, 1);
        cachedCatData = cachedCatData.concat(urlToMove);
        newURL = false;
        break;
      }
    }
  
    // Push product data if new product
    if (newURL) cachedCatData.push(data);
  
    // Keep cachedProductData limited to 8 urls
    if (typeof cachedCatData.length === 'number') {
      while (cachedCatData.length > 3) cachedCatData.shift();
    }
  
    window.sessionStorage.BOUrls = JSON.stringify(cachedCatData);
   
};
  
export default lastViewedURLScraper;
  