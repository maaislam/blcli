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
import { postcodes } from './data';
import { postcodeMatch } from './helpers/checkpostcode';

const { ID, VARIATION } = shared;

const init = () => {
  // Experiment Code...
  setup();

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    return;
  }
  const deviceType = () => (window.innerWidth > 768 ? 'desktop' : 'mobile');
  const isMobile = deviceType() !== 'desktop';
  const workCategoryDropdown = document.querySelectorAll('[data-test-id="dropdown"]')[1];

  const dropdownParent = workCategoryDropdown?.closest('[data-test-id="trade-category-field"]');
  const serialNums = document.querySelectorAll('[class^="TradeProfessionalstyled__FormControlTitleIcon-sc-"]');

  const reOrderSerial = (serialNums, operation) => {
    serialNums.forEach((item, i) => {
      if (i <= 2) {
        return;
      }

      item.innerText = operation === 'minus' ? parseInt(item.innerText) - 1 : parseInt(item.innerText) + 1;
    });
    const appContainer = document.querySelector('#app-container');
    if (operation === 'minus') {
      appContainer.classList.add(`${ID}__reserialized`);
      appContainer.classList.remove(`${ID}__resetSerial`);
    } else if (operation !== 'minus') {
      appContainer.classList.add(`${ID}__resetSerial`);
      appContainer.classList.remove(`${ID}__reserialized`);
    }

    //operation !== 'minus' && document.querySelector('#app-container').classList.add(`${ID}__resetSerial`);
  };
  //console.log(dropdownParent.innerText.indexOf('Roofer') !== -1);

  if (postcodeMatch(postcodes) || !localStorage.getItem('preselectedDeliveryAddress')) {
    if (document.querySelector(`.${ID}__q3-removed`)) {
      return;
    }

    dropdownParent?.classList.add(`${ID}__q3-removed`);

    workCategoryDropdown.click();
    setTimeout(() => {
      const roofer = [...document.querySelectorAll('li')].filter((item) => {
        return item.innerText.indexOf('Roofer') !== -1;
      })[0];
      roofer?.click();
    }, 500);
    dropdownParent.style.display = 'none';
    if (serialNums.length === 9 && !document.querySelector(`.${ID}__reserialized`)) {
      reOrderSerial(serialNums, 'minus');
    }
  } else if (localStorage.getItem('preselectedDeliveryAddress') && !postcodeMatch(postcodes)) {
    dropdownParent.classList.remove(`${ID}__q3-removed`);
    dropdownParent.style.display = 'block';
    setTimeout(() => {
      const roofer = [...document.querySelectorAll('li')].filter((item) => {
        return item.innerText.indexOf('Roofer') !== -1;
      })[0];

      if (roofer) {
        roofer.style.display = 'none';
      }
      workCategoryDropdown.innerText === 'Roofer' ? (workCategoryDropdown.innerText = 'Please Select') : null;
    }, 500);

    if (dropdownParent.innerText.indexOf('Roofer') !== -1 && !document.querySelector(`.${ID}__resetSerial`)) {
      reOrderSerial(serialNums, '');
    }
  }
};

export default () => {
  // Poll and re-run init
  setTimeout(() => {
    if (location.pathname === '/create-account/cash') {
      init();
    }
  }, 2000);
  pollerLite(['#app-container'], () => {
    const appContainer = document.querySelector('#app-container');
    let oldHref = document.location.href;
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        setTimeout(() => {
          if (location.pathname === '/create-account/cash') {
            init();
          }
        }, 2000);
        if (oldHref != document.location.href) {
          oldHref = document.location.href;
          appContainer.removeAttribute('class');
        }
      });
    });

    const config = {
      childList: true,
      subtree: true,
      CharacterData: true,
    };

    observer.observe(appContainer, config);
  });
};
