import Run from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '#filters-panel',
  '.filters-panel__refinement-link',
], Run);