import Experiment from './lib/experiment';

export default () => {
  window.UC.poller([
    '.radical-variations-wrapper', // Render location
    '.single_variation_wrap', // Add to cart button and drop down area
    '.product-usps', // USPS
    '#pa_size > option', // Sizes
    // Check if gender attributes exist
    () => {
      let hasAttributes = false;
      const testMale = document.querySelector('#pa_size > [data-male-sizing]');
      const testFemale = document.querySelector('#pa_size > [data-female-sizing]');
      // Check at least one of each option exists
      if (testFemale && testMale) {
        hasAttributes = true;
      }
      return hasAttributes;
    },
  ], Experiment.init);
};