import Run from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '#content-webnav',
  '.browse__total-result-container',
  '.filters-panel__refinement-section-container > .filters-panel__refinement-selector',
  '.browse__applied-filters .browse__applied-filters__item',
  '.clearRefinement',
  '.cta--reset',
  '#filter-modal',
  '#filters-panel',
  '.filter-toggle',
], Run);
