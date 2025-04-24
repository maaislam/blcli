/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
 import { setup, fireEvent } from '../../../../../core-files/services';
 import shared from '../../../../../core-files/shared';
 import { events, logMessage } from '../../../../../lib/utils';
 import { observer, pollerLite, countdown } from './../../../../../lib/uc-lib';

// Force set analytics reference
events.analyticsReference = '_gaUAT';
const { ID, VARIATION } = shared;

const currDate = new Date();
const targetDate = new Date();
targetDate.setHours(20);
targetDate.setMinutes(0, 0, 0);
const startShowingDate = new Date();
startShowingDate.setHours(12);
startShowingDate.setMinutes(0, 0, 0);
let insertedHTML;

const fireAndLogEvent = (event) => {
  logMessage(event);
  fireEvent(event, true);
}

const initCountdown = () => {
  // set up the countdown timer
  countdown({
    cutoff: targetDate,
    element: '#SD-658-countdown-item',
    labels: {
      d: 'days',
      h: 'h',
      m: 'm',
      s: 's',
    },
    zeroPrefixHours: true,
    zeroPrefixMinutes: true,
    zeroPrefixSeconds: true,
    hoursInsteadOfDays: false,
    delivery: {
      deliveryDays: null,
      excludeDays: null,
      deliveryDayElement: null,
      tomorrowLabel: false,
      showFullDate: false,
      dayLabelStyle: 'long',
      monthLabelStyle: 'long',
    },
  });

}


