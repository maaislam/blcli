/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
 import { setup, fireEvent } from '../../../../../core-files/services';
 import shared from '../../../../../core-files/shared';
 import { events, logMessage, pollerLite, observer } from '../../../../../lib/utils';

// Force set analytics reference
events.analyticsReference = '_gaUAT';
const { ID, VARIATION } = shared;

const currencyTable = [
  { "currencyCode": "GBP", "standardDeliveryCharge": 4.99, "nddDeliveryCharge": 7.99, "cncDeliveryCharge": 4.99, "currencyChar": "£"},
  { "currencyCode": "EUR", "standardDeliveryCharge": 5.99, "nddDeliveryCharge": 9.59, "cncDeliveryCharge": 5.99, "currencyChar": "€"},
  { "currencyCode": "USD", "standardDeliveryCharge": 7.49, "nddDeliveryCharge": 11.99, "cncDeliveryCharge": 7.49, "currencyChar": "$"}
];

let selectedCurrency;
let timeout;
let triggerType;
let firstTime = true;

const getBasketValues = () => {

  return new Promise(function (resolve) {
    pollerLite(['#divBagItems'], () => {

      let currBasket = document.getElementById('divBagItems').getAttribute('data-basket');
      let currBasketJSON = JSON.parse(currBasket);
      let currSubTotal = parseFloat(document.getElementById('spanBagSubTotalValue').innerText.replaceAll(',','').replaceAll('$','').replaceAll('£','').replaceAll('€','').trim());
      selectedCurrency = currBasketJSON.currency;
      let currencyValues = currencyTable.filter((value) => {

        return value.currencyCode == selectedCurrency;
      })
      let subTotalWithDelivery = currSubTotal + currencyValues[0].standardDeliveryCharge;
      subTotalWithDelivery = parseFloat(subTotalWithDelivery.toFixed(2));
  
      let newValues = {
        "currSubTotal": currSubTotal.toFixed(2),
        "subTotalWithDelivery": subTotalWithDelivery,
        "deliveryCharge": currencyValues[0].standardDeliveryCharge,
        "currencyCode": currencyValues[0].currencyCode,
        "currencyChar": currencyValues[0].currencyChar,
      };
  
      resolve(newValues);
    }) 
  
  });

}

