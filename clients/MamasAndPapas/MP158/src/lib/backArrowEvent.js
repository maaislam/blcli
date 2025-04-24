import { observer } from '../../../../../lib/uc-lib';

export default () => {
  observer.connect([document.querySelector('.nav.slide-panel-left-nav.navShop .nav_category.bg-white.pb-3.nav_category-selected')], () => {
    const backArrow = document.querySelector('.MP158-back');
    backArrow.addEventListener('click', (e) => {
      document.querySelector('.nav_categoryTitle.nav_backArrow.cursor-pointer.p-3.pl-5.js-navSwitchCategory').click();
    });
  }, {
    throttle: 200,
    config: {
      attributes: true,
      childList: false,
    },
  });
};