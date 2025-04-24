import shared from '../../shared';
import { events } from '../../../../../../../lib/utils';

export default class ProductBox {
  /**
   * @param {Object} productData
   * @param {number} index
   */
  constructor(productData, index) {
    const { ID } = shared;

    this.ID = ID;
    this.$ = shared.$;
    this.rootScope = shared.rootScope;
    this.layoutName = shared.layoutName;
    this.pageType = shared.pageType;
    this.productData = productData;
    this.index = index;
    this.componentName = `${ID}_ProductBox`;

    this.createComponent = this.createComponent.bind(this);
    this.createModal = this.createModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.createMostPopularContainer = this.createMostPopularContainer.bind(this);
    this.bindEvents = this.bindEvents.bind(this);
    this.renderDesktopAndTablet = this.renderDesktopAndTablet.bind(this);
    this.renderMobile = this.renderMobile.bind(this);
    this.angularCompile = this.angularCompile.bind(this);

    this.createComponent();
    if (this.pageType === 'search') {
      this.createModal();
    }
    this.bindEvents();
    if (this.layoutName === 'Desktop' || this.layoutName === 'Tablet') {
      this.renderDesktopAndTablet();
    } else if (this.layoutName === 'Phone') {
      this.renderMobile();
    }
    this.angularCompile();
  }

  /**
   * Create the box component
   * @returns {jQuery}
   */
  createComponent() {
    const { componentName, productData, pageType } = this;

    /**
     * @param {string} page
     * @returns {string}
     */
    const getPageMarkup = (page) => {
      const markup = {
        plp: `
          <div class="${componentName}_wrap">
            <div class="${componentName}">
              <div class="${componentName}_titleBlock">
                <div class="${componentName}_title">${productData.name}</div>
                <div class="${componentName}_priceBlock">
                  ${productData.wasPrice ? `<div class="${componentName}_wasPrice">${productData.wasPrice}</div>` : ''}
                  <div class="${componentName}_price">${productData.price}</div>
                </div>
                <div class="${componentName}_reviewStars">
                  <rating value="${productData.reviews}"></rating>
                </div>
              </div>

              <div class="${componentName}_detailsBlock">
                <div class="${componentName}_productImage">
                  <img src="${productData.img}" />
                </div>

                <div class="${componentName}_details">
                  <ul class="${componentName}_bullets">
                    ${productData.bullets.map(bullet => `<li><p>${bullet}</p></li>`).join('')}
                  </ul>

                  <div class="${componentName}_ctaBlock">
                    <div class="${componentName}_ctaUvp">${productData.ctaUvp}</div>
                    <a href="${productData.link}" class="${componentName}_cta">View ${productData.shortName || productData.name}</a>
                  </div>
                </div>
              </div>

              <div class="${componentName}--mobileOnly">
                <a href="${productData.link}" class="${componentName}_cta">View ${productData.shortName || productData.name}</a>
              </div>
            </div>
          </div>
        `,

        search: `
          <div class="${componentName}_wrap">
            <div class="${componentName}">
              <a href="#" class="${componentName}_modalLink--fullWidth ${componentName}_modalLink"></a>

              <div class="${componentName}_productImage ${componentName}_productImage--rotate ${componentName}--mobileOnly">
                <img src="${productData.img}" />
              </div>

              <div class="${componentName}_titleBlock">
                <div class="${componentName}_title">${productData.name}</div>
                <div class="${componentName}_priceBlock">
                  ${productData.wasPrice ? `<div class="${componentName}_wasPrice">${productData.wasPrice}</div>` : ''}
                  <div class="${componentName}_price">${productData.price}</div>
                </div>
                <div class="${componentName}_reviewStars">
                  <rating value="${productData.reviews}"></rating>
                </div>
              </div>

              <div class="${componentName}_detailsBlock">
                <div class="${componentName}_productImage">
                  <img src="${productData.img}" />
                </div>

                <div class="${componentName}_details">
                  <ul class="${componentName}_bullets">
                    ${productData.bullets.map(bullet => `<li><p>${bullet}</p></li>`).join('')}
                  </ul>

                  <div class="${componentName}_ctaBlock">
                    <div class="${componentName}_ctaUvp">${productData.ctaUvp}</div>
                    <a href="${productData.link}" class="${componentName}_cta">
                      View ${productData.shortName || productData.name}
                    </a>

                    <a href="#" class="${componentName}_cta ${componentName}_cta--modal ${componentName}_modalLink">
                      Discover more
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `,
      };

      return markup[page];
    };

    const $component = $(getPageMarkup(pageType));
    this.$component = $component;
    return $component;
  }

