import shared from '../shared';
import { angularCompile } from '../../../../../../lib/utils/avon';
import { translate } from '../services';
import { observer } from '../../../../../../lib/utils';

export default () => {
  const { $, ID, rootScope } = shared;
  const productListScope = $('[ng-controller="SpecialOffersListController"]').scope();

  /** Add toolbars at top and bottom to be outside the product grid */
  const createHeading = () => {
    const $main = $('#MainContentWrapper');
    $main.prepend(`
      <div class="${ID}_page-heading">
        <h1>${productListScope.ComboSelectedCategoryName}</h1>
      </div>
    `);
  };
  
  /** Style the dropdown at the top of the page */
  const styleDropdown = () => {
    // Wrap dropdown in container so we can use pseudo elements in CSS
    const $dropdown = $('#SpecialOffersCategorySelect');
    if ($dropdown.length) {
      $dropdown.wrap(`<div class="${ID}_dropdownWrap"></div>`);
      $dropdown.after('<span class="select2-arrow ui-select-toggle"><b></b></span>');
    }
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

  /** Calculate height of offers */
  const calcOfferHeights = () => {
    const $offers = $('.SpecialOfferItem');

    /**
     * Reset all offer heights to auto
     */
    const resetOfferHeights = () => {
      $offers.each((index, element) => {
        $(element).find('.SpecialOfferInfo').css('height', 'auto');
      });
    };

    /** Set heights to match the tallest from each row */
    const setTextHeights = () => {
      let $leftText = null;
      let leftTextHeight;
      const offersCount = $offers.length;

      $offers.addClass(`${ID}_reset-height`);
      $offers.each((index, element) => {
        const $element = $(element);
        const isLast = index === offersCount - 1;
        const $text = $element.find(`.${ID}_offerTitleText`);

        // Set text height
        if ($text.length) {
          const thisTextHeight = $text.outerHeight();

          if (index % 2 === 1 && $leftText) {
            // Right col
            const tallestHeight = Math.max(thisTextHeight, leftTextHeight);
            $text.css({ minHeight: tallestHeight });
            $leftText.css({ minHeight: tallestHeight });
          } else {
            // Left col
            if (isLast) $text.css({ minHeight: thisTextHeight });
            $leftText = $text;
            leftTextHeight = thisTextHeight;
          }
        }
      });
      $offers.removeClass(`${ID}_reset-height`);
    };

    // resetOfferHeights();
    setTextHeights();
  };

  /** Change product item markup */
  const changeProducts = () => {
    const $products = $('.SpecialOfferItem');
    $products.each((index, element) => {
      const $product = $(element);

      if (!$product.hasClass(`${ID}_product-modified`)) {
        $product.addClass(`${ID}_product-modified`);

        // Move title and text content to above image
        const $title = $product.find('.SpecialOfferTitle');
        const $text = $product.find('.SpecialOfferBody');
        $product.prepend($title, $text);

        // Wrap title and text in container
        $title.add($text).wrapAll(`<div class="${ID}_offerTitleText"></div>`);

        // Remove lazy load and force img src
        // Lazy load is broken on mobile (on control too)
        const $img = $product.find('.ImageWrapper img');
        $img.attr('src', $img.attr('data-src'));
      }
    });

    // Recalculate offer heights
    calcOfferHeights();
    setTimeout(calcOfferHeights, 500);
  };

  /** Make all changes */
  const init = () => {
    createHeading();
    moveSocialIcons();
    changeSocialIcons();
    changeProducts();
    calcOfferHeights();
    styleDropdown();
    $(document).ready(() => {
      calcOfferHeights();
      setTimeout(calcOfferHeights, 1000);
    });

    const $productList = $('.SpecialOffersList');

    // Re-run functions on changes to the product list
    observer.connect($productList, () => {
      changeProducts();
      calcOfferHeights();
      setTimeout(calcOfferHeights, 200);
    }, {
      config: { attributes: false, subtree: false, childList: true },
      throttle: 0,
    });
  };

  init();
};
