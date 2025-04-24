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

const addToBag = () => {

  console.log("adding");

  let theData = {

    "form_type": "product",
    "utf8": "✓",
    "size": "",
    "id": "5642053779621",
    "properties[_serviceId]": "I",
    "product-id": "5642053779621",
    "properties[_cartid]": "d34510e9-f027-4151-afec-9467c25070c6"

  };

  console.log(theData);

  window.jQuery.ajax({
    cache: true,
    type: 'POST',
    url: 'https://www.mamasandpapas.com/cart/add.js',
    data: {

      "form_type": "product",
      "utf8": "✓",
      "size": "",
      "id": "5642053779621",
      "properties[_serviceId]": "I",
      "product-id": "5642053779621",
      "properties[_cartid]": "d34510e9-f027-4151-afec-9467c25070c6"

    },
    dataType: 'json',
    success: function (returnedData) {
      console.log('success', returnedData);
    },
  });

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
  
  // experiment to show how we can use ATB on M&P
  // use this on a product page, it should replace the ATB with a basic button, which will then replicate the ATC functionality.

  

  

  if(document.body.classList.contains('template-product')) {

    console.log("ADDING FROM PDP");

    let atbHTML = `
      <button id="${ID}-atb">Add Product</button>
    `;

    let currATB = document.querySelector('.product-form__cart-submit');
    currATB.insertAdjacentHTML('afterend', atbHTML);
    currATB.style.display = 'none';

    addToBag();

    document.getElementById(`${ID}-atb`).addEventListener('click', function () {
      // let productID = document.querySelector('input[name="product-id"]').value;
      // let cartID = document.querySelector('input[name="properties[_cartid]"]').value;
      // let serviceID = document.querySelector('input[name="properties[_serviceId]"]').value;



      addToBag();
    });



  } else {

    console.log("TRYING TO ADD FROM NON-PDP");
    addToBag();



  }

  

  

  
};
