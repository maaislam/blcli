import shared from "../shared";
import { pollerLite } from "../../../../../../lib/utils";

export default () => {
    const { ID } = shared;

    const paypalCredit = document.querySelector('.basket__cta-form--paypal-credit');
    
    // restyle the paypal button
    const changePaypalButton = () => {
        const newPayPalButton = document.createElement('div');
        newPayPalButton.classList.add(`${ID}-paypal_button`);
        newPayPalButton.innerHTML = `<span></span> Checkout`;
    
        const currentPaypalButton = document.querySelector('#lower-button-group .basket__cta-form--paypal');
        if(currentPaypalButton) {
            currentPaypalButton.insertAdjacentElement('beforebegin', newPayPalButton);

            newPayPalButton.addEventListener('click', () => {
                currentPaypalButton.querySelector('input').click();
            });

        }
    }

    changePaypalButton();

    // if paypal credit checkout is showing add the button
    const paypalCheckout = () => {
        const payPalCreditButton = document.createElement('div');
        payPalCreditButton.classList.add(`${ID}-paypal_button`);
        payPalCreditButton.classList.add(`${ID}-paypalcredit_button`);
        payPalCreditButton.innerHTML = `<span></span> Credit Checkout`;

        document.querySelector('#lower-button-group .basket__cta-form').insertAdjacentElement('afterend', payPalCreditButton);
    
        // click paypal credit
        pollerLite(['#lower-button-group .basket__cta-form--paypal-credit'], () => {
            payPalCreditButton.addEventListener('click', () => {
                document.querySelector('#PayPalcheckoutform').submit();
            });
        });
        
    };

    if(paypalCredit) {
        paypalCheckout();
    }
}