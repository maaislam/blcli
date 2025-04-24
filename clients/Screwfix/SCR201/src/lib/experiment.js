/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import modal from './components/modal';
import { modalContent } from './components/modalContent';
import { quickActionWrapper } from './components/quickActionWrapper';
import { quickActionData } from './data/data';
import openModal from './helpers/openModal';
import closeModal from './helpers/closeModal';
import { getCart, isLoggedIn, onUrlChange, removeAllItemsFromCart } from './helpers/utils';
import { loader } from './components/loader';

const { ID, VARIATION } = shared;
const DOM_RENDER_DELAY = 2000;

const closeModalGoalTrigger = (target) => {
  const clickedItem = target.closest(`.${ID}__closeWrapper`) || target.closest(`.${ID}__modal-overlay`);
  const modalElement = clickedItem.closest(`.${ID}__modal`);
  const modalContent = modalElement.querySelector(`.${ID}__modal-content`);
  const { quickaction } = modalContent.dataset;
  fireEvent(`User closes log in prompt (${quickaction})`);
};

const loginPromtGoalTrigger = (target) => {
  const clickedItem = target.closest(`.${ID}__btn`);
  const modalContent = clickedItem.closest(`.${ID}__modal-content`);
  const { quickaction } = modalContent.dataset;
  fireEvent(`User interact with log in prompt (${quickaction})`);
};

const init = () => {
  //check if page is correct
  const pageCondition = window.utag.data.basicPageId === 'basket' || window.location.pathname === '/basket'; //add page check conditions here based on experiment requirement

  if (!pageCondition) {
    //remove DOM element added by the experiment
    const element = document.querySelector('.element');
    if (element) element.remove();

    //remove setup
    document.documentElement.classList.remove(ID);
    document.documentElement.classList.remove(`${ID}-${VARIATION}`);

    return;
  }

  /*****this enabled GA4****/
  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  newEvents.property = 'G-74MS9KFBCG';
  /*****this enabled GA4****/

  /*****add experiment specific code here*****/
  const allLineItems = document.querySelectorAll('[data-qaid^="basket-line-item-"]');
  if (allLineItems.length >= 2) {
    setup();
    fireEvent('Conditions Met');

    if (VARIATION === 'control') return;

    // Add your variation-specific code here

    const targetPoint = document.querySelector('[data-qaid="basket-header"]');
    pollerLite([() => window.utag?.data?.basicLoggedIn], () => {
      window[`${ID}__isLoggedIn`] = isLoggedIn();
    });
    if (!document.querySelector(`.${ID}__quickActionWrapper`)) {
      targetPoint.insertAdjacentHTML('beforeend', quickActionWrapper(ID, quickActionData));
    }

    if (!document.querySelector(`.${ID}__modal`)) {
      document.body.insertAdjacentHTML('beforeend', modal(ID));
    }

    if (window.sessionStorage.getItem(`${ID}__autoSave`)) {
      pollerLite([() => window.utag?.data?.basicLoggedIn && window.utag?.data?.basicLoggedIn.toLowerCase() !== 'no'], () => {
        window.sessionStorage.removeItem(`${ID}__autoSave`);
        window.location.reload();
      });
    }

    const keyDownHandler = (e) => {
      //accesibility function add
      const modalElement = document.querySelector(`.${ID}__modal`);
      if (e.key === 'Escape' && modalElement.classList.contains(`${ID}__open`)) {
        closeModal(ID);
      }

      if (e.key === 'Enter' && e.target.closest(`.${ID}__closeWrapper`)) {
        closeModal(ID);
      }
    };

    // Close on Esc key
    document.removeEventListener('keydown', keyDownHandler);
    document.addEventListener('keydown', keyDownHandler);
  }
};

