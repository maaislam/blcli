import Experiment from './lib/experiment';
import { poller } from '../../../../lib/uc-lib';
import { destroyPollers } from '../../../../lib/utils';

/**
 * Create on the window to hold references to experiments and event listeners
 * that we may need to access later
 */
/* eslint-disable */
window.UC = window.UC || {};

const experiments = window.UC.experiments = (window.UC.experiments || {});
const exp = experiments[Experiment.settings.ID] = experiments[Experiment.settings.ID] || {};

exp.pollers = exp.pollers || [];
exp.eventListeners = exp.eventListeners || [];

Experiment.winExp = window.UC.experiments[Experiment.settings.ID];

/* Kill all pollers we referenced */
destroyPollers(Experiment.settings.ID);

/* Kill all event listeners we referenced */
exp.eventListeners.forEach((listener) => {
  if (listener.elm && listener.eventType && listener.listenerFunction) {
    listener.elm.removeEventListener(listener.eventType, listener.listenerFunction);
  }
});

/* eslint-enable */

/* Init experiment */
const mainPoller = poller([
  'body',
  () => !!window.JQSG,
], Experiment.init);

exp.pollers.push(mainPoller);
