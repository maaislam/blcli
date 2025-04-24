/**
 * SD017 -  Checkout Trust Logos
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion JT
 */
import { setup } from './services';
import settings from './shared';
import { pollerLite } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';

events.analyticsReference = '_gaUAT';

export default () => {

  const { ID, VARIATION } = settings;

  if (VARIATION == 2) {
    events.send(ID, 'SD017 Control');
    return false;
  } else {
    events.send(ID, 'SD017 Active');
  }

  setup();

  const isMobile = () => {
    if (window.innerWidth < 479) {
      return true;
    } else {
      return false;
    }
  }

  // All devices
  const wrap = document.querySelector('.ContentWrap .CheckWrap');
  wrap.insertAdjacentHTML('afterbegin', `
    <div class="SD017-secure">
      <p>Secure Checkout</p>
    </div> 
  `);


  pollerLite(['.CardPayments .CheckFootImg'], () => {
    if (!isMobile()) return;
    const ref = document.querySelector('.FooterCheck');
    const cardImages = document.querySelector('.CardPayments .CheckFootImg');
    cardImages.classList.add('SD017-cards');
    if (ref) {
      ref.insertAdjacentElement('beforebegin', cardImages);
    }
  });

};
