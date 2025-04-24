import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body', '.page-productGrid.feature-design .list_view #products .row .prod',
], activate);
