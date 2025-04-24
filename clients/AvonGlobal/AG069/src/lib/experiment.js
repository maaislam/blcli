/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import VariantSelectorPLP from "./components/VariantSelectorPLP/VariantSelectorPLP";
import {
  getTemplate,
  replaceTemplate,
  angularCompile,
  angularContextWrap,
  loadProductData,
} from "../../../../../lib/utils/avon";
import { observer, group } from "../../../../../lib/utils";

export default () => {
  setup();
  const { ID, rootScope, VARIATION } = shared;
  const $productList = $("product-list");

  /**
   * Add product IDs to the DOM by modifying the product template
   * This way we can avoid making lots of calls to $(product).scope() to
   * retrieve each ID
   * @returns {Promise}
   */
  const updateProductListTemplate = () =>
    new Promise((resolve, reject) => {
      const templateName = "productListTemplate.html";
      const directiveName = "product-list";
      const template = getTemplate(templateName);
      const $template = $("<div>").html(template);
      const $product = $template.find(".ProductListCell .ProductListItem");

      // Add product ID
      $product.prepend(
        '<span data-product-id="{{::product.Id}}" style="display: none;" ></span>'
      );

      // Move qty input out of ng-if statement so it's available for all products
      const $productActions = $product.find(".ProductAction");
      const $qty = $product.find("productquantity");
      $productActions.prepend($qty);

      // Add product type classes
      $product.attr(
        "ng-class",
        `{"${ID}_hasVariants": !product.SingleVariantSku, "${ID}_isConditional": product.Conditional}`
      );

      // Update layout for products with a variant.
      $template.find(".ProductDetails").after(`
        <div ng-if="::(product.Availability==1 && product.HasActiveVariant && !product.SingleVariantSku && product.IsShadeVariant)" class="${ID}_VariantSelectorPLP">
          <div class="${ID}_VariantSelectorPLPVariants">
            <div class="Arrow ${ID}_VariantSelectorPLParrowLeft"><img src="https://cdn-eu.dynamicyield.com/api/9877923/images/2210e98183589__arrow.svg" /></div>
            <ul>
              <li class="${ID}_loader"></li>
              <li class="${ID}_loader"></li>
              <li class="${ID}_loader"></li>
              <li class="${ID}_loader"></li>
            </ul>
            <div class="Arrow ${ID}_VariantSelectorPLParrowRight"><img src="https://cdn-eu.dynamicyield.com/api/9877923/images/2210e98183589__arrow.svg" /></div>
          </div>
          <div class="${ID}_ctaWrapper">
            <div class="viewProduct">
              <a class="Button vi-btn vi-btn--primary" ng-click="viewProduct(product)"><span>Купить</span></a>
            </div>
            </div>
          </div>
      `);

      replaceTemplate(templateName, $template.html(), () => {
        // Re-compile directive
        const $section = $(directiveName);
        $section.empty();
        angularCompile($section, $, $section.scope());
        angularContextWrap(resolve);
      });
    });

  /**
   * Return an array of all product IDs on the page
   * @returns {Array.<String>}
   */
  const getPageProductIds = () =>
    $("[data-product-id]")
      .map((index, item) => $(item).attr("data-product-id"))
      .toArray();

  /**
   * Get an array of promises for request data
   * @returns {Array.<Promise>}
   */
  const getProductDataPromises = () => {
    const IDs = getPageProductIds();
    return IDs.map(
      (productId) =>
        new Promise((resolve, reject) => {
          loadProductData([productId])
            .then((data) => {
              resolve(data[0]);
            })
            .catch(() => {
              console.error(`Failed to get variant data for ${productId}`);
            });
        })
    );
  };

  /**
   * Get all the product data including shade variants for every
   * product on the page
   * @returns {Object}
   */
  const getPageProductData = () =>
    new Promise((resolve, reject) => {
      const productDataPromises = getProductDataPromises();
      Promise.all(productDataPromises)
        .then((data) => {
          /*
           * Data is not returned in order so convert it into an object
           * where the keys are the product IDs for easier access
           */
          const formattedData = [...data].reduce(
            (allProductDataObj, productData) => ({
              ...allProductDataObj,
              [productData.Id]: productData,
            }),
            {}
          );
          resolve(formattedData);
        })
        .catch((err) => {
          console.log(err);
        });
    });

  /**
   * Add a variant selector to any eligble product
   * on the page
   */
  const addVariantSelectorsToPage = () => {
    getPageProductData().then((pageProductData) => {
      const $products = $productList.find(".ProductListItem");

      $products.each((index, element) => {
        const $product = $(element);
        if ($product.hasClass(`${ID}_variants-added`)) return "";
        const productId = $product
          .find("[data-product-id]")
          .attr("data-product-id");
        const productData = pageProductData[productId];

        if (
          productData &&
          productData.VariantGroups.length &&
          productData.CanAddToCart &&
          !productData.IsConditional &&
          !productData.SingleVariantSku
        ) {
          /*
           * VariantSelectorPLP expects an array of all variants, not variant groups
           * Reduce variant groups to a single array then flatten for an array of all variants
           */
          const variants = productData.VariantGroups.reduce(
            (acc, val) => acc.concat(val.Variants),
            []
          ).flat();

          try {
            $product.addClass(`${ID}_variants-added`);
            new VariantSelectorPLP($product, variants);
          } catch (err) {
            console.error("AG069", err);
          }
        }
      });

      fireEvent("Swatches loaded");
    });
  };

  /** Make all changes */
  const init = () => {
    fireEvent("Conditions Met");

    if (VARIATION == "control") {
      return;
    }

    fireEvent("Swatches starting to load");
    addVariantSelectorsToPage();
  };

  setTimeout(() => {
    updateProductListTemplate().then(init);
  }, 1000);

  // Re-run functions on changes to the product list
  observer.connect(
    $productList.children(".ProductList"),
    () => {
      setTimeout(() => {
        init();
      }, 1500);
    },
    {
      config: { attributes: false, subtree: false, childList: true },
      throttle: 200,
    }
  );
};
