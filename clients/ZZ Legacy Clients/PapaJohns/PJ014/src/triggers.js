import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '#ctl00_cphBody__objDealBuilderMobile_upDealBuilder',
], Experiment.init);
