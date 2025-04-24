import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  'body',
  () => {
    const menuTitlesDesktop = document.querySelector('.menuItems .menuList.offerList h3');
    const menuTitlesMobile = document.querySelector('.offers-m-cont .offer-m');

    if(menuTitlesMobile || menuTitlesDesktop) {
      return true;
    }
  },

  /**
   * Check that at least one offer matches against items on the page
   */
  () => {
    const matchingDeals = Experiment.getMatchingDeals();

    return matchingDeals.length > 0;
  }
], Experiment.init, {
  wait: 300  // Longer interval between checks as checks may be expensive
});
