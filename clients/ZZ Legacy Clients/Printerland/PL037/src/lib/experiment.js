/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import settings from './shared';
import { pollerLite } from '../../../../../lib/utils';

export default () => {
  setup();

  const isMobile = () => !!window.innerWidth > 649;

  const addHTML = (ref, el, pos) => {
    let par = ref.parentElement;
    // if (!par || !par.querySelector(el))
    ref.insertAdjacentHTML(pos, el);
  }

  const moveEl = (ref, el, pos) => {
    ref.insertAdjacentElement(pos, el);
  }

  class Popup {
    getPopup() { // Returns el.
      return document.querySelector('.PL037-popup');
    }
    show(el) {
      el ? el.classList.add('PL-show') : null;
    }
    close(el) {
      el ? el.classList.remove('PL-show') : null;
    }
    init() { // Add to page
      const ref = document.body;
      
      addHTML(ref, `
        <div class="PL037-popup">
          <div>
            <div class="PL-header">
              <span class="PL-ink"></span><span>Genuine ink &amp; toner cartridges

              <span class="PL-close"><i class="fas fa-times"></i></span>
            </div>

            <div class="PL-bottom">
              
              <ul class="dropdown__container PL037-usps">
                <li class="dropdown__title"><span class="PL-tick"></span> <p>Genuine Cartridges</p></li>
                <li class="dropdown__title"><span class="PL-tick"></span> <p>Return unopened cartridges within 6 months</p></li>
                <li class="dropdown__title"><span class="PL-tick"></span> <p>Free next day delivery on orders over £125</p></li>
                <li class="dropdown__title"><span class="PL-tick"></span> <p>Protect your warranty</p></li>
              </ul>

              <a href="https://www.printerland.co.uk/consumables/352" class="PL-blueBtn">Shop ink &amp; toner</span><i class="fas fa-caret-right"></i></a>
            </div>
          </div>
        </div>
      `, 'beforeend');

      return;
    }
  };

  const popup = new Popup;

  // Add popup
  popup.init();

  const addedPopup = popup.getPopup();

  

  if (!isMobile()) { // Desktop
    // Move nav el.
    const navItem = document.querySelector('a[data-mega-id="7"]').parentElement;
    
    if (!navItem) return;

    // Add toner icons

    const nextItem = navItem.nextElementSibling;
    
    moveEl(nextItem, navItem, 'afterend');
  }


  // All devices
  pollerLite(['.hp-quicklinks'], () => {
    const hpBanner = document.querySelector('.hp-quicklinks');
    hpBanner.insertAdjacentHTML('afterbegin', `
      <li>
        <a id="PL-showPopup" href="https://www.printerland.co.uk/consumables/352"><span class="PL-ink"></span><span>Genuine ink &amp; toner cartridges</span><i class="fas fa-caret-right"></i></a>
      </li>
    `);
  })


  const inkDropdownMenu = document.querySelector('div[data-mega="7"] .container--fw');
  // Add USPs
  inkDropdownMenu.insertAdjacentHTML('beforebegin', `
    <ul class="dropdown__container PL037-usps">
      <li class="dropdown__title"><span class="PL-tick"></span> <p>Genuine Cartridges</p></li>
      <li class="dropdown__title"><span class="PL-tick"></span> <p>Return unopened cartridges within 6 months</p></li>
      <li class="dropdown__title"><span class="PL-tick"></span> <p>Free next day delivery on orders over £125</p></li>
      <li class="dropdown__title"><span class="PL-tick"></span> <p>Protect your warranty</p></li>
    </ul>
  `);


  // Popup Events
  const addedUSP = document.querySelector('#PL-showPopup');
  addedUSP.addEventListener('click', (e) => {
    
    e.preventDefault();
    popup.show(addedPopup);
  });
  
  const popupInner = addedPopup.querySelector('div');
  
  document.body.addEventListener('click', (e) => {
    if (!popupInner.contains(e.target) && !addedUSP.contains(e.target)) {
      popup.close(addedPopup);
      return;
    }
  });


  const closePopup = document.querySelector('.PL-close');
  if (!closePopup) return;

  closePopup.addEventListener('click', () => {
    popup.close(addedPopup);
  })


};
