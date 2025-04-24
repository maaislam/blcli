import { getSiteFromHostname } from "./experiment";


/**
 * Store the last viewed products
 * 
 */

const lastViewedProductScraper = () => {
    let cache;
    if (getSiteFromHostname() === 'ernestjones') {
        cache = window.localStorage.EJ138recommended_prods_1;
    } else {
        cache = window.localStorage.HS138recommended_prods_1;
    }

    let cachedProductData = cache ? JSON.parse(cache) : [];
    let newProduct = true;

    // get data from page
    const data = {
        date: new Date().getTime(),
        name: document.querySelector('.product-summary .product-name ').innerText.trim(),
        image: document.querySelector('.product-gallery__image-container img').src,
        link: window.location.href,
    };

    for (let i = 0; i < cachedProductData.length; i += 1) {
        const cachedData = cachedProductData[i];
        if (data.name === cachedData.name) {
            // Product already exists, move it to the end of the array
            const productToMove = cachedProductData.splice(i, 1);
            cachedProductData = cachedProductData.concat(productToMove);
            newProduct = false;
            break;
        }
    }

    // Push product data if new product
    if (newProduct) cachedProductData.push(data);

    // Keep cachedProductData limited to 10 products
    if (typeof cachedProductData.length === 'number') {
        while (cachedProductData.length >= 10) cachedProductData.shift();
    }

    // Store product data in localStorage
    if (getSiteFromHostname() === 'ernestjones') {
        window.localStorage.EJ138recommended_prods_1 = JSON.stringify(cachedProductData);
    } else {
        window.localStorage.HS138recommended_prods_1 = JSON.stringify(cachedProductData);
    }
};



export default lastViewedProductScraper;