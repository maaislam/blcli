const uvPageTypeExists = window.universal_variable && window.universal_variable.page && window.universal_variable.page.type;
const page = uvPageTypeExists ? window.universal_variable.page.type.toLowerCase() : window.location.pathname.toLowerCase();
const poller = require('@qubit/poller');

// Normalise variation
const variation = (() => {
  let variation;
  const { variationMasterId, variationIsControl } = options.meta;
  if (variationIsControl) {
    variation = 'Control';
  } else {
    switch (variationMasterId) {
      case 871127:
        variation = '1';
        break;

      case 871279:
        variation = '2';
        break;

      default:
        break;
    }
  }
  return variation;
})();


const dittoHelper = (function dittoHelper() {
  let pageArea = null;
  let elHook = null;
  let $rootEl = null;

  function setRootEl($el) {
    $rootEl = $el || null;
  }

  // ensure you get at least an element for that page
  function getElementHookByPageArea() {
    switch (pageArea) {
      case 'home':
        elHook = '#why-use-gd';
        break;

      case 'checkout':
      case 'style-finder':
      case 'best-fit':
      case 'basket':
      case 'login':
        elHook = '#navigation';
        break;

      case 'content':
      case 'help':
        if (window.mobileSite) {
          elHook = '#header';
        } else {
          elHook = '#navigation';
        }
        break;

      case 'account':
        if (!window.mobileSite) {
          elHook = '#header-secondary';
        }
        break;

      case 'category':
        if (window.mobileSite) {
          elHook = '#search-navigation';
        } else {
          elHook = '#navigation';
        }
        break;

      case 'product':
        if (window.mobileSite) {
          elHook = '#header';
        } else {
          elHook = '#navigation';
        }
        break;

      default:
        break;
    }

    return elHook;
  }

  function removeDittoFrom(section) {
    switch (section) {
      case 'mainNav':
        if (!window.mobileSite) {
          $('#navigation [href="/ditto-how-to/"]').closest('li').remove();
        } else {
          $('#content nav:eq(0) [href="/ditto-how-to/"]').closest('li').remove();
        }
        break;

      case 'myAccountMenu':
        if (!window.mobileSite && $('#header').find('#nav-account').length) {
          $('#header #header-secondary [href="/account/my-ditto/"]').closest('li').remove();
        }
        break;

      default:
        break;
    }
  }

  // start removing ditto references
  function removeDitto() {
    switch (pageArea) {
      case 'style-finder':
      case 'best-fit':
      case 'basket':
      case 'checkout':
      case 'login':
        removeDittoFrom('mainNav');
        removeDittoFrom('myAccountMenu');
        break;

      case 'home':
        removeDittoFrom('mainNav');
        removeDittoFrom('myAccountMenu');

        // remove virtual try-on section
        $('#content #why-use-gd .fragment h3')
          .filter(item => $(item).text().toLowerCase().indexOf('virtual') > -1)
          .closest('li').remove();
        break;

      case 'content':
        removeDittoFrom('mainNav');
        removeDittoFrom('myAccountMenu');

        // remove virtual try-on from table
        $('#content nav:eq(0) [href="/ditto-how-to/"]').closest('li').remove();
        break;

      case 'product':
        removeDittoFrom('mainNav');
        removeDittoFrom('myAccountMenu');

        // add support for hiding the model view
        const $tempEl = $('#product-content #product-views .image-viewer__menu__item');
        if (variation === '1') {
          $tempEl.siblings('#view-vto').remove(); // Make your own try-on
        }
        if (variation === '2') {
          $tempEl.siblings('#view-vto').remove(); // Make your own try-on
          $tempEl.siblings('#view-try-on-view').remove(); // Try-on view
        }
        $tempEl.first().click();
        break;

      case 'account':
        removeDittoFrom('myAccountMenu');
        removeDittoFrom('mainNav');
        if (!window.mobileSite) {
          // remove ditto section
          $('main#content .split-section-2 #account-section-ditto').remove();
        }
        break;

      case 'category':
        removeDittoFrom('mainNav');
        removeDittoFrom('myAccountMenu');
        if (!window.mobileSite) {
          // remove from search filters
          $rootEl
            .siblings('#search-navigation')
            .find('#search-filters #filter-options-compatible #option-compatible-virtual-try-on').remove();
        } else {
          // remove from search filter
          $rootEl
            .find('#search-filters #filter-options-compatible #option-compatible-virtual-try-on').remove();
        }
        break;

      case 'help':
        // remove from main nav
        removeDittoFrom('mainNav');

        // remove from drop down menu
        removeDittoFrom('myAccountMenu');

        if (/help\/how-to-order/.test(page)) {
          $('#help-content .content p:eq(3)').remove();
          $('#help-content .content p:eq(2)').text('Browse our diverse collection of designer and own-brand glasses and sunglasses to find the pair you want. To help you pick the perfect pair you can use try one of our free unlimited Home Trials which allows you to select up to four pairs of frames to try on at home.');
        }

        if (/changing-your-details/.test(page)) {
          // replace existing image
          $('#help-content')
            .find('.content p img')
            .attr('src', '//assets.glassesdirect.co.uk/media/filer_public/4f/0f/4f0ff34c-72b7-432d-bb9c-eac50bf36415/help-youraccount-nodittov2.jpg')
        }
        break;

      default:
        break;
    }
  }

  function init() {
    const _this = this;

    // get the page area
    pageArea = uvPageTypeExists ? page : window.location.pathname.toLocaleLowerCase().split('/')[1];

    poller(['window.jQuery', 'window.mobileSite'], () => {
      // poll the right element hook
      poller([getElementHookByPageArea()], ($el) => {
        _this.setRootEl($el);
        options.state.set('dittoHelper', _this);

        /*
         * If variation isn't control and the page isn't a product page,
         * remove all references of Ditto without "triggering" the experiment.
         *
         * This will maintain continuity across the site but keep results limited
         * to users who have seen a product page (i.e. where Ditto can be a decision maker)
         */
        if (pageArea && pageArea === 'product') {
          // Only bucket users into control statistics if make your own try-on exists (some products don't have it)
          if (variation === 'Control') {
            if ($('#view-vto').length) {
              cb();
            }
          } else if (variation) {
            cb();
          }
        } else if (variation && variation !== 'Control') {
          // not on product page, but remove references of Ditto anyway to maintain continuity sitewide
          _this.removeDitto();
        }
      });
    });
  }

  return {
    init,
    setRootEl,
    removeDitto,
  };
}());


// ready steady....
dittoHelper.init();
