/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import { observer } from '../../../../../lib/uc-lib';

export default () => {

  const { ID } = shared;

  setup();

  
  // countdown banner
  const addbanner = () => {

    let bannerMessage = '20% off 1000s of Lines';

    let countDownDate = new Date("Dec 20, 2019 23:59:59").getTime();

    const PLPCountdownBanner = document.createElement('div');
    

    const today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1;

    const dateToday = '' + day + '/' + month + '';
    if (dateToday === '10/12') {
      bannerMessage = '10% off 1000s of Lines';
      countDownDate = new Date("Dec 20, 2019 23:59:59").getTime();
    }
    
    PLPCountdownBanner.classList.add(`${ID}-countdown`);
    PLPCountdownBanner.innerHTML = `<p class="${ID}-bannerMessage">${bannerMessage} - <span class="${ID}-countdownWrapper">Offer ends in <span class="${ID}-countdownText"></span></span></p>`
    if(window.innerWidth < 1024) {
      document.querySelector(`.header__container`).insertAdjacentElement('afterend', PLPCountdownBanner);
    } else {
      document.querySelector(`header`).appendChild(PLPCountdownBanner);
    }
    const getTime = setInterval(function() {
      // Get today's date and time
      const now = new Date().getTime();
      const distance = countDownDate - now;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor((distance % ((1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) + (days * 24));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      document.querySelector(`.${ID}-countdownText`).innerHTML = hours + "h " + minutes + "m " + seconds + "s ";

      // If the count down is finished
      if (distance < 0) {
        clearInterval(getTime);
        document.getElementById("demo").innerHTML = "OFFER EXPIRED, Please Refresh Page";
      }
    }, 1000);
  };

  addbanner();

  const removeBanner = () => {
    if(document.querySelector(`.${ID}-bannerMessage`)) {
      document.querySelector(`.${ID}-bannerMessage`).remove();
    }
  }


  
    observer.connect(document.querySelector('.browse__main-content'), () => {
      const url = window.location.href;
      removeBanner();

      if(url.indexOf('fitbit') === -1) {
          addbanner();
      } 
    }, {
      throttle: 1000,
      config: {
        attributes: true,
        childList: true,
        subtree: false,
      },
    });
  

};
