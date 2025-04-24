/* eslint-disable */
import Experiment from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  () => !!window._gaUAT,
], Experiment.init);
