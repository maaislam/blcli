/**
 * NH054 - Checkout inline validation
 * @author User Conversion
 */
import { setup } from './services';
import { pollerLite } from '../../../../../lib/uc-lib';
import { cacheDom } from '../../../../../lib/cache-dom';
import getPage from './getPage';
import showErrorMessages from './showErrorMessages';

const activate = () => {
  setup();

  // Experiment code
  const page = getPage();

  if (page === 'availability') {
    const pageHeaders = document.querySelectorAll('.content .box-with-border h2');
    [].forEach.call(pageHeaders, (pageHeader) => {
      let pageHeaderText = pageHeader.innerText;
      pageHeader.innerHTML = `${pageHeaderText} <span class='NH054-requiredField red'>*</span>`;
    });

    if (pageHeaders.length === 2) {
      pageHeaders[0].insertAdjacentHTML('afterend', `<div class='NH054-errorMessage__wrapper' id='NH054-travellers'><div class='NH054-errorMessage red'>Please select all travelling passengers</div></div>`);
      pageHeaders[1].insertAdjacentHTML('afterend', `<div class='NH054-errorMessage__wrapper' id='NH054-rooms'><div class='NH054-errorMessage red'>Please select the required rooms for all passengers </div><div class='NH054-errorMessage red'>(Room occupancy must match the number of travellers)</div></div>`);
    }

    const adultPassengersField = document.querySelector('#ddlAdults');
    const adultPassengersContainer = document.querySelector('#ddlAdults').parentNode;
    if (adultPassengersContainer) {
      adultPassengersContainer.insertAdjacentHTML('beforeend', `<div class='NH054-errorMessagePassengers__wrapper' id='NH054-adults'><div class='NH054-errorMessage red'>Please select at least one adult passenger</div></div>`);

      if (adultPassengersField.options[adultPassengersField.selectedIndex].value === '0') {
        document.querySelector('.NH054-errorMessagePassengers__wrapper').classList.add('show');
      }
    }
    /**
     * @desc Show error messages once Control Error Message appears
     */
    showErrorMessages(page);
  } else if (page === 'passengers') {
    // Passenger Name
    const fieldsToAddMessages = document.querySelectorAll('select[name$="ddlTitle"]');
    [].forEach.call(fieldsToAddMessages, (field) => {
      field.parentNode.insertAdjacentHTML('afterend', `<div class='NH054-errorMessage__wrapper NH054-passengerName'><div class='NH054-errorMessage red'>Please enter passenger's initial and surname</div></div>`);
    });

    // Pickup Point
    const pickupPointSelections = document.querySelectorAll('.pickup-list');
    [].forEach.call(pickupPointSelections, (select) => {
      select.insertAdjacentHTML('afterend', `<span class='NH054-requiredField red'>*</span><div class='NH054-errorMessage__wrapper NH054-passengerPickup'><div class='NH054-errorMessage red'>Please enter passenger's departure point</div></div>`);
    });

    showErrorMessages(page);
  } else if (page === 'seating') {
    document.querySelector('.nh5-left-box h2').insertAdjacentHTML('afterend', `<span class='NH054-requiredField red'>*</span><div class='NH054-errorMessage__wrapper'><div class='NH054-errorMessage red'>Please select seats for all passengers</div></div>`);

    showErrorMessages(page);
  } else if (page === 'payment') {
    document.querySelector('#txtCardNo').insertAdjacentHTML('afterend', `<span class='NH054-requiredField red'>*</span>`);
    document.querySelector('#txtNameOnCard').insertAdjacentHTML('afterend', `<span class='NH054-requiredField red'>*</span>`);
    document.querySelector('#txtSecurity').insertAdjacentHTML('afterend', `<span class='NH054-requiredField red'>*</span>`);
    document.querySelector('#ddlYear').insertAdjacentHTML('afterend', `<span class='NH054-requiredField red'>*</span><div class='NH054-errorMessage__wrapper NH054-paymentStep'><div class='NH054-errorMessage red'>Required</div></div>`);

    const errorContainer = `<div class="NH054-alert alert">
      <strong class="ui-state-error-text">Error</strong><br>
      <span id="ReqValidation">Please fill out all payment information before continuing.</span>
    </div>`;
    const mainContainer = document.querySelector('.container .content');
    if (mainContainer) {
      mainContainer.insertAdjacentHTML('beforebegin', errorContainer);
    }

    showErrorMessages(page);
  }

  
};

export default activate;
