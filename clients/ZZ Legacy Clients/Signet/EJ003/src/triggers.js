import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '.u-container.u-container--icons .icon-set--hamburger',
  '.u-container.u-container--icons .site-logo',
  '.u-container.u-container--icons .icon-set--syp-glass',
  // '.u-container.u-container--icons .icon-set .top-bar__link.basket-icon',
], activate);
