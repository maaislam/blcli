import Run from './lib/experiment';
import { pollerLite } from '../../../../../../../lib/uc-lib';

export default () => {
  pollerLite([
    '.GD017_img-block > span', // Nav image sub text
    '.GD017_img-block label', // Nav image header
    '.GD017_male-wrap .GD017_img-wrap', // Render location
  ], Run);
};
