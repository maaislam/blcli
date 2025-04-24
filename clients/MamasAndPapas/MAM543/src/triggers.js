import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['.full-template-page-shogun-default'], () => {
  setTimeout(activate, 1000);
});
