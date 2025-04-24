import activate from './lib/experiment';
import settings from './lib/settings';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '.skin-metahd-item-search',
  '.page-wrapper',
  '.skin-metahd-item-account',
  '.home-quickorder',
  () => !!window.digitalData,
  () => document && document.body && !document.body.classList.contains(settings.ID),
], activate);