/**
 * generic changes to the basket products
 */

import shared from "../shared";

export default () => {

    const { ID } = shared;

    const allProducts = document.querySelectorAll('.product-summary');
    for (let index = 0; index < allProducts.length; index += 1) {
        const element = allProducts[index];

        if(element.hasAttribute('data-sku')) {
            // move price and size to the bottom in new wrapper
            const bottomContent = document.createElement('div');
            bottomContent.classList.add(`${ID}-bottomContent`);
            element.appendChild(bottomContent);

            const productNumber = element.querySelector('.product-summary__sku');
            const productPricing = element.querySelector('.product-summary__right');
            if(productPricing) {
                bottomContent.appendChild(productPricing);
            }
            if(productNumber) {
                if(window.innerWidth >= 1024) {
                    element.querySelector('.product-summary__center').appendChild(productNumber);
                } else {
                    bottomContent.appendChild(productNumber);
                }
            } 

            // add remove and save for later links
            const bottomProductLinks = document.createElement('div');
            bottomProductLinks.classList.add(`${ID}-bottomLinks`);
            bottomProductLinks.innerHTML = 
            `<div class="${ID}-productLink ${ID}-remove">Remove</div>
            <div class="${ID}-productLink ${ID}-save">Save for later</div>`;
        
            element.appendChild(bottomProductLinks);
    

            // on remove click, click the hidden remove button
            const removeButton = element.querySelector('.product-summary__remove-form button');
            element.querySelector(`.${ID}-remove`).addEventListener('click', () => {
                removeButton.click();
            });
        }

        // if element is the gift option
        const productName = element.querySelector('.product-summary__description');
       if(productName.textContent.indexOf('Gift options') > -1) {
           element.classList.add(`${ID}-gift_option`);
       }
    }
}