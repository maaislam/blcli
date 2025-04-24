/**
 * HSS006 - Account Registration Promotion (PDP) | Desktop
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
    if (window.location.pathname.indexOf('/p/') > -1) {
      pollerLite(['.item_row1 .row .col-md-4'], () => {
        let pos = 'afterbegin';

        if (VARIATION == 2 && getCookie('homepagePreference') == 'DIY') {
          pos = 'beforeend';
        }
        

        if (!document.querySelector(`.${shared.ID}-promotion__wrapper`)) {
          const rightColumnContainer = document.querySelector('.item_row1 .row .col-md-4');
          const promotionContainer = `<div class="${shared.ID}-promotion__wrapper">
            <div class="${shared.ID}-promotion__container">
              <div class="${shared.ID}-promotion__title">
                <p>Got an HSS Trade Account?</p>
              </div>
              <div class="${shared.ID}-promotion__subTitle">
                <p>You'll benefit from HSS Hire's digital trade tools</p>
              </div>
              <div class="${shared.ID}-promotion__cta">
                <div class="${shared.ID}-btn__wrapper">
                  <a class="${shared.ID}-btn-info btn" id="${shared.ID}-login" href="/hire/login">Login</a>
                  <a class="${shared.ID}-btn-info btn" id="${shared.ID}-register" href="/hire/activate-your-trade-account">Activate</a>
                </div>
              </div>
              <div class="${shared.ID}-showMore__wrapper">
                <div class="${shared.ID}-showMore">View the exclusive benefits</div>
              </div>
              <div class="${shared.ID}-promotion__list hidden">
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
            </div>
          </div>`;

          rightColumnContainer.insertAdjacentHTML(pos, promotionContainer);
        }

        const showMore = document.querySelector(`.${shared.ID}-showMore`);
        if (showMore) {
          showMore.addEventListener('click', () => {
            showMore.classList.toggle('open');

            if (showMore.classList.contains('open')) {
              document.querySelector(`.${shared.ID}-promotion__list`).classList.remove('hidden');
              showMore.innerText = 'Hide the benefits';
            } else {
              document.querySelector(`.${shared.ID}-promotion__list`).classList.add('hidden');
              showMore.innerText = 'View the exclusive benefits';
            }
          });
          
        }
      });
    }
  }
};

