import shared from '../shared';
import { angularCompile } from '../../../../../../lib/utils/avon';
import { observer, pollerLite } from '../../../../../../lib/utils';

export default () => {
  const { $, ID, rootScope } = shared;

  /** Add toolbars at top and bottom to be outside the product grid */
  const createHeading = () => {
    pollerLite([
      '#MainContentWrapper',
      '#SpecialOfferDetail',
    ], () => {
      const $heading = $(`
        <div class="${ID}_page-heading">
          <h1 ng-bind="SpecialOfferSummary.Name"></h1>
          <p ng-bind-html="SpecialOfferSummary.BodyText"></p>
        </div>
      `);

      // Render
      const $main = $('#MainContentWrapper');
      $main.prepend($heading);

      angularCompile($heading, $, $('#SpecialOfferDetail').scope());
    });
  };

  /** Move social icons to ouside the product grid */
  const moveSocialIcons = () => {
    const $socialIcons = $('socialsharing');
    const $breadcrumbs = $('#Breadcrumbs');
    $breadcrumbs.after($socialIcons);
  };

  /** Change the social icon svg images */
  const changeSocialIcons = () => {
    /**
     * Property name should be the old icon name and the value should be the new icon name
     * Names come from the svgIcon directive
     */
    const newIconNames = {
      envelope: 'pdp_email',
      'social-facebook': 'pdp_facebook',
      'social-pinterest': 'pdp_pinterest',
      'social-twitter': 'pdp_twitter',
      'social-tumblr': 'pdp_tumblr',
    };

    const $socialLinks = $('.SocialButtons .Social');
    $socialLinks.each((index, element) => {
      const $element = $(element);
      const $icon = $element.find('svg-icon');
      const iconName = $icon.attr('icon');
      const newIconName = newIconNames[iconName];
      if (iconName && newIconName) {
        $icon.attr('icon', newIconName);
        $icon.removeAttr('class');
        $icon.empty();
        angularCompile($icon, $, rootScope);
      }
    });
  };

  /** Change product item markup */
  const changeProducts = () => {
    const $products = $('.ProductListItem');
    $products.each((index, element) => {
      const $product = $(element);

      $product.addClass(`${ID}_product-modified`);

      // Move CTAs to new row
      const $ctas = $product.find('.ProductDetails .ProductAction .Button');
      if ($ctas.length) {
        const $button = $product.children('.Button');
        if ($button.length) $button.remove();
        $ctas.appendTo($product);
      }

      // Move Reviews to below price
      const $price = $product.find('.Prices');
      const $stars = $product.find('.Rating');
      $stars.insertAfter($price);

      // Move product name to top
      const $productName = $product.find('.ProductName');
      $productName.prependTo($product);

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

      $product.find('.QtyDown').html(newDecreaseQty);
      $product.find('.QtyUp').html(newIncreaseQty);

      // Move labels to top
      const $labels = $product.find('.product-options, .product-badge');
      if ($labels.length) {
        const $labelsContainer = $(`<div class="${ID}_labels"></div>`);
        $product.prepend($labelsContainer);
        $labelsContainer.append($labels);
      }
    });

    const $promoProducts = $('.SpecialOffersGetList .ProductListItem');
    $promoProducts.each((index, element) => {
      const $product = $(element);
      const $cta = $product.children('.Button');

      if ($cta.length && !$cta.hasClass(`${ID}_button-modified`)) {
        $cta.addClass(`${ID}_button-modified`);
        $cta.attr('ng-show', '!product.Conditional || product.Conditional.CanAddToCart');
        angularCompile($cta, $, $cta.eq(0).scope());
      }
    });
  };

  /** Make all changes */
  const init = () => {
    createHeading();
    moveSocialIcons();
    changeSocialIcons();
    changeProducts();

    const $productList = $('.ProductList');

    // Re-run functions on changes to the product list
    observer.connect($productList, () => {
      changeProducts();
    }, {
      config: { attributes: false, subtree: true, childList: true },
      throttle: 0,
    });
  };

  init();
};
