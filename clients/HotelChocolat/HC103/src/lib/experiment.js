import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

export default () => {
  const { ID, VARIATION } = shared;

  setup();

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
  const addBanner = () => {
    const banner = `
   
    <div class="${ID}-banner">
      <div class="${ID}-container">
        <a class="${ID}-all" href="https://www.hotelchocolat.com/uk/about-vipme/"></a>
        <h3>VIP.ME</h3>
        <p>Join to receive 15% off your next purchase</p>
        <a class="${ID}-link" href="https://www.hotelchocolat.com/uk/about-vipme/">Join Now</a>
      </div>
    </div>`;

    document.body.insertAdjacentHTML('afterend', banner);


    document.querySelector(`.${ID}-all`).addEventListener('click', () => {
      fireEvent('Click VIP banner');
    });
    document.querySelector(`.${ID}-link`).addEventListener('click', () => {
      fireEvent('Click VIP banner');
    });
  }

  addBanner();

  window.addEventListener('scroll', () => {
    document.querySelector(`.${ID}-banner`).classList.add('show');
  });
  
  

};
