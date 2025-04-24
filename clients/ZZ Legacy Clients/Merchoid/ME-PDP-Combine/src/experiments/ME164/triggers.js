import Experiment from './experiment';

export default () => {
  window.UC.poller(['.woocommerce-main-image.zoom'], Experiment.init);
};
