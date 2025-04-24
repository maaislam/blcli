import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '.filters-panel__refinement-section-container .filters-panel__refinement-link',
  '.cta.js-modal-trigger.filter-toggle',
], activate);
