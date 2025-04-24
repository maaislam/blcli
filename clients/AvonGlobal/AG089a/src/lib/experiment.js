/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { insertBeforeElement } from '../../../../../lib/utils';

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
    if (VARIATION === 'control') {
      /* TRACKING START */
      const aboveFoldElement = document.querySelectorAll('.DeviceDisplay')[0];

      fireEvent('User viewed the homepage');

      window.addEventListener('scroll', () => {
        fireEvent('User has scrolled on the page');
      });

      aboveFoldElement.addEventListener('click', () =>
        fireEvent('User has interacted with the image above fold')
      );
      /* TRACKING END */
    } else {
      const entryElement = document.querySelectorAll('.DeviceDisplay')[0];

      const root = document.querySelector(`.${ID}-root`);

      if (!root) {
        const rootElement = document.createElement('div');

        rootElement.classList.add(`${ID}-root`);
        rootElement.classList.add('.DeviceDisplay');

        rootElement.style.backgroundImage =
          'url("https://blcro.fra1.digitaloceanspaces.com/AG089/image%2019.png")';

        rootElement.innerHTML = /* HTML */ `
          <div class="${ID}-container">
            <div class="${ID}-content">
              <div class="${ID}-title">
                <h2>
                  Innovation is<br />
                  everything
                </h2>
              </div>
              <a href="https://www.shopwithmyrep.co.uk/301/make-up" class="${ID}-cta">Shop now</a>
            </div>
          </div>
        `;

        insertBeforeElement(entryElement, rootElement);

        /* TRACKING START */
        fireEvent('User viewed the homepage');

        window.addEventListener('scroll', () => {
          fireEvent('User has scrolled on the page');
        });

        rootElement.addEventListener('click', () =>
          fireEvent('User has interacted with the new banner')
        );
        /* TRACKING END */
      }
    }
  };

  // Make device specific changes when layout changes
  rootScope.$on('App_LayoutChanged', () => {
    setTimeout(init, 500);
  });

  init();
};
