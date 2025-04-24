/**
 * AV033 - Samples Shop: Basket
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, showVariants } from './services';
import shared from './shared';
import BasketSamples from './components/BasketSamples';

export default () => {
  setup();

  const { rootScope } = shared;

  /**
   * Store any variants in here to avoid making multiple AJAX requests
   * for the same product. Format so the keys are product IDs and the
   * properties are an array of variants. E.g.
    {
     '1120': [{}, {}]
    }
   */
  shared.variantsCache = {};

  shared.variantsLoading = false;

  /**
   * Keep a reference to the first lightbox we create so we can update
   * the content per request instead of creating multiple lightboxes
   */
  shared.variantLightbox = null;

  /** Make changes */
  const init = () => {
    // Build new components
    const basketSamples = new BasketSamples();

    rootScope.$apply(() => {
      /*
        Bind the showVariants function to scope. This has been referenced in the new
        product template to request variants if available instead of redirecting to PDP
      */
      rootScope.showVariants = showVariants;
    });
  };

  init();
};
