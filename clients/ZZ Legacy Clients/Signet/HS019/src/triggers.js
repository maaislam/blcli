import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '#filter-modal .js-modal-content.modal__content.no-pad',
  () => {
    return !!window.jQuery;
  },
  () => {
    return !!window.digitalData.page.category;
  },
], activate);
