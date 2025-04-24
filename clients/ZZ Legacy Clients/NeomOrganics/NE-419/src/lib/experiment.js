/**
 * NE-419 - Mobile nav Christmas hero banner
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {

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
  setTimeout(() => {
    const herobanner = document.querySelector('.MobileSlidingNav .MobileSlidingNav__level.MobileSlidingNav__level-1 .MobileSlidingNav__extra-content');
    let bannerName = '';
    if (VARIATION == '1') {
      herobanner.querySelector('.MobileSlidingNav__extra-content a').setAttribute('href', '/collections/gift-a-moment-of-wellbeing');
      herobanner.querySelector('.MobileSlidingNav__extra-content img').setAttribute('src', 'https://ucds.ams3.digitaloceanspaces.com/NE-419/Hero%20banner%20-%20Christmas%20%281%29.png');
      bannerName = 'Christmas Gift Range';
    } else if (VARIATION == '2') {
      herobanner.querySelector('.MobileSlidingNav__extra-content a').setAttribute('href', '/pages/wellbeing-pod-luxe');
      herobanner.querySelector('.MobileSlidingNav__extra-content img').setAttribute('src', 'https://ucds.ams3.digitaloceanspaces.com/NE-419/Hero%20banner%20-%20Pod%20Luxe%20%281%29.png');
      bannerName = 'Christmas Best Sellers';
    }
    
    herobanner.addEventListener('click', e => {
      fireEvent(`Click - Hero banner - ${bannerName}`);
    });

    pollerLite(['.MobileSlidingNav__level.MobileSlidingNav__level-1.MobileSlidingNav__level--active'], () => {
      fireEvent(`Visible - Hero banner - ${bannerName}`);
    });
  }, 250);
  
};
