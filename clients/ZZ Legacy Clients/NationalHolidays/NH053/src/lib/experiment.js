/**
 * NH053 - Deposit Information in Checkout
 * @author Sarah Doghri - User Conversion
 */
import { events, viewabilityTracker } from '../../../../../lib/utils';
import settings from './settings';
import { setup } from './services';
import { cacheDom } from './../../../../../lib/cache-dom';
import { pollerLite } from '../../../../../lib/uc-lib';

/**
 * Helper: check whether the balance due date is in the future,
 * otherwise we're not able to show the messaging
 */
const balanceDaysInFuture = () => {
  let result = null;
  const pContainer = document.querySelector('.nodephide1 p');
  if(pContainer && pContainer.childNodes.length) {
    pContainer.childNodes.forEach((n) => {
      if(n.nodeType == 3) {
        const txt = n.textContent.trim();
        if(txt.toLowerCase().indexOf('balance due by') > -1) {
          const matches = txt.match(/Balance due by (\d+\/\d+\/\d+)/i);

          if(matches && matches[1]) {
            const balanceDueDateRaw = matches[1];
            const targetDate = new Date( matches[1].split('/').reverse().join('-') );
            const nowDate = new Date();

            const balanceDueDays = ((targetDate - nowDate) / (60 * 60 * 24 * 1000));

            result = balanceDueDays;
          }
        }
      }
    });
  }

  return result;
};

/**
 * Activate
 */
const activate = () => {
  setup();

  // Experiment code
  pollerLite(['.box-with-border.white', '.nodephide1'], () => {
    const bookingDetailsContainer = document.querySelector('.box-with-border.white');

    // Availability / Passengers Page
    if (window.location.pathname === '/OrderProcess/Availability.aspx' || window.location.pathname === '/OrderProcess/Passengers.aspx') {
      const totalCostInfoContainer = `<div class='NH053-totalCostInfo__wrapper box-with-border white'>
        <p>Total costs shown after you input passenger details</p>
      </div>`;
      bookingDetailsContainer.insertAdjacentHTML('afterend', totalCostInfoContainer);
    }
    const tripDetailLines = document.querySelectorAll('.box-with-border.white div.side-block');
    let totalAmount = '';

    [].forEach.call(tripDetailLines, (line) => {
      const label = line.querySelector('strong');
      if (label.innerText.trim() === 'Deposit') {
        line.style.display = 'none';
      }
    });

    const numDaysTilBalanceDue = balanceDaysInFuture();
    if(numDaysTilBalanceDue < 3) {
      // Balance is due too soon so message can't show
      return false;
    }

    [].forEach.call(tripDetailLines, (line) => {
      const label = line.querySelector('strong');
      if (label) {
        if (label.innerText.trim() === 'Total costs') {
          const priceLabels = line.querySelectorAll('p');
          [].forEach.call(priceLabels, (priceLabel) => {
            if (priceLabel.innerText && priceLabel.innerText.trim().indexOf('Discount:') > -1) {
              const webDiscount = priceLabel.querySelector('span.money-cont').innerText.replace('-', '');
              if (parseFloat(webDiscount) > 0) {
                const webDiscountContainer = `<div class='NH053-webExclusive__wrapper box-with-border white'>
                  <p><span>Web Exclusive -</span> you're saving £${webDiscount} by booking online today.</p>
                </div>`;
                bookingDetailsContainer.insertAdjacentHTML('beforebegin', webDiscountContainer);
                // User Saw - Discount Info
                const webExclusiveInfo = document.querySelector('.NH053-webExclusive__wrapper');
                viewabilityTracker(webExclusiveInfo, () => {
                  events.send(settings.ID, `Variation ${settings.VARIATION}`, `User Saw - Discount information`, { sendOnce: true });
                }, {removeOnView: true});
                // User Clicked - Discount Info
                webExclusiveInfo.addEventListener('click', () => {
                  events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked - Discount information`, { sendOnce: true });
                });
              }
            } else if (priceLabel.innerText && priceLabel.innerText.trim().indexOf('Total:') > -1) {
              totalAmount = priceLabel.querySelector('span').innerText;
            }
          });
        } else if (label.innerText.trim() === 'Deposit') {
          line.style.display = 'none';
          let depositAmount = '';
          let depositDueDate = '';
          let depositLines = line.querySelector('p').innerText.trim();
          depositLines = depositLines.split('\n');
          depositLines.forEach(function(el) {
            const regex = /(\d{4}([.\/\ ])\d{2}\2\d{2}|\d{2}([.\/\ ])\d{2}\3\d{4})/g;
            if (el.indexOf('£') > -1) {
              depositAmount = el;
            } else if (regex.exec(el)) {
              let result = el.match(regex);
              result = JSON.stringify(result);
              depositDueDate = result.replace(/\[|\]|"/g, '');
            }
          });
          if (parseFloat(depositAmount.replace('£', '')) > 0) {
            const depositContainerTop = `<div class='NH053-bookingDeposit__wrapper box-with-border white'>
              <span>Booking today for ${depositAmount} deposit</span>
              <p>You can secure this booking right now with just a deposit</p>      
            </div>`;
            bookingDetailsContainer.insertAdjacentHTML('beforebegin', depositContainerTop);
            const depositContainerBottom = `<div class='NH053-paymentAndDeposit side-block'>
              <div class="NH053-paymentOptions__wrapper">
                <strong>Payment Options</strong>
                <div class="NH053-paymentOptions__text">
                  <p>Secure this booking for just ${depositAmount} deposit</p>
                  <p>(includes any insurance selected) Balance due by <span>${depositDueDate}</span></p>
                  <div class="NH053-line">
                    <p>or</p>
                  </div>
                  <div class="NH053-depositOptions__text">
                    <p>Complete booking with one single payment of <span>${totalAmount}</span></p>
                  </div>
                </div>
              </div>
            </div>`;
            bookingDetailsContainer.insertAdjacentHTML('beforeend', depositContainerBottom);

            // User Saw - Booking Deposit Top
            viewabilityTracker(document.querySelector('.NH053-bookingDeposit__wrapper'), () => {
              events.send(settings.ID, `Variation ${settings.VARIATION}`, `User Saw - Deposit information (Top)`, { sendOnce: true });
            }, {removeOnView: true});
            // User Clicked - Booking Deposit
            document.querySelector('.NH053-bookingDeposit__wrapper').addEventListener('click', () => {
              events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked - Deposit information`, { sendOnce: true });
            });
            // User Saw - Booking Deposit Bottom
            viewabilityTracker(document.querySelector('.NH053-paymentAndDeposit'), () => {
              events.send(settings.ID, `Variation ${settings.VARIATION}`, `User Saw - Deposit information (Bottom)`, { sendOnce: true });
            }, {removeOnView: true});
          }
        }
      }
    });
  });
};

export default activate;
