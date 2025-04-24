/**
 * HSS002 - Account Registration Promotion (Trade) | Desktop & Tablet
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import { events, getCookie } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

export default () => {
  if (shared.VARIATION == 'control') {
    events.send(`${shared.ID}-control`, 'activated');
  } else {
    // rest of experiment code
    events.send(`${shared.ID}-v1`, 'activated');
    setup();
    if (window.location.pathname.indexOf('/c/') > -1) {
      pollerLite(['.desc_right .item_spec'], () => {
        if (!document.querySelector(`.${shared.ID}-promotion__wrapper`)) {
          let descriptionContainer = document.querySelector('.desc_right');
          let pos = 'afterend';
          if (VARIATION == 2 && getCookie('homepagePreference') == 'TRADE') {
            pos = 'beforebegin';
          }

          console.log({pos});
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

          descriptionContainer.insertAdjacentHTML(pos, promotionContainer);
        }
      });
    }
  }

  // Write experiment code here
};
