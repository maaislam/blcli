/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import {
  angularCompile,
  angularContextWrap,
  getTemplate,
  replaceTemplate,
} from "../../../../../lib/utils/avon";
import Modal from "./components/Modal/Modal";
import { fireEvent } from "./services";
import shared from "./shared";

export default () => {
  const { rootScope, ID, VARIATION } = shared;
  const modal = new Modal();

  const modifyProductListTemplate = () =>
    new Promise((resolve, reject) => {
      const templateName = "productListTemplate.html";
      const directiveName = "product-list";
      const template = getTemplate(templateName);
      const $template = $("<div>").html(template);
      const $product = $template.find(".ProductListCell .ProductListItem");
      const $rating = $template.find("rating");
      const $image = $template.find(".ProductImage");
      const $prices = $template.find(".Prices");

      // Add product ID to DOM
      $product.attr("data-product-id", "{{::product.Id}}");

      // Add product type classes
      $product.attr(
        "ng-class",
        `{"${ID}_hasVariants": !product.SingleVariantSku, "${ID}_isConditional": product.Conditional}`
      );

      // Move product name after reviews.
      if (VARIATION === "1") {
        $template.find(".Prices").before($template.find(".ProductName"));

        $template.find(".Price").after($template.find(".ListPrice"));

        // Adjust CTA labels
        $template.find(".ProductAction").html(`
          <div ng-if="::(product.Availability==1 &amp;&amp; product.HasActiveVariant &amp;&amp; product.SingleVariantSku)" class="AddToCart">
            <productquantity quantity="Qty" quantitydefault="1" min="1"></productquantity>
            <a class="Button vi-btn vi-btn--primary" ng-click="addProductToCart(product, Qty)"><span>Add to bag</span></a>
          </div>

          <div ng-if="::(product.Availability==1 &amp;&amp; product.HasActiveVariant &amp;&amp; !product.SingleVariantSku &amp;&amp; product.IsShadeVariant)" class="viewProduct">
              <a class="Button vi-btn vi-btn--primary" ng-click="viewProduct(product)"><span>View Colours</span></a>
          </div>
          <div ng-if="::(product.Availability==1 &amp;&amp; product.HasActiveVariant &amp;&amp; !product.SingleVariantSku &amp;&amp; product.IsSizeVariant &amp;&amp; !product.IsShadeVariant)" class="viewProduct">
              <a class="Button vi-btn vi-btn--primary" ng-click="viewProduct(product)"><span>View Sizes</span></a>
          </div>
          <div ng-if="::(product.Availability!=1 || !product.HasActiveVariant || (!product.SingleVariantSku &amp;&amp; !product.IsShadeVariant &amp;&amp; !product.IsSizeVariant))" class="viewProduct">
              <a class="Button vi-btn vi-btn--primary" ng-click="viewProduct(product)"><span>View product</span></a>
          </div>
        `);

        // New in / Best seller tags in offers
        const $anchor = $template.find(".product-options");
        const $tagsWrapper = $(`<div class="${ID}_tagsWrapper"></div>`);
        $anchor.last().after($tagsWrapper);
        $tagsWrapper.append($anchor);
        $tagsWrapper.append(`
          <div class="${ID}_tag" ng-if="product.IsNew"><span class="new-in">NEW IN</span></div>
          <div class="${ID}_tag" ng-if="product.IsBestSeller"><span>&#9733;BESTSELLER&#9733;</span></div>
        `);
        $template.find(".PromotionLink").addClass(`${ID}_trackExclusive`);
      }

      // Move product name to be first
      if (VARIATION === "2") {
        // Rearrange content to match new layout
        $image.before($template.find(".ProductName"));

        // New wrappers
        const $detailsWrapper = $(`<div class="${ID}_detailsWrapper"></div>`);
        const $ctaWrapper = $(`<div class="${ID}_ctaWrapper"></div>`);
        const $offersWrapper = $(`<div class="${ID}_offersWrapper"></div>`);

        // Place existing elements in the new wrappers.
        $image.before($detailsWrapper);
        $detailsWrapper
          .append($image)
          .append($template.find(".ProductDetails"));

        $detailsWrapper.after($ctaWrapper);
        $ctaWrapper.after($offersWrapper);
        $offersWrapper.append($rating);

        // New in / Best seller tags in offers
        $offersWrapper.append(`
          <div class="${ID}_tag" ng-if="product.IsNew"><span class="new-in">NEW IN</span></div>
          <div class="${ID}_tag" ng-if="product.IsBestSeller"><span>&#9733;BESTSELLER&#9733;</span></div>
        `);

        const $modalButton = $(
          `<div class="${ID}_modalButton Button vi-btn" ng-click="$parent.$parent.openImageModal(product, Qty, addProductToCart, viewProduct)"><span>Quick View</span></div>`
        );

        // CTA
        $ctaWrapper.append($modalButton).append(`
          <div class="ProductAction">
            <div ng-if="::(product.Availability==1 && product.HasActiveVariant && product.SingleVariantSku)" class="AddToCart">
                <productquantity quantity="Qty" quantitydefault="1" min="1"></productquantity>
                <a class="Button vi-btn vi-btn--primary" ng-click="addProductToCart(product, Qty)"><span>Add to bag</span></a>
            </div>

            <div ng-if="::(product.Availability==1 && product.HasActiveVariant && !product.SingleVariantSku && product.IsShadeVariant)" class="viewProduct">
                <a class="Button vi-btn vi-btn--primary" ng-click="viewProduct(product)"><span>View Colours</span></a>
            </div>
            <div ng-if="::(product.Availability==1 && product.HasActiveVariant && !product.SingleVariantSku && product.IsSizeVariant && !product.IsShadeVariant)" class="viewProduct">
                <a class="Button vi-btn vi-btn--primary" ng-click="viewProduct(product)"><span>View Sizes</span></a>
            </div>
            <div ng-if="::(product.Availability!=1 || !product.HasActiveVariant || (!product.SingleVariantSku && !product.IsShadeVariant && !product.IsSizeVariant))" class="viewProduct">
                <a class="Button vi-btn vi-btn--primary" ng-click="viewProduct(product)"><span>View product</span></a>
            </div>
          </div>
        `);

        // Has a discount? Add a x% off badge if so.
        const $discountBadge =
          $(`<div ng-if="product.ListPrice && product.IsOnSale" class="${ID}_discountBadge">
              <span>{{(100 * (product.ListPrice - product.SalePrice) / product.ListPrice) | number: 0}}% OFF</span>
            </div>`);
        $prices.after($discountBadge);

        $offersWrapper.append($template.find(".product-options"));

        // Exclusive offer promotion
        const $exclusive = $template.find(".TooltipContent").children();
        $offersWrapper.append($exclusive);
        $exclusive.addClass(`${ID}_trackExclusive`);
      }

      // Make layout 3 columns
      $template
        .find(".ProductList")
        .removeClass("Columns_2")
        .addClass("Columns_3 ReadyToDisplay")
        .removeAttr("ng-class");

      // Move product badge to below image
      // Add appropriate badge styles (NEW / OFF variants)
      const $badge = $template.find(".product-badge");
      $badge.appendTo($badge.parent());
      $badge.attr(
        "ng-class",
        `{"${ID}_badgeBlack": product.BadgeText.toLowerCase().indexOf('new') !== -1}`
      );

      // Move exclusive offers to below the cta
      const $offers = $template.find(".ExclusiveOffers");
      const $detailsTop = $template.find(".ProductDetails");
      $offers.appendTo($detailsTop);

      // Expand price element to fill available space.
      $prices.attr(
        "ng-class",
        `{"${ID}_hasListPrice": product.ListPrice && product.IsOnSale}`
      );

      // Add filler element if no promotion to keep CTA allignment
      const $offersGhost = $(`<div class="${ID}_ghostOffer"></div>`);
      $offersGhost.attr(
        "ng-class",
        `{"${ID}_hideGhost": product.Availability==1 && product.Promotions.length && product.HasActiveVariant}`
      );
      const $cta = $template.find(".ProductAction");
      $offersGhost.appendTo($cta);

      // Add filler padding if no quantity selector to keep CTA/price allignment
      $cta.attr(
        "ng-class",
        `{"${ID}_ctaTopSpace": !(product.Availability==1 && product.HasActiveVariant && product.SingleVariantSku)}`
      );

      replaceTemplate(templateName, $template.html(), () => {
        // Re-compile directive
        const $section = $(directiveName);
        $section.empty();
        const $sectionScope = $section.scope();
        angularCompile($section, $, $sectionScope, () => {
          $sectionScope.$apply(() => {
            // Add 'Open Modal' function to the ProductList scope.
            const openImageModal = (
              product,
              Qty,
              addProductToCart,
              viewProduct
            ) => {
              fireEvent("Click - quick view");
              modal.createModal(product, Qty, addProductToCart, viewProduct);
            };
            $sectionScope.openImageModal = openImageModal;
          });
          angularContextWrap(resolve);
        });
      });
    });

  /** Make all changes - can be re-run on page re-render / App_LayoutChanged */
  const init = () => {
    modifyProductListTemplate();
    $(document).on("click", `.${ID}_trackExclusive`, () => {
      fireEvent("Click - exclusive offer");
    });
  };

  // Make device specific changes when layout changes
  rootScope.$on("App_LayoutChanged", () => {
    setTimeout(init, 500);
  });

  init();
};
