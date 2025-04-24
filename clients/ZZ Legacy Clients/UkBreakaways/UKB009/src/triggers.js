import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  () => window.jQuery,
  () => window.location.pathname === "/",
  () => document.querySelector('.content') || document.querySelector('.search-panel.home.content'),
], activate);
