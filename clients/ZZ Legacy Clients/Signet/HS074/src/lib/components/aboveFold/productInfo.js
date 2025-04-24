/**
 * Changes to the top product information
 */

import { pollerLite } from "../../../../../../../lib/utils";
import shared from '../../shared';
import scrollToElement from "../../scrollTo";

export default () => {

    const { ID } = shared;

    const brandLogo = document.querySelector('.detail-page__left-column .brand-logo');
    const addToBag = document.querySelector('.product-buy-now');
    const productName = document.querySelector('.detail-page__right-column .product-name');
    const productNumber = window.digitalData.product[0].productInfo.masterSku;

    // move the brand image
    if(brandLogo) {
        productName.insertAdjacentElement('beforebegin', brandLogo);
    }

    // change add to bag text
    if(addToBag) {
        addToBag.querySelector('.product-buy-now__text').textContent = 'Add to basket';
    }

    // add product number under title
    if(productNumber) {
        productName.insertAdjacentHTML('afterend', `<div class="${ID}__productNo">Product No: ${productNumber}</div>`);
    }

    // move review stars
    const reviewStars = document.querySelector('.product-summary .product-customer-rating-summary');
    if(reviewStars) {
        document.querySelector(`.${ID}__productNo`).insertAdjacentElement('afterend', reviewStars);
    }


    // add finance info
    const priceSection = () => {
        const currentPrice = document.querySelector('.detail-page__right-column .product-price');
        const financeMessage = document.querySelector('.detail-page__right-column .product-ifc');
        const financeAmount = financeMessage.querySelector('strong');
        if(financeMessage) {
            const financePrice = financeAmount.innerText.trim().toLowerCase().replace('per month', '').replace('p/m', '');

            const newPriceArea = document.createElement('div');
            newPriceArea.classList.add(`${ID}__row`);
            newPriceArea.classList.add(`${ID}__priceSection`);
            newPriceArea.innerHTML = 
            `${currentPrice.outerHTML}
            <div class="${ID}__financeBox">
                <p>4 Years Interest Free Credit Available</p>
                <p>from <b>${financePrice}</b> p/m
                    ${financeMessage.textContent.indexOf('(1 item only)') > -1 ? `<span>(1 Item only)</span>` : `<div class="${ID}__textLink">Learn More</div>`}
                </p>
            </div>`;

            document.querySelector('.product-stock ').insertAdjacentElement('beforebegin', newPriceArea);

            const ifcButton = document.querySelector('#js-ifcBuyButton');
            if(newPriceArea.querySelector(`.${ID}__financeBox .${ID}__textLink`)) {
                newPriceArea.querySelector(`.${ID}__financeBox .${ID}__textLink`).addEventListener('click', () => {
                    ifcButton.click();
                })
            }
        }
    }

    // change the button if it's out of stock
    const checkStock = () => {
        const inStock = window.digitalData.product[0].productInfo.stock;

        if(inStock === 'no') {
            document.querySelector(`.${ID}__productNo`).insertAdjacentHTML('afterend', `<div class="${ID}__button ${ID}-noStock">Out of stock</div>`);
        }
    }

    const hintLink = () => {
        const productInfo = document.querySelector('.detail-page__right-column');
        if(productInfo) {
            const hintLink = document.createElement('div');
            hintLink.classList.add(`${ID}__textLink`);
            hintLink.classList.add(`${ID}__hintAnchor`);
            hintLink.innerHTML = `<span>Drop a hint</span>`;

            productInfo.appendChild(hintLink);

            hintLink.addEventListener('click', () => {
                scrollToElement(document.querySelector(`.${ID}__section.${ID}__hint`));
            })
        }
    }

    checkStock();
    hintLink();
    pollerLite([`.${ID}__mainProductInfo`, '.product-ifc'], () => {
        priceSection();
    });


}