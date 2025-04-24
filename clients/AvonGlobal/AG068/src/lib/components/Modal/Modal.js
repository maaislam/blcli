import shared from "../../shared";
import { events } from "../../../../../../../lib/utils";
import { angularCompile } from "../../../../../../../lib/utils/avon";
import loadSiema from "../../siema";
import { fireEvent } from "../../services";

export default class Modal {
  /**
   * @param {Object} productData
   */
  constructor() {
    const { ID } = shared;

    this.ID = ID;
    this.$ = shared.$;
    this.rootScope = shared.rootScope;
    this.componentName = `${ID}_ModalImages`;

    this.openModal = this.openModal.bind(this);
    this.createModal = this.createModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.bindEvents = this.bindEvents.bind(this);
  }

  /**
   * Open the modal
   */
  openModal() {
    const { rootScope, $modal, $modalCarousel } = this;
    const modalID = $modal.attr("id");
    rootScope.ModalShowId(modalID);
    // Update the carousel after opening
    // $modalCarousel.scope().update();

    const $slides = $(`.${this.componentName}_slides-wrapper`);
    $slides.addClass("xloading");
    setTimeout(() => {
      const mySiema = new Siema({
        selector: `.${this.componentName}_slides`,
        loop: true,
        draggable: false,
      });

      $slides.removeClass("xloading");

      if ($slides.find("img").length <= 3) {
        document
          .querySelector(`.${this.componentName}_slides__btn--prev`)
          .remove();
        document
          .querySelector(`.${this.componentName}_slides__btn--next`)
          .remove();
      } else {
        document
          .querySelector(`.${this.componentName}_slides__btn--prev`)
          .addEventListener("click", () => mySiema.prev());

        document
          .querySelector(`.${this.componentName}_slides__btn--next`)
          .addEventListener("click", () => mySiema.next());
      }
    }, 2000);
  }

