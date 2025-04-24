import { fullStory } from '../../../../../lib/utils';
import settings from './settings';

const { ID, VARIATION } = settings;

/** Standard experiment setup */
function setup() {
  fullStory(ID, `Variation ${VARIATION}`);
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
}

/**
 * @param {string} target Contains the target ID of the event
 */
function initPostback(target) {
  // UniqueID values or ClientID values for panels that must be re-rendered
  const panelsToUpdate = ['ctl00$_objHeader$upOmnibar', 'ctl00$_objHeader$upStoreSectionMobile', 'ctl00$_objHeader$upProfileMobile', 'ctl00$_objHeader$upSignInMobile', 'ctl00$_objHeader$upHeaderBasketMobile', 'ctl00$_objHeader$upBasketNotification', 'ctl00$_objHeader$upHeaderSummary', 'ctl00$_objHeader$upHeaderHamburger', 'ctl00$_objHeader$upPapaRewardsHeader', 'ctl00$_objHeader$upOneClickPopup', 'ctl00$_objHeader$_objOneClickPopup$updConfirmPay', 'ctl00$cphBody$upBasket', 'ctl00$cphBody$upUpsell', 'ctl00$cphBody$upLoginPopup'];

  // Run postback
  window.prm.beginAsyncPostBack(panelsToUpdate, target);
}

/**
 * Define postback types based on target names
 * @param {string} target Name of the postback target
 * @returns {string} normalised name of postback type
 */
function getPostbackType(target) {
  let type;
  switch (true) {
    case /ctl[\d]+\$cphBody\$_rptProducts\$ctl[\d]+\$lbAdd/.test(target):
      type = 'Add To Bag';
      break;

    case /ctl[\d]+\$_objHeader\$rptBasket(Mobile)?\$ctl[\d]+\$lbRemove/.test(target):
      type = 'Remove From Bag';
      break;

    case /ctl[\d]+\$_objHeader\$lbBasketItem/.test(target):
      type = 'Open Basket';
      break;

    default:
      break;
  }

  return type;
}

export { setup, initPostback, getPostbackType }; // eslint-disable-line
