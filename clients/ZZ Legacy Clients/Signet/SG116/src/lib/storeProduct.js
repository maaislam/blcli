import { getSiteFromHostname }  from './services';
/**
 * Store the last viewed products
 * 
 */
const lastViewedProductScraper = () => {
    let cache;
    
    if(getSiteFromHostname() === 'hsamuel') {
        cache = window.localStorage.HS116stored_prods_1;
    } else {
        cache = window.localStorage.EJ116stored_prods_1;
    }
  
    let cachedProductData = cache ? JSON.parse(cache) : [];
    let newProduct = true;

    const productName =  document.querySelector('.product-summary .product-name')
    const productImage = document.querySelector('.product-gallery__image-container source[media="(min-width: 400px)"]');
    const productPrice = window.digitalData.product[0].price.currentPrice;
  
    // get data from product page
    if(productName && productImage && productPrice) {
        const data = {
            name: productName.innerText.trim(),
            image: productImage.getAttribute('srcset').replace('.webp', '.jpg'),
            price: `£${productPrice}`,
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
            while (cachedProductData.length > 9) cachedProductData.shift();
        }
    
        // Store product data in localStorage
        if(getSiteFromHostname() === 'hsamuel') {
            window.localStorage.HS116stored_prods_1 = JSON.stringify(cachedProductData);
        } else {
          window.localStorage.EJ116stored_prods_1 = JSON.stringify(cachedProductData);
        }
    }
};
  
export default lastViewedProductScraper;
  