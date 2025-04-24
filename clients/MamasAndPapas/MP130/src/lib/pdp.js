import PDPReview from '../components/PDPReview/PDPReview';
import SlideOut from '../components/SlideOut/SlideOut';

/**
 * @param {array} includedSKUs All product SKUs that should have a review
 */

export default () => {
  new PDPReview();
  new SlideOut();
};
