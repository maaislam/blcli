import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '.filters-panel__refinement-section-container .styled-checkbox',
], activate);
