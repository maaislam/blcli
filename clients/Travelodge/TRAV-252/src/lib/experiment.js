/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage } from '../../../../../lib/utils';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const startExperiment = () => {
  console.log('TRAV-252 Begin');
  // -----------------------------

  // Add booking 

  function addToCartAPI(productId, button) {
   const apiUrl = 'https://www.travelodge.co.uk/basket/add-booking';

   const formData = {
    location: "London Balham Travelodge",
    checkIn: "04/10/23",
    checkOut: "05/10/23",
    "rooms[0][roomId]": "23cc6f4liwqjaf",
    "rooms[0][adults]": "1",
    "rooms[0][children]": "0",
    "rooms[0][roomCode]": "DN",
    "rooms[0][ratePlanCode]": "SAVER",
    "rooms[0][rateTypeName]": "Saver",
    "rooms[0][extras][0]": "",
    "rooms[0][inlineCampaign]": "0",
    "rooms[0][packageCampaign]": "0",
    siteNo: "GB0851"
  };


   console.log('add to basket api')

  // Create an object to hold request headers
  const headers = new Headers();
  headers.append("Content-Type", "application/x-www-form-urlencoded");

   const requestData = {
    method: 'POST',
    headers: headers,
    body: new URLSearchParams(formData).toString(), // Convert the form data to a URL-encoded string
  };

   fetch(apiUrl, requestData)
   .then(response =>  console.log('success', response))
     .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
     });
  }

  function addProduct(product) {
    console.log('add product');
  }
  addToCartAPI();
  addProduct('breakfast');
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
