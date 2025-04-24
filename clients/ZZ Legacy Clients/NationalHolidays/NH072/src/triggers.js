import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '#divSearchPopup div.searching p',
  // () => window.location.pathname === '/offers',
], activate);
