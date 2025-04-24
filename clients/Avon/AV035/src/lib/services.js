import '../../../../../lib/utils/extendWebStorage';
import { fullStory, pollerLite } from '../../../../../lib/utils';
import shared from './shared';
import sampleToProductMap from './productMap';

/**
 * Save samples ordered data in localStorage
 */
export const storeOrderedSampleData = () => {
  pollerLite(['[ng-controller="MvpConfirmationController"]'], () => {
    const confirmationScope = $('[ng-controller="MvpConfirmationController"]').scope();
    const sampleProductsOrdered = confirmationScope.BasketItems.Items.filter(item => / sample/i.test(item.Title));
    if (sampleProductsOrdered.length) {
      const samplesData = window.localStorage.getObject('UC_Samples_Ordered') || { items: [] };

      sampleProductsOrdered.forEach((item) => {
        samplesData.items.push({
          ProfileNumber: item.ProfileNumber,
          Fsc: item.Fsc,
          Title: item.Title,
        });
      });

      window.localStorage.setObject('UC_Samples_Ordered', samplesData);
    }
  });
};

/**
 * Return ordered sample data
 * @returns {Object}
 */
export const getOrderedSampleData = () => window.localStorage.getObject('UC_Samples_Ordered');

/**
 * Get an array with matching full product IDs from sample profile numbers
 * @returns {Array<Number>}
 */
export const getFullProductIds = () => getOrderedSampleData().items
  .reduce((acc, sampleData) => {
    const fullProduct = sampleToProductMap[sampleData.ProfileNumber];
    if (fullProduct) acc.push(fullProduct);
    return acc;
  }, []);

/**
 * Pass data to shared object
 * @param {Object} data
 */
export const share = (data) => {
  Object.keys(data).forEach((key) => {
    shared[key] = data[key];
  });
};

/**
 * Standard experiment setup
 */
export const setup = () => {
  const { ID, VARIATION } = shared;

  /** Use fullStory API to tag screen recording with experiment info */
  fullStory(ID, `Variation ${VARIATION}`);

  /** Namespace with body classes for easier CSS specificity */
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
};