const makeExpChanges = () => {

  //document.querySelector('.PinchToZoomMessage').innerText = "Pinch to zoom, swipe left/right to change";

  // initialise accordion

  let accordionHTML = `
  
    <div class="${ID}-accordion">

      <div class="${ID}-accordion--inner">

        <button class="${ID}-accordion--header open" data-to-open="${ID}-description">Product detail</button>
        <div class="${ID}-accordion--content active" id="${ID}-description">
          ${document.querySelector('.infoPageDescription > p') ? document.querySelector('.infoPageDescription > p').innerHTML : ''}
        </div>

        ${document.getElementById('DisplayAttributes').childElementCount > 0 ? `
        <button class="${ID}-accordion--header closed" data-to-open="${ID}-features">Features</button>
        <div class="${ID}-accordion--content" id="${ID}-features">
          <dl>${document.getElementById('DisplayAttributes') ? document.getElementById('DisplayAttributes').innerHTML : ''}</dl>
        </div>` : ``}

        <button class="${ID}-accordion--header closed" data-to-open="${ID}-delreturn">Delivery &amp; Returns</button>
        <div class="${ID}-accordion--content" id="${ID}-delreturn">
          ${document.getElementById('parDeliveryMethods') ? document.getElementById('parDeliveryMethods').innerHTML : ''}
          ${document.querySelector('.returnsGroup') ? document.querySelector('.returnsGroup').innerHTML : ''}
        </div>
      
      </div>
    
    </div>
  
  `;

  // ${document.getElementById('DisplayAttributes').childElementCount > 0 ? `
  // <button class="${ID}-accordion--header closed" data-to-open="${ID}-reviews">Reviews</button>
  // <div class="${ID}-accordion--content" id="${ID}-reviews">
  //   <p> Desc </p>
  // </div>` : ``}

  let insertionPoint = document.querySelector('#productDetails');

  insertionPoint.insertAdjacentHTML('afterend', accordionHTML);

  let allAccordionHeaders = document.querySelectorAll(`.${ID}-accordion--header`);
  let allAccordionContent = document.querySelectorAll(`.${ID}-accordion--content`);

  [].slice.call(allAccordionHeaders).forEach((header) => {
    header.addEventListener('click', (e) => {

      let currOpen = e.currentTarget.classList.contains('open') ? 'open' : 'closed';

      [].slice.call(allAccordionHeaders).forEach((innerHeader) => {
        innerHeader.classList.remove('open');
        innerHeader.classList.add('closed');
      });

      [].slice.call(allAccordionContent).forEach((innerContent) => {
        innerContent.classList.remove('active');
      });

      if(currOpen == "open") {
        header.classList.add('closed');
        header.classList.remove('open');
        header.nextElementSibling.classList.remove('active');
      } else {
        header.classList.remove('closed');
        header.classList.add('open');
        header.nextElementSibling.classList.add('active');
      }

      
      

    });
  });

  // initialise size sideways swipe

  let allColourImages = document.querySelectorAll('#ulColourImages > li');
  let fullOuterWidth = 0;
  let windowWidth = window.outerWidth;
  [].slice.call(allColourImages).forEach((image) => {
    fullOuterWidth = fullOuterWidth + image.offsetWidth + 10;
  });


  if(fullOuterWidth > windowWidth) {
    document.querySelector('#ulColourImages').style.width = fullOuterWidth + "px";
  }
  
  // initialise sizeSelected v notSelected

  let allSizes = document.querySelectorAll('#ulSizes > li');
  let selected = false;
  let ukeu = false;
  [].slice.call(allSizes).forEach((size) => {
    if(size.classList.contains('sizeVariantHighlight')) {
      selected = true;
    }

    if(size.querySelector('span').innerText.indexOf('(') > -1) {
      ukeu = true;
    }
  });

  if(selected == false) {
    let selectSizeButton = `<button class="${ID}-select-size" id="${ID}-select-size"><span>Select Size</span></button>`;
    let atbInsert = document.getElementById('sAddToBagWrapper');
    atbInsert.insertAdjacentHTML('afterbegin', selectSizeButton); 
  }
  
  let selectSize = document.getElementById(`${ID}-select-size`);
  selectSize.addEventListener('click', (e) => {
    selectSize.querySelector('span').classList.add('shake');
    setTimeout((e) => {
      selectSize.querySelector('span').classList.remove('shake');
    }, 500);
  });


  [].slice.call(allSizes).forEach((button) => {
    button.querySelector('a').addEventListener('touchstart', (e) => {
      
      if(document.getElementById(`${ID}-select-size`)) {
        document.getElementById(`${ID}-select-size`).remove();
      }
    }, false);
  })

  // set up the UK/EU thing

  if(ukeu == true) {

    let ukeuSelector = `<a href="#" id="${ID}-ukeu-selector-uk" class="${ID}-ukeu-selector active">UK</a> | <a href="#" id="${ID}-ukeu-selector-eu" class="${ID}-ukeu-selector">EU</a>`;
    let insertPoint = document.getElementById('BuySizeText');

    document.getElementById('ulSizes').classList.add(`${ID}-show-uk-sizes`);

    insertPoint.insertAdjacentHTML('afterend', ukeuSelector);

    [].slice.call(allSizes).forEach((size) => {

      let spantext = size.querySelector('span').innerText;

      let UKsize = spantext.substring(0, spantext.indexOf('(')).trim();
      let EUsize = spantext.substring(spantext.indexOf('(') +1, spantext.indexOf(')')).trim();


      let ukHTML = `<span class="${ID}-uksize">${UKsize}</span>`;
      let euHTML = `<span class="${ID}-eusize">${EUsize}</span>`;

      size.querySelector('a').innerHTML = "";
      size.querySelector('a').insertAdjacentHTML('beforeend', ukHTML);
      size.querySelector('a').insertAdjacentHTML('beforeend', euHTML);

    });

    let ukeuUKSelector = document.getElementById(`${ID}-ukeu-selector-uk`);
    ukeuUKSelector.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      document.getElementById(`${ID}-ukeu-selector-uk`).classList.add('active');
      document.getElementById(`${ID}-ukeu-selector-eu`).classList.remove('active');
      document.getElementById('ulSizes').classList.remove(`${ID}-show-eu-sizes`);
      document.getElementById('ulSizes').classList.add(`${ID}-show-uk-sizes`);
    });

    let ukeuEUSelector = document.getElementById(`${ID}-ukeu-selector-eu`);
    ukeuEUSelector.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      document.getElementById(`${ID}-ukeu-selector-uk`).classList.remove('active');
      document.getElementById(`${ID}-ukeu-selector-eu`).classList.add('active');
      document.getElementById('ulSizes').classList.add(`${ID}-show-eu-sizes`);
      document.getElementById('ulSizes').classList.remove(`${ID}-show-uk-sizes`);
    });

  }

  // countdown timer 

  let insertedHTML = `
      
      <div class="${ID}-basket-countdown"> 

        <p> <span class="${ID}-countdown-item redtext" id="${ID}-countdown-item"></span> <span class="redtext">left</span> for <span class="${ID}-ndd-span">Next Day Delivery</span> </p>

      </div>
    
  `;

  let cdInsertPoint = document.querySelector('.BasketWishContainer')
  cdInsertPoint.insertAdjacentHTML('afterend', insertedHTML);

  initCountdown();

}

export default () => {
  setup();

  logMessage(ID + " Variation: "+VARIATION);

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

  document.documentElement.classList.add(`${ID}-experiment-started`);

  makeExpChanges();
};
