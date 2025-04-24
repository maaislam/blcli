/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
 import shared from '../../../../../core-files/shared';
 import { events } from '../../../../../lib/utils';

// Force set analytics reference
events.analyticsReference = '_gaUAT';
const { ID, VARIATION } = shared;

let homeButton, storeButton, initialSection, homeSection, storeSection, homeBackButton, storeBackButton;

const getClosestStore = (resultType, resultObject) => {

  let reqString = "";

  if(resultType == "postcode") {
    reqString = `https://www.houseoffraser.co.uk/stores/search?lc=${resultObject.postcode}&countryName=United%20Kingdom&countryCode=GB&lat=0&long=0&sd=40`;
  } else {
    reqString = `https://www.houseoffraser.co.uk/stores/search?lc=Current%20Location&countryName=United%20Kingdom&countryCode=GB&lat=${resultObject.latitude}&long=${resultObject.longitude}&sd=40`;
  }

  const request = new XMLHttpRequest();
  request.open('GET', reqString, true);
  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      // Success!
      const data = request.responseText;
      // const sizeVariantId = request.responseURL;
      if (data) {
        let brandPage = document.createElement('div');

        brandPage.classList.add('hidden')
        brandPage.id = "no-visual";
        brandPage.innerHTML = data;

        let currStore = brandPage.querySelector('.StoreFinderInner .StoreFinderStore:first-of-type');
        let storeName = currStore.querySelector('.StoreFinderResultsLink > span').innerText;
        let storeDistance = currStore.querySelector('.StoreFinderResultsDistance').innerText;

        document.querySelector(`.${ID}-delivery-costs--storedeliveryinformation`).innerHTML = `
        
          <p> Your closest store is: </p>

          <p> ${storeName} which is ${storeDistance} away</p>
      
        `;

      }
    }
  };
  request.onerror = () => {
    // There was a connection error of some sort
  };
  request.send();

}

const showPosition = (position) => {

  let resultObject = { 'latitude': position.coords.latitude, 'longitude': position.coords.longitude };

  getClosestStore('geolocation', resultObject);

}

const showPostcode = () => {

  let postcodeHTML = `
    <div class="${ID}-postcode">
      <input type="text" id="${ID}-postcode-entry" placeholder="Enter postcode here..." />
      <button id="${ID}-postcode-submit">Submit</button>
    </div>
  `;

  storeSection.querySelector(`.${ID}-delivery-costs--storedeliveryinformation`).innerHTML = postcodeHTML;

  let submitButton = document.getElementById(`${ID}-postcode-submit`);

  submitButton.addEventListener('click', (e) => {

    let resultObject = { 'postcode': document.getElementById(`${ID}-postcode-entry`).value };

    getClosestStore('postcode', resultObject);

  })


}

const startExperiment = () => {

  let deliveryHTML = `
  
    <div class="${ID}-delivery-costs">

      <h2> Delivery Cost Calculator </h2>

      <div class="${ID}-delivery-costs--initial">
        
        <p> Please select the type of delivery you are interested in: </p>

        <div class="${ID}-delivery-costs--initialbuttons">
          <button id="${ID}-delivery-homebutton" class="${ID}-delivery-costs--button homedelivery">Home Delivery</button>
          <button id="${ID}-delivery-storebutton" class="${ID}-delivery-costs--button storedelivery">Store Delivery</button>
        </div>
        
      </div>
    
      <div class="${ID}-delivery-costs--homedelivery">
        <h3> Home Delivery Options </h3>
        <p> Standard Delivery - £4.99 - Delivered within 3-7 days, get it by Monday 6th May latest</p>
        <p> Next Day Delivery - £7.99 - Delivered within 24 hours if ordered by 8pm (excludes public holidays)</p>
        <p> International Delivery - £TBC - cost and delivery time depend on the country, calculated at checkout.</p>
        <a href="#" id="${ID}-delivery-costs--homedeliveryback">Back</a>
      </div>

      <div class="${ID}-delivery-costs--storedelivery">
        <h3> Store Delivery Options </h3>
      
        <div class="${ID}-delivery-costs--storedeliveryinformation">
          <p> Calculating... </p>
        </div>

        <p> Click & Collect - £4.99 - Delivered to your chosen store within 3-7 days, get it by Monday 6th May latest</p>
        <a href="#" id="${ID}-delivery-costs--storedeliveryback">Back</a>
      </div>
    
    </div>
  
  
  `;

  let insertionPoint = document.querySelector('.HOF-469-ctc-holder');

  insertionPoint.insertAdjacentHTML('afterend', deliveryHTML);

  

  homeButton = document.getElementById(`${ID}-delivery-homebutton`);
  storeButton = document.getElementById(`${ID}-delivery-storebutton`);

  initialSection = document.querySelector(`.${ID}-delivery-costs--initial`);
  homeSection = document.querySelector(`.${ID}-delivery-costs--homedelivery`);
  storeSection = document.querySelector(`.${ID}-delivery-costs--storedelivery`);

  homeBackButton = document.getElementById(`${ID}-delivery-costs--homedeliveryback`);
  storeBackButton = document.getElementById(`${ID}-delivery-costs--storedeliveryback`);

  homeButton.addEventListener('click', (e) => {

    initialSection.classList.add(`${ID}-hidden`);
    homeSection.classList.add(`${ID}-visible`);

  });

  storeButton.addEventListener('click', (e) => {

    initialSection.classList.add(`${ID}-hidden`);
    storeSection.classList.add(`${ID}-visible`);
    navigator.geolocation.getCurrentPosition(showPosition, showPostcode);
    

  });

  homeBackButton.addEventListener('click', (e) => {
    e.preventDefault();
    initialSection.classList.remove(`${ID}-hidden`);
    homeSection.classList.remove(`${ID}-visible`);

  });

  storeBackButton.addEventListener('click', (e) => {
    e.preventDefault();
    initialSection.classList.remove(`${ID}-hidden`);
    storeSection.classList.remove(`${ID}-visible`);
    storeSection.querySelector(`.${ID}-delivery-costs--storedeliveryinformation`).innerHTML = "Calculating...";

  });


}

export default () => {
  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(shared.VARIATION == 'control') {
    return;
  }

  // Write experiment code here
  // ...

  startExperiment();



  


  

};
