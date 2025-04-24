/**
 * AV046 - Clickable Shades on IMB PDP
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import VariantSelector from './components/VariantSelector/VariantSelector';
import { pollerLite, observer, events } from '../../../../../lib/utils';

export default () => {
  setup();
  const { ID, VARIATION } = shared;

  /**
   * Change Qty selector markup
   */
  const changeQtySelector = () => {
    const $productForm = $('#ProductDetailForm');

    if (!$productForm.hasClass(`${ID}_product-modified`)) {
      $productForm.addClass(`${ID}_product-modified`);

      // Change Qty selector
      const newDecreaseQty = `
        <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" viewBox="0 0 55 55" class="Qty">
          <g fill="none" fill-rule="evenodd">
            <rect width="54" height="54" x=".5" y=".5" rx="4" ></rect>
            <path stroke-linecap="square" stroke-width="2" d="M20 27.5h15"></path>
          </g>
        </svg>
      `;

      const newIncreaseQty = `
        <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" viewBox="0 0 55 55" class="Qty">
          <g fill="none" fill-rule="evenodd">
            <rect width="54" height="54" x=".5" y=".5" rx="4"></rect>
            <g stroke-linecap="square" stroke-width="2">
              <path d="M20 27.5h14.242M27.5 20v14.242"></path>
            </g>
          </g>
        </svg>
      `;

      $productForm.find('.QtyDown').html(newDecreaseQty);
      $productForm.find('.QtyUp').html(newIncreaseQty);
    }
  };

  /**
   * Add icon to add to bag button
   */
  const addCtaIcon = () => {
    const $productForm = $('#ProductDetailForm');
    const $cta = $productForm.find('.AddToCart.FormField > a.Button');

    if ($cta.length && $cta.find('[icon="basket_pdp"]').length == 0) {
      $cta.children('span').before(`
        <svg-icon icon="basket_pdp" class="ng-isolate-scope">
          <svg ng-if="Ready" class="" style="">
            <use xlink:href="#Svg_basket_pdp" ng-attr-xlink:href="{{TrustedSvgHref()}}"></use>
          </svg>
        </svg-icon>
      `);
    }
  };

  /** Make all changes */
  const init = () => {
    pollerLite(['#ProductDetailForm'], () => {
      const $productForm = $('#ProductDetailForm');
      if ($productForm.hasClass(`${ID}_variants-added`)) {
        return false;
      }

      changeQtySelector();
      
      if(!$productForm.scope().ProductDetail.Product.IsShadeVariant) {
        return false;
      }

      $productForm.addClass(`${ID}_variants-added`);
      events.send(`${ID}-${VARIATION}`, 'new-lightbox-shown');

      
      
      new VariantSelector($productForm);
    });
  };

  // init();

  // Re-run functions on changes to the product list
  const $modals = $('#Modals');
  observer.connect($modals, init, {
    config: { attributes: false, subtree: false, childList: true },
    throttle: 0,
  });
};
