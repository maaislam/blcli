import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '.home-course-search',
  '.trustpilot-widget iframe',
], Experiment.init);
