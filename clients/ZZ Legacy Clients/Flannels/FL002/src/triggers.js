import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  'a[href="https://www.flannels.com/Popup_SizeGuide"]',
], Experiment.init);
