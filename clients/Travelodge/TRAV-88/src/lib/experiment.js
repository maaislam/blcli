/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import debounce from 'lodash/debounce';
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

const { VARIATION } = shared;

const getScrollPercent = () => {
  var h = document.documentElement,
    b = document.body,
    st = 'scrollTop',
    sh = 'scrollHeight';
  return (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
}

const startTracking = (variation) => {

  let theVariation = variation;

  if(variation == "variation1") {
    document.body.addEventListener('click', (e) => {

      if (e.target.closest('.bookNow')) {
        fireEvent(`VARIATION: ${theVariation} Click - Book Now button clicked with the user choosing: ${document.querySelector('.rate-btn.selected') ? document.querySelector('.rate-btn.selected').getAttribute('data-room-rate') : document.querySelector('.disc-rate-btn.selected').getAttribute('data-room-rate')} ${document.querySelector('.rate-btn.selected') ? document.querySelector('.rate-btn.selected').getAttribute('data-roomname') : document.querySelector('.disc-rate-btn.selected').getAttribute('data-roomname')} room with the ${document.querySelector('.rate-btn.selected') ? document.querySelector('.rate-btn.selected').getAttribute('data-rate-plan-code') : document.querySelector('.disc-rate-btn.selected').getAttribute('data-rate-plan-code')} rate`, true);
      }

      if (e.target.closest('.rate-btn')) {
        fireEvent(`VARIATION: ${theVariation} Click - Rate button clicked, user has selected a ${e.target.closest('.rate-btn').getAttribute('data-room-rate')} ${e.target.closest('.rate-btn').getAttribute('data-roomname')} room with the ${e.target.closest('.rate-btn').getAttribute('data-rate-plan-code')} rate`, true);
      }

      if (e.target.closest('.disc-rate-btn')) {
        fireEvent(`VARIATION: ${theVariation} Click - Rate button with included Wifi clicked, user has selected a ${e.target.closest('.disc-rate-btn').getAttribute('data-room-rate')} ${e.target.closest('.disc-rate-btn').getAttribute('data-roomname')} room with the ${e.target.closest('.disc-rate-btn').getAttribute('data-rate-plan-code')} rate`, true);
      }

    });



  } else {
    document.body.addEventListener('click', (e) => {

      if (e.target.classList.contains('bookNow')) {
        fireEvent(`VARIATION: ${theVariation} Click - Book Now button clicked with the user choosing: ${document.querySelector('.selectPrice.selected').getAttribute('data-room-rate')} room with the ${document.querySelector('.selectPrice.selected').getAttribute('data-rate-plan-code')} rate and uniqueID: ${document.querySelector('.selectPrice.selected').getAttribute('data-uniqueid')}`, true);
      }

      if (e.target.closest('.selectPrice')) {
        fireEvent(`VARIATION: ${theVariation} Click - Rate button clicked, user has selected a ${e.target.closest('.selectPrice').getAttribute('data-room-rate')} room with the ${e.target.closest('.selectPrice').getAttribute('data-rate-plan-code')} rate and uniqueID: ${e.target.closest('.selectPrice').getAttribute('data-uniqueid')}`, true);
      }

    });
  }

  window.addEventListener('scroll', debounce(() => {

    if (getScrollPercent() > 25) {
      fireEvent(`VARIATION: ${theVariation} Interaction - user has got to Scroll Depth 25%`, true);
    }

    if (getScrollPercent() > 50) {
      fireEvent(`VARIATION: ${theVariation} Interaction - user has got to Scroll Depth 50%`, true);
    }

    if (getScrollPercent() > 75) {
      fireEvent(`VARIATION: ${theVariation} Interaction - user has got to Scroll Depth 75%`, true);
    }

    if (getScrollPercent() > 95) {
      fireEvent(`VARIATION: ${theVariation} Interaction - user has got to the bottom of the page`, true);
    }

  }, 100));

        
}

export default () => {

  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

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

  // Monitoring test for Travelodge Rebase test

  let theVariation = "control";
  let checkComplete = false;
  let checkIntervalValue = 0;

  let checkingInterval = setInterval(() => {

    checkIntervalValue++;
    
    if(document.querySelector('#rebase') && document.querySelector('#rebase').hasChildNodes()) {
      checkComplete = true;
      theVariation = "variation1";
      clearInterval(checkingInterval);
      startTracking('variation1');
      fireEvent(`Interaction - rebase container found, VARIATION: ${theVariation} loaded on HDP Rebase test`, true);
      window.DY.API('event', { name: 'TRAV-88-variation', properties: {} });
    }

    if (document.querySelector('#rebase') && !document.querySelector('.js-room-item').classList.contains('hide')) {
      checkComplete = true;
      theVariation = "control";
      clearInterval(checkingInterval);
      startTracking('control');
      fireEvent(`Interaction - rebase container not found, VARIATION: ${theVariation} loaded on HDP Rebase test`, true);
    }
    

    if(checkIntervalValue > 20 && checkComplete == false) {
      clearInterval(checkingInterval);
      fireEvent(`Interaction - neither container found, dateless booking or other anomaly`, true);
    } 
    
  }, 100);
  
};
