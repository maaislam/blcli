import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '.inner-content h1', '#seatIds', '.main-content .content .left', '.main-content .content .right', '#Booking .content .choose-seat .seat-area .seat-block .seat', '.choose-seat',
], Experiment.init);
