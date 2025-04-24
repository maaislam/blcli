import '../../../../../lib/utils/extendWebStorage';
import shared from './shared';
import sampleToProductMap from './productMap';

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
