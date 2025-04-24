import shared from '../../../../../core-files/shared';

import { setup, fireEvent, newEvents, obsIntersection } from './helpers/utils';

const { ID, VARIATION } = shared;

const priceText = '£3.50';
const monthText = 'a month<sup>*</sup>';

const cardSvg = `<svg class='${ID}__switchIcon' style='max-width:100%' width="150" height="124" viewBox="0 0 150 124" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 58H8V79H0V58Z" fill="#E7342C"/>
<path d="M81 4H89V25H81V4Z" fill="#E7342C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M68 0H76V28H68V25H53V66C53 72.6274 47.6274 78 41 78H22V82H14V54H22V57.5H37V16.5C37 9.87258 42.3726 4.5 49 4.5H68V0ZM66 10H51V14H66V10ZM39 64H24V68H39V64Z" fill="#E7342C"/>
<path d="M98 68H106V85H98V68Z" fill="#E7342C"/>
<path d="M123 97V105H110V97H123Z" fill="#E7342C"/>
<path d="M94 97V105H81V97H94Z" fill="#E7342C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M120 49H137V74H120V49ZM131 55H126V68H131V55Z" fill="#E7342C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M61 43C61 38.5817 64.5817 35 69 35H142C146.418 35 150 38.5817 150 43V116C150 120.418 146.418 124 142 124H69C64.5817 124 61 120.418 61 116V43ZM142 43H69L69 116H142V43Z" fill="#E7342C"/>
</svg>
`;

const handleIntersection = (entry) => {
  if (entry.isIntersecting) {
    if (!document.body.classList.contains(`${ID}__conditionMet`)) {
      fireEvent('Conditions Met');
      document.body.classList.add(`${ID}__conditionMet`);
    }
  }
};

const handleObserver = (selector) => {
  const intersectionAnchor = document.querySelector(selector);
  if (intersectionAnchor) {
    obsIntersection(intersectionAnchor, 0, handleIntersection);
  }
};

const init = () => {
  const cardTitle = document.querySelector('#pdPlusBlock .blockLabel');
  const cardBody = document.querySelector('#pdPlusBlock .blockBody');
  const cardBtn = document.querySelector('#pdPlusBlock .btn-hollow');
  const cardIcon = document.querySelector('#pdPlusBlock .icon-hs-plumbing');
  const cardPriceFrom = document.querySelector('#pdPlusPrice .from');
  const cardPrice = document.querySelector('#pdPlusPrice .price');
  const monthElem = document.querySelector('#pdPlusPrice .month');
  const limitedOfferElem = document.querySelector('.pdPlusUnlimited .unlimited');

  if (cardTitle) {
    cardTitle.classList.add(`${ID}__cardTitle`);
    cardTitle.textContent = 'Plumbing and Electrics';
  }

  if (cardBody) cardBody.textContent = "Protect your property's pipes, drains, sockets and switches";

  if (cardBtn) cardBtn.setAttribute('href', '/insurance/plumbing-electrics-cover');

  if (cardIcon) {
    cardIcon.classList.add(`${ID}__hide`);
    cardIcon.insertAdjacentHTML('afterend', cardSvg);
  }

  if (limitedOfferElem) {
    limitedOfferElem.classList.add(`${ID}__limitedOffer`);
    limitedOfferElem.textContent = 'Limited Offer';
  }

  if (cardPriceFrom) {
    cardPriceFrom.classList.add(`${ID}__cardPriceNow`);
    cardPriceFrom.textContent = 'Now';
  }

  if (cardPrice) {
    cardPrice.classList.add(`${ID}__cardPrice`);
    cardPrice.textContent = priceText;
  }
  if (monthElem) {
    monthElem.classList.add(`${ID}__cardmonth`);
    monthElem.innerHTML = monthText;
  }
};

export default () => {
  setup();
  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  newEvents.property = 'G-970RHZRVZ4';

  handleObserver('#pdPlusBlock');

  document.body.addEventListener('click', (e) => {
    const { target } = e;

    if (target.closest('#pdPlusBlock .btn-hollow')) {
      fireEvent('Customer clicks “view more” on the Homepage');
    }
  });

  if (VARIATION == 'control') {
    return;
  }

  init();
};
