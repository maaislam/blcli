/* eslint-disable */
import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '.addressText',
], Experiment.init);
