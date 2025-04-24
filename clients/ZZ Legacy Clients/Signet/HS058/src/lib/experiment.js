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
    banner = 'https://service.maxymiser.net/cm/images-us/1/1/2/EEABCCA55AC502BE2B0F302D033EF61EDED9544558DCA951D657229E75AC1F49/hsamuel-co-uk/HS058---Homepage-Banners/hsvdaydesktop.jpeg';
  } else {
    banner = 'https://service.maxymiser.net/cm/images-us/1/1/2/733FD12AE00712204696A15C2A44133265FFE68BE947F4BBB1C090353B51AB1B/hsamuel-co-uk/HS058---Homepage-Banners/HS20WC02_Valentiens_Day_Homepage_SAVE1_1440x1260_V2.jpg';
  }

  const { ID, VARIATION } = shared;

  const newBanner = document.createElement('div');
  newBanner.classList.add(`${ID}-heroBanner`);

  if(window.innerWidth > 767) {
    newBanner.innerHTML = `<img src="${banner}"/>`;
  } else {
    newBanner.innerHTML = `<a class="${ID}-bannerLink" href="/webstore/l/select%7csale/?icid=hs-hp-valentines-image"><img src="${banner}"/></a>`;
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
      events.send(`${ID} v${VARIATION}`, 'click', 'up to half price button');
    });
    bannerButtons.querySelector('.button.hero-banner__button:last-of-type').addEventListener('click', () => {
      events.send(`${ID} v${VARIATION}`, 'click', 'valentines day button');
    });
  }

};
