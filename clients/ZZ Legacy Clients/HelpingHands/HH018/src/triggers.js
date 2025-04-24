import Run from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '#menu-main-nav > li:nth-child(2)', // Live in care menu item
  '#menu-main-nav', // Navigation links container
  '#menu-main-nav > li:first-child', // Homecare services menu item
], Run);
