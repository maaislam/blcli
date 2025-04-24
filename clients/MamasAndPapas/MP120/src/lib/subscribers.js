import { events } from '../../../../../lib/utils';
import settings from './settings';

/**
 * Initialise event subscribers
 *
 * @param {PublishSubscribe} pubSub
 * @access public
 */
export const initEventSubscribers = (pubSub) => {

  // ---------------------------------------------------
  // Experiment Init
  // ---------------------------------------------------
  pubSub.subscribe('experiment-init', () => {
    events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
  });
  
  // ---------------------------------------------------
  // Clicked Which? award 
  // ---------------------------------------------------
  pubSub.subscribe('award-image-clicked', () => {
    events.send(settings.ID, 'award-image-clicked', '');
  });
  
  // ---------------------------------------------------
  // Initialised slide panel
  // ---------------------------------------------------
  pubSub.subscribe('did-click-panel', (type) => {
    events.send(settings.ID, 'did-click-panel', type);
  });
  
  // ---------------------------------------------------
  // Read more post
  // ---------------------------------------------------
  pubSub.subscribe('readmore-post', () => {
    events.send(settings.ID, 'read-more-post-cliicked', '');
  });
};
