import shared from '../../shared';
//import { events } from "../../../../../../../lib/utils";
import { angularCompile } from '../../../../../../../lib/utils/avon';
//import loadSiema from '../../siema';
import { fireEvent } from '../../services';

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
    const { rootScope, $modal } = this;
    const modalID = $modal.attr('id');
    rootScope.ModalShowId(modalID);
    fireEvent('Open - Quick View');
    setTimeout(() => {
      const ele = document.querySelector('.AG086a_ModalImages_thumbs');
      ele.style.cursor = 'grab';

      let pos = { top: 0, left: 0, x: 0, y: 0 };

      const mouseDownHandler = function (e) {
        ele.style.cursor = 'grabbing';

        ele.style.userSelect = 'none';

        pos = {
          left: ele.scrollLeft,
          top: ele.scrollTop,
          // Get the current mouse position
          x: e.clientX,
          y: e.clientY,
        };

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
      };

      const mouseMoveHandler = function (e) {
        // How far the mouse has been moved
        const dx = e.clientX - pos.x;
        const dy = e.clientY - pos.y;

        // Scroll the element
        ele.scrollTop = pos.top - dy;
        ele.scrollLeft = pos.left - dx;
      };

      const mouseUpHandler = function () {
        ele.style.cursor = 'grab';
        ele.style.removeProperty('user-select');

        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
      };

      // Attach the handler
      ele.addEventListener('mousedown', mouseDownHandler);
    }, 2000);
  }

  createModal(productData, Qty, addProductToCart, viewProduct) {
    console.log(productData);
    const { $, componentName, rootScope } = this;

    const imageUrlsToCheck = [];

    // This simply generates a URL of an image, but some images may not exist.
    // @TODO if there's a way to get actual product images, this would work much better.
    for (let i = 1; i < 8; i++) {
      const img = rootScope.Cdn.ProductImageXtraLarge(productData.ProfileNumber, i);
      imageUrlsToCheck.push(img);
    }

    const imageThumbs = imageUrlsToCheck
      .map((image, id) => {
        return `
        <img class="${
          id === 0 ? `${componentName}_active` : ''
        }" onclick="document.querySelector('.${componentName}_image').src='${image}';" onerror='this.remove()' alt="${
          productData.Name
        }" fallback-src="/styles/core/images/productfallback.svg" src="${image}">
      `;
      })
      .join('');

    const $modalContent = $(
      `
      <div class="${componentName}" class="ng-scope" data-prod-id="${productData.Id}">
          <div class="${componentName}_wrap">
            <div class="${componentName}_titleBlock">
              <div class="${componentName}_viewProduct" ng-click="viewProduct(product)">
              View Product
              </div>
              <div class="${componentName}_title">${productData.Name}</div>
              <div class="${componentName}_close" ng-click="CloseClick()">
                <svg width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.29143 1.00013L21.8903 20" stroke="#7F28C4" stroke-width="2" stroke-linecap="round"/>
                  <path d="M21.8902 1L1.29131 19.9999" stroke="#7F28C4" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </div>
            </div>

            <div class="${componentName}_content">
              <div class="${componentName}_thumbs">
               ${imageThumbs}
              </div>


              <div ng-click="viewProduct(product)" class="${componentName}_mainImage">
                <img
                class="${componentName}_image"
                alt="${productData.Name}"
                fallback-src="/styles/core/images/productfallback.svg"
                src="${imageUrlsToCheck[0]}">
              </div>


              <div class="${componentName}_details">
                
                <div class="${componentName}_description">
                </div>

                  <div class="${componentName}_ctaBlock">
                  
                  <div class="${componentName}_prices">
                  ${
                    productData.ListPrice && productData.IsOnSale
                      ? `<div class="${componentName}_wasPrice">${productData.ListPriceFormatted}</div>`
                      : ''
                  }
                    <div class="${componentName}_price">${productData.SalePriceFormatted}</div>
      </div>
                    ${
                      productData.Availability == 1 && productData.HasActiveVariant && productData.SingleVariantSku
                        ? `<div class="AddToCart">
                          <productquantity quantity="Qty" quantitydefault="1" min="1"></productquantity>
                          <a class="Button vi-btn vi-btn--primary" ng-click="addProductToCart(product, Qty)"><span>Přidat Do Košíku</span></a>
                      </div>`
                        : ''
                    }
                </div>
                <div class="${this.ID}__label-wrapper">
                <div ng-if="product.RatingCount" class="${componentName}_reviewsWrapper">
                  <rating value="{{product.Rating}}" ng-if="product.Rating"></rating>
                  
                </div>
                <div class="${this.ID}_tag" ng-if="product.IsNew"><span class="new-in">NEW IN</span></div>
                <div class="${
                  this.ID
                }_tag" ng-if="product.IsShadeVariant"><span class="new-in">More Colours Available</span></div>
                <div class="${this.ID}_tag" ng-if="product.IsSizeVariant"><span class="new-in">More Sizes Available</span></div>
                <div class="${this.ID}_tag" ng-if="product.IsBestSeller"><span>&#9733;BESTSELLER&#9733;</span></div>
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
      $('body').append($modalWrapper);
    } else {
      $modalWrapper.empty().append($modalContent);
    }

    this.$modal = $modalWrapper;
    this.$modalCarousel = $modalWrapper.find('carousel');

    $('.ModalClose').html(`<svg width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.29143 1.00013L21.8903 20" stroke="#7F28C4" stroke-width="2" stroke-linecap="round"/>
</svg>
`);

    const $modalScope = $modalWrapper.scope();
    this.bindEvents();
    const desc = productData.MetaDescription.replace(
      'Sada obsahuje:',
      `<span class='${componentName}_descriptionLabel'>Sada obsahuje:</span>`
    ).replace(
      'Hlavní složky:',
      `<span class='${componentName}_descriptionLabel' style="margin-top: 16px;">Hlavní složky:</span>`
    );
    $(`.${componentName}_description`).html(desc);

    angularCompile($modalWrapper, $, $modalScope, () => {
      $modalScope.$apply(() => {
        $modalScope.product = productData;
        $modalScope.Qty = 1;
        $modalScope.viewProduct = (product) => {
          viewProduct(product);
          fireEvent('Click - view product button in modal');
        };
        $modalScope.addProductToCart = (product, Qty) => {
          this.closeModal();
          addProductToCart(product, Qty);
          fireEvent('Click - add to bag button in modal');
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
      const modalID = $modal.attr('id');
      rootScope.ModalCloseId(modalID);
    }
  }

  /**
   * Bind event handlers
   */
  bindEvents() {
    const { $modal, componentName, closeModal } = this;

    // Image active class toggle
    $(`.${componentName}_thumbs img`).click(function () {
      $(`.${componentName}_thumbs img`).removeClass(`${componentName}_active`);
      $(this).addClass(`${componentName}_active`);
    });

    // Event tracking
    // let $productLinks = $component.find(`.${componentName}_cta:not(".${componentName}_modalLink")`);
    // if ($modal) $productLinks = $productLinks.add($modal.find(`.${componentName}_cta:not(".${componentName}_modalLink")`));
    // $productLinks.click(() => {
    //   events.send(ID, 'Click', 'Product Link');
    // });
  }
}
