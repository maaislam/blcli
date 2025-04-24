/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import shared from '../../../../../core-files/shared';
import { h, render, Component } from "preact";
import ReactComponent from './components/ReactComponent';
import MobileComponent from './components/MobileComponent';
import { setup, fireEvent } from '../../../../../core-files/services';
import { pollerLite } from '../../../../../lib/utils';

const runChanges = () => {

  if(DY?.deviceInfo?.type == 'desktop') {
    // Declare container markup for Component to sit inside
    const markup = `
      <div class="${shared.ID}__component">
      
      </div>
    `;

    // Get element from page where the component will sit
    const elementOnPage = document.querySelector('#shopify-section-cart');
    if(elementOnPage) {
      const checkoutForm = elementOnPage.querySelector('form');
      if (checkoutForm) {
        // Insert wrapper markup
        checkoutForm.insertAdjacentHTML('afterend', markup);
        // Grab wrapper element
        const reactWrapper = document.querySelector(`.${shared.ID}__component`);
        // Render Component to wrapper
        if(reactWrapper) {
          render(<ReactComponent />, reactWrapper);
        }
      }
    }
  }

  // Mobile rendering


  if(DY?.deviceInfo?.type != 'desktop') {
    if(shared.VARIATION == 1) {
      const mobileMarkup = `
      <div class="${shared.ID}__mobile">
      
      </div>
    `;
      const v1Area = document.querySelector('.basket-sidebar-background');
      if (v1Area) {
        v1Area.insertAdjacentHTML('afterend', mobileMarkup);
        const mobileWrap = document.querySelector(`.${shared.ID}__mobile`);
        if (mobileWrap) {
          render(<MobileComponent />, mobileWrap);
        }
      }
    }

    if(shared.VARIATION == 2) {
      const mobileMarkup = `
      <div class="${shared.ID}__outer-mobile">
        <div class="${shared.ID}__mobile-bar">
          <span class="${shared.ID}__mobile-bar__text">
            See these little extras
          </span>
          <span class="${shared.ID}__mobile-bar__plus">
            +
          </span>
        </div>
        <div class="${shared.ID}__inner-mobile">
          <div class="${shared.ID}__mobile ${shared.ID}__mobile-v2">
          
          </div>
        </div>
      </div>
    `;

      // v2 rendering
      pollerLite([
        '#basket-main'
      ], () => {
        const v2Area = document.querySelector('#basket-main');
        if (v2Area) {
          v2Area.insertAdjacentHTML('afterend', mobileMarkup);
          const mobileWrap = document.querySelector(`.${shared.ID}__mobile`);
          if(mobileWrap) {
            render(<MobileComponent/>, mobileWrap);
          }
        }
      })

      const mobileBar = document.querySelector(`.${shared.ID}__mobile-bar`);
      if(mobileBar) {
        mobileBar.addEventListener('click', () => {
          const mobileWrap = document.querySelector(`.${shared.ID}__mobile`);
          const icon = mobileBar.querySelector(`.${shared.ID}__mobile-bar__plus`);
          if (icon.innerText === '+') {
            icon.innerText = '-';
            mobileWrap.style.display="block";
          } else {
            icon.innerText = '+';
            mobileWrap.style.display="none";
          }
        })
        
      }
    }
  }
}

export default () => {
  setup();

  fireEvent('Conditions Met');

  /** Make all changes - can be re-run on page re-render / App_LayoutChanged */
  const init = () => {

      runChanges();
  };

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...
  const container = document.querySelector('#shopify-section-cart');
  if(container) {
    document.body.addEventListener('click', e => {
      if(e.target.closest('.btn-checkout') || e.target.closest('.mbcOverlayOnCheckout')) {
        fireEvent('Click Checkout - Value: ' + (document.querySelector('[data-total-value]')?.getAttribute?.('data-total-value')));
      }

      if(e.target.closest('[class*="product__img"]') || e.target.closest('[class*="__title"]')) {
        fireEvent('Click Through To Product');
      }
      if(e.target.closest(`.${shared.ID}__mobile-bar`)) {
        fireEvent('Click Accordion Bar')
      }
    });
  }

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(shared.VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  init();
};