  /**
   * Create an accompanying modal
   */
  createModal() {
    const {
      $,
      index,
      productData,
      componentName,
    } = this;

    const $modal = $(`
      <modal id="${componentName}_modal${index}" class="${componentName}_modal" ng-controller="ProductDetailGalleryModalController" class="ng-scope">
        <div class="${componentName}_wrap">
            <div class="${componentName}">
              <div class="${componentName}_titleBlock">
                <div class="${componentName}_title">${productData.name}</div>
                <div class="${componentName}_reviewStars">
                  <rating value="${productData.reviews}"></rating>
                </div>
              </div>

              <carousel>
                ${productData.images.map(image => `
                  <div class="SmallImage Slide ng-scope" style="width: 285px;">
                    <a class="ImageButton ng-scope">
                      <div>
                        <div ng-style="frameStyle()" style="font-size: 28.5px;">
                          <div class="ImageWrapper Loaded">
                            <div class="ImageAspectRatio" style="padding-bottom: 100%;"></div>
                            <!-- <img itemprop="image" class="SmallImageMain" lazy-load="" alt="${productData.name}" fallback-src="/styles/core/images/productfallback.svg" resize="" data-src="{{ShopContext.ProductViewModel.ImageUrls[$index]}}"> -->
                            <img itemprop="image" class="SmallImageMain" lazy-load="" alt="${productData.name}" resize="" fallback-src="/styles/core/images/productfallback.svg" data-src="${image}">
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                `).join('')}
              </carousel>

              <div class="${componentName}_detailsBlock">
                <div class="${componentName}_details">
                  <div class="${componentName}_bulletsWrap">
                    <ul class="${componentName}_bullets">
                      ${productData.bullets.map(bullet => `<li><p>${bullet}</p></li>`).join('')}
                    </ul>
                  </div>

                  <div class="${componentName}_ctaUvp">${productData.ctaUvp}</div>

                  <div class="${componentName}_priceBlock">
                    ${productData.wasPrice ? `<div class="${componentName}_wasPrice">${productData.wasPrice}</div>` : ''}
                    <div class="${componentName}_price">${productData.price}</div>
                  </div>

                  <div class="${componentName}_ctaBlock">
                    <a href="${productData.link}" class="${componentName}_cta">View Product</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </modal>
    `);

    this.$modal = $modal;
    this.$modalCarousel = $modal.find('carousel');
  }

  /**
   * Open the modal
   */
  openModal() {
    const {
      ID,
      rootScope,
      $modal,
      $modalCarousel,
    } = this;

    events.send(ID, 'Open', 'Opened modal');
    if ($modal) {
      const modalID = $modal.attr('id');
      rootScope.ModalShowId(modalID);

      // Update the carousel after opening
      $modalCarousel.scope().update();
    }
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
   * Create a container for the most popular products
   * @returns {jQuery}
   */
  createMostPopularContainer() {
    const { componentName } = this;

    const $mostPopularContainer = $(`
      <div class="${componentName}_mostPopular">
        <div class="${componentName}_mostPopularTitle">Top Rated</div>
        <div class="${componentName}_mostPopularProducts"></div>
      </div>
    `);

    this.$mostPopularContainer = $mostPopularContainer;
    return $mostPopularContainer;
  }

  /**
   * Bind event handlers
   */
  bindEvents() {
    const {
      $,
      ID,
      componentName,
      $component,
      $modal,
      openModal,
    } = this;

    // Modal
    const $modalLink = $component.find(`.${componentName}_modalLink`);
    if ($modalLink.length) {
      $modalLink.click((e) => {
        e.preventDefault();
        openModal();
      });
    }

    // Event tracking
    let $productLinks = $component.find(`.${componentName}_cta:not(".${componentName}_modalLink")`);
    if ($modal) $productLinks = $productLinks.add($modal.find(`.${componentName}_cta:not(".${componentName}_modalLink")`));
    $productLinks.click(() => {
      events.send(ID, 'Click', 'Product Link');
    });
  }

  /**
   * Render on mobile by inserting product in a "Most Popular"
   * container at the top of the page
   */
  renderDesktopAndTablet() {
    const { componentName, $component } = this;

    let $mostPopularContainer = $(`.${componentName}_mostPopular`);

    // Create container if it doesn't exist
    if (!$mostPopularContainer.length) {
      $mostPopularContainer = this.createMostPopularContainer();
      $mostPopularContainer.prependTo('#MainContentWrapper');
    }

    $mostPopularContainer.find(`.${componentName}_mostPopularProducts`).append($component);
  }

  /**
   * Render on mobile by inserting product in the product grid
   * Show first product above the pagination and any other products
   * before every other product
   */
  renderMobile() {
    const {
      $,
      pageType,
      componentName,
      $component,
      $modal,
    } = this;

    const pageRenderMobile = {
      plp: () => {
        const $products = $('.ProductListCell');
        const popularProductsCount = $(`.${componentName}`).length;

        switch (popularProductsCount) {
          case 0:
            $('.ProductListHeading').before($component);
            break;

          case 1:
            $products.eq(1).after($component);
            break;

          case 2:
            $products.eq(6).after($component);
            break;

          default:
            break;
        }
      },

      search: () => {
        let $mostPopularContainer = $(`.${componentName}_mostPopular`);

        // Create container if it doesn't exist
        if (!$mostPopularContainer.length) {
          $mostPopularContainer = this.createMostPopularContainer();
          $('.ProductListHeading').before($mostPopularContainer);
        }

        $mostPopularContainer.find(`.${componentName}_mostPopularProducts`).append($component);

        // Render modal
        if ($modal) {
          $('body').append($modal);
        }
      },
    };

    const render = pageRenderMobile[pageType];
    if (render instanceof Function) {
      render();
    }
  }

  /**
   * Use the Angular compiler to compile any Avon templates in the component
   * e.g. <rating>
   */
  angularCompile() {
    /* eslint-disable prefer-arrow-callback */
    const {
      $,
      rootScope,
      $component,
      $modal,
    } = this;
    $('body').injector().invoke(['$compile', '$timeout', function invokeInjector($compile, $timeout) {
      /*
        $timeout must be used to avoid an error that occurs when $apply or
        $digest is called whilst that service is currently running

        Read more:
        https://code.angularjs.org/1.4.2/docs/error/$rootScope/inprog?p0=$apply
      */
      $timeout(function compileComponent() {
        $compile($component)(rootScope);

        $timeout(function compileModal() {
          $compile($modal)(rootScope);
        }, 0);
      }, 0);
    }]);
    /* eslint-enable prefer-arrow-callback */
  }
}
