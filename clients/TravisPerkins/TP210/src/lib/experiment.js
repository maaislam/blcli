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

import renderUsp from './components/usp';
import { uspData } from './data';
import { getCookie, setCookie } from './helpers/cookie';

const { ID, VARIATION } = shared;

const init = (mutation) => {
  const componentAlreadyExists = false;

  if (componentAlreadyExists) {
    return;
  }

  // Experiment Code...
  setup();

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  const { addedNodes, removedNodes } = mutation;
  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    addedNodes.forEach((node) => {
      // console.log(node);
      if (node.nodeType !== 3 && node.matches('[class^="DeliveryAddressSelector__Wrapper-sc-"]')) {
        fireEvent('user sees popup');
      }
    });
    return;
  }

  //console.log(mutation);
  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  const isMobile = window.matchMedia('(max-width: 640px)').matches;
  //console.log('QA', addedNodes);
  addedNodes?.length > 0 &&
    addedNodes.forEach((node) => {
      //console.log(node);
      if (node.nodeType === 1 && node.matches('[class^="DeliveryAddressSelector__Wrapper-sc-"]')) {
        if (isMobile) {
          node.closest('body').classList.add(`${ID}__deliveryAddressSelector__Wrapper`);
        } else {
          node.classList.add(`${ID}__deliveryAddressSelector__Wrapper`);
        }
        const parentContainer = node.querySelector('[class^="DeliveryAddressSelector__PopupHeader-"]');

        renderUsp(ID, uspData, parentContainer);
        fireEvent('Test Code Fired');
        fireEvent('user sees popup');
        // console.log('1 in ', node);
      } else if (node.nodeType === 1 && node.matches('[class^="SearchBlock__DropdownWrap"]')) {
        // console.log('2nd', node);
      } else if (node.nodeType === 1 && node.matches('[class^="DeliveryAddressSelector__StyledButtonWr-sc-"]')) {
        const parentNode = node.closest(`.${ID}__deliveryAddressSelector__Wrapper`);

        !document.querySelector('.searchDpActive') && parentNode?.classList.add('searchDpActive');
        if (document.querySelectorAll(`.${ID}__stageTwoBtn`).length == 0) {
          const stageTwoBtn = document.createElement('div');
          node.insertAdjacentElement('afterbegin', stageTwoBtn);
          stageTwoBtn.innerHTML = 'Apply';
          stageTwoBtn.classList.add(`${ID}__stageTwoBtn`);
        }

        //console.log('3', node);
      } else if (node.nodeType === 1 && node.matches('[class^="AddressItem__AddressCard-sc-"]')) {
        // console.log('4', node);
        const parentNode = node.closest(`.${ID}__deliveryAddressSelector__Wrapper`);
        const foundLocations = parentNode.querySelectorAll('[class^="AddressItem__AddressCard-sc-"]');

        foundLocations.length > 0 && parentNode?.classList.add('full-searchDpActive');
      } else if (node.nodeType === 1 && node.matches('.TP204_popup')) {
        node.querySelector('.TP204_cta')?.click();
      }
    });
  removedNodes?.length > 0 &&
    removedNodes.forEach((node) => {
      //console.log('removed', node);
      if (node.nodeType === 1 && node.matches('[class^="DeliveryAddressSelector__StyledButtonWr-sc-"]')) {
        const parentNode = document.querySelector(`.${ID}__deliveryAddressSelector__Wrapper`);
        parentNode.classList.remove('searchDpActive');
      } else if (node.nodeType !== 3 && node.matches('[class^="Popup__OverlayWrapper-"]')) {
        document
          .querySelector(`.${ID}__deliveryAddressSelector__Wrapper`)
          ?.classList.remove(`searchDpActive`, 'TP210__stageTwo', `${ID}__mobile-input--focused`);
      }
    });
  const adjustForInput = () => {
    const parentNode = document.querySelector(`.${ID}__deliveryAddressSelector__Wrapper`);
    if (!isMobile) {
      return;
    }
    parentNode.classList.add(`${ID}__mobile-input--focused`);
    document.querySelector(
      `.${ID}__usp--title`
    ).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="21" height="27" viewBox="0 0 21 27" fill="red">\n    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.7704 25.9112L10.5 26.5664L11.2404 25.9221C11.2629 25.8982 11.3201 25.843 11.4075 25.7587C12.6757 24.5349 20.3 17.1785 20.3 10.2618C20.3 7.65505 19.2675 5.15509 17.4296 3.31186C15.5917 1.46862 13.0991 0.433105 10.5 0.433105C7.90083 0.433105 5.40816 1.46862 3.5703 3.31186C1.73245 5.15509 0.699951 7.65505 0.699951 10.2618C0.699951 17.2891 8.59323 24.7914 9.66248 25.8077C9.71651 25.8591 9.75311 25.8939 9.7704 25.9112ZM13.7666 10.2618C13.7666 12.0712 12.3041 13.538 10.5 13.538C8.69582 13.538 7.23328 12.0712 7.23328 10.2618C7.23328 8.45236 8.69582 6.98555 10.5 6.98555C12.3041 6.98555 13.7666 8.45236 13.7666 10.2618Z" fill="#0f7258"/>\n    </svg><span>Please enter delivery postcode</span>`;
  };
  const postcodeInput = document.querySelector(`input#branchSelectorAddressInput-search-postal-code`);
  //console.log(postcodeInput);

  postcodeInput?.addEventListener('focus', (e) => {
    // console.log(e);
    if (!document.querySelector(`.${ID}__mobile-input--focused`)) {
      adjustForInput();
    }
    // adjustForInput();
  });
  postcodeInput?.addEventListener('input', (e) => {
    //console.log(e);
    // adjustForInput();
    if (!document.querySelector(`.${ID}__mobile-input--focused`)) {
      adjustForInput();
    }
  });
};

