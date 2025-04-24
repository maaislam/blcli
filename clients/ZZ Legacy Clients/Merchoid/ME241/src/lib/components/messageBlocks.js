import shared from '../shared';

export default () => {

    const { ID } = shared;

    const url = window.location.href;

     // add low stock message
    let randomProductsLowStock;

    if(url.indexOf('brand') > -1) {
        randomProductsLowStock = document.querySelectorAll('.products.list.items.product-items .item.product.product-item:nth-child(3n+2)');
    } else {
        randomProductsLowStock = document.querySelectorAll('.products.list.items.product-items .item:nth-child(4n+1)');
    }

    for (let index = 0; index < randomProductsLowStock.length; index += 1) {
        const element = randomProductsLowStock[index];

        const productImage = element.querySelector('.product-image-container');

        const lowStockBadge = document.createElement('div');
        lowStockBadge.classList.add(`${ID}-badge`);
        lowStockBadge.classList.add(`${ID}-lowStockBadge`);
        lowStockBadge.innerHTML =  
        `<div class="${ID}-icon"></div>
        <span>Low stock</span>`;

        if(productImage) {
            productImage.appendChild(lowStockBadge);
        }
    }

    // add the selling fast products

    let randomProductsSellingFast;

    // different nth childs to look random
    if(url.indexOf('brand') > -1) {
        randomProductsSellingFast = document.querySelectorAll('.products.list.items.product-items .item.product.product-item:nth-child(5n+1)');
    } else {
        randomProductsSellingFast = document.querySelectorAll('.products.list.items.product-items .item:nth-child(5n+1)');
    }
    for (let index = 0; index < randomProductsSellingFast.length; index += 1) {
        const element = randomProductsSellingFast[index];
        const productImage = element.querySelector('.product-image-container');

        const sellingFastbadge = document.createElement('div');
        sellingFastbadge.classList.add(`${ID}-badge`);
        sellingFastbadge.classList.add(`${ID}-sellingFastBadge`);
        sellingFastbadge.innerHTML =  
        `<div class="${ID}-icon"></div>
        <span>Selling fast</span>`;

        if(productImage && !element.querySelector(`.${ID}-badge`)) {
            productImage.appendChild(sellingFastbadge);
        }
    }
}
