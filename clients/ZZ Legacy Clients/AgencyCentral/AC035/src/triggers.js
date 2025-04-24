import Experiment from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body', '#contact-form-container',
], Experiment.init);
