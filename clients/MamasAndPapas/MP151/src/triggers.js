import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  () => {
    return window.universal_variable.page.type === 'Category';
  },
  () => window.jQuery && window.jQuery.fn && window.jQuery.fn.slick,
  () => {
    return document.querySelector('.yCmsComponent.content-plp');
  },
], activate);
