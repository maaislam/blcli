import pubSub from './PublishSubscribe';
// import getTextNodesRecursively from './dom';
// import cache from './cache';

const init = () => {
  pubSub.publish('Experiment-init');
  // const textNodes = getTextNodesRecursively(cache.get('#checkoutContent'));
};

export default init;
