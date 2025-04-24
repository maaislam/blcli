/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import {
  setup,
  getSiteFromHostname
} from './services';
import {
  events
} from '../../../../../lib/utils';
import shared from './shared';

const {
  ID,
  VARIATION
} = shared;

export default () => {
  if (VARIATION == 'control') {
    events.send(`${ID} - Control`, 'Fired');
  } else {
    events.send(`${ID} - V` + VARIATION, 'Fired');

    setup();

    const createBanner = () => {

      const banner = document.createElement('div');
      banner.classList.add(`${ID}-offer_banner`);
      banner.innerHTML = `
      <div class="${ID}-inner">
        <p class="${ID}-offerText">Get an extra 20% off engagement rings with code <span class="${ID}-code">MARRYME</span></p>
        <div class="${ID}-countdown"></div>
      </div>
      <div class="${ID}-copied"><span>Copied to clipboard</span></div>`;

      document.querySelector('#js-header').insertAdjacentElement('afterbegin', banner);

      if (window.digitalData.page.pageInfo.pageType === 'PDP') {
        const secondCountdown = banner.cloneNode(true);
        secondCountdown.classList.add(`${ID}-pdpCountdown`);
        document.querySelector('.detail-page__right-column .product-summary').insertAdjacentElement('afterend', secondCountdown);
      }
    }

    const copyCode = () => {
      
      function selectElementText(el, win) {
        win = win || window;
        var doc = win.document,
          sel, range;
        if (win.getSelection && doc.createRange) {
          sel = win.getSelection();
          range = doc.createRange();
          range.selectNodeContents(el);
          sel.removeAllRanges();
          sel.addRange(range);
        } else if (doc.body.createTextRange) {
          range = doc.body.createTextRange();
          range.moveToElementText(el);
          range.select();
        }
      }

      const banner = document.querySelectorAll(`.${ID}-offer_banner`);
      for (let index = 0; index < banner.length; index += 1) {
        const element = banner[index];

        const textToCopy = element.querySelector(`.${ID}-code`);

        textToCopy.addEventListener('click', () => {
          events.send(`${ID} variation: ${VARIATION}`, 'click', 'copied code');

          selectElementText(textToCopy);
          document.execCommand("copy");

          element.querySelector(`.${ID}-copied`).classList.add(`${ID}-copyShow`);
          setTimeout(() => {
            element.querySelector(`.${ID}-copied`).classList.remove(`${ID}-copyShow`);
          }, 500);
        });
      }

    }

    const countdown = () => {
      const countDownDate = new Date("March 30, 2021, 23:59:59").getTime();
      // Update the count down every 1 second
      const x = setInterval(function () {
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

        const allCountdowns = document.querySelectorAll(`.${ID}-offer_banner .${ID}-countdown`);

        for (let index = 0; index < allCountdowns.length; index += 1) {
          const element = allCountdowns[index];


          if (actualhours > 24) {
            element.innerHTML = `
            <div class="${ID}-timeBlock"><span>${days}</span><p>Days</p></div>
            <div class="${ID}-timeBlock"><span>${hours}</span><p>Hrs</p></div>
            <div class="${ID}-timeBlock"><span>${minutes}</span><p>Mins</p></div>
            <div class="${ID}-timeBlock"><span>${seconds}</span><p>Secs</p></div>`;
          } else {
            element.innerHTML = `
            <div class="${ID}-timeBlock"><span>${hours}</span><p>Hrs</p></div>
            <div class="${ID}-timeBlock"><span>${minutes}</span><p>Mins</p></div>
            <div class="${ID}-timeBlock"><span>${seconds}</span><p>Secs</p></div>`;
          }

          if (distance < 0) {
            clearInterval(x);
            element.style.display = 'none';
          }

        }


      }, 1000);
    }


    const hideOnScroll = () => {

      window.onscroll = function (e) {
        var scrollY = window.pageYOffset || document.documentElement.scrollTop;
        var header = document.querySelector(`.header`);
        
        if(window.scrollY <= 0 ) {
          header.classList.remove(`${ID}-hidden`);
        } else if(window.scrollY > 0 && window.scrollY < 70) {
          header.classList.remove(`${ID}-hidden`);
        } else {
          scrollY <= this.lastScroll ?
          header.classList.remove(`${ID}-hidden`) :
          header.classList.add(`${ID}-hidden`);

          this.lastScroll = scrollY;
        }

        
      }
    }

    createBanner();
    countdown();
    copyCode();
    hideOnScroll();

    if (getSiteFromHostname() == 'ernestjones') {
      // EJ-specific JS
    }

    if (getSiteFromHostname() == 'hsamuel') {
      // HS-specific JS
    }
  }
};
