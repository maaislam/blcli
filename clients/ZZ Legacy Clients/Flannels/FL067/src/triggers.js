import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '.mainBody',
  () => window && window.dataLayer && window.dataLayer[1] && window.dataLayer[1].productGender,
], activate);
