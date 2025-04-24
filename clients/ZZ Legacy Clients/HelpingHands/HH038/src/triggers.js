import activate from './lib/experiment';
import settings from './lib/settings';
import { pollerLite } from '../../../../lib/uc-lib';
import { events } from '../../../../lib/utils';

pollerLite([
  'body',
  'h1',
  '#main > .container > .row',
  '.locations-search',
], () => {

  if(settings.VARIATION == 'control') {
    events.send(
      `${settings.ID}-${settings.VARIATION}`,
      'activated'
    );
  } else {
    events.send(
      `${settings.ID}-${settings.VARIATION}`,
      'activated'
    );

    activate();
  }
});
