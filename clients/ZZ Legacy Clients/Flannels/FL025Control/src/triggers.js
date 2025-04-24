import Run from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '.MobSortSelector .productFilterList label',
  '#mobappfltrs',
  '#divBagTotalLink',
  '.MenuCloseActive',
  '#trigger',
], Run);
