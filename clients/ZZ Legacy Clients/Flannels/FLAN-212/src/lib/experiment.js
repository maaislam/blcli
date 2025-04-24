/**
 * FLAN-212 - Time Remaining on PDP
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

  let fullStop = false;

  // Bail on pre-order products
  let preOrderText = document.querySelector('.addToBagInner').innerHTML;
  let colourOptions = document.querySelectorAll('#ulColourImages li');

  if(preOrderText == "PRE-ORDER NOW" && colourOptions.length == 0) {
    events.send(ID, 'FLAN-212 Variation', 'Skipping product as it is single colour pre-order');
    return false;
  }

  // adding initial HTML
  let nddHolderHTML = `<div class="FLAN-212-message-holder"> </div>`;
  let ref = document.querySelector('.BasketWishContainer');
  ref.insertAdjacentHTML('beforeend', nddHolderHTML);

  // sorting out the hover state/initial state
  let initiallySelectedColour = document.querySelector('#ulColourImages > .variantHighlight').getAttribute('data-colvarid');
  
  let messageHolder = document.querySelector('.FLAN-212-message-holder');

  setTimeout(function() {
    let initialState = document.querySelector('.addToBagInner').innerHTML.toLowerCase().trim();
    if(initialState == "pre-order now") {
      messageHolder.classList.add('hidden');
    }
  }, 300);
  

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

  const init = () => {
    // Lets get the remaining time

    const time = helpers.timeRemaining();
    const timeLeftString = time();

    // If weekend, bail out.
    // if (!timeLeftString) {
    //   events.send(ID, 'FLAN-212 Not Active', 'Is weekend, don\'t show test');
    //   return false;
    // }




    const d = new Date();
    const thisHour = d.getHours();
    const today = d.setDate(d.getDate());
    const day = new Intl.DateTimeFormat('en-GB', {weekday: 'long'}).format(today);
    const dayAfterTomorrow = d.setDate(d.getDate() + 2);
    const delDay = new Intl.DateTimeFormat('en-GB', {weekday: 'long'}).format(dayAfterTomorrow);
  
    const dayTomorrow = d.setDate(d.getDate() - 1);
    const delDayMinusOne = new Intl.DateTimeFormat('en-GB', {weekday: 'long'}).format(dayTomorrow);

    let nextDayText = `Delivery as soon as day after tomorrow, order before 7pm`;

    let subText = 'Excludes Sundays and Public Holidays';

    if (day === 'Saturday') {
      subText = 'Excludes Public Holidays';
      nextDayText = `Delivery as soon as Monday`;
    }

    // Past 7pm, Sunday - Friday (Not Saturday)
    if ((day == 'Saturday' || thisHour >= 19) && VARIATION == 1) {
      fullStop = true;
      return false;
    }

    let html = '';

    if(VARIATION == 2) {
      html = `
        <div class="FLAN-212-message">
          <p class="fl62-t">${timeLeftString.match('Delivery as soon as day after tomorrow') ? `Get it as soon as ${delDay}` : 'Delivery as soon as tomorrow'}</p>
          <p class="fl62-s">${timeLeftString.match('Delivery as soon as day after tomorrow') ? `If you order before 7pm ${delDayMinusOne}` : timeLeftString}</p>
          <br>
          <p class="fl62-o">${thisHour >= 19 ? '' : 'Order before 7pm.'} ${subText}</p>
        </div>
      `;
    } else {
      html = `
        <div class="FLAN-212-message">
          <p class="fl62-t">Delivery as soon as tomorrow</p>
          <p class="fl62-s">${timeLeftString}</p>
          <br>
          <p class="fl62-o">Order before 7pm. ${subText}</p>
        </div>
      `;
    }

    


    let nddHolderElement = document.querySelector('.FLAN-212-message-holder');

    // Add it
    if (nddHolderElement) {
      // If it already exists, remove and add
      if (document.querySelector('.FLAN-212-message')) {
        const el = document.querySelector('.FLAN-212-message');
        el.parentNode.removeChild(el);
      }
      nddHolderElement.insertAdjacentHTML('beforeend', html);
    }

    if(VARIATION == 2) {
      fullStop = true;
      return false;
    }
  }


  pollerLite(['.BasketWishContainer'], init);

  // Update every second  
  let timeInterval = window.setInterval(function(){
    if(fullStop == false) {
      init();
    } else {
      if(VARIATION == 1) {
        document.querySelector('.FLAN-212-message-holder').remove();
      }
      clearInterval(timeInterval);
    }
    
  }, 1000);
  
};

export default activate;
