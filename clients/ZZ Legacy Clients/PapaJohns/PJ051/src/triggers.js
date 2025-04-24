import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '.prPromoPoints',
  () => !!window.IsMobile,
], activate);
