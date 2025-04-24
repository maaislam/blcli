/**
 * HF015 - Time Remaining on PDP
 * @author User Conversion
 */
import { setup } from './services';
import settings from './settings';
import { cacheDom } from '../../../../../lib/cache-dom';
import { events } from '../../../../../lib/utils';
import { pollerLite } from '../../../../../lib/uc-lib';
import helpers from './helpers';

events.analyticsReference = '_gaUAT';

const activate = () => {
  
  setup();

  const { ID, VARIATION } = settings;

  let colourOptions = document.querySelectorAll('#ulColourImages li');
  let sizeOptions = document.querySelectorAll('#ulSizes li');
  
  let atbButton = document.querySelector('.addToBagInner');
  if(atbButton.innerText == "PRE-ORDER NOW") {
    events.send(ID, 'HF015 Skipped Product', 'Product is pre-order, not relevant');
    return false;
  }

  let brandName = document.getElementById('lblProductBrand');
  if(brandName.innerText == "GIFT") {
    events.send(ID, 'HF015 Skipped Product', 'Product is gift card, not relevant');
    return false;
  }

  let nddContent = document.querySelector('.nextOption');
  if(nddContent.length > 0) {
    events.send(ID, 'HF015 Skipped Product', 'Product does not qualify for free delivery, not relevant');
    return false;
  }

  // adding initial HTML
  let nddHolderHTML = `<div class="HF015-message-holder"> </div>`;
  let ref = document.querySelector('.BasketWishContainer');
  ref.insertAdjacentHTML('beforeend', nddHolderHTML);

  // sorting out the hover state/initial state

  if(document.querySelector('#ulColourImages')) {

    let initiallySelectedColour = document.querySelector('#ulColourImages > .variantHighlight').getAttribute('data-colvarid');
    let initialState = document.querySelector('.addToBagInner').innerHTML.toLowerCase().trim();
    let messageHolder = document.querySelector('.HF015-message-holder');

    if(initialState == "pre-order now") {
      messageHolder.classList.add('hidden');
    }

    [].slice.call(colourOptions).forEach(function(option) {

      option.addEventListener('mouseenter', () => {

        setTimeout(function() {

          if(document.querySelector('.addToBagInner').innerHTML.toLowerCase().trim() == "pre-order now") {
            if(!messageHolder.classList.contains('hidden')) {
              messageHolder.classList.add('hidden');
            }
          } else {
            messageHolder.classList.remove('hidden');
          }
        }, 300);

      });

      option.addEventListener('mouseleave', () => {

        if(document.querySelector('.addToBagInner').innerHTML.toLowerCase().trim() == "pre-order now") {
          if(!messageHolder.classList.contains('hidden')) {
            messageHolder.classList.add('hidden');
          }
        } else {
          messageHolder.classList.remove('hidden');
        }

      });

      option.addEventListener('click', () => {

         setTimeout(function() {
          if(document.querySelector('.addToBagInner').innerHTML.toLowerCase().trim() == "pre-order now") {
            initialState = "pre-order now";
            if(!messageHolder.classList.contains('hidden')) {
              messageHolder.classList.add('hidden');
            }
          } else {
            initialState = "add to bag";
            messageHolder.classList.remove('hidden');
          }
        }, 300);

      });

    });  


  }

  [].slice.call(sizeOptions).forEach(function(option) {

    option.addEventListener('click', () => {
      setTimeout(function() {
        let updatedNDD = document.querySelector('.deliveryInfo .nextOption');
        if(updatedNDD.style.display == "none") {
          document.querySelector('.HF015-message-holder').classList.add('dropshiphidden');
        } 
      }, 300);

      return true;
    });

  })

  const init = () => {
    // Lets get the remaining time
    const time = helpers.timeRemaining();
    const timeLeftString = time();
    const d = new Date();
    const thisHour = d.getHours();
    const today = d.setDate(d.getDate());
    const day = new Intl.DateTimeFormat('en-GB', {weekday: 'long'}).format(today);
    const dayAfterTomorrow = d.setDate(d.getDate() + 2);
    const delDay = new Intl.DateTimeFormat('en-GB', {weekday: 'long'}).format(dayAfterTomorrow);
  
    

    let nextDayText = `Delivery as soon as day after tomorrow, order before 6pm`;

    let subText = 'Excludes Sundays and Public Holidays';

    if (day === 'Saturday') {
      subText = 'Excludes Public Holidays';
      nextDayText = `Delivery as soon as Monday`;
    }

    // Past 7pm, Sunday - Friday (Not Saturday)
    if (day !== 'Saturday' && thisHour >= 20) {
      nextDayText = `Delivery as soon as ${delDay}`;
    }

    let html = `
      <div class="HF015-message">
        <p class="fl62-t ${timeLeftString.match('Delivery as soon as day after tomorrow') ? 'hide' : ''}">Delivery as soon as tomorrow<sup>*</sup></p>
        <p class="fl62-s">${timeLeftString.match('Delivery as soon as day after tomorrow') ? nextDayText : timeLeftString}</p>
      </div>
    `;

    let nddHolderElement = document.querySelector('.HF015-message-holder');

    // Add it
    if (nddHolderElement) {
      // If it already exists, remove and add
      if (document.querySelector('.HF015-message')) {
        const el = document.querySelector('.HF015-message');
        el.parentNode.removeChild(el);
      }
      nddHolderElement.insertAdjacentHTML('beforeend', html);
    }
  }

  // initial call 
  if (window.innerWidth < 767) {
    pollerLite(['.swapSize'], init);
  } else {
    pollerLite(['.BasketWishContainer'], init);
  }

  // Update every second  
  window.setInterval(function(){
    init();
  }, 1000);
  
};

export default activate;
