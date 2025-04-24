import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '.result-item',
  '.buttons a.btn-more-info.more-info',
  () => window.location.pathname === "/search-results",
], activate);
