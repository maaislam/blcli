import Experiment from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  () => !!window.dataLayer,
  () => document.querySelector('.product__options .last .input-box > select') || document.querySelector('tbody > tr'),
], Experiment.init);
