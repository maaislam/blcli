import { mapPoller } from '../../../../lib/uc-lib';
import Run from './lib/experiment';

mapPoller([
  '.productFilter .productFilterList .FilterListItem.ACSIZE'
], Run);
