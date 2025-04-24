import Run from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '#nav_tabs',
  '#Branding',
], Run);
