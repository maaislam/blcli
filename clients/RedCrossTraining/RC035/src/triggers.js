import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '.purchasenav-basket-contents-course',
  '.purchasenav-back-button',
  '.course-result-name',
], Experiment.init);
