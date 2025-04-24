import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import banner from '../component/banner';

const { ID, VARIATION } = shared;
const isMobile = window.matchMedia('(max-width: 768px)').matches;
const childNo = isMobile ? 6 : 8;
const anchorPointSelector =
  VARIATION === '1' || VARIATION === 'control'
    ? `.collection-section > .container > .columns > .column:nth-child(${childNo})`
    : VARIATION === '2'
    ? '.collection-section > .container .is-pagination'
    : '';
const commonSelector = '.collection-section > .container .is-pagination';

const anchorPoint = document.querySelector(anchorPointSelector)
  ? document.querySelector(anchorPointSelector)
  : document.querySelector(commonSelector);

const init = () => {
  const currencyObj = {
    USD: 'https://us.neomorganics.com/collections/wellbeing-sale',
    EUR: 'https://neomorganics.eu/collections/wellbeing-sale',
    GBP: 'https://www.neomorganics.com/collections/wellbeing-sale',
  };
  const currentlocation = window.Shopify.currency.active;
  const shopNowUrl = currencyObj[currentlocation];

  if (location.pathname.includes('/collections/')) {
    VARIATION === '1' && fireEvent('Viewed PLP');

    anchorPoint.insertAdjacentHTML('afterend', banner(ID, shopNowUrl));
  }
};

export default () => {
  setup();
  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  if (window.location.href.indexOf('us.neomorganics.com') > -1) {
    newEvents.property = 'G-KJ9062XWWK';
  } else if (window.location.href.indexOf('neomorganics.eu') > -1) {
    newEvents.property = 'G-9CQMVE6E0J';
  } else {
    newEvents.property = 'G-884D6MBLFG';
  }

  if (window.location.pathname.includes('/collections/wellbeing-sale')) return;

  if (VARIATION == 'control') {
    const intersectionOptions = {
      threshold: 0.5,
    };

    new IntersectionObserver((intersections) => {
      if (intersections.some((i) => i.isIntersecting)) {
        //fireEvent('User sees the banner');

        fireEvent('Conditions Met');
      }
    }, intersectionOptions).observe(anchorPoint);
    return;
  }

  init();

  const bannerElem = document.querySelector(`.${ID}-banner`);
  const intersectionOptions = {
    threshold: 0.5,
  };
  new IntersectionObserver((intersections) => {
    if (intersections.some((i) => i.isIntersecting)) {
      fireEvent('User sees the banner');

      fireEvent('Conditions Met');
    }
  }, intersectionOptions).observe(bannerElem);

  document.body.addEventListener('click', (e) => {
    const { target } = e;

    if (target.closest(`.${ID}__button`)) {
      fireEvent('User interacts with the cta on the banner');
    }
  });
};
