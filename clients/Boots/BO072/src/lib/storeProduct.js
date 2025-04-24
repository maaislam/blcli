/**
 * Store the last viewed products
 * 
 */
const lastViewedProductScraper = () => {
    const cache = window.localStorage.BO072stored_prods_1;

    let cachedProductData = cache ? JSON.parse(cache) : [];
    let newProduct = true;

    const productName = document.querySelector('#estore_product_title h1');
    const productImage = document.querySelector('[itemprop=image]');
    const productPrice = document.querySelector('#PDP_productPrice');
  
    // get data from product page
    if(productName && productImage && productPrice) {
        const data = {
            name: productName.innerText.trim(),
            image: productImage.src.replace('wid=100', 'wid=300').replace('hei=100', 'hei=300'),
            price: productPrice.innerText.trim(),
            link: window.location.href,
        }
    
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
            while (cachedProductData.length > 10) cachedProductData.shift();
        }
    
        // Store product data in localStorage
        window.localStorage.BO072stored_prods_1 = JSON.stringify(cachedProductData);
    }
};
  
export default lastViewedProductScraper;
  