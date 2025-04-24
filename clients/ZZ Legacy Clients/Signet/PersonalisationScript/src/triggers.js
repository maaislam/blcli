import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  () => {
    return window.digitalData && window.digitalData.page && window.digitalData.page.category;
  }
], activate);
