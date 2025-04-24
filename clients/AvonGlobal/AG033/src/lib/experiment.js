/**
 * AG033 - Setup
 *
 * @author User Conversion
 */
import { setup } from './services';
import rebuildCartItems from './rebuildCartItems';
import { events, pollerLite } from './../../../../../lib/utils';
import shared from './shared';

/**
 * Entry point for experiment
 */
export default () => {
  const rootScope = window.AppModule.RootScope;

  rootScope.$on('CartService_GetCartSuccess', () => {
    const { ID, VARIATION } = shared;

    events.send(`${ID}-${VARIATION}`, 'did-meet-conditions');

    setup();

    pollerLite(['#CartPage'], rebuildCartItems);
  });
}
