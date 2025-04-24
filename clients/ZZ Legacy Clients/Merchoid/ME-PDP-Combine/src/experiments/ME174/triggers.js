import Experiment from './lib/experiment';

export default () => {
  window.UC.poller([
    '.row.max-width:last-child > .columns.small-12', // Render Location
    // Check for brand value
    () => {
      let checkData = false;
      const brandData = document.querySelector('.large-12.columns > input[name="_merchoid_pa_brand_name"]');
      if (brandData) {
        checkData = true;
      }
      return checkData;
    },
  ], Experiment.init);
};
