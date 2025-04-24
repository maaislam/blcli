import { mapPoller } from '../../../../lib/uc-lib';
import Run from './lib/experiment';

mapPoller([
  {
    'plpHeader': '.mainBody .topheadbox'
  },
  '.productFilter .productFilterList .FilterListItem.ACSIZE'
], Run);
