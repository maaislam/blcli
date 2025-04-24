import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '.destination-box',
  '.breadcrumbs',
  '.book-seats .price-table',
  '#seatPlanCont',
  '.seat-row .seat',
], Experiment.init);
