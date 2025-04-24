import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '.MP081',
  '.MP081_price--rrp',
  '.MP081_sectionHeading',
  '.productDetail.py-4 .price-block',
], Experiment.init);
