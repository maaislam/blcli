import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '#ctl00_cphBody_pnlGetStartedMobile',
  '.homeCarousel.mobile768',
  '#ctl00_cphBody_pnlMain',
], Experiment.init);
