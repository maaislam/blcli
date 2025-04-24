import {Experiment} from './experiment.js';
import {poller} from '../../../../lib/uc-lib';
import setup from './setup';

if (document.cookie.match('standardFunnel=true')) {
	const experiment = setup(Experiment.globals.ID);
	experiment.pollers.push(
		poller([
			'body'
		], Experiment.init)
	);
}
