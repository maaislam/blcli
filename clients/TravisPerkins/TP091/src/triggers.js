import { Run, runLogin } from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '#header', '#content > .yCmsComponent.home-carousel', '#content > .inspirational_promotion_section', () => {
    let checkjQuery = false;
    if (window.jQuery) {
      checkjQuery = true;
    }
    return checkjQuery;
  },
], Run);

poller([
  '#loginSection', '#registerSection', () => {
    let checkjQuery = false;
    if (window.jQuery) {
      checkjQuery = true;
    }
    return checkjQuery;
  },
], runLogin);

