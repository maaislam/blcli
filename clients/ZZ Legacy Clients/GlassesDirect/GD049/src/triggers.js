import experiment from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '#payform .form-section',
  '#payment-questions',
  '#order-home-trial',
  '#purchase-details',
  () => !!window.universal_variable.page.type,
], experiment.init);
