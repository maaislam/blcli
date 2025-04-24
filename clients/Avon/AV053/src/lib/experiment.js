/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { events } from '../../../../../lib/utils';
import { angularCompile, angularContextWrap, getTemplate, replaceTemplate } from '../../../../../lib/utils/avon';
import Modal from './components/Modal/Modal';
import { setup } from './services';
import shared from './shared';

export default () => {
  setup();
  const { rootScope, ID } = shared;
  const modal = new Modal();

  const modifyProductListTemplate = () => new Promise((resolve, reject) => {
    const templateName = 'productListTemplate.html';
    const directiveName = 'product-list';
    const template = getTemplate(templateName);
    const $template = $('<div>').html(template);
    const $product = $template.find('.ProductListCell .ProductListItem');

    // Add product ID to DOM
    $product.attr('data-product-id', '{{::product.Id}}');

    // Add product type classes
    $product.attr('ng-class', `{"${ID}_hasVariants": !product.SingleVariantSku, "${ID}_isConditional": product.Conditional}`);

    // Make layout 3 columns
    $template
      .find('.ProductList')
      .removeClass('Columns_2')
      .addClass('Columns_3 ReadyToDisplay')
      .removeAttr('ng-class');

    // Move product badge to below image
    // Add appropriate badge styles (NEW / OFF variants)
    const $badge = $template.find('.product-badge');
    $badge.appendTo($badge.parent());
    $badge.attr('ng-class', `{"${ID}_badgeBlack": product.BadgeText.toLowerCase().indexOf('new') !== -1}`);

    // Add 'View More Images' Modal button to the image wrapper
    const $modalButton = $(`<div class="${ID}_modalButton" ng-click="$parent.$parent.openImageModal(product, Qty, addProductToCart, viewProduct)"><span>View more images</span></div>`);
    $badge.parent().parent().parent().append($modalButton);

    // Move exclusive offers to below the cta
    const $offers = $template.find('.ExclusiveOffers');
    const $detailsTop = $template.find('.ProductDetails');
    $offers.appendTo($detailsTop);

    // Expand price element to fill available space.
    const $prices = $template.find('.Prices');
    $prices.attr('ng-class', `{"${ID}_hasListPrice": product.ListPrice && product.IsOnSale}`);

    // Add filler element if no promotion to keep CTA allignment
    const $offersGhost = $(`<div class="${ID}_ghostOffer"></div>`);
    $offersGhost.attr('ng-class', `{"${ID}_hideGhost": product.Availability==1 && product.Promotions.length && product.HasActiveVariant}`);
    const $cta = $template.find('.ProductAction');
    $offersGhost.appendTo($cta);

    // Add filler padding if no quantity selector to keep CTA/price allignment
    $cta.attr('ng-class', `{"${ID}_ctaTopSpace": !(product.Availability==1 && product.HasActiveVariant && product.SingleVariantSku)}`);

    // Add reviews count to the reviews
    $template.find('.Rating').append(`<span class="${ID}_reviewsCount">({{product.RatingCount}})</span>`);

    replaceTemplate(templateName, $template.html(), () => {
      // Re-compile directive
      const $section = $(directiveName);
      $section.empty();
      const $sectionScope = $section.scope();
      angularCompile($section, $, $sectionScope, () => {
        $sectionScope.$apply(() => {
          // Add 'Open Modal' function to the ProductList scope.
          const openImageModal = (product, Qty, addProductToCart, viewProduct) => {
            events.send(ID, 'Click', 'View more images button');
            modal.createModal(product, Qty, addProductToCart, viewProduct);

          };
          $sectionScope.openImageModal = openImageModal;
        })
        angularContextWrap(resolve);
      });
    });
  });

  /** Make all changes - can be re-run on page re-render / App_LayoutChanged */
  const init = () => {
    modifyProductListTemplate();
  };


  // Make device specific changes when layout changes
  rootScope.$on('App_LayoutChanged', () => {
    setTimeout(init, 500);
  });

  init();
};
