/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';

export default () => {
  setup();

  const { ID } = shared;

  const banner = document.createElement('div');
  banner.classList.add(`${ID}-offer_banner`);
  banner.innerHTML = `
  <p>
  <span class="${ID}-offerText">25% off hundreds of lines over £100*.</span>
  <span class="${ID}-small">Ends in 
    <span class="${ID}-countdown"></span>
  </span>
  </p>`;

  if(window.innerWidth > 767) {
    document.querySelector('#js-header').insertAdjacentElement('afterend', banner);
  } else {
    document.querySelector('#js-header').insertAdjacentElement('afterend', banner);
  }


    const countDownDate = new Date("May 25, 2020, 23:59:59").getTime();
    // Update the count down every 1 second
    const x = setInterval(function() {
      // Get today's date and time
      const now = new Date().getTime();
      // Find the distance between now and the count down date
      const distance = countDownDate - now;
      // Time calculations for days, hours, minutes and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);


      const dayshours = days * 24;

      const actualhours = (dayshours + hours);

      if (actualhours > 48){

      document.querySelector(`.${ID}-offer_banner .${ID}-countdown`).innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
      
      }

      else {

      document.querySelector(`.${ID}-offer_banner .${ID}-countdown`).innerHTML = actualhours + "h " + minutes + "m " + seconds + "s ";
      
      }

      if (distance < 0) {
        clearInterval(x);
        document.querySelector(`.${ID}-offer_banner`).style.display = 'none';
      }
    }, 1000);
  

};
