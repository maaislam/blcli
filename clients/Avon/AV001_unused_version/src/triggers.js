import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import pubSub from '../../../../lib/PublishSubscribe';

// Primary poller across all pages
pollerLite([
  'body',
  () => window.location.hostname.indexOf('avon.uk.com') > -1,
], activate);
