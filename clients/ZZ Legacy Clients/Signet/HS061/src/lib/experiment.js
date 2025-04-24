/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import { events } from '../../../../../lib/utils';

export default () => {
  setup();

  let banner;

  if(window.innerWidth > 767) {
    banner = 'https://service.maxymiser.net/cm/images-us/1/1/2/BD3F438B1CFEE5823C4C30C67DF87003D2C0846AD973FAE273940BAAF2B7A129/hsamuel-co-uk/HS061---Homepage-Banner/HS20W12_ValentinesPressAd_HeroBanner_3840x14481.jpg';
  } else {
    banner = 'https://service.maxymiser.net/cm/images-us/1/1/2/0BC544D039E40F9A4957344B6D583F554E8FC2F0D92219C2F71F69BB4E1E0965/hsamuel-co-uk/HS061---Homepage-Banner/HS20W12_ValentinesPressAd_HeroBanner_1440x1260.jpg';
  }

  const { ID, VARIATION } = shared;

  const newBanner = document.createElement('div');
  newBanner.classList.add(`${ID}-heroBanner`);

  if(window.innerWidth > 767) {
    newBanner.innerHTML = `<img src="${banner}"/>`;
  } else {
    newBanner.innerHTML = `<a class="${ID}-bannerLink" href="/webstore/l/jewellery/select%7Cdiamonds+offer/?Nf=P_Current_Price%7CBTWN+300+9999999&icid=hs-hp-valentines-free-pendant"><img src="${banner}"/></a>`;
  }
 
  document.querySelector('.hero-banner.hero-banner--full-width').insertAdjacentElement('afterbegin', newBanner);

  // events
  if(window.innerWidth < 767) {
    newBanner.querySelector('a').addEventListener('click', () => {
      events.send(`${ID} v${VARIATION}`, 'click', 'mobile banner');
    });
  }

  const bannerButtons = document.querySelector('.hero-banner__links');
  if(bannerButtons) {
    bannerButtons.querySelector('.button.hero-banner__button:first-of-type').addEventListener('click', () => {
      events.send(`${ID} v${VARIATION}`, 'click', 'shop diamonds banner button');
    });
  }

};
