import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import { addCssToPage, addJsToPage } from './lib/helper/utils';
import shared from '../../../../core-files/shared';

const { ID } = shared;

const swiperJs = 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js';
const swiperCss = 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css';
//add swiper js
addJsToPage(swiperJs, `${ID}__swiperjs`);
addCssToPage(swiperCss, `${ID}__swipercss`);

pollerLite(['.mini-cart-items'], activate);
