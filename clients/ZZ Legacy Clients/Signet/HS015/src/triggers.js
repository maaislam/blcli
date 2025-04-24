import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '.browse__main-content',
  '.cta.js-modal-trigger.filter-toggle',
  '.browse__sort-container.mobile-and-tablet-only',
], activate);
