import Run from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '.span-18.section5.cms_banner_slot.last', // Special Offers carousel container
  '.span-18.section2.cms_banner_slot.last', // Banner carousel
  '#homepage_slider > ul > li', // Individual banner slides
  '#homepage_slider > ul > li > a > img', // individual slide image
  '#homepage_slider > ul > li > a', // individual slide link
  '.bchs_home_categories', // Homepage categories
  '.news_signup', // Email signup box
  '#foot_outer', // Footer container, email box moved here
  '#enquireBtnNewsletter', // Email signup button
  '#news_signup_subscribe_form > p > input.box', // Email signup box
  '#footer', // Render location for social media section
  () => {
    let checkjQuery = false;
    if (window.jQuery) {
      checkjQuery = true;
    }
    return checkjQuery;
  },
], Run);
