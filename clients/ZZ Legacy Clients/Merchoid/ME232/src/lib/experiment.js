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

const generateHtml = (logo) => {
  return `
    <div class="${shared.ID}-messaging">
      <div class="${shared.ID}-countdown-wrap">
        Only
        <div class="${shared.ID}-countdown-timer">...</div>
        until you Open Door
        Number 1 on the <span>Official
          <div class="${shared.ID}-messaging__secondary">
            ${logo.outerHTML}
          </div>
          Advent Calendar
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
  const newHtml = generateHtml(brandLogo);

  // ------------------------------------------------
  // Add HTML to DOM
  // ------------------------------------------------
  const priceBox = document.querySelector('.product-info-price');
  priceBox.insertAdjacentHTML('afterbegin', newHtml);

  // ------------------------------------------------
  // Trigger the countdown
  // ------------------------------------------------
  initCountdown(new Date('2019-12-01 00:08:00'));
};
