import shared from "../shared";
import { events } from "../../../../../../lib/utils";

export default () => {

    const { ID,VARIATION } = shared;
    // store product details in local storage

    const savedForLaterProductScraper = () => {
        const cache = window.localStorage.EJ051saved_1;
        let cachedProductData = cache ? JSON.parse(cache) : [];
        let newProduct = true;


        const allProducts = document.querySelectorAll('.product-summary[data-sku]');
        for (let index = 0; index < allProducts.length; index += 1) {
            const element = allProducts[index];

            const saveForLater = element.querySelector(`.${ID}-save`);

            const productName = element.querySelector('.product-summary__description');
            const productLink = productName.querySelector('a').getAttribute('href');
            const productImg = element.querySelector('.product-summary__left img');
            const productPrice = element.querySelector('.product-summary__right strong');
            const savePrice = element.querySelector('.product-summary__right .product-summary__was-price');
            const wasPrice = element.querySelector('.product-summary__right .product-summary__save-price');
            const productNum = element.querySelector('.product-summary__sku');
            const size = element.querySelector('.product-summary__ring-size');

            saveForLater.addEventListener('click', () => {
                const data = {
                    name: productName.textContent.trim(),
                    link: productLink,
                    image: productImg.getAttribute('src'),
                    productNum: productNum.textContent,
                    size: `${size ? size.textContent : ''}`,
                    price: productPrice.textContent,
                    savePrice: `${savePrice ? savePrice.textContent : ''}`,
                    wasPrice: `${wasPrice ? wasPrice.textContent : ''}`,
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
            
                // Keep cachedProductData limited to 5 products
                if (typeof cachedProductData.length === 'number') {
                    while (cachedProductData.length > 5) cachedProductData.shift();
                }
            
                // Store product data in localStorage
                window.localStorage.EJ051saved_1 = JSON.stringify(cachedProductData);

                // feedback once it'saved
                saveForLater.classList.add(`${ID}-saved`);
                saveForLater.innerHTML = '<span></span><p>Saved for later</p>';
            
                events.send(`${ID} V${VARIATION}`, 'click', 'Save for later');
            });
        }
    };

    // save the products
    savedForLaterProductScraper();
  
}