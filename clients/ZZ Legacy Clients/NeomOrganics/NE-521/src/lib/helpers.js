import { fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

// export const getUrlParameter = (name, url) => {
//   if (!url) {
//     url = window.location.href;
//   }
//   name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,'\\\]');
//   const regexS = `[\\?&]${name}=([^&#]*)`;
//   const regex = new RegExp(regexS);
//   const results = regex.exec(url);
//   return results == null ? null : results[1];
// };

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