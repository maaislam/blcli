/**
 * PJ075 - Offer wizard - Food  - (Desktop & Tablet)
 * @author User Conversion
 */
import { setup, createOffersContainer, showHideContainers, bindEventOnCheckboxes, bindEventOnCtaButtons } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import settings from './settings';

const { ID, VARIATION } = settings;

const activate = () => {
  setup();

  // Experiment code
  const menuItemsContainer = document.querySelector('.menuItems');
  if (!document.querySelector(`.${settings.ID}-header__wrapper`)) {
    createOffersContainer();
  }
  showHideContainers();

  bindEventOnCheckboxes(menuItemsContainer);

  bindEventOnCtaButtons();

  // -------------------------------------------
  // PRM Manager Listen for State Changes
  // -------------------------------------------
  window.prm.add_endRequest(function (sender, error) {
    try {
      console.log(sender);
      if (sender['_postBackSettings'].asyncTarget.indexOf("ctl00$_objHeader$lbBasketItem") > -1
      || sender['_postBackSettings'].asyncTarget.indexOf("ctl00$_objHeader$lbCloseOnmibar") > -1
      || sender['_postBackSettings'].asyncTarget.indexOf("ctl00$_objHeader$lbSelectStoreMenuItem") > -1
      || sender['_postBackSettings'].asyncTarget.indexOf("ctl00$_objHeader$lbLoginRegisterItem") > -1
      || sender['_postBackSettings'].asyncTarget.indexOf("ctl00$_objHeader$lbFavoritesItem") > -1
      || sender['_postBackSettings'].asyncTarget.indexOf("ctl00$cphBody$_objOffers$lbApplyCode") > -1) {
        activate();

        // --- Hide the offers that were previously hidden
        const offersData = JSON.parse(sessionStorage.getItem(`${settings.ID}-data`));
        let offersToHide = [];
        for (const key in offersData) {
          if (offersData.hasOwnProperty(key)) {
            const element = offersData[key];
            if (element !== "") {
              const checkbox = document.querySelector(`input.${settings.ID}-option__${element}`);
              if (checkbox && checkbox.checked) {
                document.querySelector(`input.${settings.ID}-option__${element}`).click();
              }
            }
          }
        }
      }
    } catch (e) {} 
  });
};

export default activate;
