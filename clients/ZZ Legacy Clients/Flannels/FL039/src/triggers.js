import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '#mp-menu .MobileMenuContentWrap .shop ul li.mobOnly a[href="/designers"]',
  '#mobMenuContainer',
  '.MobileMenuContentWrap .shop',
  '.footerCopyRightLine',
], activate);
