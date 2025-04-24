import { fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export const getTopLevelPLP = (url) => {
  let parentPLP = null;
  // --- Home Fragrance
  let homeFragrancePLPs = ['/collections/mists',
    '/collections/pillow-mist',
    '/collections/reed-diffusers',
    '/collections/candles',
    '/collections/essential-oil-blends',
    '/collections/the-wellbeing-pod-mini',
    '/collections/the-wellbeing-pod',
    '/collections/wellbeing-pod-luxe'];
  // --- Bath and body
  let bathBodyPLPs = ['/collections/bath-body',
    '/collections/super-shower-power-body-cleanser',
    '/collections/anti-bacterial-hand-sanitiser-gel',
    '/collections/body-washes-lotions',
    '/collections/body-butter',
    '/collections/intensive-skin-treatment-candles',
    '/collections/natural-soap',
    '/collections/hand-balms',
    '/collections/bath-oils-foams'];
  // --- Skincare
  let skincarePLPs = ['/collections/skincare',
    '/collections/perfect-nights-sleep-overnight-facial-cream',
    '/collections/cleansing-balm',
    '/collections/face-oil',
    '/collections/face-serum',
    '/collections/spf-moisturiser',
    '/collections/wonder-balm',
    '/products/white-jade-facial-roller'];

  if (homeFragrancePLPs.indexOf(url) > -1) {
    parentPLP = '/collections/home';
  } 
  if (bathBodyPLPs.indexOf(url) > -1) {
    parentPLP = '/collections/bath-body';
  } 
  if (skincarePLPs.indexOf(url) > -1) {
    parentPLP = '/collections/skincare';
  }

  return parentPLP;
};

export const checkScrollUntilElIntoView = (elementTarget, bannerPosition) => {
  window.addEventListener("scroll", function() {
    if (!elementTarget.classList.contains('cta-seen')) {
      if (window.scrollY <= (elementTarget.offsetTop + elementTarget.offsetHeight)) {
        if (isElementInViewport(elementTarget)) {
          elementTarget.classList.add('cta-seen');
          // console.log(`Visible - ${bannerPosition} - ${elementTarget.querySelector('a').getAttribute('data-banner')}`);
          fireEvent(`Visible - ${bannerPosition} - ${elementTarget.querySelector('a').getAttribute('data-banner')}`);
        }
      }
    }
  });
};

// export const isElementInViewport = (el) => {
//   let jQuery = null;
//   jQuery = window.jQuery || window.$;
//   if (typeof jQuery === "function" && el instanceof jQuery) {
//       el = el[0];
//   }

//   let rect = el.getBoundingClientRect();

//   return (
//       rect.top >= 0 &&
//       rect.left >= 0 &&
//       rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
//       rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
//   );
// }


export const isElementInViewport = (element) => {
  var top = element.offsetTop;
  var left = element.offsetLeft;
  var width = element.offsetWidth;
  var height = element.offsetHeight;

  while(element.offsetParent) {
    element = element.offsetParent;
    top += element.offsetTop;
    left += element.offsetLeft;
  }

  return (
    top < (window.pageYOffset + window.innerHeight) &&
    left < (window.pageXOffset + window.innerWidth) &&
    (top + height) > window.pageYOffset &&
    (left + width) > window.pageXOffset
  );
}
