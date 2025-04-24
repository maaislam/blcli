import run from './experiment';
import { poller } from '../../../../lib/uc-lib';
// import flicker from './flickerprevention';


// flicker();
poller([
  '.span-18.section5.cms_banner_slot.last',
  '#footer',
  '.span-18.section2.cms_banner_slot.last > .slider_component',
  '.news_signup',
  '.greenham_home_categories',
  '#news_signup_subscribe_form > p input',
  '#enquireBtnNewsletter',
  '.home_product_carousel .title_holder',
  () => {
    let checkjQuery = false;
    if (window.jQuery) {
      checkjQuery = true;
    }
    return checkjQuery;
  },
], run);
