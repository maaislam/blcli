import { setup } from './services';
import shared from './shared';
import { countdown } from './../../../../../lib/uc-lib'

/**
 * Is UK site check?
 */
const isUk = () => {
  return window.location.href.indexOf('/uk/') > -1;
};

/**
 * Init countdown
 */
const initCountdown = (endDate) => {
  const { ID } = shared;

  const countdownWrapper = document.querySelector(`.${ID}-countdown-wrap`);
  if(countdownWrapper) {
    countdown({
      element: `.${ID}-countdown-timer`,
      cutoff: endDate,
      zeroPrefixHours: false,
      zeroPrefixMinutes: false,
      labels: {
        d: 'days',
        h: 'hours',
        m: 'mins',
        s: ''
      },
    });

    countdownWrapper.classList.add(`${ID}-countdown-wrap--active`);  
  }
};

const generateHtml = (logo, beforeTimerText = '', afterTimerText = '') => {
  return `
    <div class="${shared.ID}-messaging">
      <div class="${shared.ID}-countdown-wrap">
        ${beforeTimerText}
        <div class="${shared.ID}-countdown-timer">...</div>
        ${afterTimerText}
      </div>
      <div class="${shared.ID}-messaging__secondary">
        Get your official
        ${logo.outerHTML}
        ${isUk() ? 'Jumper' : 'Sweater'}
        Now
      </div>
    </div>
  `;
}

export default () => {
  setup();

  const brandLogo = document.querySelector('.logoBrand img');

  // ------------------------------------------------
  // Generate HTML
  // ------------------------------------------------
  let newHtml = '';
  if(shared.VARIATION == '1') {
    newHtml = generateHtml(brandLogo, 'Only', 'until Christmas');
  } else if(shared.VARIATION == '2') {
    newHtml = generateHtml(brandLogo, '', '<em>until Christmas Jumper Season</em>');
  }

  // ------------------------------------------------
  // Add HTML to DOM
  // ------------------------------------------------
  const priceBox = document.querySelector('.product-info-price');
  priceBox.insertAdjacentHTML('afterbegin', newHtml);

  // ------------------------------------------------
  // Trigger the countdown
  // ------------------------------------------------
  if(shared.VARIATION == '1') {
    // Counts down to start of Christmas Day
    initCountdown(new Date('2019-12-25 00:00:00'));
  } else if(shared.VARIATION == '2') {
    // Counts down to start of Dec.
    initCountdown(new Date('2019-12-01 00:09:00'));
  }
};
