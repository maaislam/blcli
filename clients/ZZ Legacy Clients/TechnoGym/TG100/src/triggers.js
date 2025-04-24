import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '#form-wrapper',
  '#identity-form',
  '.page-section.hero-section',
  () => {
    return !!window.jQuery;
  },
], activate);
