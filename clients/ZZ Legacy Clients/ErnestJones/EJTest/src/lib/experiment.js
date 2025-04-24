import cache from './cache';
import settings from './settings';
import pubSub from './PublishSubscribe';
import { showDeliveryMessages } from './actions/delivery-messaging';

const init = () => {
  pubSub.publish('experiment-init');

  // Build Messages
  showDeliveryMessages();
};

export default init;