export default () => {
  /*****Request from Screwfix*****/
  const blExpID = VARIATION === 'control' ? `${ID} control` : ID;
  window.brainLabsExperimentID = window.brainLabsExperimentID || '';
  if (window.brainLabsExperimentID) {
    window.brainLabsExperimentID += `,${blExpID}`;
  } else {
    window.brainLabsExperimentID = blExpID;
  }
  /*****Request from Screwfix*****/

  const clickHandler = (e) => {
    //check if page is correct
    //if (window.utag.data.basicPageId !== 'lister Page') return;

    const { target } = e;

    if (target.closest(`.${ID}__change-store`)) {
      fireEvent('User interacts with change store');
      const controlChangeStore = document.querySelector('[data-qaid="changeStoreLink"]');
      if (controlChangeStore) controlChangeStore.click();
    } else if (target.closest(`.${ID}__modal-overlay`)) {
      closeModalGoalTrigger(target);
      closeModal(ID);
    } else if (target.closest(`.${ID}__save-for-later`)) {
      fireEvent('User interacts with Save all for later');
      window.lastActiveElement = target.closest(`.${ID}__save-for-later`);
      if (window[`${ID}__isLoggedIn`]) {
        //modal loader added here
        document.body.insertAdjacentHTML('beforeend', loader());
        const saveProduct = async (item, basketId) => {
          const payload = {
            basketId,
            productSku: item.product.sku,
            fulfilmentTargetIds: item.fulfilmentTargets.map((f) => f.id),
            quantity: item.quantity.toString(),
          };

          const res = await fetch('/ffx-api/account/v1/SFXUK/saved-lists', {
            method: 'POST',
            headers: {
              accept: '*/*',
              'content-type': 'application/json',
            },
            body: JSON.stringify(payload),
          });

          const data = await res.json();
          console.log(`✅ Saved ${payload.productSku}:`, data);
        };

        getCart().then(async (apiResponse) => {
          const basketId = apiResponse.id;

          for (const item of apiResponse.lineItems) {
            try {
              await saveProduct(item, basketId);
            } catch (err) {
              console.log(`❌ Failed to save ${item.product.sku}:`, err);
            }
          }

          window.location.reload();
        });
      } else {
        openModal(ID);
        const modalContainer = document.querySelector(`.${ID}__modal-content`);
        modalContainer.innerHTML = '';
        modalContainer.innerHTML = modalContent(
          ID,
          'You need to be logged in to save for later',
          'Take me to log in',
          'https://my.screwfix.com/login?goto=https%3A%2F%2Fwww.screwfix.com%2Fbasket'
        );

        modalContainer.setAttribute('data-quickAction', 'Save for later');

        window.sessionStorage.setItem(`${ID}__autoSave`, 'true');
      }
    } else if (target.closest(`.${ID}__remove-all-items`)) {
      console.log('22');
      fireEvent('User interacts with remove all items');
      window.lastActiveElement = target.closest(`.${ID}__remove-all-items`);
      openModal(ID);
      const modalContainer = document.querySelector(`.${ID}__modal-content`);
      modalContainer.innerHTML = '';
      modalContainer.innerHTML = modalContent(ID, 'Are you sure you want to remove all items?', 'REMOVE ALL');
      modalContainer.setAttribute('data-quickAction', 'Remove all items');
    } else if (target.closest(`.${ID}__yesBtn`)) {
      closeModal(ID);
      //modal loader added here
      document.body.insertAdjacentHTML('beforeend', loader());
      fireEvent('User confirms remove items');
      removeAllItemsFromCart();
    } else if (target.closest(`.${ID}__view-saved-lists`)) {
      window.lastActiveElement = target.closest(`.${ID}__view-saved-lists`);
      if (window[`${ID}__isLoggedIn`]) {
        const controlSaveList = document.querySelector('[data-qaid="viewSavedListsLink"]');
        if (controlSaveList) controlSaveList.click();
      } else {
        openModal(ID);
        const modalContainer = document.querySelector(`.${ID}__modal-content`);
        modalContainer.innerHTML = '';
        modalContainer.innerHTML = modalContent(
          ID,
          'You need to be logged in to view your saved list',
          'Take me to log in',
          '',
          'save-list'
        );
        modalContainer.setAttribute('data-quickAction', 'View saved list');
      }
    } else if (target.closest(`.${ID}__save-list`)) {
      e.preventDefault();
      loginPromtGoalTrigger(target);
      const controlSaveList = document.querySelector('[data-qaid="viewSavedListsLink"]');
      if (controlSaveList) controlSaveList.click();
    } else if (target.closest('[data-qaid="viewSavedListsLink"]') && VARIATION === 'control') {
      fireEvent('User interacts with view saved list');
    } else if (target.closest('[data-qaid="changeStoreLink"]') && VARIATION === 'control') {
      fireEvent('User interacts with change stores');
    } else if (target.closest('[data-qaid="productTileMoveToSavedListLink"]')) {
      fireEvent('User interacts with individual move to saved list');
    } else if (target.closest('[data-qaid="removeItemLink"]')) {
      fireEvent('User interacts with individual remove');
    } else if (target.closest(`.${ID}__btn`) && !target.closest(`.${ID}__save-list`)) {
      loginPromtGoalTrigger(target);
    } else if (target.closest(`.${ID}__closeWrapper`)) {
      closeModalGoalTrigger(target);
      closeModal(ID);
    } else if (target.closest(`.${ID}__noBtn`)) {
      fireEvent('User closes removal confirmation');
      closeModal(ID);
    }
  };

  document.body.removeEventListener('click', clickHandler);
  document.body.addEventListener('click', clickHandler);

  setTimeout(init, DOM_RENDER_DELAY);

  // Poll and re-run init
  onUrlChange(() => {
    pollerLite(
      [
        () => typeof window.tealiumDataLayer === 'object',
        () => window.utag !== undefined,
        () => window.__NEXT_DATA__ !== undefined,
      ],
      () => {
        setTimeout(init, DOM_RENDER_DELAY);
      }
    );
  });
};
