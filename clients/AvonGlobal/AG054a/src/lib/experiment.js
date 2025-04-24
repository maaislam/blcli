/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import RepCheckout from './components/RepCheckout';
import { pollerLite } from '../../../../../lib/utils';
import { h, render, Component } from "preact";
import { observePageChange } from '../../../../../lib/utils';
import { events } from '../../../../../lib/utils';

const mobileChanges = () => {
  
  pollerLite([
    '.checkout_shopping_with_section'
  ], () => {

    if (!document.querySelector(`.${shared.ID}__container`)) {
      const mobileCheckout = document.querySelector('#vue_basket_checkout_mobile');
      const experimentContainer = `
        <div class="${shared.ID}__container"></div>
      `;
      mobileCheckout.insertAdjacentHTML('beforebegin', experimentContainer);
    
      const expContainer = document.querySelector(`.${shared.ID}__container`);
      if(expContainer) {
        render(<RepCheckout/>, expContainer);
      };

        const button = document.querySelector('.header_container');
        const newButton = document.querySelector(`.${shared.ID}__courier__cta`);
        const mobileScrollingWrapper = document.querySelector('.mobile_scrolling_wrapper');
        if (button) {
           button.addEventListener('click', () => {
                mobileScrollingWrapper.scrollTo(0, 1000000);
                // window.scrollTo(0,document.body.scrollHeight);
           })
        }

      // Add test tracking
      // pollerLite([
      //   `.${shared.ID}__rep__btn-wrap__btn`
      // ], () => {        
      //   const testButtons = document.querySelectorAll(`.${shared.ID}__rep__btn-wrap__btn`);
      //   if (testButtons) {
      //     console.log(testButtons);
      //     testButtons[0].addEventListener('click', () => {
      //       console.log('hearing click')
      //       events.send(`AG054a`, 'courier click');
      //     })
      //   }
      // })

    };
  });

}

export default () => {
  setup();
  // const { rootScope, ID } = shared;

  /** Make all changes - can be re-run on page re-render / App_LayoutChanged */
  const init = () => {
    
    mobileChanges();
  };

  // Make device specific changes when layout changes
  // rootScope.$on('App_LayoutChanged', () => {
  //   setTimeout(init, 500);
  // });

  observePageChange(document.body, (p) => {
    init();
  });

  init();
};
