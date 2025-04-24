import shared from "../shared";
import { angularCompile } from "../../../../../../lib/utils/avon";
import { translate } from "../services";
import increasinglyModalPr from "./helpers";
import { observer } from "../../../../../../lib/utils";

export default () => {
  const { $, ID, rootScope } = shared;
  const productListScope = $('[ng-controller="ProductListController"]').scope();
  const filterScope = $('[ng-controller="CategoryLeftNavController"]').scope();

  /** Add toolbars at top and bottom to be outside the product grid */
  const moveToolbars = () => {
    const $main = $("#MainContentWrapper");
    const $preFooter = $("#PreFooter");
    const $topBar = $(".ProductListHeading");
    const $bottomBar = $(".ProductListFooterTools");

    const changesAlreadyMade =
      $topBar.children(`.${ID}_heading_left, .${ID}_heading_right`).length > 0;
    if (!changesAlreadyMade) {
      $main.prepend($topBar);
      if ($preFooter.length) {
        $preFooter.before($bottomBar);
      } else {
        $main.append($bottomBar);
      }

      const $topPagination = $topBar.find(".ProductListPaging");
      if ($topPagination.length)
        $topPagination.wrapAll(`<div class="${ID}_heading_left"></div>`);
      const $topLayoutControls = $topBar.find(
        ".ProductListSort, .ProductListLayout"
      );
      if ($topLayoutControls.length)
        $topLayoutControls.wrapAll(`<div class="${ID}_heading_right"></div>`);

      const $bottomPagination = $bottomBar.find(".ProductListPaging");
      if ($bottomPagination.length)
        $bottomPagination.wrapAll(`<div class="${ID}_heading_left"></div>`);
      const $bottomLayoutControls = $bottomBar.find(
        ".ProductListSort, .ProductListLayout"
      );
      if ($bottomLayoutControls)
        $bottomLayoutControls.wrapAll(
          `<div class="${ID}_heading_right"></div>`
        );
    }
  };

  /** Move mobile heading to top of page */
  const moveMobileHeading = () => {
    const $mobileHeading = $(
      '#CategoryPage > [ng-if="Layout.IsPhone"]:has(h1)'
    );
    const $breadcrumbs = $("#Breadcrumbs");
    if ($mobileHeading.length && $breadcrumbs.length) {
      $breadcrumbs.after($mobileHeading);
    }
  };

  /** Move social icons to ouside the product grid */
  const moveSocialIcons = () => {
    const { IsPhone } = productListScope.Layout;
    const $socialIcons = $("socialsharing");
    const $heading = !IsPhone
      ? $(".ProductListHeading > h1")
      : $('#BreadcrumbBar > [ng-if="Layout.IsPhone"]:has(h1)');
    $heading.after($socialIcons);
  };

  /** Move the product carousel from the top of the page to inside the product grid */
  const moveProductCarousel = () => {
    const $productCarousel = $(
      "#CategoryPage > async-block .Umbraco .ProductCarousel"
    );
    const $products = $(".ProductListCell");
    if ($productCarousel.length) {
      const moreThan6 = $products.length >= 6;
      if (moreThan6) {
        // Place carousel after 6th product
        $products.eq(5).after($productCarousel);

        /*
          As the carousel occupies 2 product spaces, we need to insert a hidden blank product
          to maintain the proper formatting of the product grid
          (as the CSS styling is based on odd/even products)
        */
        $productCarousel.after(
          '<div class="ProductListCell" style="display: none;"></div>'
        );
      } else {
        // Place carousel at bottom
        $products.last().after($productCarousel);
      }
    }
  };

  /** Change the social icon svg images */
  const changeSocialIcons = () => {
    /**
     * Property name should be the old icon name and the value should be the new icon name
     * Names come from the svgIcon directive
     */
    const newIconNames = {
      envelope: "pdp_email",
      "social-facebook": "pdp_facebook",
      "social-pinterest": "pdp_pinterest",
      "social-twitter": "pdp_twitter",
      "social-tumblr": "pdp_tumblr",
    };

    const $socialLinks = $(".SocialButtons .Social");
    $socialLinks.each((index, element) => {
      const $element = $(element);
      const $icon = $element.find("svg-icon");
      const iconName = $icon.attr("icon");
      const newIconName = newIconNames[iconName];
      if (iconName && newIconName) {
        $icon.attr("icon", newIconName);
        $icon.removeAttr("class");
        $icon.empty();
        angularCompile($icon, $, rootScope);
      }
    });
  };

  /** Change pagination markup to show a maximum of 6 pages */
  const changePagination = () => {
    const MAX_PAGES = 6;

    //<a class="PageNumber ng-binding ng-scope" ng-repeat="p in [].constructor(ProductListUI.PageSize) track by $index" ng-click="ShowPage($index + 1)" ng-class="{Active:ProductListState.PageCurrent==$index + 1}" ng-show="index + 1<ProductListState.PageCurrent" ng-bind="$index + 1"></a>
    // <a class="${ID}_ellipsis" ng-show="ProductListUI.PageRange.indexOf(ProductListState.PageCurrent) == -1" ng-click="ShowPageNext()">...</a>
    const markup = `
      <div class="PagingButtons">
        <a class="PagePrevious" ng-show="ProductListState.PageCurrent>1" ng-class="{Enabled:ProductListState.PageCurrent>1}" ng-click="ShowPagePrevious()">
          <svg-icon icon="nav-left" class="ng-isolate-scope"></svg-icon>
        </a>

        <a class="PageNumber" ng-repeat="p in ProductListUI.PageRange track by $index" ng-click="ShowPage(p)" ng-class="{Active:ProductListState.PageCurrent==p}" ng-bind="p"></a>

        <a class="PageNext Enabled" ng-class="{Enabled:ProductListState.PageCurrent < ProductListUI.PageCount}" ng-click="ShowPageNext()">
          <svg-icon icon="nav-right" class="ng-isolate-scope"></svg-icon>
        </a>
      </div>
    `;

    // Replace old pagination with new markup
    const $pagination = $(".PagingButtons");
    $pagination.each((index, element) => {
      const $element = $(element);
      const $newPagination = $(markup);
      $element.before($newPagination);
      angularCompile($newPagination, $, productListScope);
      $element.remove();
    });
  };

  /** Create custom checkboxes */
  const customCheckboxes = () => {
    const $checkboxes = $('#CategoryLeftNav li input[type="checkbox"]');
    $checkboxes.each((index, element) => {
      // Create
      const $element = $(element);
      const $custom = $(
        `<div class="${ID}_custom-checkbox ${
          element.checked ? `${ID}_custom-checkbox--checked` : ""
        }"></div>`
      );

      // Event handlers
      $custom.on("click", () => {
        // element.checked = !element.checked;
        $element.click();
        const isChecked = element.checked;
        if (isChecked) {
          $custom.addClass(`${ID}_custom-checkbox--checked`);
        } else {
          $custom.removeClass(`${ID}_custom-checkbox--checked`);
        }
      });

      // Render
      $element.before($custom);
      $element.hide();

      // Edit label functionality
      const $label = $element.next("label");
      if ($label.length) {
        $label.removeAttr("for");
        $label.on("click", (e) => {
          e.preventDefault();
          $custom.click();
        });
      }
    });
  };

  /** Changes to the price slider filter */
  const changePriceSlider = () => {
    const $priceSlider = $("#PriceSlider");
    if ($priceSlider.length) {
      const $caption = $priceSlider.find(".SliderCaption");
      const $newCaption = $(`
        <div class="SliderCaption">
          <div class="${ID}_caption-min">
            <div ng-bind="ProductListState.FilterPriceRange.Low | currency"></div>
            <div class="${ID}_caption-label">${translate("Min")}</div>
          </div>
          <div class="${ID}_caption-max">
            <div ng-bind="ProductListState.FilterPriceRange.High | currency"></div>
            <div class="${ID}_caption-label">${translate("Max")}</div>
          </div>
        </div>
      `);

      // Render
      $caption.before($newCaption);
      angularCompile($newCaption, $, filterScope, () => {
        $caption.remove();
      });
    }
  };

  /** Change product item markup */
  const changeProducts = () => {
    const $products = $(".ProductListCell");
    $products.each((index, element) => {
      const $container = $(element);
      const $product = $container.find(".ProductListItem");

      if (
        !$product.hasClass(`${ID}_product-modified`) &&
        !$product.hasClass(`AG074_product-modified`)
      ) {
        $product.addClass(`${ID}_product-modified`);

        // Move CTAs to new row
        const $ctas = $product.find(".ProductAction .Button");
        $ctas.appendTo($product);

        // Move Reviews to below price
        const $price = $product.find(".Prices");
        const $stars = $product.find(".Rating");
        $stars.insertAfter($price);

        // Move product name to top
        const $productName = $product.find(".ProductName");
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

        $product.find(".QtyDown").html(newDecreaseQty);
        $product.find(".QtyUp").html(newIncreaseQty);

        // Move labels to top
        const $labels = $product.find(".product-options, .product-badge");
        if ($labels.length) {
          const $labelsContainer = $(`<div class="${ID}_labels"></div>`);
          $product.prepend($labelsContainer);
          $labelsContainer.append($labels);
        }
      }
    });

    // Event listener for showing increasingly
    [].forEach.call(
      document.querySelectorAll('[ng-click^="addProductToCart"]'),
      (btn) => {
        if (!btn.classList.contains("xlistenered")) {
          btn.classList.add("xlistenered");

          btn.addEventListener("click", () => {
            increasinglyModalPr(btn.parentNode.parentNode);
          });
        }
      }
    );
  };

  /**
   * Run this function to recalculate the correct heights for products
   * in the grid. The height will be set to the tallest of the two on the
   * same row
   */
  const calculateProductHeights = () => {
    const $products = $(".ProductListCell").filter(
      (index, element) => $(element).css("display") !== "none"
    );
    let $leftDetails = null;
    let $leftName = null;
    let leftDetailsHeight;
    let leftNameHeight;
    const productsCount = $products.length;

    $products.addClass(`${ID}_reset-height`);
    $products.each((index, element) => {
      const $element = $(element);
      if (!$element.hasClass(`AG074_product-modified`)) {
        const isLast = index === productsCount - 1;
        const $details = $element.find(".ProductDetails");
        const $name = $element.find(".ProductName");

        // Set details height
        if ($details.length) {
          const detailsHeight = $element
            .find(".ProductDetailsTop")
            .outerHeight();
          const actionsHeight = $element.find(".ProductAction").outerHeight();
          const thisHeight = Math.round(detailsHeight + actionsHeight);

          if (index % 2 === 1 && $leftDetails) {
            // Right col
            // Set heights
            const tallestHeight = Math.max(thisHeight, leftDetailsHeight);
            $details.css({ minHeight: tallestHeight });
            $leftDetails.css({ minHeight: tallestHeight });
          } else {
            // Left col
            if (isLast) $details.css({ minHeight: thisHeight });
            $leftDetails = $details;
            leftDetailsHeight = thisHeight;
          }
        }

        // Set name height
        if ($name.length) {
          const thisNameHeight = $name.outerHeight();

          if (index % 2 === 1 && $leftName) {
            // Right col
            const tallestHeight = Math.max(thisNameHeight, leftNameHeight);
            $name.css({ minHeight: tallestHeight });
            $leftName.css({ minHeight: tallestHeight });
          } else {
            // Left col
            if (isLast) $name.css({ minHeight: thisNameHeight });
            $leftName = $name;
            leftNameHeight = thisNameHeight;
          }
        }
      }
    });
    $products.removeClass(`${ID}_reset-height`);
  };

  /** Make all changes */
  const init = () => {
    moveToolbars();
    moveMobileHeading();
    moveSocialIcons();
    moveProductCarousel();
    changeSocialIcons();
    changePagination();
    customCheckboxes();
    //changePriceSlider(); // No longer required as ProductListState broke
    changeProducts();

    calculateProductHeights();
    $(document).ready(() => {
      calculateProductHeights();
      setTimeout(calculateProductHeights, 1000);
    });

    // Update heading
    const h1 = document.querySelector(
      `.${ID}.Layout_Phone #BreadcrumbBar > [ng-if="Layout.IsPhone"] h1`
    );
    const breadcrumbsLinks = document.querySelectorAll("#Breadcrumbs a");
    if (h1 && h1.innerText.trim() == "" && breadcrumbsLinks.length) {
      h1.innerHTML =
        breadcrumbsLinks[breadcrumbsLinks.length - 1].innerText.trim();
    }

    // Re-run functions on changes to the product list
    const $productList = $(".ProductList");
    observer.connect(
      $productList,
      () => {
        changeProducts();
        calculateProductHeights();
        setTimeout(calculateProductHeights, 200);
      },
      {
        config: { attributes: false, subtree: false, childList: true },
        throttle: 0,
      }
    );

    // Watch for changes on product tools
    const $tools = $(".ProductListTools");
    observer.connect(
      $tools,
      () => {
        moveToolbars();
      },
      {
        config: { attributes: false, subtree: false, childList: true },
        throttle: 0,
      }
    );
  };

  init();
};
