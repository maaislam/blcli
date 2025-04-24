import shared from '../shared';
import { __ } from '../helpers';

/**
 * generic changes to the basket form
 */
const { ID } = shared;

export default () => {

    function formatMoney(val, n, x, s, c) {
        var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
            num = val.toFixed(Math.max(0, ~~n));
        return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
    };


    const desktopSize = (window.innerWidth > 1023);

    const form = document.querySelector('.cart form');
    form.insertAdjacentHTML('afterbegin', `<div class="${ID}-basket_title"><h2>${__('My Basket')}</h2></div>`);

    // inner product changes
    const products = document.querySelectorAll(`form tbody tr`);
    for (let index = 0; index < products.length; index += 1) {
        const element = products[index];

        // add change link if there is a colour
        const colour = element.querySelector('dl.item-options');
        const productLink = element.querySelector('.image-cell a');

 
        if(colour && productLink) {
            colour.insertAdjacentHTML('beforeend', `<div class="${ID}-change_link"><a href="${productLink.getAttribute('href')}">${__('Change')}</a></div>`);
        }

        // add total price from shipping and unit price
        const priceText = element.querySelector('.cart-price .price');
        const shippingPriceText = element.querySelector('.a-right .price');

        if(priceText && shippingPriceText) {

            let priceAmount;
            let shippingAmount;

            if(window.location.href.indexOf('/it/') > -1) {
                priceAmount = priceText.textContent.replace(/[^\d\,-]/g, "");
                shippingAmount = shippingPriceText.textContent.replace(/[^\d\,-]/g, "");
            } else {
                priceAmount = priceText.textContent.replace(/[^\d\.\-]/g, ""); 
                shippingAmount = shippingPriceText.textContent.replace(/[^\d\.\-]/g, ""); 
            }
       
            const totalPrice = (parseInt(priceAmount, 10) + parseInt(shippingAmount, 10));

            let formatTotal;
            if(window.location.href.indexOf('/it/') > -1) {
               formatTotal = formatMoney(parseFloat(totalPrice), 2, 3, '.', ',');
            } else {
                formatTotal = formatMoney(parseFloat(totalPrice), 2, 3, ',', '.');
            }

            if(desktopSize) {
                element.querySelector('.cart-price').insertAdjacentHTML('afterend', `<p class="${ID}-totalPrice"><span>${__('£')}${formatTotal}</span></p>`);
            } else {
                element.querySelector('.product-name').insertAdjacentHTML('afterend', `<p class="${ID}-totalPrice">${__('Price')}: <span>${__('£')}${formatTotal}</span></p>`);
            }
        }

        // add the update button after quantity
        const qty = element.querySelector('.input-text.qty:not(:disabled)');
        if(qty) {
            qty.setAttribute('type', 'number');
            qty.insertAdjacentHTML('afterend', `<div class="${ID}-update"><button type="submit" name="update_cart_action" value="update_qty" class="${ID}-updateQTY"</button></div>`);
        }

        // Change the quantity text
        const allQty = element.querySelector('.input-text.qty');
        if(allQty) {
            if(desktopSize) {
                allQty.parentElement.querySelector('.label-mobile').textContent = `${__('Quantity')}`;
            }
        }

        // change the price label on desktop
        if(desktopSize) {
            const priceLabel = element.querySelector('.cart-price').parentElement.querySelector('.label-mobile');
            priceLabel.textContent = `${__('Price')}`;


            // swap the position of the price and qty
            const qty = element.querySelector('.a-center');
            const priceSection = element.querySelector('.image-cell').nextElementSibling;

            priceSection.insertAdjacentElement('afterend', qty);
        }
    }


     // add the promotional code title 
     const promoCode = document.querySelector('.cart-collaterals .deals');
     const promoCodeHeader = promoCode.querySelector('h2');
     promoCodeHeader.textContent = `${__('Promotional Code')}`;
     promoCode.querySelector('button span').textContent = `${__('Apply')}`;

     promoCodeHeader.addEventListener('click', () => {
         if(promoCode.classList.contains(`${ID}-promo-active`)) {
             promoCode.classList.remove(`${ID}-promo-active`);
         } else {
             promoCode.classList.add(`${ID}-promo-active`);
         }
     });


    //add savings to product
    const priceAmounts = document.querySelector('.totals #shopping-cart-totals-table');
    let discountAmount;

    const discountCode = document.querySelector('#coupon_code');
     if (discountCode.value !== '') {
        const allValues = priceAmounts.querySelectorAll('tr');
        for (let index = 0; index < allValues.length; index++) {
            const element = allValues[index];
            const allText = element.innerText;

            if(allText.indexOf('-£') > -1 || allText.indexOf('-€') > -1) {
                discountAmount = element.querySelector('.price');
            }
        }
        document.querySelector('.cart form').insertAdjacentHTML('beforeend', `<div class="${ID}-saving"><div class="${ID}-innerSaving"><p>${__('Saving')}:</p><span>${discountAmount.textContent}</span></div></div>`);
     }
}