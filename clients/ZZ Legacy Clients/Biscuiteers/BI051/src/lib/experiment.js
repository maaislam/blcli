/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { addPoller, addEventListener, addObserver } from './winstack';
import { events } from '../../../../../lib/utils';
import settings from './shared';
import { countdown } from '../../../../../lib/uc-lib';
import { addDaysToDate, isNextDayDeliveryPossibleNow, calculateTimeFromToday } from './deliveryLogic';

/**
 * Helper get content for content box for a given date 
 */
const getContentForDate = (dateString) => {
  let isoDateString = dateString;
  const dateParts = dateString.split('/');
  if(dateString.match(/\d+\/\d+\/\d+/i)) {
    isoDateString = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
  }

  const daysFromToday = calculateTimeFromToday(isoDateString);
  const chosenDayOfWeek = (new Date(isoDateString)).getDay();
  const tomorrow = addDaysToDate(new Date(), 1);
  const dayAfterTomorrow = addDaysToDate(new Date(), 2);

  let dayAfterString = `${dayAfterTomorrow.getDate()}/${dayAfterTomorrow.getMonth() + 1}/${dayAfterTomorrow.getFullYear()}`;

  const nextTuesday = new Date();
  nextTuesday.setDate((new Date()).getDate() + ((7-(new Date()).getDay())%7+2) % 7);

  if([0,5,6].indexOf((new Date()).getDay()) > -1) {
    // Day after is actually Tuesday when weekend dates chosen
    dayAfterString = `${nextTuesday.getDate()}/${nextTuesday.getMonth() + 1}/${nextTuesday.getFullYear()}`;
  }

  let resultHtml = '';

  const todayDay = (new Date()).getDay();

  let bracket = '0';

  if(daysFromToday === 1 || (daysFromToday <= 3 && todayDay == 5) || (daysFromToday <= 2 && todayDay == 6) || (daysFromToday <= 1 && todayDay == 0)) {
    // They're after next day delivery, or delivery on a weekend so...
    if(isNextDayDeliveryPossibleNow()) {
      // Next Day is possible and it's delivered by tomorrow
      resultHtml = `
        <ul>
          <li>We can deliver tomorrow! Make sure you order <strong>before 1pm*</strong></li>
          <li>Your order will arrive before 6pm on your chosen date via tracked delivery.</li>
          <li>We securely package all of our parcels to ensure they arrive safely on the doormat!</li>
          <li>All our biscuits have at least a <strong>4 week</strong> shelf life when they arrive.</li>
        </ul>
        <p class="${settings.ID}-summary">
          * Applies to UK delivery. International delivery to all countries is also available 
          at checkout.
        </p>
        <p class="${settings.ID}-moreinfo">
          <a class="${settings.ID}-checkdeliveryinfo">More information on delivery options</a>
        </p>
      `;

      bracket = 'next-day';
    } else {
      // Next Day would be the day after tomorrow
      resultHtml = `
        <ul>
          <li>
            Sorry, we can only guarantee next day delivery on orders before 1pm. Order now for delivery 
            by 
            ${dayAfterString}
            *
          </li>
          <li>Your order will arrive before 6pm on your chosen date via tracked delivery.</li>
          <li>We securely package all of our parcels to ensure they arrive safely on the doormat!</li>
          <li>All our biscuits have at least a <strong>4 week</strong> shelf life when they arrive.</li>
        </ul>
        <p class="${settings.ID}-summary">
          * Applies to UK delivery. International delivery to all countries is also available 
          at checkout. Orders placed Friday (after 1pm), Saturday or Sunday will be delivered the following Tuesday.
        </p>
        <p class="${settings.ID}-moreinfo">
          <a class="${settings.ID}-checkdeliveryinfo">More information on delivery options</a>
        </p>
      `;

      bracket = 'next-day-sorry';
    }
  } else if(daysFromToday >= 2 && daysFromToday <= 14) {
    // Delivery 2 to 14 days away
    let targetDayString = dateString;
      
    resultHtml = `
      <ul>
        <li>That's great - we can deliver on or before ${targetDayString}.</li>
        <li>Your order will arrive before 6pm on your chosen date via tracked delivery.</li>
        <li>We securely package all of our parcels to ensure they arrive safely on the doormat!</li>
        <li>All our biscuits have at least a <strong>4 week</strong> shelf life when they arrive.</li>
      </ul>
      <p class="${settings.ID}-summary">
        * Applies to UK delivery. International delivery to all countries is also available 
        at checkout.
      </p>
      <p class="${settings.ID}-moreinfo">
        <a class="${settings.ID}-checkdeliveryinfo">More information on delivery options</a>
      </p>
    `;

    bracket = '2-14';
  } else if(daysFromToday >= 15 && daysFromToday <= 30) {
    // Delivery 15 to 30 days away
    resultHtml = `
      <ul>
        <li>That's great - we can deliver on or before ${dateString}.</li>
        <li>Your order will arrive before 6pm on your chosen date via tracked delivery.</li>
        <li>We securely package all of our parcels to ensure they arrive safely on the doormat!</li>
        <li>All our biscuits have at least a <strong>4 week</strong> shelf life when they arrive.</li>
      </ul>
      <p class="${settings.ID}-summary">
        * Applies to UK delivery. International delivery to all countries is also available 
        at checkout.
      </p>
      <p class="${settings.ID}-moreinfo">
        <a class="${settings.ID}-checkdeliveryinfo">More information on delivery options</a>
      </p>
    `;
    bracket = '15-30';
  } else if(daysFromToday >= 31 && daysFromToday <= 180) {
    // Delivery 31 to 180 days away
    resultHtml = `
      <ul>
        <li>That's great - we can deliver on or before ${dateString}.</li>
        <li>Your order will arrive before 6pm on your chosen date via tracked delivery.</li>
        <li>We securely package all of our parcels and mark them 'Fragile' to ensure they arrive safely on the doormat!</li>
      </ul>
      <p class="${settings.ID}-summary">
        * Applies to UK delivery. International delivery to all countries is also available 
        at checkout.
      </p>
      <p class="${settings.ID}-moreinfo">
        <a class="${settings.ID}-checkdeliveryinfo">More information on delivery options</a>
      </p>
    `;
    bracket = '31-180';
  } else if(daysFromToday >= 181) {
    // Delivery 181+
    resultHtml = `
      <p><strong>Wow! You're organised</strong></p>
      <p>Unfortunately, we only take orders up to 6 months away</p>
      <p class="${settings.ID}-moreinfo">
        <a class="${settings.ID}-reminder">Set yourself a reminder</a>
      </p>
    `;
    bracket = '181+';
  }

  return {
    content: resultHtml,
    bracket: bracket,
  };
};

