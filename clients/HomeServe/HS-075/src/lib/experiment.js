import { fireEvent, newEvents, setup } from './helpers/utils';
import shared from '../../../../../core-files/shared';
import { data } from './data/data';
import tagStr from './components/tagStr';

const { ID, VARIATION } = shared;

const init = () => {
  const promoCards = document.querySelectorAll('.promo-box');

  promoCards.forEach((promoCard) => {
    const promoCardLink = promoCard.querySelector('a');
    const promoUrl = promoCardLink.getAttribute('href');
    const planName = data[promoUrl];
    const promoBoxTitle = promoCard.querySelector('h3');

    if (planName) promoCard.setAttribute('data-plan', planName);

    if (VARIATION == 'control') return;

    if (planName && !promoCard.querySelector(`.${ID}__tag`)) {
      promoBoxTitle.insertAdjacentHTML('beforebegin', tagStr(ID, planName));
    }
  });
};

export default () => {
  setup();

  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  newEvents.property = 'G-970RHZRVZ4';

  fireEvent('Conditions Met');

  document.body.addEventListener('click', ({ target }) => {
    if (target.closest('.promo-box') && target.closest('a.btn--rounded')) {
      const boxElem = target.closest('.promo-box');
      const planName = boxElem.getAttribute('data-plan');
      const boxTitleElem = boxElem.querySelector('h3');
      const boxTitle = boxTitleElem.textContent.toLowerCase();

      fireEvent(`User clicks find out more CTA - ${boxTitle} ${planName} tier`);
    }
  });

  init();
};
