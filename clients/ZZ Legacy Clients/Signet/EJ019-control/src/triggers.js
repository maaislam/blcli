import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '#bazaarContainer .BVRRDisplayContentBody .BVRRContentReview',
  '#js-ratingJumpTo',
  '.BVRRRatingOverall .BVRRRatingNormalImage img',
  () => {
    return !!window.jQuery;
  },
], activate);
