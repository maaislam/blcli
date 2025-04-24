/**
 * Changes to the top product information
 */

import {
    pollerLite
} from "../../../../../../../lib/utils";
import shared from '../../shared';
//import scrollToElement from "../../scrollTo";

export default () => {

    const {
        ID
    } = shared;

    const brandLogo = document.querySelector('.detail-page__left-column .brand-logo');
    const addToBag = document.querySelector('.detail-page__right-column .product-buy-now');
    const productName = document.querySelector('.detail-page__right-column .product-name');
    const productNumber = window.digitalData.product[0].productInfo.masterSku;
    const productReviews = document.querySelector('.detail-page__right-column .product-customer-rating-summary');

    // move the brand image
    if (brandLogo) {
        productName.insertAdjacentElement('beforebegin', brandLogo);
    }

    // change add to bag text
    if (addToBag) {
        addToBag.querySelector('.product-buy-now__text').textContent = 'Add to basket';
    }

    // add product number under title
    if (productNumber) {
        productName.insertAdjacentHTML('afterend', `<div class="${ID}__productNo">Product No: ${productNumber}</div>`);
    }

     // move reviews
     if(productReviews) {
       document.querySelector(`.${ID}__productNo`).insertAdjacentElement('afterend', productReviews);
        productReviews.querySelector('.product-customer-rating-summary__text').textContent = 'Read Reviews';
    }

    // create new price area
    const priceSection = () => {
        const currentPrice = document.querySelector('.detail-page__right-column .product-price');
        const financeMessage = document.querySelector('.detail-page__right-column .product-ifc');
        const payPalBox = document.querySelector('.product-paypal-credit__text');

        const newPriceArea = document.createElement('div');
        newPriceArea.className = `${ID}__row ${ID}__priceSection`;
        newPriceArea.innerHTML = currentPrice.outerHTML;

        document.querySelector('.product-stock').insertAdjacentElement('beforebegin', newPriceArea);

        let financeBox = '';
        // if finance exists add the box
        if (financeMessage) {
            const financeAmount = financeMessage.querySelector('strong');
            const financePrice = financeAmount.innerText.trim().toLowerCase().replace('per month', '');

            financeBox = `
            <div class="${ID}__financeBox ${ID}-ifc">
                    <p>4 Years Interest Free Credit Available</p>
                    <p>from <b>${financePrice}</b> per month
                        ${financeMessage.textContent.indexOf('(1 item only)') > -1 ? `<span>(1 Item only)</span>` : `<div class="${ID}__textLink">Learn More</div>`}
                    </p>
                </div>`;
            
        } else if (payPalBox) {
            financeBox = `
                <div class="${ID}__financeBox ${ID}-paypal">
                    <p>Spread the cost of this purchase with 0% interest for 4 months
                        <a href="https://www.hsamuel.co.uk/webstore/static/customerservice/paypal-credit-faqs.cdo" class="${ID}__textLink">Learn More</a>
                    </p>
                </div>`;
        } 

        if(financeBox !== '') {
            document.querySelector(`.${ID}__row.${ID}__priceSection`).insertAdjacentHTML('beforeend', financeBox);
        }
        
    }

    // change the button if it's out of stock
    const checkStock = () => {
        const inStock = window.digitalData.product[0].productInfo.stock;

        if (inStock === 'no') {
            document.querySelector(`.${ID}__priceSection`).insertAdjacentHTML('afterend', `<div class="${ID}__button ${ID}-noStock">Out of stock</div>`);
        }
    }

    const addAppointmentLinks = () => {
        const apptLinks = document.createElement('div');
        apptLinks.classList.add(`${ID}__appointmentLinks`);
        apptLinks.innerHTML = `
        <a class="${ID}__textLink" href="https://booking.hsamuel.co.uk/#/map">Book an in-store appointment</a>
        <a class="${ID}__textLink" href="https://customer.bookingbug.com/?client=h_samue">Book a virtual appointment</a>`;

        if(addToBag) {
            addToBag.insertAdjacentElement('afterend', apptLinks);
        }
    }

    priceSection();
    checkStock();
    addAppointmentLinks();

    // click finance button
    const ifcButton = document.querySelector('#js-ifcBuyButton');
    
    if(ifcButton){
        document.querySelector(`.${ID}__financeBox.${ID}-ifc .${ID}__textLink`).addEventListener('click', () => {
            console.log('click');
            ifcButton.click();
        });
    }

}