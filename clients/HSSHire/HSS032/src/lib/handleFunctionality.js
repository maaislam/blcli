import getCurrentItems from './getCurrentItems';
import getMarkup from './getMarkup';
import checkForItems from './checkForItems';
import { pollerLite } from '../../../../../lib/uc-lib';
import addTracking from './addTracking';

const handleFunctionality = () => {
  const items = getCurrentItems();
  const markup = getMarkup(items);
  const recentlyViewed = document.querySelector('.similar-prdts');
  recentlyViewed.insertAdjacentHTML('afterEnd', markup);
  // Check for all items then run tracking
  pollerLite(
    [
      () => {
        return checkForItems(items);
      },
    ],
    addTracking
  );
};

export default handleFunctionality;
