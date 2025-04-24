import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

const triggers = () => {
  pollerLite([
    'body',
  ], activate);
};

// If user is on step 2 pages, only run if they have seen step 1
const isStep2 = /\/(pizzas|sides|drinks|desserts).aspx/.test(window.location.href);
if (isStep2) {
  if (window.sessionStorage.getItem('PJ035_added_offer') === 'true') {
    triggers();
  }
} else {
  triggers();
}
