import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '#checkout',
  '.thirdWidth .radioButton',
  '.sneakyDiv .paddingWrap',
  '#continueRadio',
  '.thirdWidth.js-basketSummary',
  '#paymentSummaryTable',
], Experiment.init);
