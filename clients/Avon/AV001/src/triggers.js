import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import pubSub from '../../../../lib/PublishSubscribe';

// Wait for app data to become available
pollerLite([
  () => {
    try {
      return window.AppModule.RootScope;
    } catch (e) {}
  },
], () => {
  // Primary poller across all pages
  pollerLite([
    'body',
    () => window.location.hostname.indexOf('avon.uk.com') > -1,
    () => {
      // --------------------------------
      // Only run for non-logged-in users
      // without a rep attached
      // --------------------------------
      const sessionContext = sessionStorage.getItem('SessionContext_GB');
      if(!sessionContext) {
        return false;
      }

      const sessionContextObject = JSON.parse(sessionContext);

      if(!sessionContextObject 
          || typeof sessionContextObject.IsUserLoggedIn === 'undefined') {
        return false;
      }

      const root = window.AppModule.RootScope;
      const hasRep = root.Session && root.Session.HasRepresentative;

      return !sessionContextObject.IsUserLoggedIn && !hasRep;
    },
  ], activate);
});