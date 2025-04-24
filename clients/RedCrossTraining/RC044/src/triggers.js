import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  'body.RC019v2',
  '.rc19-popularcourse .rc19-courseLinks',
	() => !!window.jQuery,
	() => !!window.jQuery.fn.datepicker,
], Experiment.init);
