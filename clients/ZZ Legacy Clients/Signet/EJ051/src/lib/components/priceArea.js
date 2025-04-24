import shared from "../shared";
import { events } from "../../../../../../lib/utils";

export default () => {
    const { ID, VARIATION } = shared;


    // move buttons 
    document.querySelector('.order-summary__container').appendChild(document.querySelector('#lower-button-group'));

    // add paypal button
    document.querySelector('#lower-button-group').insertAdjacentHTML('afterend', `<p class="${ID}-credit_text"><span>*Important - </span>If checking out with PayPal, ensure the delivery address within your account is current and correct.</p>`);

    // event for applied promo code
    if(document.querySelector('.promo-code-input__remove-button')) {
        events.send(`${ID} v${VARIATION}`, 'Applied Promo Code', 'Applied Promo Code', { sendOnce: true });
    }

    // change the voucher button text
    const voucherBox = document.querySelector('.promo-code-input__container');
    if(voucherBox.querySelector('.cta--secondary')) {
        voucherBox.querySelector('.cta--secondary').textContent = 'Apply';
    }

    const addClassesToPrices = () => {
        // loop through total prices, add classlists for easier dom changes
        const allTotals = document.querySelectorAll('.order-summary div[class^="order-summary"]');
        for (let index = 0; index < allTotals.length; index += 1) {
            const element = allTotals[index];
            
            const rowTitle = element.querySelector('dt');
            if(rowTitle) {
                if(rowTitle.textContent.indexOf('Delivery') > -1) {
                    element.classList.add(`${ID}-deliveryRow`);
                }
                if(rowTitle.textContent.indexOf('promo code') > -1) {
                    element.classList.add(`${ID}-promoPrice`);
                }
                if(rowTitle.textContent.indexOf('gift packaging') > -1) {
                    element.classList.add(`${ID}-gift_pricing`);
                }
                if(rowTitle.textContent.indexOf('Subtotal') > -1) {
                    element.classList.add(`${ID}-subtotal`);
                }
                if(rowTitle.textContent.indexOf('Total') > -1) {
                    element.classList.add(`${ID}-grandTotal`);
                }
            }

            // get the savings 
            if(element.textContent.indexOf(`You're saving`) > -1) {
                element.classList.add(`${ID}-savings`);
            }
        } 
    }
    addClassesToPrices();

    const totalSection = () => {
        // if a discount or/and savings have been added
        const totalSaved = document.querySelector(`.${ID}-savings`);
        const voucherCode = document.querySelector(`.${ID}-promoPrice`); 


        const errorVoucher = document.querySelector('.error-strip');
        // if the voucher is not valid but gets applied anyway 
        if(errorVoucher) {
            if(errorVoucher.textContent !== '' && document.querySelector('#couponCodeRemove') && !voucherCode) {
                document.querySelector('#promo-code-content').classList.add(`${ID}-voucher_invalid`);
            }
            document.querySelector('.container .page-title').insertAdjacentElement('afterend', errorVoucher); 
        } 

        let onSaleSavings;
        let discountCodeSaved;
        let totalSavings;

        // make remove capital
        if(document.querySelector('#promo-code-remove .product-summary__remove-button')) {
            document.querySelector('#promo-code-remove .product-summary__remove-button').textContent = 'Remove';
        }

        if(voucherCode) {
            document.querySelector('#couponCodeRemove').setAttribute('type', 'readonly');
            discountCodeSaved = voucherCode.querySelector('.order-summary__item-value').textContent.match(/(\d+(?:\.\d{1,2})?)/);
        }
        if(document.querySelector('.promo-code-input__remove-button') && !voucherCode) {
            document.querySelector('#promo-code-content').classList.add(`${ID}-voucher_valid`);
        }
        if(totalSaved) {
            onSaleSavings = totalSaved.textContent.match(/[\$\£\€](\d+(?:\.\d{1,2})?)/);
        }

        // if voucher code and on sale
        if(voucherCode && totalSaved) {
             
            // add both prices together
            totalSavings = `${(parseFloat(discountCodeSaved[0]) + parseFloat(onSaleSavings[1]))}`;
            
            totalSaved.insertAdjacentHTML('afterbegin', `<dt>Total Saved:</dt><dd>${totalSavings}</dd>`);
            document.querySelector(`.${ID}-grandTotal`).insertAdjacentElement('beforebegin', totalSaved);
    
            // if no voucher but on sale
        } else if(totalSaved && !voucherCode){
            totalSavings = onSaleSavings[0];
            totalSaved.insertAdjacentHTML('afterbegin', `<dt>Total Saved:</dt><dd>${totalSavings}</dd>`);
            document.querySelector(`.${ID}-grandTotal`).insertAdjacentElement('beforebegin', totalSaved);
        // if voucher code but not on sale
        } else if(voucherCode && !totalSaved) {
            totalSavings = discountCodeSaved[0];
            document.querySelector(`.${ID}-grandTotal`).insertAdjacentHTML('beforebegin',`<div class="order-summary__row__divider ${ID}-promoSaving"><dt>Total Saved:</dt><dd>£${discountCodeSaved[0]}</dd></div>`);
        }
    }
    totalSection();


    // if lower buttons is empty, move the checkout button
    const bottomCTAs = document.querySelector('#lower-button-group');
    if(bottomCTAs.innerText == '') {

        const checkoutButton = `<div class="${ID}-checkoutButton ${ID}-button">Checkout Now</div>`;
        document.querySelector('.order-summary').insertAdjacentHTML('beforeend', checkoutButton);
    
        document.querySelector(`.${ID}-checkoutButton`).addEventListener('click', () => {
            document.querySelector('#checkout-form-1 button').click();
        });
    } 

}