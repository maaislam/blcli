import shared from "../shared";
import scrollToElement from "./scrollToEl";
import { events } from "../../../../../../lib/utils";

/**
 * Page changes if finance has been selected
 */
export default () => {
    const { ID,VARIATION } = shared;

    const financeSelected = document.querySelector('#ifcPaymentContainer #ifcPaymentPlan');
    const financeWrap = document.querySelector('#ifcPaymentContainer');
    const topButtons = document.querySelector('.basket__button-row');
    const financePopUp = document.querySelector('#js-ifc-modal');
    const financeNotAllowed = document.querySelector('#js-ifc-disallowed-msg[hidden]');
    const uspWrapper = document.querySelector(`.${ID}_basket_usps`);

    const financeShowing = () => {
        const financeButton = financePopUp.querySelector('.ifc-calculator__add-to-bag');
        const moreInfo = financePopUp.querySelector('.ifc-calculator__terms-conditions');
        const terms = financePopUp.querySelector('.ifc-calculator__terms-container');

        // add finance title
        financePopUp.insertAdjacentHTML('afterbegin', `<h2 class="${ID}-finance_title">Pay with 0% APR finance</h2>`);

        // move term below slider
        financePopUp.querySelector('.ifc-calculator-summary').insertAdjacentElement('afterbegin', terms);
    
        // move the link outside of the box
        financePopUp.appendChild(moreInfo);

        // Change the text of the finance button
        financeButton.value = 'Add 0% finance to bag';

        // add second finance button to the bottom
        const buyWithIFC = document.querySelector('#js-ifcBuyButton');
        buyWithIFC.insertAdjacentHTML('beforebegin',`<div class="${ID}-financeCheckout">Checkout with 0% finance</div>`);
        

        // on click of the finance buttons, scroll to finance
        const financeButtons = document.querySelectorAll(`.${ID}-financeCheckout`);
        for (let index = 0; index < financeButtons.length; index += 1) {
            const element = financeButtons[index];
            element.addEventListener('click', () => {
                scrollToElement(financePopUp);
            });
        }
    }

    // if finance is not selected and the finance message is hidden
    if(!financeSelected && financeNotAllowed) {
        
        topButtons.insertAdjacentHTML('beforeend',`<div class="${ID}-financeCheckout">Checkout with 0% finance</div>`);
        financePopUp.classList.add(`${ID}-finance_show`);

        if(window.innerWidth > 767) {
            document.querySelector('.container section').insertAdjacentElement('beforebegin', financePopUp);
        } else {
            uspWrapper.insertAdjacentElement('afterend', financePopUp);
        }

        financeShowing();
    
    }

    // if finance is selected
    else if(financeSelected) {

        events.send(`${ID} v${VARIATION}`, 'Applied Finance', 'applied finance');

        if(window.innerWidth > 767) {
            document.querySelector('.container section').insertAdjacentElement('beforebegin', financeWrap);
        } else {
            uspWrapper.insertAdjacentElement('afterend', financeWrap);
        }
        

        const financeTotal = financeWrap.querySelector('tfoot tr:first-of-type td').textContent.trim();
        const financeDeposit = financeWrap.querySelector('tfoot tr:last-of-type td').textContent.trim();

        // add new finance selected bottom content
        const financeBottom = document.createElement('div');
        financeBottom.classList.add(`${ID}-financeBottomContent`);
        financeBottom.innerHTML = `
        <div class="${ID}-financeTotals">
            <dt>Total</dt><dd>${financeTotal}</dd>
            <dt>Deposit payable now</dt><dd>${financeDeposit}</dd>
        </div>
        <div class="${ID}-financeButtons">
            <div class="${ID}-button ${ID}-editFinance">Edit</div>
            <div class="${ID}-button ${ID}-removeFinance">Remove</div>
        </div>`;

        financeSelected.appendChild(financeBottom);

        // add click events to the buttons
        const removeEditFinance = document.querySelector('.editRemoveIFC');
       
        // on click of edit, replace the payment container with the finance box
        financeBottom.querySelector(`.${ID}-removeFinance`).addEventListener('click', () => {
            removeEditFinance.querySelector('.ifc-btn-remove').click();
        });

        financeBottom.querySelector(`.${ID}-editFinance`).addEventListener('click', () => {
            if(window.innerWidth > 767) {
                document.querySelector('.container section').insertAdjacentElement('beforebegin', financePopUp);
            } else {
                uspWrapper.insertAdjacentElement('afterend', financePopUp);
            }
            financePopUp.classList.add(`${ID}-finance_show`);

            financeShowing();
            financeSelected.style.display = 'none';
            scrollToElement(financePopUp);
           
        });
        
    }
    
}