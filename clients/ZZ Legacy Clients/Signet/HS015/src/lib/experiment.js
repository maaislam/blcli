/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import TopCategories from './components/topCategories';
import { observer, pollerLite } from '../../../../../lib/uc-lib';
import settings from '../../../HS016/src/lib/settings';

const activate = () => {
  setup();

  const topCategoryWrapper = new TopCategories();


  // move the filters with an observer
  const moveFilters = () => {
    const filterButtons = document.querySelector('.browse__sort-container.mobile-and-tablet-only');
    document.querySelector('#list').insertAdjacentElement('beforebegin', filterButtons);
  };

  moveFilters();

  // remove the new tiles when observer fires so it is not duplicated
  const removeNavTiles = () => {
    document.querySelector('.HS015_topCategories').remove();
  };

  observer.connect([document.querySelector('.product-tile-list.js-infinite-scroll')], () => {

    if (document.querySelector('.HS015_topCategories')) {
      removeNavTiles();
    }

    moveFilters();
    const topCategoryWrapper = new TopCategories();
  }, {
    throttle: 1000,
    config: {
      attributes: true,
      childList: true,
      subtree: false,
    },
  });
};

export default activate;
