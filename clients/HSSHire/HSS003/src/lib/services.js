import { fullStory } from '../../../../../lib/utils';
import shared from './shared';

/**
 * Pass data to shared object
 * @param {Object} data
 */
export const share = (data) => {
  Object.keys(data).forEach((key) => {
    shared[key] = data[key];
  });
};

/**
 * Standard experiment setup
 */
export const setup = () => {
  const { ID, VARIATION } = shared;

  /** Use fullStory API to tag screen recording with experiment info */
  fullStory(ID, `Variation ${VARIATION}`);

  /** Namespace with body classes for easier CSS specificity */
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
};

export const generateContainer = (secondItem) => {
  const promotionContainer = `<div class="${shared.ID}-promotion__wrapper desc_right">
      <div class="${shared.ID}-promotion__container">
        <div class="${shared.ID}-promotion__title">
          <p>Got an HSS Trade Account?</p>
        </div>
        <div class="${shared.ID}-promotion__subTitle">
          <p>You'll benefit from HSS Hire's digital trade tools</p>
        </div>
        <div class="${shared.ID}-promotion__list">
          <ul>
            <li class="${shared.ID}-promotion__item">View your personalised account prices on HSS.com</li>
            <li class="${shared.ID}-promotion__item">Order tracking with the new HSS Hire App</li>
            <li class="${shared.ID}-promotion__item">Online Account Management tools</li>
          </ul>
          <ul class="${shared.ID}-sublist">
            <li class="${shared.ID}-sublist__item">Stock on hire</li>
            <li class="${shared.ID}-sublist__item">Upcoming deliveries and collections</li>
            <li class="${shared.ID}-sublist__item">Proof of Deliveries/Collections</li>
            <li class="${shared.ID}-sublist__item">Invoice and spend reports</li>
          </ul>
        </div>
        <div class="${shared.ID}-promotion__cta">
          <div class="${shared.ID}-btn__wrapper">
            <a class="${shared.ID}-btn-info btn" id="${shared.ID}-login" href="/hire/login">Login</a>
            <a class="${shared.ID}-btn-info btn" id="${shared.ID}-register" href="/hire/activate-your-trade-account">Activate</a>
          </div>
        </div>
      </div>
    </div>`;

    secondItem.insertAdjacentHTML('afterend', promotionContainer);
};
