/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

const runChanges = () => {
  var ScopeRepId = window.AppModule.RootScope.Session.ShopperRepId;
  if (document.referrer === 'https://online.shopwithmyrep.co.uk/' && ScopeRepId) {
    const navbarHeader = document.querySelector('.navbar-header');
    if (navbarHeader) {
      const backToBrochure = `
        <div class="${shared.ID}__back">
          Back to brochure
        </div>
      `;
      navbarHeader.insertAdjacentHTML('beforeend', backToBrochure);

      const backButton = navbarHeader.querySelector(`.${shared.ID}__back`);
      if (backButton) {
        backButton.addEventListener('click', () => {
          fireEvent('Clicked back to brochure');
          window.history.back();
        })
      }

      // Add shopping with confirmation
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        const container = navbar.querySelector('.container-fluid');
        if (container) {

        }
        const shoppingWith = `
          <div class="${shared.ID}__shoppingWith">
            <img class="${shared.ID}__shoppingWith__img" src="https://service.maxymiser.net/cm/images-eu/avon-mas/242406BFD856C1C28EB5639FFD883C60C5B175A1B87E78AE3F1784027B74614A.png?meta=/AV074---Rep-attachment-clarification-from-digital-brochure/avon-tick.png" />
            <span class="${shared.ID}__shoppingWith__text">
              You are shopping with your rep today
            </span>
          </div>
        `;
        navbarHeader.insertAdjacentHTML('afterend', shoppingWith);
      }
    }
  }
}

export default () => {
  setup();
  const { rootScope, ID, VARIATION } = shared;

  /** Make all changes - can be re-run on page re-render / App_LayoutChanged */
  const init = () => {
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
    runChanges();
  };

  // Make device specific changes when layout changes
  rootScope.$on('App_LayoutChanged', () => {
    setTimeout(init, 500);
  });

  init();
};