/**
 * Entry point for experiment
 */
export default () => {
  if(settings.VARIATION == 'control') {
    events.send(`${settings.ID}`, 'Control', 'Initialised');
    return;
  }

  setup();

  events.send(`${settings.ID}`, 'Variation', 'Initialised');

  // ------------------------------------------------
  // Add new content to occasion box
  // ------------------------------------------------
  const occasionDiv = document.querySelector('product-when-your-occasion > div');

  if(occasionDiv) {
    occasionDiv.insertAdjacentHTML('afterbegin', `
      <h3 class="col-11 m-t-1 m-b-2 center ${settings.ID}-DOD">About our delivery</h3>

      <div class="${settings.ID}_aboutDelivery ${settings.ID}-DOD">
        <p class="${settings.ID}_aboutDelivery__countdown center">
          <span class="${settings.ID}_aboutDelivery__countdown-timer"></span>
          left for next day delivery*
          <img src="https://cdn-sitegainer.com/9embi7xz7i28d9h.png" width="36" height="18">
        </p>

        <p class="${settings.ID}-intl-delivery">
          UK, international and next delivery options.<a href="/delivery">*See options and prices &gt;</a>
        </p>
        <p class="${settings.ID}-arrive-header b-dotted-t">
          When would you like your biscuits to arrive? Order today for delivery up to 6 months away.
        </p>
      </div>
    `);

    if(isNextDayDeliveryPossibleNow()) {
      countdown({
        element: `.${settings.ID}_aboutDelivery__countdown-timer`,
        cutoff: settings.cutoffDate,
        zeroPrefixHours: false,
        zeroPrefixMinutes: false,
        zeroPrefixSeconds: true,
        labels: {
          d: '',
          h: 'hours',
          m: 'minutes',
          s: ''
        },
      });
    } else {
      const target = document.querySelector(`.${settings.ID}_aboutDelivery__countdown`);
      target.innerHTML = `<p class="${settings.ID}_aboutDelivery__genericmsg ${settings.ID}-DOD">Orders before 1pm are sent next day* <img src="https://cdn-sitegainer.com/9embi7xz7i28d9h.png" width="36" height="18"></p>`;
    }
  }
  
  // ------------------------------------------------
  // Add new content to occasion box
  // ------------------------------------------------
  const dateInput = document.querySelector('product-when-your-occasion input[name=date_delivery]');
  addObserver(dateInput, (elements, mutation) => {
    if(mutation && mutation.target && mutation.target.name == 'date_delivery' && mutation.attributeName == 'value') {
      setTimeout(() => {
        const value = mutation.target.value;

        events.send(`${settings.ID}`, 'Variation', 'Did-Update-Copy');

        const contentBox = document.querySelector('product-when-your-occasion [ng-if="::vm.date"] [ng-switch="vm.modalVersion"] .w-12');
        if(contentBox && value) {
          const content = getContentForDate(value);

          contentBox.innerHTML = `<div class="${settings.ID}-contentbox">` + content.content;

          events.send(`${settings.ID}`, 'Variation', 'Bracket-' + content.bracket);

          const pressieLink = document.querySelector('[click-event="reminder-modal.toggle.request"]');
          const reminderLink = document.querySelector(`.${settings.ID}-reminder`);
          if(reminderLink && pressieLink) {
            addEventListener(reminderLink, 'click', () => {
              pressieLink.click();
            });
          }

          const checkDeliveryInfo = document.querySelector(`.${settings.ID}-checkdeliveryinfo`);
          if(checkDeliveryInfo) {
            const desktopDelivery = document.querySelector('[zippy-open="product-description.2"]');
            const mobileDelivery = document.querySelector('[ng-bind~="info"]');
            if(mobileDelivery) {
              addEventListener(checkDeliveryInfo, 'click', () => {
                mobileDelivery.click();
              });
            } else if(desktopDelivery) {
              addEventListener(checkDeliveryInfo, 'click', () => {
                const box = desktopDelivery.getBoundingClientRect();
                window.scrollTo(0, box.top + window.scrollY);
                desktopDelivery.click();
              });
            }
          }
        }
      }, 50);
    }
  }, {
    // Throttle = 0
    // We're looking for a specific attribute mutation change so allow all mutations to fire
    throttle: 0,

    // We only care about attribute mutations on the date picker input
    attributes: true,
    childList: false  
  });
};
