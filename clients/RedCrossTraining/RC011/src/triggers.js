import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '.form-item.form-course-type > label',
  '.trustpilot-container',
  '.flyout',
], Experiment.init);
