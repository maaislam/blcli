import shared from '../shared';
import { angularCompile } from '../../../../../../lib/utils/avon';
import { translate } from '../services';
import { observer, group, throttle } from '../../../../../../lib/utils';

export default () => {
  const { $, ID, rootScope } = shared;
  const productListScope = $('[ng-controller="ProductListController"]').scope();
  const filterScope = $('[ng-controller="CategoryLeftNavController"]').scope();

  /** Add toolbars at top and bottom to be outside the product grid */
  const moveToolbars = () => {
    const $main = $('#MainContentWrapper');
    const $preFooter = $('#PreFooter');
    const $topBar = $('.ProductListTools');
    const $bottomBar = $('.ProductListFooterTools');

    $main.children('main').before($topBar);
    if ($preFooter.length) {
      $preFooter.before($bottomBar);
    } else {
      $main.append($bottomBar);
    }

    let $top;
    let $bottom;

    const $existingTopTools = $(`.${ID}_topTools`);
    if ($existingTopTools.length) {
      $top = $existingTopTools;
    } else {
      $top = $(`
        <div class="${ID}_topTools">
          <div class="${ID}_heading_left"></div>
          <div class="${ID}_heading_centre">
            <div class="${ID}_activeFilterCount"></div>
          </div>
          <div class="${ID}_heading_right"></div>
        </div>
      `);

      $topBar.prepend($top);
    }

    const $existingBottomTools = $(`.${ID}_bottomTools`);
    if ($existingBottomTools) {
      $bottom = $existingBottomTools;
    } else {
      $bottom = $(`
        <div class="${ID}_bottomTools">
          <div class="${ID}_heading_left"></div>
          <div class="${ID}_heading_centre">
            <div class="${ID}_activeFilterCount"></div>
          </div>
          <div class="${ID}_heading_right"></div>
        </div>
      `);

      $bottomBar.prepend($bottom);
    }

    const $topPagination = $topBar.find('.ProductListPaging');
    const $topLayout = $topBar.find('.ProductListLayout');
    const $topSort = $topBar.find('.ProductListSort');
    const $bottomPagination = $bottomBar.find('.ProductListPaging');
    const $bottomLayout = $bottomBar.find('.ProductListSort, .ProductListLayout');
    const $bottomSort = $bottomBar.find('.ProductListSort');

    if ($topLayout.length) $topLayout.remove();
    if ($topSort.length) $top.find(`.${ID}_heading_left`).append($topSort);
    if ($topPagination.length) $top.find(`.${ID}_heading_right`).append($topPagination);

    if ($bottomLayout.length) $bottomLayout.remove();
    if ($bottomSort.length) $bottom.find(`.${ID}_heading_left`).append($bottomSort);
    if ($bottomPagination.length) $bottom.find(`.${ID}_heading_right`).append($bottomPagination);
  };

  /** Move heading to top of page */
  const moveHeading = () => {
    const { IsPhone } = productListScope.Layout;
    if (IsPhone) {
      const $mobileHeading = $('#CategoryPage > [ng-if="Layout.IsPhone"]:has(h1)');
      const $breadcrumbs = $('#Breadcrumbs');
      if ($mobileHeading.length && $breadcrumbs.length) {
        $breadcrumbs.after($mobileHeading);
      }
    } else {
      const $heading = $('.ProductListGrid > .ProductListHeading');
      const $breadcrumbBar = $('#BreadcrumbBar');
      if ($heading.length && $breadcrumbBar.length) {
        $breadcrumbBar.after($heading);
      }
    }
  };

  /** Move social icons to ouside the product grid */
  const moveSocialIcons = () => {
    const { IsPhone } = productListScope.Layout;
    const $socialIcons = $('socialsharing');
    const $heading = !IsPhone ? $('#BreadcrumbBar > #Breadcrumbs') : $('#BreadcrumbBar > [ng-if="Layout.IsPhone"]:has(h1)');
    $heading.after($socialIcons);
  };

  /** Update the number of active filters */
  const updateActiveFilterCount = () => {
    /**
     * Returns true or false depending if price filter is active or not
     * @returns {Boolean}
     */
    const priceFilterActive = () => {
      const priceFilterScope = $('#PriceSlider .ngrs-runner').scope();
      const isActive = priceFilterScope ? (priceFilterScope.min !== priceFilterScope.modelMin) || (priceFilterScope.max !== priceFilterScope.modelMax) : false;
      return isActive;
    };

    const getSelectedBrandsCount = () => $(`.${ID}_select--brands .${ID}_custom-checkbox--checked`).length;

    /**
     * Get the number of selected filters
     * @returns {Number}
     */
    const getFilterCount = () => {
      let filterCount = 0;

      if (priceFilterActive()) {
        filterCount += 1;
      }

      filterCount += getSelectedBrandsCount();

      return filterCount;
    };

    const $activeFilterCount = $(`.${ID}_activeFilterCount`);
    const filterCount = getFilterCount();
    $activeFilterCount.each((index, element) => {
      const $element = $(element);
      if (filterCount) {
        $element.html(`${filterCount} ${filterCount > 1 ? translate('filters applied') : translate('filter applied')}`);
      } else {
        $element.empty();
      }
    });
  };

  /** Move the product carousel from the top of the page to inside the product grid */
  const moveProductCarousel = () => {
    const $productCarousel = $('#CategoryPage > async-block .Umbraco .ProductCarousel');
    const $products = $('.ProductListCell');
    if ($productCarousel.length) {
      const moreThan6 = $products.length >= 6;
      if (moreThan6) {
        // Place carousel after 6th product
        $products.eq(5).after($productCarousel);

        /*
          As the carousel occupies 3 product spaces, we need to insert 2 hidden blank products
          to maintain the proper formatting of the product grid
          (as the CSS styling is based on odd/even products)
        */
        $productCarousel.after('<div class="ProductListCell" style="display: none;"></div><div class="ProductListCell" style="display: none;"></div>');
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
    const $pagination = $('.PagingButtons');
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
      const $custom = $(`<div class="${ID}_custom-checkbox ${element.checked ? `${ID}_custom-checkbox--checked` : ''}"></div>`);

      // Event handlers
      $custom.on('click', () => {
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
      const $label = $element.next('label');
      if ($label.length) {
        $label.removeAttr('for');
        $label.on('click', (e) => {
          e.preventDefault();
          $custom.click();
        });
      }
    });
  };

  /** Changes to the price slider filter */
  const changePriceSlider = () => {
    const $priceSlider = $('#PriceSlider');
    if ($priceSlider.length) {
      const $caption = $priceSlider.find('.SliderCaption');
      const $newCaption = $(`
        <div class="SliderCaption">
          <div class="${ID}_caption-min">
            <div ng-bind="min | currency"></div>
            <div class="${ID}_caption-label">${translate('Min')}</div>
          </div>
          <div class="${ID}_caption-max">
            <div ng-bind="max | currency"></div>
            <div class="${ID}_caption-label">${translate('Max')}</div>
          </div>
        </div>
      `);

      // Render
      $caption.before($newCaption);
      angularCompile($newCaption, $, $priceSlider.scope(), () => {
        $caption.remove();
      });
    }
  };

  /** Change product item markup */
  const changeProducts = () => {
    const $products = $('.ProductListCell');
    $products.each((index, element) => {
      const $container = $(element);
      const $product = $container.find('.ProductListItem');

      if (!$product.hasClass(`${ID}_product-modified`)) {
        $product.addClass(`${ID}_product-modified`);

        // Move CTAs to new row
        const $ctas = $product.find('.ProductAction .Button');
        $ctas.appendTo($product);

        // Move Reviews to below price
        const $price = $product.find('.Prices');
        const $stars = $product.find('.Rating');
        $stars.insertAfter($price);

        // Move product name to top
        const $productName = $product.find('.ProductName');
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

        $product.find('.QtyDown').html(newDecreaseQty);
        $product.find('.QtyUp').html(newIncreaseQty);

        // Move labels to top
        const $labels = $product.find('.product-options, .product-badge');
        if ($labels.length) {
          const $labelsContainer = $(`<div class="${ID}_labels"></div>`);
          $product.prepend($labelsContainer);
          $labelsContainer.append($labels);
        }
      }
    });
  };

  /**
   * Run this function to recalculate the correct heights for products
   * in the grid. The height will be set to the tallest of the two on the
   * same row
   */
  const calculateProductHeights = () => {
    const COL_COUNT = 3;
    const $products = $('.ProductListCell').filter((index, element) => $(element).css('display') !== 'none');
    const $productGroups = $(group($products, COL_COUNT));

    $products.addClass(`${ID}_reset-height`);
    $productGroups.each((groupIndex, productGroup) => {
      const $productGroup = $(productGroup);
      let tallestDetailsHeight = 0;
      let tallesetNameHeight = 0;

      $productGroup.each((index, element) => {
        const $element = $(element);
        const $details = $element.find('.ProductDetails');
        const $name = $element.find('.ProductName');

        // Save details height
        if ($details.length) {
          const detailsHeight = $element.find('.ProductDetailsTop').outerHeight();
          const actionsHeight = $element.find('.ProductAction').outerHeight();
          const totalDetailsHeight = Math.round(detailsHeight + actionsHeight);
          if (totalDetailsHeight > tallestDetailsHeight) {
            tallestDetailsHeight = totalDetailsHeight;
          }
        }

        // Save name height
        if ($name.length) {
          const totalNameHeight = $name.outerHeight();
          if (totalNameHeight > tallesetNameHeight) {
            tallesetNameHeight = totalNameHeight;
          }
        }
      });

      // Set height
      $productGroup
        .find('.ProductDetails')
        .css({ minHeight: tallestDetailsHeight });

      $productGroup
        .find('.ProductName')
        .css({ minHeight: tallesetNameHeight });
    });
    $products.removeClass(`${ID}_reset-height`);
  };

  /**
   * Change number of columns in product list
   * @param {count}
   */
  const changeColumnWidth = (count) => {
    const $productList = $('.ProductList');
    $productList[0].className = $productList[0].className.replace(/Columns_[\d]+\s?/, '');
    $productList.addClass(`Columns_${count}`);
  };

  const createFiltersRow = () => {
    // Container
    const $existingFiltersRow = $(`.${ID}_filtersRow`);
    const $filtersRow = $existingFiltersRow.length ? $existingFiltersRow : $(`
      <div class="${ID}_filtersRow">
        <div class="${ID}_filter ${ID}_filter--brand"></div>
        <div class="${ID}_filter ${ID}_filter--subcategory"></div>
        <div class="${ID}_filter ${ID}_filter--price">
          <div class="${ID}_priceComponent"></div>
        </div>
      </div>
    `);
    $('.ProductListTools').before($filtersRow);


    // Brands
    /**
     * Top level PLPs (e.g. Make-up) have links rather than checkboxes as brands
     * Subcategory PLPs (e.g. Face) have checkboxes allowing multiple selection
     */
    const $brandCheckboxes = $('.CategoryAndBrandFilters [ng-repeat="tag in CategoryPageModel.TagGroups[1].Tags"]');
    const brandIsCheckboxes = $brandCheckboxes.length;
    const $brandLinks = brandIsCheckboxes ? $brandCheckboxes : $('.CategoriesAndBrands.BrandLevel1 [ng-repeat="brand in CategoryPageModel.CategoryBottom.Children"] a');
    let $brandsDropdown;

    /* eslint-disable indent */
    if ($brandLinks.length) {
      $brandsDropdown = $(`
        <div class="${ID}_select ${ID}_select--brands">
          <div class="${ID}_selectTrigger">${translate('Brand')}</div>
          <ul class="${ID}_dropdown">
            ${$brandLinks.toArray().map((element, index) => {
              const $link = $(element);
              const name = $link.text().trim();

              return `
                <li data-index="${index}">
                  ${!brandIsCheckboxes ? '' : `
                    <span class="${ID}_custom-checkbox ${$link.children('input').checked ? `${ID}_custom-checkbox--checked` : ''}"></span>
                  `}
                  <span class="${ID}_dropdownLabel">${name}</span>
                </li>
              `;
            }).join('')}
          </ul>
        </div>
      `);

      // Open/close dropdown
      const $trigger = $brandsDropdown.find(`.${ID}_selectTrigger`);
      const $dropdown = $brandsDropdown.find(`.${ID}_dropdown`);
      $trigger.on('click', () => {
        $dropdown.toggle();
      });

      // Item click handlers
      $brandsDropdown.on('click', `.${ID}_dropdown > li`, (event) => {
        const $link = $(event.target).closest('li');
        const name = $link.text().trim();

        const $matchingLink = $brandLinks.filter((index, element) => {
          const $originalLink = $(element);
          return $originalLink.text().trim() === name;
        });

        if ($matchingLink.length) {
          if (brandIsCheckboxes) {
            const $matchingCheckbox = $matchingLink.find('input');
            $matchingCheckbox.click();
            const $checkbox = $link.find(`.${ID}_custom-checkbox`);
            if ($matchingCheckbox[0].checked) {
              $checkbox.addClass(`${ID}_custom-checkbox--checked`);
            } else {
              $checkbox.removeClass(`${ID}_custom-checkbox--checked`);
            }
          } else {
            $matchingLink.click();
          }
        }
      });
    } else {
      $brandsDropdown = $(`
        <div class="${ID}_select ${ID}_select--brands ${ID}_select--disabled">
          <div class="${ID}_selectTrigger">${translate('Brand')}</div>
        </div>
      `);
    }

    // Subcategories
    let $categoryLinks = $('.CategoriesAndBrands [ng-repeat="category in CategoryPageModel.CategoryTree.Children"] > a, .CategoriesAndBrands [ng-repeat="category in CategoryPageModel.CategoryTop.Children"] > a');
    let $categoryDropdown;

    if ($categoryLinks.length) {
      const $activeCategoryLink = $categoryLinks.filter((index, element) => $(element).hasClass('Selected'));

      if ($activeCategoryLink.length) {
        // An active category is selected so only use the subcategories from this one
        const $childCategoryLinks = $activeCategoryLink.next('.SubCategoryList').find('[ng-repeat="subcategory in category.Children"] > a');
        if ($childCategoryLinks.length) $categoryLinks = $childCategoryLinks;
      }

      $categoryDropdown = $(`
        <div class="${ID}_select ${ID}_select--category">
          <div class="${ID}_selectTrigger">${translate('Subcategory')}</div>
          <ul class="${ID}_dropdown">
            ${$categoryLinks.toArray().map((element, index) => {
              const $link = $(element);
              const name = $link.text().trim();
              return `<li data-index="${index}"><span class="${ID}_dropdownLabel">${name}</span></li>`;
            }).join('')}
          </ul>
        </div>
      `);

      // Open/close dropdown
      const $trigger = $categoryDropdown.find(`.${ID}_selectTrigger`);
      const $dropdown = $categoryDropdown.find(`.${ID}_dropdown`);
      $trigger.on('click', () => {
        $dropdown.toggle();
      });

      // Item click handlers
      $categoryDropdown.on('click', `.${ID}_dropdown > li`, (event) => {
        const $link = $(event.target).closest('li');
        const name = $link.text().trim();

        const $matchingLink = $categoryLinks.filter((index, element) => {
          const $originalLink = $(element);
          return $originalLink.text().trim() === name;
        });

        if ($matchingLink.length) {
          $matchingLink.click();
        }
      });
    } else {
      $categoryDropdown = $(`
        <div class="${ID}_select ${ID}_select--category ${ID}_select--disabled">
          <div class="${ID}_selectTrigger">${translate('Subcategory')}</div>
        </div>
      `);
    }

    // Price
    const $priceSlider = $('#PriceSlider').parent().children();

    /* eslint-enable indent */
    // Render
    const render = () => {
      const $brandFilter = $filtersRow.find(`.${ID}_filter--brand`);
      const $categoryFilter = $filtersRow.find(`.${ID}_filter--subcategory`);
      const $priceFilter = $filtersRow.find(`.${ID}_filter--price`);

      if ($brandsDropdown) {
        $brandFilter
          .empty()
          .show()
          .append($brandsDropdown);
      } else {
        // $brandFilter
        //   .empty()
        //   .hide();
      }

      if ($categoryDropdown) {
        $categoryFilter
          .empty()
          .show()
          .append($categoryDropdown);
      } else {
        // $categoryFilter
        //   .empty()
        //   .hide();
      }

      if ($priceSlider.length) {
        $priceFilter
          .show()
          .find(`.${ID}_priceComponent`)
          .append($priceSlider);
      } else {
        $priceFilter
          .hide()
          .find(`.${ID}_priceComponent`)
          .empty();
      }
    };

    render();
  };

  const pageEventHandlers = () => {
    // Close dropdowns on body click
    $(document).click((e) => {
      e.stopPropagation();
      const $dropdowns = $(`.${ID}_select`);
      const hasClickedDropdown = $dropdowns.has(e.target).length > 0 || e.target.type === 'checkbox';

      if (!hasClickedDropdown) {
        const $dropdownMenus = $dropdowns.find(`.${ID}_dropdown`);
        $dropdownMenus.hide();
      }
    });
  };

  const stickFiltersOnScroll = () => {
    const $stickyComponent = $(`
      <div class="${ID}_stickyFilters">
        <div class="${ID}_stickyFiltersImg"><span></span></div>
        <div class="${ID}_stickyFiltersContainer"></div>
        <div class="${ID}_stickyFiltersBackToTop">
          <span class="${ID}_stickyFiltersBackToTopText">${translate('Back<br>To Top')}</span>
          <span class="${ID}_stickyFiltersBackToTopIcon"></span>
        </div>
      </div>
    `);
    const $stickyFiltersContainer = $stickyComponent.find(`.${ID}_stickyFiltersContainer`);
    const stickyClass = `${ID}_stickyFilters--stick`;
    const $filtersRow = $(`.${ID}_filtersRow`);
    const $productTools = $('.ProductListTools');
    const $main = $('main');

    let isTransitioning = false;

    /** Check if current state is sticky */
    const isSticky = () => $stickyComponent.hasClass(stickyClass);

    /** Make header sticky */
    const stick = () => {
      if (!isSticky() && !isTransitioning) {
        isTransitioning = true;
        $stickyComponent.addClass(stickyClass);
        $stickyFiltersContainer.append($filtersRow);
        setTimeout(() => {
          isTransitioning = false;
        }, 300);
      }
    };

    /** Make header static */
    const unstick = () => {
      if (isSticky() && !isTransitioning) {
        isTransitioning = true;
        $stickyComponent.removeClass(stickyClass);
        $productTools.before($filtersRow);
        setTimeout(() => {
          isTransitioning = false;
        }, 300);
      }
    };

    // Render
    $('body').append($stickyComponent);

    // Bind event handler
    const scrollHandler = () => {
      if ($(window).scrollTop() > $main.offset().top) {
        stick();
      } else {
        unstick();
      }
    };

    window.stick = stick;
    window.unstick = unstick;
    const throttledScrollHandler = throttle(scrollHandler, 200);
    $(window).on('scroll', throttledScrollHandler);

    // Back To Top
    const $backToTop = $stickyComponent.find(`.${ID}_stickyFiltersBackToTop`);
    $backToTop.on('click', () => {
      $('html, body').animate({
        scrollTop: '0px',
      });
    });
  };

  /** Make all changes */
  const init = () => {
    moveToolbars();
    moveHeading();
    moveSocialIcons();
    // addSeoText();
    // moveProductCarousel();
    changeSocialIcons();
    changePagination();
    // customCheckboxes();
    changePriceSlider();
    // changeColumnWidth(3);
    changeProducts();
    calculateProductHeights();
    createFiltersRow();
    updateActiveFilterCount();
    pageEventHandlers();
    stickFiltersOnScroll();
    $(document).ready(() => {
      calculateProductHeights();
      setTimeout(calculateProductHeights, 1000);
    });

    // Re-run functions on changes to the product list
    const $productList = $('.ProductList');
    observer.connect($productList, () => {
      // changeColumnWidth(3);
      changeProducts();
      calculateProductHeights();
      setTimeout(calculateProductHeights, 200);
      updateActiveFilterCount();
    }, {
      config: { attributes: true, subtree: false, childList: true },
      throttle: 0,
    });

    // Watch for changes on product tools
    const $tools = $('.ProductListTools');
    observer.connect($tools, () => {
      moveToolbars();
      changePagination();
    }, {
      config: { attributes: false, subtree: false, childList: true },
      throttle: 0,
    });

    // Re-build top filters when the side filters change
    const $sidebar = $('#CategoryLeftNav');
    observer.connect($sidebar, () => {
      changePriceSlider();
      createFiltersRow();
      updateActiveFilterCount();
    }, {
      config: { attributes: false, subtree: true, childList: true },
      throttle: 0,
    });
  };

  init();
};
