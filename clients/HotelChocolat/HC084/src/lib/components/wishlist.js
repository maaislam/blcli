import shared from "../../../../../../core-files/shared";
import { addPinsToProducts, iconClick, storeProduct, updatePinIcons } from "../helpers";

const { ID } = shared;
export default () => {
    // add pins
    addPinsToProducts();

    // check if any saved since last load, if so make active
    updatePinIcons();


    // if PDP

    if(document.querySelector('#pdpMain')) {
        const icon = document.querySelector(`.${ID}-icon__wrapper`);
        icon.addEventListener('click', (e) => {

            let image;
            if(document.querySelector('.primary-image')) {
                image = document.querySelector('.primary-image').getAttribute('src');
            } else {
                image = document.querySelector('#thumbnails .thumb.selected .productthumbnail.desktop').getAttribute('src');
            }

            // get product details
            const productTitle = document.querySelector('#page_heading h1').textContent;
            const productUrl = window.location.pathname;
            const productImg = image;
            const productSKU = document.querySelector('#pid').value;
            const currentPrice = document.querySelector('.product-col-2.product-detail .price-sales').textContent;
            let oldPrice = '';

            // save or remove the product
            iconClick(icon, productUrl, productTitle, productImg, currentPrice, oldPrice, productSKU);


        });
    } else {
        const allProducts = document.querySelectorAll('.search-result-content .grid-tile');

        [].forEach.call(allProducts, product => {

            const icon = product.querySelector(`.${ID}-icon__wrapper`);
            if(icon) {
                icon.addEventListener('click', () => {

                    // get product details
                    const productTitle = product.querySelector('.name-link').getAttribute('title');
                    const productImg = product.querySelector('.thumb-link img').getAttribute('src')
                    const productUrl = product.querySelector('.thumb-link').getAttribute('href');
                    const currentPrice = product.querySelector('.product-sales-price').textContent;
                   
                    let productSKU;

                    if(JSON.parse(product.querySelector('input').value).impression_product_SKU) {
                        productSKU = JSON.parse(product.querySelector('input').value).impression_product_SKU;
                      } else {
                        productSKU = JSON.parse(product.querySelector('input').value).productID;
                    }

                    let oldPrice = '';

                    iconClick(icon, productUrl, productTitle, productImg, currentPrice, oldPrice, productSKU);
                });
            }
        });
    }

}

