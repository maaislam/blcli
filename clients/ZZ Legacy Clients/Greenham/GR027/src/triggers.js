import run from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '.span-18.section5.cms_banner_slot.last',
  '#footer',
  '.span-18.section2.cms_banner_slot.last > .slider_component',
  '.news_signup',
  '.greenham_home_categories',
  '#news_signup_subscribe_form > p input',
  '#enquireBtnNewsletter',
  '#homepage_slider > ul > li img',
  '#stripTransmitter0 a',
  '#homepage_slider > ul > li a',
  '#homepage_slider > ul > li',
  () => {
    let checkjQuery = false;
    if (window.jQuery) {
      checkjQuery = true;
    }
    return checkjQuery;
  },
], run);
