/**
 * EJ019 - PLP - Pagination
 * @author Lewis Needham - User Conversion
 */
import { setup } from './services';
import { events, updateUrlParameter, viewabilityTracker } from './../../../../lib/utils';
import { observer, pollerLite } from './../../../../lib/uc-lib';
import settings from './settings';

const activate = () => {
  setup();

  const { ID, VARIATION } = settings;
  const $ = window.jQuery;

  // Disable infinite scroll
  $(document).trigger('destroy-infiniteScroll');
  $(() => {
    $(document).trigger('destroy-infiniteScroll');
  });

  /**
   * LoadMore Component
   */
  const loadMoreComponent = () => {
    const cName = `${ID}_LoadMore`;
    const productList = document.querySelector('#list');
    const productContainer = document.querySelector('.product-tile-list');
    const products = productContainer.querySelectorAll('.product-tile-list__item');
    const loader = document.querySelector('.loading-indicator-next');
    const FIRST_PAGE = Number(productList.getAttribute('data-starting-page'));
    const LAST_PAGE = Number(productList.getAttribute('data-final-page'));
    let nextPageNumber = (FIRST_PAGE + 1) > LAST_PAGE ? LAST_PAGE : (FIRST_PAGE + 1);
    let waitingForAJAX = false;

    const $component = $(`
      <div class="${cName}">
        <div class="${cName}__progressBar" style="display:none;">
          <div class="${cName}__progressBar__text">
            Viewing <span class="${cName}__progressBar__current"></span> of <span class="${cName}__progressBar__total"></span> products
          </div>
          <div class="${cName}__progressBar__bar"><div class="${cName}__progressBar__bar__inner"></div></div>
        </div>
        <div class="${cName}__CTA">Show more products</div>
      </div>
    `);

    /**
     * Update the status of the progress bar
     */
    const updateProgressBar = () => {
      try {
        const CURRENT_PRODUCT_COUNT = $('.product-tile-list__item').length;
        const TOTAL_PRODUCT_COUNT = Number(document.querySelector('.browse__total-result-container').innerText.match(/\d+/g)[0]);
        const PERCENTAGE = ((CURRENT_PRODUCT_COUNT / TOTAL_PRODUCT_COUNT).toFixed(2)) * 100;

        // Update bar width
        $component.find(`.${cName}__progressBar__bar__inner`).css('width', `${PERCENTAGE}%`);

        // Update numbers
        $component.find(`.${cName}__progressBar__current`).text(CURRENT_PRODUCT_COUNT > TOTAL_PRODUCT_COUNT ? TOTAL_PRODUCT_COUNT : CURRENT_PRODUCT_COUNT);
        $component.find(`.${cName}__progressBar__total`).text(TOTAL_PRODUCT_COUNT);

        $component.find(`.${cName}__progressBar`).show();
      } catch (e) {}
    };

    /**
     * Fixes broken image sources for AJAX products
     */
    const imageFix = ($products) => {
      $products.each(function fix() {
        const $img = $(this).find('.product-tile__image');
        const src = $img.attr('data-src');
        const srcset = $img.attr('data-srcset');
        $img.attr({ src, srcset });
      });
    };

    // Keep array of SKUs for all shown products
    const shownProducts = [];
    $(products).each(function pushSku() {
      const skuEl = $(this).find('meta[itemprop="sku"]');
      if (skuEl) {
        shownProducts.push(skuEl.attr('content'));
      }
    });

    /**
     * Remove duplicate products
     */
    const removeDuplicates = ($products) => {
      $products.each(function remove() {
        const sku = (() => {
          const skuEl = $(this).find('meta[itemprop="sku"]');
          if (skuEl) {
            return skuEl.attr('content');
          }
        })();

        if (sku) {
          if (shownProducts.indexOf(sku) > -1) {
            $(this).remove();
          } else {
            shownProducts.push(sku);
          }
        }
      });
    };

    /**
     * Hide AJAX loader
     */
    const hideLoader = () => {
      $(loader).removeClass(`${ID}_forceShow`);
    };

    /**
     * Show AJAX loader
     */
    const showLoader = () => {
      $(loader).addClass(`${ID}_forceShow`);
    };

    /**
     * Hide the show more CTA if it's the last page
     */
    const checkLastPage = () => {
      if (nextPageNumber > LAST_PAGE || FIRST_PAGE === LAST_PAGE) {
        $component.find(`.${cName}__CTA`).hide();
      }
    };

    /**
     * GET request to pull in products from a page
     * @param {Number} page Page number to load products from
     */
    const loadProducts = (page) => {
      if (waitingForAJAX) return false;
      waitingForAJAX = true;
      showLoader();
      const url = window.location.href;
      const urlToLoad = updateUrlParameter(url, 'Pg', page.toString());
      $.ajax({
        url: urlToLoad,
        type: 'GET',
        success: (data) => {
          const $products = $(data).find('.product-tile-list__item');

          // Render products
          $(productContainer).append($products);

          imageFix($products);
          updateProgressBar();
          hideLoader();
          // removeDuplicates($products);

          // Update variables
          nextPageNumber += 1;
          waitingForAJAX = false;

          // Update URL query
          const newURL = updateUrlParameter(window.location.href, 'Pg', page.toString());
          if (window.history.pushState && newURL) {
            if (newURL) window.history.pushState(null, '', newURL);
          }

          checkLastPage();
        },
      });
      return true;
    };

    /**
     * Event handlers
     */
    const bindEvents = () => {
      // Load products event handler
      $component.find(`.${cName}__CTA`).on('click', () => {
        events.send(ID, `Variation ${VARIATION}`, 'Clicked show more');
        loadProducts(nextPageNumber);
      });

      /**
       * Watch for childList changes on product container to update progress bar
       * Necessary due to the 'Load previous products' button
       */
      observer.connect(productContainer, () => {
        updateProgressBar();
      }, {
        config: { childList: true, subtree: false, attributes: false },
      });
    };

    /**
     * Render component
     */
    const render = () => {
      $(productList).append($component);
    };

    // Disable infinite scroll
    $(document).trigger('destroy-infiniteScroll');

    bindEvents();
    pollerLite([
      () => {
        try {
          return !!document.querySelector('.browse__total-result-container').innerText.match(/\d+/g)[0];
        } catch (e) {}
      },
    ], updateProgressBar);
    hideLoader();
    checkLastPage();
    render();

    return $component;
  };

  // Build component
  let LoadMore = loadMoreComponent();

  // GA event sent on view
  let viewEventSent = false;
  const bindViewEvent = () => {
    if (!viewEventSent) {
      viewabilityTracker(LoadMore[0], () => {
        events.send(ID, `Variation ${VARIATION}`, 'Show more products button in view', { sendOnce: true });
        viewEventSent = true;
      }, { removeOnView: true });
    }
  };
  bindViewEvent();

  // Re-build component when main container is refreshed / filters are used
  const main = document.querySelector('.browse__main-content');
  observer.connect(main, () => {
    if (!document.querySelector(`.${ID}_loadMore`)) {
      LoadMore = loadMoreComponent();
      bindViewEvent();
    }
  }, {
    config: { childList: true, subtree: false, attributes: false },
  });
};

export default activate;
