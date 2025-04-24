/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { events, pollerLite, logMessage, observer } from '../../../../../lib/utils';


events.analyticsReference = '_gaUAT';

const { ID, VARIATION } = shared;

const displaySCBanner = (bannerMethod) => {

  let bannerHTML = `

    <div class="FLAN-311-SC-banner">
      <div id="banner-what-is-SC" class="FLAN-311-SC-banner-link">
        <div class="SC-banner-logo">
          <img src="" alt="style & collect from Flannels logo" />
        </div>

        <div class="SC-banner-text">
          <p>${ bannerMethod == "less-than-250" ? "<span>Spend £250</span> to be eligible" : "Select <span>Click &amp; Collect</span> at checkout" }</p>
        </div>
        
      </div>
    </div>
  `;

  let atbContainer = document.getElementById('divContinueSecurely');
  atbContainer.insertAdjacentHTML('afterend', bannerHTML);

  

}

const checkBasketAmount = () => {

  let priceElement = document.getElementById('TotalValue');
  let priceAmount = parseFloat(priceElement.innerHTML.replace('£', '').replace(',','')).toFixed(2);
  return priceAmount;

}

const addContinueButtonTracking = () => {

  pollerLite(['.ContinueOn'], () => {

    let continueButton = document.querySelector('#divContinueSecurely');

    continueButton.addEventListener('click', (e) => {
      let continueButtonMessage = "Click - continue to checkout button clicked";
      logMessage(continueButtonMessage);
      fireEvent(continueButtonMessage);
    });

  })

}

export default () => {
  setup();

  logMessage(ID + " Variation "+VARIATION);

  fireEvent('Conditions Met');

  addContinueButtonTracking();

  if(VARIATION == "control") {
    return;
  }
  
  let checkAmt = checkBasketAmount();

  if(checkAmt < 250) {
    logMessage("less than 250, initialising, basket amount: "+checkAmt);
    displaySCBanner('less-than-250');
  } else {
    logMessage("more than 250, initialising, basket amount: "+checkAmt);
    displaySCBanner('more-than-250');
  }

};
