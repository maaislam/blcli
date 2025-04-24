/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { events } from '../../../../../lib/utils';
import { setup } from './services';
import shared from './shared';

export default () => {
  setup();

  const { ID } = shared;


  const stickyButton = () => {

    const newHeader = document.querySelector('#page-wrapper .py-4.bg-white.text-left');

    let colorClass;
    
    const stickyCTA = document.createElement('div');
    stickyCTA.classList.add(`${ID}-stickyCTA`);

    // class for the colour
    if(window.location.href.indexOf('/actie/series/') > -1) {
      colorClass = `${ID}-dark`; 
    } else {
      colorClass = `${ID}-light`; 
    }

    stickyCTA.classList.add(colorClass);
    stickyCTA.innerHTML = `<a href="https://www.canaldigitaal.nl/checkout/producthandlerott?bomvol">START JE GRATIS MAAND</a>`;
    

    // if mobile page has different header
    if(window.innerWidth >= 1200 && !newHeader) {
      document.body.appendChild(stickyCTA);
      document.body.classList.add(`${ID}-oldHeader`);

      window.addEventListener("scroll", function() {
        var elementTarget = document.querySelector('.banner.banner1');
        if (window.scrollY > ((elementTarget.offsetTop - 200) + elementTarget.offsetHeight)) {
          stickyCTA.classList.add(`${ID}-fixed`);
        }
      });

    } else {
      if(window.innerWidth > 767) {
        newHeader.querySelector('.container .row').appendChild(stickyCTA);
      } else {
        document.body.appendChild(stickyCTA);
      }
    }

    // click event
    document.querySelector(`.${ID}-stickyCTA`).querySelector('a').addEventListener('click', () => {
      events.send(`CTA Clicks`, 'click', 'Sticky CTA Clicks');
    });
  }

  stickyButton();

};
