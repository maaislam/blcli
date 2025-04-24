import activate from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '.navToggle',
  '.siteNavigation',
  '#js-overlay',
], activate);
