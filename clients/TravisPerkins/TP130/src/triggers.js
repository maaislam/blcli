import { mapPoller } from '../../../../lib/uc-lib';
import Run from './lib/experiment';

mapPoller([
  {
    'contentWrap': '#r_content',
    'reviewWrap': '.reviewAvgRatingRange .facet_block'
  },
], Run);