  createModal(productData, Qty, addProductToCart, viewProduct) {
    const { $, componentName, rootScope } = this;

    const imageUrlsToCheck = [];
    const images = [];

    // This simply generates a URL of an image, but some images may not exist.
    // @TODO if there's a way to get actual product images, this would work much better.
    for (let i = 1; i < 8; i++) {
      const img = rootScope.Cdn.ProductImageXtraLarge(
        productData.ProfileNumber,
        i
      );
      imageUrlsToCheck.push(img);
    }

    // Pre-check the images to prevent 404s
    // imageUrlsToCheck.forEach((url, i) => {
    //   $.ajax({
    //     url,
    //     type: 'HEAD',
    //     async: false,
    //     success: () => {
    //       //Image exists, add to list
    //       images.push(url);
    //     },
    //     error: (result) => {
    //       // Ignore - image does not exist (404)
    //     }
    //   });
    // });

    const imageSlides = imageUrlsToCheck
      .map((image) => {
        return `
      <div class="${componentName}_slide">
        <img ng-click="viewProduct(product)" onerror='this.parentNode.remove()' alt="${productData.Name}" fallback-src="/styles/core/images/productfallback.svg" src="${image}">
      </div>
      `;
      })
      .join("");

    const $modalContent = $(
      `
      <div class="${componentName}" class="ng-scope">
          <div class="${componentName}_wrap">
            <div class="${componentName}_titleBlock">
              <div ng-click="viewProduct(product)" class="${componentName}_title">${
        productData.Name
      }</div>
            </div>

            <div class="${componentName}_slides-wrapper">
              <div class="${componentName}_slides">
                ${imageSlides}
              </div>
              <button class="${componentName}_slides__btn ${componentName}_slides__btn--prev">
                <svg-icon icon="pdp-left-arrow" class="PdpCarousel ng-isolate-scope"><!-- ngIf: Ready --><svg ng-if="Ready" class="PdpCarousel" style=""><use xlink:href="#Svg_pdp-left-arrow" ng-attr-xlink:href="{{TrustedSvgHref()}}"></use></svg><!-- end ngIf: Ready --></svg-icon>
              </button>
              <button class="${componentName}_slides__btn ${componentName}_slides__btn--next">
                <svg-icon icon="pdp-right-arrow" class="PdpCarousel ng-isolate-scope"><!-- ngIf: Ready --><svg ng-if="Ready" class="PdpCarousel" style=""><use xlink:href="#Svg_pdp-right-arrow" ng-attr-xlink:href="{{TrustedSvgHref()}}"></use></svg><!-- end ngIf: Ready --></svg-icon>
              </button>
            </div>

            <div class="${componentName}_detailsBlock">
              <div class="${componentName}_details">
                <div class="${componentName}_priceBlock">
                  ${
                    productData.ListPrice && productData.IsOnSale
                      ? `<div class="${componentName}_wasPrice">${productData.ListPriceFormatted}</div>`
                      : ""
                  }
                  <div class="${componentName}_price">${
        productData.SalePriceFormatted
      }</div>
                </div>

                <div class="${componentName}_ctaBlock">
                  <div class="${componentName}_ProductAction">
                  ${
                    productData.Availability == 1 &&
                    productData.HasActiveVariant &&
                    productData.SingleVariantSku
                      ? `<div class="AddToCart">
                        <productquantity quantity="Qty" quantitydefault="1" min="1"></productquantity>
                        <a class="Button vi-btn vi-btn--primary" ng-click="addProductToCart(product, Qty)"><span>Add to bag</span></a>
                    </div>`
                      : ""
                  }

                  ${
                    productData.Availability == 1 &&
                    productData.HasActiveVariant &&
                    !productData.SingleVariantSku &&
                    productData.IsShadeVariant
                      ? `<div class="viewProduct">
                        <a class="Button vi-btn vi-btn--primary" ng-click="viewProduct(product)"><span>View Colour Options</span></a>
                    </div>`
                      : ""
                  }

                  ${
                    productData.Availability == 1 &&
                    productData.HasActiveVariant &&
                    !productData.SingleVariantSku &&
                    productData.IsSizeVariant &&
                    !productData.IsShadeVariant
                      ? `<div class="viewProduct">
                        <a class="Button vi-btn vi-btn--primary" ng-click="viewProduct(product)"><span>View Size Options</span></a>
                    </div>`
                      : ""
                  }

                  ${
                    productData.Availability != 1 ||
                    !productData.HasActiveVariant ||
                    (!productData.SingleVariantSku &&
                      !productData.IsShadeVariant &&
                      !productData.IsSizeVariant)
                      ? `<div class="viewProduct">
                        <a class="Button vi-btn vi-btn--primary" ng-click="viewProduct(product)"><span>View product</span></a>
                    </div>`
                      : ""
                  }
                  </div>
                </div>
              </div>
              <div class="${this.ID}_offersWrapper">
                  <rating value="{{product.Rating}}" ng-if="product.Rating"></rating>
                  ${productData.IsNew ? `<div><span>NEW IN</span></div>` : ``}
                  ${
                    productData.IsBestSeller
                      ? `<div><span>BESTSELLER</span></div>`
                      : ``
                  }
                  <div class="product-options ng-scope" ng-if="(!product.SingleVariantSku && product.IsShadeVariant)">
                    <span>More Colours Available</span>
                  </div>
              </div>
            </div>
          </div>
        </div>
      `
    );

    let $modalWrapper = $(`#${componentName}_modal`);
    if ($modalWrapper.length === 0) {
      $modalWrapper = $(`
        <modal id="${componentName}_modal" class="${componentName}_modal" ng-controller="ProductDetailGalleryModalController" class="ng-scope">
        </modal>
      `);

      $modalWrapper.append($modalContent);
      // Inject to the page.
      $("body").append($modalWrapper);

      loadSiema();
    } else {
      $modalWrapper.empty().append($modalContent);
    }

    this.$modal = $modalWrapper;
    this.$modalCarousel = $modalWrapper.find("carousel");

    const $modalScope = $modalWrapper.scope();
    this.bindEvents();

    angularCompile($modalWrapper, $, $modalScope, () => {
      $modalScope.$apply(() => {
        $modalScope.product = productData;
        $modalScope.Qty = 1;
        $modalScope.viewProduct = (product) => {
          viewProduct(product);
          fireEvent("Click - view product button in modal");
        };
        $modalScope.addProductToCart = (product, Qty) => {
          this.closeModal();
          addProductToCart(product, Qty);
          fireEvent("Click - add to bag button in modal");
        };
      });
      this.openModal();
    });

    // events.send(ID, 'Open', 'Opened modal');
  }

  /**
   * Close the modal
   */
  closeModal() {
    const { rootScope, $modal } = this;

    if ($modal) {
      const modalID = $modal.attr("id");
      rootScope.ModalCloseId(modalID);
    }
  }

  /**
   * Bind event handlers
   */
  bindEvents() {
    const { $modal, componentName, closeModal } = this;

    // Event tracking
    // let $productLinks = $component.find(`.${componentName}_cta:not(".${componentName}_modalLink")`);
    // if ($modal) $productLinks = $productLinks.add($modal.find(`.${componentName}_cta:not(".${componentName}_modalLink")`));
    // $productLinks.click(() => {
    //   events.send(ID, 'Click', 'Product Link');
    // });
  }
}
