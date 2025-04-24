import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '.menu-btn',
  '.main-nav__item .main-nav__link',
  '.header__menu .menu-btn',
], activate);
