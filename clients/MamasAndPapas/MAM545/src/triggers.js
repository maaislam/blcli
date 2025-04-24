/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

const topProducts = [
  '/products/juice-highchair-4007l7600',
  '/products/cotbed-essential-fibre-mattress-esfbmcb02',
  '/products/cotbed-premium-dual-core-mattress-prdnmcb02',
  '/products/airo-stroller-uk-959925300',
  '/products/lua-crib-fawn-bundle-spot-oa-bblupk200',
  '/products/lua-bedside-crib-fawn-bclusm600',
  '/products/universal-parasol-cashmere-s920a0100',
  '/products/bababing-luca-changing-bag-422725300',
  '/products/flip-xt3-hrbr-gry-7pc-comp-kit-aton-b2-61941hb00',
  '/products/ocarro-57751st00',
  '/products/activity-toy-pineapple-linkie-7558wil02',
  '/products/snax-adjustable-highchair-removable-tray-insert-grey-spot-115246801',
  '/products/basics-oatmeal-zip-aio-up-to-1-month-s94fot5b1',
  '/products/tommee-tippee-gro-egg-2-white-115602702',
  '/products/baby-bug-and-activity-tray-9868l7500',
  '/products/baby-bug-and-activity-tray-9868l7600',
  '/products/soft-toy-tan-bunny-beanie-4855lf501',
  '/products/musical-mobile-born-to-be-wild-7560eg200',
  '/products/c-bed-premium-dual-core-matt-protector-299502716',
  '/products/sit-play-wttw-pink-7599zr101',
  '/products/joie-ispin-360-isize-baby-to-toddler-car-seat-coal-560779000',
  '/products/tummy-time-roll-wish-upon-a-cloud-7437wc100',
  '/products/my-first-playmat-gym-grey-cream-7736cl701',
  '/products/sit-play-wish-upon-a-cloud-7599wc100',
];

const isValidPdp = topProducts.some((product) => window.location.pathname === product);

if (isValidPdp) {
  pollerLite(['.product-single__description.tabs'], activate);
}
