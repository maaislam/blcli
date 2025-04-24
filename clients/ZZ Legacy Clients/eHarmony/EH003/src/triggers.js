import activate from './lib/experiment';
import pubSub from './lib/PublishSubscribe';
import settings from './lib/settings';
import { pollerLite } from '../../../../lib/uc-lib';
import { events } from '../../../../lib/utils';

pubSub.subscribe('did-hide-form-til-gender-interaction', () => {
  events.send(`${settings.ID}`, 'did-hide-form-til-gender-interaction', '', {
    sendOnce: true
  });
});

pubSub.subscribe('did-show-form-after-gender-interaction', () => {
  events.send(`${settings.ID}`, 'did-show-form-after-gender-interaction', '', {
    sendOnce: true
  });
});


pubSub.subscribe('did-update-label-texts', () => {
  events.send(`${settings.ID}`, 'did-update-label-texts', '', {
    sendOnce: true
  });
});

pubSub.subscribe('did-mark-cta-inactive', () => {
  events.send(`${settings.ID}`, 'did-mark-cta-inactive', '', {
    sendOnce: true
  });
});

pubSub.subscribe('did-mark-cta-active', () => {
  events.send(`${settings.ID}`, 'did-mark-cta-active', '', {
    sendOnce: true
  });
});

pubSub.subscribe('did-show-tooltip', (data) => {
  events.send(`${settings.ID}`, 'did-show-tooltip', data);
});

pubSub.subscribe('did-click-password-reveal', () => {
  events.send(`${settings.ID}`, 'did-click-password-reveal', '', {
    sendOnce: true
  });
});

pollerLite([
  () => window.location.hostname.indexOf('eharmony.co.uk') > -1,
  '.EH001_label',
  'body',
], activate);
