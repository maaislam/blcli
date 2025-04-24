/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/uc-lib';

const { ID, VARIATION } = shared;

const runChanges = () => {
  // Declare markup
  const markup = `
    <div class="${shared.ID}__main ${shared.ID}__main--closed">
      <div class="${shared.ID}__main__wrap">
        <img class="${shared.ID}__main__wrap__map" src="http://sb.monetate.net/img/1/581/3595052.png" />
        <span class="${shared.ID}__main__wrap__text">
          Delivery & Collection Information
        </span>
        <img class="${shared.ID}__main__wrap__down" src="http://sb.monetate.net/img/1/581/3595053.png" />
        <img class="${shared.ID}__main__wrap__up" src="http://sb.monetate.net/img/1/581/3595109.png" />
      </div>
    </div>
  `;

  const branchSelector = document.querySelector('[class^="DeliveryAndBranchSelectorsBlock"]');
  if (branchSelector) {
    branchSelector.insertAdjacentHTML('beforebegin', markup);
  }

  const firstBranchItem = branchSelector.querySelectorAll('[class^="DeliveryAndBranchSelectorsBlock__AddressSelectWrapper"]')[0];
  if (firstBranchItem) {
    const border = `
      <div class="${shared.ID}__border">
        
      </div>
    `;
    firstBranchItem.insertAdjacentHTML('afterend', border);
  }

  const experimentBar = document.querySelector(`.${shared.ID}__main`);
  if (experimentBar) {
    experimentBar.addEventListener('click', () => {
      const branchSelectWrapper = document.querySelector('[class^="DeliveryAndBranchSelectorsBlock__BranchSelectorWrapper"]');
      const downArrow = document.querySelector(`.${shared.ID}__main__wrap__down`);
      const upArrow = document.querySelector(`.${shared.ID}__main__wrap__up`);
      if (experimentBar.classList.contains(`${shared.ID}__main--closed`)) {
        branchSelectWrapper.style.display = `flex`;
        experimentBar.classList.remove(`${shared.ID}__main--closed`);
        experimentBar.classList.add(`${shared.ID}__main--open`);
        downArrow.style.display = 'none';
        upArrow.style.display = 'block';
        fireEvent('open details')
      } else {
        branchSelectWrapper.style.display = `none`;
        experimentBar.classList.remove(`${shared.ID}__main--open`);
        experimentBar.classList.add(`${shared.ID}__main--closed`);
        downArrow.style.display = 'block';
        upArrow.style.display = 'none';
        fireEvent('close details');
      }
    })
  }
  const searchFilters = document.querySelector(`[class^="FiltersList__Wrapper"]`);
  if (searchFilters) {
    const experimentBanner = document.querySelector(`.${shared.ID}__main`);
    const branchElements = document.querySelector('[class^="DeliveryAndBranchSelectorsBlock"]');

    if (experimentBanner && branchElements) {
      searchFilters.insertAdjacentElement('beforebegin', experimentBanner);
      searchFilters.insertAdjacentElement('beforebegin', branchElements);
    }
  }

  const imageCarousel = document.querySelector(`[class^="ImageCarousel__Container"]`);
  if (imageCarousel) {
    const experimentBanner = document.querySelector(`.${shared.ID}__main`);
    const branchElements = document.querySelector('[class^="DeliveryAndBranchSelectorsBlock"]');

    if (experimentBanner && branchElements) {
      imageCarousel.insertAdjacentElement('beforebegin', experimentBanner);
      imageCarousel.insertAdjacentElement('beforebegin', branchElements);
    }
  }

}

const init = () => {
  const componentAlreadyExists = false; 

  if (componentAlreadyExists) {
    return;
  }

  // Experiment Code...
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
  pollerLite([
    '[class^="DeliveryAndBranchSelectorsBlock"]'
  ], () => {
    runChanges();
  })
}

export default () => {
  init();

  // Poll and re-run init
  pollerLite([
    '#app-container',
  ], () => {
    const appContainer = document.querySelector('#app-container');

    // ------------------------------------
    // Added Poller:
    // Checks for page changes and checks to see if the URL has changed
    // ------------------------------------
    let oldHref = document.location.href;
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (oldHref != document.location.href) {
          oldHref = document.location.href;

          document.body.classList.remove(`${shared.ID}`);

          setTimeout(() => {
            // -----------------------------------
            // Timeout ensures router has started to rebuild DOM container
            // and we don't fire init() too early
            // -----------------------------------
            init();
          }, 2000);
        }
      });
    });

    const config = {
        childList: true,
        subtree: true
    };

    observer.observe(appContainer, config);
  });
};
