/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage, pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const startExperiment = () => {


  pollerLite(['.main .chForm .agreeToTermsAndConditions'], () => {
    console.log('Experiment started');

    const newCharityHTML = `
      <div class="${ID}-charity-container">
        <div class="${ID}-checkbox">
          <input type="checkbox" id="charity" name="charity" />
          <label for="charity">Donate £0.50 to British Heart Foundation</label>
        </div>
        <div class="${ID}-charity-desc-container ${ID}-display-none">
        </div>
      </div>
      `;

      const originalCharity = document.querySelector('.main .chForm .donate');
      originalCharity.classList.add(`${ID}-display-none`);

      const targetContainer = document.querySelector('.main .chForm .paymentOptionButtons #paymentTotals');
      targetContainer.insertAdjacentHTML('beforebegin', newCharityHTML);

      const charityDOMHidden = document.querySelector(`.${ID}-charity-container .${ID}-charity-desc-container`);

      const MacmillanDOM = document.querySelector(`i.Macmillan`);
      MacmillanDOM.classList.add(`${ID}-Macmillan`);

      const PenniesDOM = document.querySelector(`i.Pennies`);
      PenniesDOM.classList.add(`${ID}-Pennies`);

      const charityDesc = document.querySelector(`.charityWrapper .splitPPennies .sibling`);
      charityDesc.classList.add(`${ID}-charity-desc`);
      charityDOMHidden.append(MacmillanDOM, PenniesDOM, charityDesc);

      const charityCheckbox = document.querySelector(`.${ID}-charity-container .${ID}-checkbox input`);
      charityCheckbox.addEventListener('click', () => {
        // console.log('clicked');
        fireEvent('Click - New Charity Checkbox');
        charityDOMHidden.classList.toggle(`${ID}-display-none`);

        document.querySelector('.charityWrapper .charityYes label').click();

        if(charityDOMHidden.classList.contains(`${ID}-display-none`)) {
          document.querySelector('.charityWrapper .charityNo label').click();
        }
      });

      const reasonForStay = document.querySelector('.main .chForm .reasonForStay').closest('.bar');
      reasonForStay.classList.add(`${ID}-display-none`);

      const reasonForStayHTML = `
        <div class="${ID}-reason-for-stay-container">
          <div class="${ID}-reason-for-stay-title">
            <h3>What is the purpose of your stay?*</h3>
          </div>
          <fieldset class="${ID}-reason-for-stay-radio">
            <div class="${ID}-leisure">
              <input type="radio" id="leisure" name="businessLeisure" value="leisure" />
              <label for="leisure">Leisure</label>
            </div>
            <div class="${ID}-business">
              <input type="radio" id="business" name="businessLeisure" value="business" />
              <label for="business">Business</label>
            </div>
          </fieldset>
        </div>`

      const reasonForStayTarget = document.querySelector(`.main .chForm .col-xs-12.bar .agreeToTermsAndConditions`).closest('.field');
      console.log(reasonForStayTarget);
      reasonForStayTarget.insertAdjacentHTML('beforebegin', reasonForStayHTML);

      const leisureDOM = document.querySelector(`.${ID}-reason-for-stay-container .${ID}-leisure`);
      const businessDOM = document.querySelector(`.${ID}-reason-for-stay-container .${ID}-business`);
      
      leisureDOM.addEventListener('click', () => {
        document.querySelector('.main .chForm #customerDetails_purposeOfStay_0').click();
        fireEvent('Click - New Leisure Radio Button');
      });

      businessDOM.addEventListener('click', () => {
        document.querySelector('.main .chForm #customerDetails_purposeOfStay_1').click();
        fireEvent('Click - New Business Radio Button');
      });

      // Sync Google/Apple pay button with radio

      const googlePaySection = document.querySelector('#basketGooglepay .googlePay-reasonForStay');
      if(googlePaySection) {
      const googlePayRadioSection = googlePaySection.closest('.field');
      const googleLeisureStay = googlePayRadioSection.querySelector('#customerDetails_purposeOfStay_gp_0');
      const googleBusinessStay = googlePayRadioSection.querySelector('#customerDetails_purposeOfStay_gp_1');

      googleLeisureStay.addEventListener('click', () => {
        console.log('clicked');
        document.querySelector('.main .chForm #customerDetails_purposeOfStay_0').click();
        leisureDOM.querySelector('input').click();
      });

      googleBusinessStay.addEventListener('click', () => {
        document.querySelector('.main .chForm #customerDetails_purposeOfStay_1').click();
        businessDOM.querySelector('input').click();
      });
    }

      const applePaySection = document.querySelector('.basketApplepay .applePay-reasonForStay');
      if(applePaySection) {
        const applePayRadioSection = applePaySection.closest('.field');
        const appleLeisureStay = applePayRadioSection.querySelector('#customerDetails_purposeOfStay_gp_0');
        const appleBusinessStay = applePayRadioSection.querySelector('#customerDetails_purposeOfStay_gp_1');

        appleLeisureStay.addEventListener('click', () => {
          console.log('clicked');
          document.querySelector('.main .chForm #customerDetails_purposeOfStay_0').click();
          leisureDOM.querySelector('input').click();
        });

        appleBusinessStay.addEventListener('click', () => {
          document.querySelector('.main .chForm #customerDetails_purposeOfStay_1').click();
          businessDOM.querySelector('input').click();
        });
      } 

      const paymentOptions = document.querySelectorAll('.payment-option-container .wrapDebitBil .debitOptions .panel-default');

      paymentOptions.forEach((option) => {
        const optionType = option.querySelector('.panel-heading h3').textContent;
        const radioButton = `
        <div class="${ID}-radio-button">
          <input type="radio" id="${optionType}" name="debit" />
          <label for="${optionType}"></label>
        `

        option.querySelector('.panel-heading').insertAdjacentHTML('afterbegin', radioButton);
      });

      const debitCard = document.querySelector('.payment-option-container .wrapDebitBil #cardPanel').closest('.panel-default');
      debitCard.classList.add(`${ID}-debit-card`);
  });
};

const addTracking = () => {
  document.body.addEventListener('click', (e) => {
    if(e.target.closest('.main .chForm #customerDetails_purposeOfStay_0')) {
      fireEvent('Click - Original Leisure Radio Button');
    }
    if(e.target.closest('.main .chForm #customerDetails_purposeOfStay_1')) {
      fireEvent('Click - Original Business Radio Button');
    }

    if(e.target.closest('.main .chForm .charityYes')) {
      fireEvent('Click - Original Charity Radio Button');
    }
    if(e.target.closest('.paymentSubmitDiv .proceedToPaymentDefault' && document.querySelector('.main .chForm .charityYes').checked)) {
      const total = document.querySelector('.payment-form-container #paymentTotals .total dd').textContent;
      fireEvent(`Click - Original Proceed to Payment Button when Charity is selected - Toal: ${total}`);
    }
    if(e.target.closest('.paymentSubmitDiv .proceedToPaymentDefault' && document.querySelector(`.${ID}-charity-container .${ID}-checkbox input`).checked)) {
      const total = document.querySelector('.payment-form-container #paymentTotals .total dd').textContent;
      fireEvent(`Click - Variation 1 Proceed to Payment Button when Charity is selected - Total: ${total}`);
    }
  })
}

export default () => {

  setup();

  logMessage(ID + " Variation: "+VARIATION);

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...
  addTracking();
  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  
  startExperiment();
};