export default () => {
  //init();
  const isPDP = () => {
    return !!document.querySelector('[data-test-id="pdp-wrapper"]');
  };
  const isPLP = () => {
    return (
      (window.location.pathname.indexOf('/search/') !== -1 || window.location.pathname.indexOf('/c/') !== -1) &&
      !!document.querySelector('[data-test-id="plp-list"]')
    );
  };
  // Poll and re-run init
  pollerLite(['body'], () => {
    //console.log('in', ID);
    setup();
    const appContainer = document.querySelector('body');

    // ------------------------------------
    // Added Poller:
    // Checks for page changes and checks to see if the URL has changed
    // ------------------------------------
    //let oldHref = document.location.href;
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        // console.log(mutation);
        setTimeout(() => {
          init(mutation);
        }, 2000);
        // if (oldHref != document.location.href) {
        //   oldHref = document.location.href;

        //   document.body.classList.remove(`${shared.ID}`);
        // }
      });
    });

    const config = {
      childList: true,
      subtree: true,
      // attributes: true,
    };

    const setLocalPopup = document.querySelector('[class^="Popup__OverlayWrapper-sc-"]');

    //console.log('overlay', setLocalPopup);
    if (setLocalPopup && !setLocalPopup.querySelector('[class^="TP210__"]') && !getCookie('dontShowDeliveryAddressPopup')) {
      const fakeMutation = {
        addedNodes: [setLocalPopup.querySelector('[class^="DeliveryAddressSelector__Wrapper-sc"]')],
      };
      init(fakeMutation);
    }
    observer.observe(appContainer, config);
    document.body.addEventListener('click', (e) => {
      // console.log('jlahflafhla', e);
      const target = e.target;
      const parentContainer = document.querySelector(`.${ID}__deliveryAddressSelector__Wrapper`);

      if (target.matches(`.${ID}__stageTwoBtn`) && parentContainer) {
        e.stopPropagation();
        fireEvent('user applies a postcode');
        const poscodeTyped = document.querySelector(
          `.${ID}__deliveryAddressSelector__Wrapper input#branchSelectorAddressInput-search-postal-code`
        ).value;
        const anchorElm = parentContainer?.querySelector('[class^="DeliveryAddressSelector__PopupHeader-"]');
        parentContainer.classList.add(`${ID}__stageTwo`);
        renderUsp(ID, uspData, anchorElm, poscodeTyped, true);

        localStorage.setItem('TP210-delivery-postcode', poscodeTyped);
      } else if (target.matches(`.${ID}__stageCompleteBtn`)) {
        const realApplyBtn = document
          .querySelector(`.${ID}__deliveryAddressSelector__Wrapper`)
          .querySelector('[class^="DeliveryAddressSelector__ApplyButton-sc"] button');
        realApplyBtn.click();
        parentContainer.classList.remove(`searchDpActive`, 'TP210__stageTwo', `${ID}__mobile-input--focused`);

        if (isPLP()) {
          fireEvent('clicks pop-up CTA in PLP');
        } else if (isPDP()) {
          fireEvent('clicks pop-up CTA in PDP');
        } else {
          fireEvent('clicks pop-up CTA');
        }
      } else if (
        target.matches('[class^="DeliveryAddressSelector__ApplyButton"]') ||
        target.closest('[class^="DeliveryAddressSelector__ApplyButton"]')
      ) {
        VARIATION == 'control' && fireEvent(`clicks pop-up CTA ${isPDP() ? 'in PDP' : isPLP() ? 'in PLP' : ''}`);
      }
    });
  });
};
