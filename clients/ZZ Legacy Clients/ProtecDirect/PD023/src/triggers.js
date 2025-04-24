import Run from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '#search', '#foot_outer .mobile_footer_top_links div', '#foot_outer .mobile_footer_vertical_links div',
], Run);