const startExperiment = () => {

  logMessage(`Processing Mini Bag`);

  let basketVals = getBasketValues();
  basketVals.then((values) => {

    let insertionPoint = document.getElementById('divBagTotalDiscount');

    let newHTML = `
    
      <div id="${ID}-subtotal-delivery" class="${ID}-subtotal-delivery">
          <div class="${ID}-subtotal-delivery--text"><div class="${ID}-subtotal-delivery--textsubtotal">Subtotal: <span>${values.currencyCode == "EUR" ? '' : values.currencyChar}${values.currencyCode == "EUR" ? String(values.currSubTotal).replaceAll('.', ',') : values.currSubTotal}${values.currencyCode == "EUR" ? ' ' + values.currencyChar : ''}</span></div> <div class="${ID}-subtotal-delivery--textdelcharge">Delivery from: <span>${values.currencyCode == "EUR" ? '' : values.currencyChar}${values.currencyCode == "EUR" ? String(values.deliveryCharge).replaceAll('.', ',') : values.deliveryCharge}${values.currencyCode == "EUR" ? ' ' + values.currencyChar : ''}</span>${window.outerWidth <= 400 ? `<a data-trigger="minibag" id="${ID}-subtotal-delivery--icon" class="${ID}-subtotal-delivery--icon"><svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.06436 8.10002H6.80436C6.80436 6.67002 8.63436 6.59001 8.63436 4.88001C8.63436 3.81001 7.73436 3.14001 6.33436 3.14001C5.21436 3.14001 4.38436 3.52001 3.84436 4.18001L4.37436 4.58001C4.81436 4.05001 5.43436 3.77002 6.28436 3.77002C7.30436 3.77002 7.89436 4.27001 7.89436 4.99002C7.89436 6.30002 6.06436 6.45002 6.06436 8.10002ZM6.43436 10.25C6.73436 10.25 6.96436 10.01 6.96436 9.73001C6.96436 9.44001 6.73436 9.22001 6.43436 9.22001C6.14436 9.22001 5.91436 9.44001 5.91436 9.73001C5.91436 10.01 6.14436 10.25 6.43436 10.25Z" fill="#E10098"/><circle cx="6.5" cy="6.5" r="6" stroke="#E10098"/></svg></a>` : ``}</div> </div>
          ${window.outerWidth > 400 ? `<a data-trigger="minibag" id="${ID}-subtotal-delivery--icon" class="${ID}-subtotal-delivery--icon"><svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.06436 8.10002H6.80436C6.80436 6.67002 8.63436 6.59001 8.63436 4.88001C8.63436 3.81001 7.73436 3.14001 6.33436 3.14001C5.21436 3.14001 4.38436 3.52001 3.84436 4.18001L4.37436 4.58001C4.81436 4.05001 5.43436 3.77002 6.28436 3.77002C7.30436 3.77002 7.89436 4.27001 7.89436 4.99002C7.89436 6.30002 6.06436 6.45002 6.06436 8.10002ZM6.43436 10.25C6.73436 10.25 6.96436 10.01 6.96436 9.73001C6.96436 9.44001 6.73436 9.22001 6.43436 9.22001C6.14436 9.22001 5.91436 9.44001 5.91436 9.73001C5.91436 10.01 6.14436 10.25 6.43436 10.25Z" fill="#E10098"/><circle cx="6.5" cy="6.5" r="6" stroke="#E10098"/></svg></a>` : ``}
      </div>
      <div id="${ID}-subtotal" class="${ID}-subtotal">
          <span id="lblBagSubTotal">Total:</span>
          <span class="${ID}-spanBagSubTotalValue" id="${ID}-spanBagSubTotalValue">${values.currencyCode == "EUR" ? '' : values.currencyChar}${values.currencyCode == "EUR" ? String(values.subTotalWithDelivery).replaceAll('.', ',') : values.subTotalWithDelivery}${values.currencyCode == "EUR" ? ' ' + values.currencyChar : ''}</span>
      </div>

    `;
                      
    insertionPoint.insertAdjacentHTML('afterend', newHTML);

    if(firstTime == true) {
      fireEvent(`Visible - delivery detail added to the mini-bag for the first time`, true);
      firstTime = false;
    }
    
    let currTotalHTML = document.getElementById('spanBagSubTotalValue');
    let currTotalHTMLParent = currTotalHTML.parentElement;
    currTotalHTMLParent.classList.add(`${ID}-hidden`);

    let newCurrTotal = values.currencyCode == "EUR" ? String(values.subTotalWithDelivery).replaceAll('.', ',') : values.subTotalWithDelivery;
    
    if(values.currencyCode == "EUR") {
      currTotalHTML.innerHTML = newCurrTotal + ' ' + values.currencyChar;
    } else {
      currTotalHTML.innerHTML = values.currencyChar + newCurrTotal;
    }

    if(window.location.href.indexOf('cart') > -1) {

      let cartInsertionPoint = document.getElementById('SubtotalRow');

      let cartNewHTML = `
      
        <div id="${ID}-subtotal-delivery--cartpage" class="${ID}-subtotal-delivery ${ID}-subtotal-delivery--cartpage">
            
          <span class="${ID}-subtotal-delivery--cartpagedelivery">Delivery from <a data-trigger="cart" id="${ID}-subtotal-delivery--icon" class="${ID}-subtotal-delivery--icon"><svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.06436 8.10002H6.80436C6.80436 6.67002 8.63436 6.59001 8.63436 4.88001C8.63436 3.81001 7.73436 3.14001 6.33436 3.14001C5.21436 3.14001 4.38436 3.52001 3.84436 4.18001L4.37436 4.58001C4.81436 4.05001 5.43436 3.77002 6.28436 3.77002C7.30436 3.77002 7.89436 4.27001 7.89436 4.99002C7.89436 6.30002 6.06436 6.45002 6.06436 8.10002ZM6.43436 10.25C6.73436 10.25 6.96436 10.01 6.96436 9.73001C6.96436 9.44001 6.73436 9.22001 6.43436 9.22001C6.14436 9.22001 5.91436 9.44001 5.91436 9.73001C5.91436 10.01 6.14436 10.25 6.43436 10.25Z" fill="#E10098"/><circle cx="6.5" cy="6.5" r="6" stroke="#E10098"/></svg></a></span> 
          <span class="${ID}-subtotal-delivery--cartpagetotal"> ${values.currencyCode == "EUR" ? '' : values.currencyChar}${values.currencyCode == "EUR" ? String(values.deliveryCharge).replaceAll('.', ',') : values.deliveryCharge}${values.currencyCode == "EUR" ? ' ' + values.currencyChar : ''}</span> 

        </div>
      
      `;

      cartInsertionPoint.insertAdjacentHTML('afterend', cartNewHTML);

      fireEvent(`Visible - delivery detail added to the cart page`);

      let cartCurrTotalHTML = document.getElementById('TotalValue');
      let cartNewCurrTotal = values.currencyCode == "EUR" ? String(values.subTotalWithDelivery).replaceAll('.', ',') : values.subTotalWithDelivery;
      if(values.currencyCode == "EUR") {
        cartCurrTotalHTML.innerHTML = cartNewCurrTotal + ' ' + values.currencyChar;
      } else {
        cartCurrTotalHTML.innerHTML = values.currencyChar + cartNewCurrTotal;
      }
      



    }
    if(!document.getElementById(`${ID}-modal`)) {
      addDeliveryModal();
    }
    

    let triggers = document.querySelectorAll(`.${ID}-subtotal-delivery--icon`);
    let modal = document.getElementById(`${ID}-modal`);
    [].slice.call(triggers).forEach((trigger) => {
      trigger.addEventListener('click', (e) => {

        e.preventDefault();
        e.stopPropagation();
        triggerType = e.currentTarget.getAttribute('data-trigger');

        fireEvent(`Click - user clicks on info trigger from ${triggerType} to open the modal`, true);

        modal.classList.add(`${ID}-active`);
        document.documentElement.classList.add(`${ID}-noscroll`);
        
      });
    });

  });

  

}

const addDeliveryModal = () => {


  let currentCurrencyTable = currencyTable.filter((item) => {
    return item.currencyCode == selectedCurrency;
  });

  let modalHTML = `
  
    <div class="${ID}-modal" id="${ID}-modal">

      <button id="${ID}-modal--close" class="${ID}-modal--close"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="1.18721" y1="0.480103" x2="13.3536" y2="12.6465" stroke="black"/><line x1="12.8579" y1="0.353553" x2="0.353574" y2="12.8579" stroke="black"/></svg></button>
    
      <h2>Delivery</h2>

      <div class="${ID}-modal--deliveryoption">
        <p>Standard Delivery</p>

        <p>Delivered within 3-7 days (excludes Public holidays)</p>

        <p class="${ID}-modal--price"> ${currentCurrencyTable[0].currencyChar}${currentCurrencyTable[0].currencyCode == "EUR" ? String(currentCurrencyTable[0].standardDeliveryCharge).replaceAll('.',',') : currentCurrencyTable[0].standardDeliveryCharge} </p>
      </div>

      <div class="${ID}-modal--deliveryoption">
        <p>Next Day Delivery</p>

        <p>Order by 8pm (excludes Public holidays)</p>

        <p class="${ID}-modal--price"> ${currentCurrencyTable[0].currencyChar}${currentCurrencyTable[0].currencyCode == "EUR" ? String(currentCurrencyTable[0].nddDeliveryCharge).replaceAll('.',',') : currentCurrencyTable[0].nddDeliveryCharge} </p>
      </div>

      <div class="${ID}-modal--deliveryoption">
        <p>International Delivery</p>

        <p>International Delivery is available for this product. The cost and delivery time depend on the country. </p>
      </div>

      <div class="${ID}-modal--deliveryoption">
        <p>Click & Collect</p>

        <p>Delivered to your chosen store 3-7 days</p>

        <p class="${ID}-modal--price"> ${currentCurrencyTable[0].currencyChar}${currentCurrencyTable[0].currencyCode == "EUR" ? String(currentCurrencyTable[0].cncDeliveryCharge).replaceAll('.',',') : currentCurrencyTable[0].cncDeliveryCharge} </p>

        <p class="${ID}-modal--deliveryoptionitalic">Spend over £100 (excluding delivery charge) to get a £10 voucher to spend in-store with Store Delivery!</p>
      </div>



      
    
    </div>
  
  
  `;


  let insertionPoint = document.body;
  insertionPoint.insertAdjacentHTML('afterbegin', modalHTML);

  
  let minibag = document.getElementById(`divBagItems`);
  let modal = document.getElementById(`${ID}-modal`);


  let closeButton = document.getElementById(`${ID}-modal--close`);
  closeButton.addEventListener('click', () => {
    modal.classList.remove(`${ID}-active`);
    document.documentElement.classList.remove(`${ID}-noscroll`);

    fireEvent(`Click - user clicks on the close X to close the modal`, true);

    if(triggerType == "minibag") {
      minibag.classList.add('open');
      jQuery('#divBagItems').slideDown("slow");
      timeout = setTimeout(() => {
        clearTimeout(timeout);
        minibag.classList.remove('open');
        jQuery('#divBagItems').slideUp("slow");
      }, 3000);
    }
    
    
  })

  document.documentElement.addEventListener('click', (e) => {
    if(e.currentTarget.classList.contains(`${ID}-noscroll`)) {
      modal.classList.remove(`${ID}-active`);
      document.documentElement.classList.remove(`${ID}-noscroll`);
      
      fireEvent(`Click - user clicks outside the modal to close it`, true);

      if(triggerType == "minibag") {
        minibag.classList.add('open');
        minibag.style.display = "block";
        timeout = setTimeout(() => {
          clearTimeout(timeout);
          minibag.classList.remove('open');
          minibag.style.display = "none";
        }, 3000);
      }
    }
  });




}

export default () => {
  setup();

  fireEvent('Conditions Met');

  pollerLite(['#divBagItems'], () => {
    let hoverEventSent = false;
    let divBagItems = document.getElementById('aBagLink');
    divBagItems.addEventListener('mouseenter', () => {
      if(hoverEventSent == false) {
        fireEvent('Hover - user has opened the mini-bag', true);
        hoverEventSent = true;
      }
      
    })
  });
  

  pollerLite([
    // need to check that the bag quantity is available - it starts off blank and then is 
    // populated after, hence the isNaN check.
    () => { 
      return isNaN(parseInt(document.getElementById('bagQuantity').innerText)) == false; 
    }

  ], () => {
    logMessage("Curr bag quantity: "+parseInt(document.getElementById('bagQuantity').innerText));
    if(parseInt(document.getElementById('bagQuantity').innerText) > 0) {
  
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
    } else {
      fireEvent(`Conditions not met - no items in basket`, true);
    }

    if(VARIATION !== "control") {
      observer.connect(document.getElementById('bagQuantity'), () => {



        let bagQuantity = parseInt(document.getElementById('bagQuantity').innerText);
        if(bagQuantity >= 1) {
          document.getElementById(`${ID}-subtotal-delivery`)?.remove();
          document.getElementById(`${ID}-subtotal`)?.remove();
          document.getElementById(`${ID}-subtotal-delivery--cartpage`)?.remove();
          setTimeout(() => {
            startExperiment();
          }, 500);
          
        } else if(bagQuantity == 0) {
          document.getElementById(`${ID}-subtotal-delivery`)?.remove();
          document.getElementById(`${ID}-subtotal`)?.remove();
          document.getElementById(`${ID}-subtotal-delivery--cartpage`)?.remove();
          fireEvent('Interaction - user removes all items from basket', true);
        }
        
  
      }, {
        config: {
          attributes: false,
          childList: true,
          subtree: false,
        }
      });
    }
    


  });

  
};
