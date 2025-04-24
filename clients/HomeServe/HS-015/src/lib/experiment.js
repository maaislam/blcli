import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage } from '../../../../../lib/utils';
import extraServices from './components/extraServices';
import offerBoxCards from './components/offerBoxCards';

const { ID, VARIATION } = shared;

const init = () => {
  const boxtCTA = document.querySelector('.offer-box a[href="/heating/"]');

  const plumbingCover50pImg = document.querySelector('.offer-image img.feature-left[alt*="engineer"]');
  plumbingCover50pImg.src = 'https://blcro.fra1.digitaloceanspaces.com/WTO-HS-015/plumbing-cover-50p.png';
  plumbingCover50pImg.setAttribute('style', "background: url('https://blcro.fra1.digitaloceanspaces.com/WTO-HS-015/plumbing-cover-50p.png');background-size: cover;background-position: center;height: 100%;width: 100%");

  plumbingCover50pImg.closest('.offer-container').classList.add(`${ID}__plumbingCard`);
  boxtCTA.classList.add(`${ID}__boxtCTA`);

  const anchorPoint = document.querySelector('.page--section.offer-items');

  anchorPoint.insertAdjacentHTML('beforeend', offerBoxCards(ID));
  anchorPoint.insertAdjacentHTML('afterend', extraServices(ID));
};

export default () => {

  setup();
  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  newEvents.property = 'G-970RHZRVZ4';

  logMessage(ID + " Variation: "+VARIATION);

  fireEvent('Conditions Met');

  document.body.addEventListener('pointerup', (e) => {
    const { target } = e;

    if (target.closest('.search-panel label') || target.closest('.search-panel input')) {
      fireEvent('User interacts with search');
    } 
  });

  document.body.addEventListener('click', (e) => {
    const { target } = e;

    if (target.closest('.search-panel label') || target.closest('.search-panel input')) {
      fireEvent('User interacts with search');
    } else if (target.closest('.offer-box a[href*="/insurance/plumbing"]')) {
      console.log('User interacts Plumbing cover CTA');
      fireEvent('User interacts with Plumbing cover CTA');
    } else if (target.closest(`.offer-box a[href="/heating/"].${ID}__boxtCTA`)) {
      fireEvent('User interacts with New Boiler CTA');
    } else if (target.closest(`.offer-box .${ID}__viewBoiler`)) {
      fireEvent('User interacts with Boiler & Heating cover CTA in the extras section');
    } else if (target.closest(`.offer-box .${ID}__viewElectrical`)) {
      fireEvent('User interacts with Ellectric car CTA');
    } else if (target.closest(`.offer-box .${ID}__viewPlumbingDrainage`)) {
      fireEvent('User interacts with Plumbing & Drainage cover CTA in the extras section');
    } else if (target.closest(`.offer-box a[href="/insurance/home-accident-cover"]`)) {
      fireEvent('User interacts with Accidents CTA');
    } else if (target.closest('a[href="/repairs"]')) {
      fireEvent('User interacts with One off repair CTA');
    } else if (target.closest('a[href="/ev-charger"]')) {
      fireEvent('User interacts with Repairs & Services CTA in the extras section');
    } else if (target.closest('.offer-box a[href="/heating/"]')) {
      fireEvent('User interacts with BOXT CTA');
    } else if (target.closest('.offer-box a[href="/ev-charger"]')) {
      fireEvent('User interacts with Ellectric car CTA');
    } else if (target.closest('.offer-box a[href="tel:03300247326"]')) {
      fireEvent('User interacts with One off repair CTA');
    } else if (target.closest('.promo-box a[href="/insurance-cover/plumbing-and-drainage-comparison"]')) {
      fireEvent('User interacts with Plumbing & Drainage cover CTA in the extras section');
    } else if (target.closest('.promo-box a[href="/insurance-cover/gas-and-boiler-comparison"]')) {
      fireEvent('User interacts with Boiler & Heating cover CTA in the extras section');
    } else if (target.closest('.promo-box a[href="/insurance-cover/electrical-comparison"]')) {
      fireEvent('User interacts with Electrics cover CTA in the extras section');
    } else if (target.closest('.promo-box a[href="/repairs"]')) {
      fireEvent('User interacts with Repairs & Services CTA in the extras section');
    }
  });


  if(VARIATION == 'control') {
    return;
  }

  init();
};
