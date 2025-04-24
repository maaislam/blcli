/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { angularCompile } from "../../../../../lib/utils/avon";

export default () => {
  const { rootScope, ID, VARIATION } = shared;

  const $back = $("#PreviousPage");
  const $backWrapper = $back.parent();
  const $filtersWrapper = $("#LeftNav");
  const $sortWrapper = $(`<div class="${ID}_sortWrapper"></div>`);

  const $navScope = $("#CategoryLeftNav").scope();
  const $buttonsWrapper = $(`<div class="${ID}_buttonWrapper">
      <div class="${ID}_filtersButton">
        <span>Filtry</span>
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M10.5089 5.63729C10.4511 5.13995 10.0285 4.75391 9.51562 4.75391C8.96334 4.75391 8.51562 5.20162 8.51562 5.75391V7.75391V9.75391V11.7539L8.52235 11.8705C8.58012 12.3679 9.00279 12.7539 9.51562 12.7539C10.0679 12.7539 10.5156 12.3062 10.5156 11.7539V9.75391H20.5156L20.6322 9.74718C21.1296 9.68941 21.5156 9.26674 21.5156 8.75391C21.5156 8.20162 21.0679 7.75391 20.5156 7.75391H10.5156V5.75391L10.5089 5.63729ZM4.51562 7.75391H6.51562V9.75391H4.51562C3.96334 9.75391 3.51562 9.30619 3.51562 8.75391C3.51562 8.24107 3.90167 7.8184 4.399 7.76063L4.51562 7.75391ZM4.51562 15.7539L4.399 15.7606C3.90167 15.8184 3.51562 16.2411 3.51562 16.7539C3.51562 17.3062 3.96334 17.7539 4.51562 17.7539H14.5156V19.7539L14.5224 19.8705C14.5801 20.3679 15.0028 20.7539 15.5156 20.7539C16.0679 20.7539 16.5156 20.3062 16.5156 19.7539V17.7539V15.7539V13.7539L16.5089 13.6373C16.4511 13.1399 16.0285 12.7539 15.5156 12.7539C14.9633 12.7539 14.5156 13.2016 14.5156 13.7539V15.7539H4.51562ZM18.5156 17.7539H20.5156L20.6322 17.7472C21.1296 17.6894 21.5156 17.2667 21.5156 16.7539C21.5156 16.2016 21.0679 15.7539 20.5156 15.7539H18.5156V17.7539Z" fill="#181818"/>
        </svg>
      </div>
      <div class="${ID}_sortButton">
        <span>Seřadit podle</span>
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.51562 7.74391L9.51562 3.75391L13.5156 7.74391H10.5156V14.7539H8.51562V7.74391H5.51562ZM16.5156 10.7539V17.7639H19.5156L15.5156 21.7539L11.5156 17.7639H14.5156V10.7539H16.5156Z" fill="#181818"/>
        </svg>
      </div>
    </div>`);
  const $headerWrapper = $(`<div class="${ID}_headerWrapper"></div>`);

  $filtersWrapper.after($sortWrapper);

  const starEmpty = `<svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.90428 6.37886L8.31908 1.55119C8.66487 0.859615 9.50581 0.579301 10.1974 0.925086C10.4683 1.06056 10.688 1.28025 10.8235 1.55119L13.2373 6.37886L17.9682 7.16624C18.6861 7.28556 19.185 7.93134 19.1355 8.6428L19.1197 8.77685C19.0718 9.06483 18.9351 9.33065 18.7287 9.53711L15.6313 12.6339L16.4347 18.2559C16.5376 18.9763 16.0725 19.6468 15.3793 19.8143L15.2468 19.8397C14.9058 19.8884 14.5588 19.8097 14.2722 19.6187L9.57128 16.4839L4.87033 19.6187C4.2672 20.0208 3.46554 19.8931 3.01429 19.3455L2.92888 19.2304C2.73782 18.9438 2.65911 18.5968 2.70781 18.2559L3.51028 12.6339L0.413825 9.53711C-0.0986697 9.02447 -0.130597 8.21335 0.317968 7.66352L0.414088 7.55721C0.620544 7.35081 0.886359 7.21411 1.17434 7.16624L5.90428 6.37886ZM11.5857 7.54779L9.57128 3.51786L7.55685 7.54779C7.35644 7.9486 6.97627 8.22926 6.53421 8.30274L2.65228 8.94786L5.13711 11.4328C5.41399 11.7098 5.56063 12.0883 5.54605 12.4753L5.53296 12.6206L4.87728 17.2099L8.7947 14.5987C9.22221 14.3137 9.76739 14.2878 10.2163 14.521L10.3479 14.5987L14.2643 17.2099L13.6096 12.6206C13.5542 12.2329 13.6639 11.8422 13.9078 11.5413L14.0055 11.4328L16.4893 8.94786L12.6083 8.30274C12.2154 8.23742 11.8714 8.00841 11.659 7.67682L11.5857 7.54779Z"
                fill="#181818"
              />
            </svg>`;
  const starFull = `<svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.75172 1.04533L6.33691 5.873L1.72402 6.64092C1.3836 6.69751 1.07608 6.87782 0.860476 7.14726L0.776685 7.26354C0.391583 7.85954 0.512892 8.66218 1.07886 9.11508L4.85891 12.14L3.34124 17.4561C3.22844 17.851 3.29471 18.2755 3.52252 18.6172L3.60794 18.7323C4.05919 19.2799 4.86084 19.4076 5.46397 19.0055L10.0039 15.978L14.5439 19.0055C14.8856 19.2333 15.3101 19.2996 15.705 19.1868L15.8328 19.1436C16.4969 18.8833 16.8665 18.1558 16.6666 17.4561L15.1479 12.14L18.929 9.11508C19.1984 8.89947 19.3787 8.59195 19.4353 8.25154L19.4511 8.11748C19.5006 7.40603 19.0017 6.76025 18.2838 6.64092L13.6699 5.873L11.2561 1.04533C11.1206 0.774387 10.901 0.554696 10.63 0.419227C9.93844 0.0734418 9.0975 0.353756 8.75172 1.04533Z"
                fill="#181818"
              />
            </svg>`;
  const clearIcon = `<svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M1.62852 0.943591C1.23623 0.638566 0.669002 0.666296 0.308518 1.02678C-0.0820061 1.4173 -0.0820061 2.05047 0.308518 2.44099L3.60141 5.73389L0.308518 9.02678L0.22533 9.12099C-0.0796953 9.51328 -0.0519657 10.0805 0.308518 10.441C0.699043 10.8315 1.33221 10.8315 1.72273 10.441L5.01562 7.1481L8.30852 10.441L8.40273 10.5242C8.79502 10.8292 9.36225 10.8015 9.72273 10.441C10.1133 10.0505 10.1133 9.4173 9.72273 9.02678L6.42984 5.73389L9.72273 2.44099L9.80592 2.34679C10.1109 1.95449 10.0832 1.38726 9.72273 1.02678C9.33221 0.636256 8.69904 0.636256 8.30852 1.02678L5.01562 4.31967L1.72273 1.02678L1.62852 0.943591Z" fill="#181818"/>
      </svg>
`;
  const hideToggles = () => {
    // Switch off the other toggle & container
    $(`.${ID}_active`).removeClass(`${ID}_active`);
    $(`.${ID}_open`).removeClass(`${ID}_open`);
  };

  const updateCatTitle = () => {
    const title =
      rootScope.ShopContext.Breadcrumbs[
        rootScope.ShopContext.Breadcrumbs.length - 1
      ].Text; // @todo
    $back.siblings("h1").text(title); // Set category title
  };

  const toggleButtons = () => {
    $(document).on(
      "click",
      ".CategoriesAndBrands .Title, .CategoryAndBrandFilters .Title",
      function () {
        $(this).parents("li").toggleClass(`${ID}_open`);
      }
    );

    const isToggleOpen = ($elm) => {
      return $elm.hasClass(`${ID}_active`);
    };

    $(`.${ID}_filtersButton`).click(function () {
      if (isToggleOpen($(this))) hideToggles();
      else {
        hideToggles();
        $(this).toggleClass(`${ID}_active`);
        $filtersWrapper.toggleClass(`${ID}_open`);
        fireEvent("Click - open filters");
      }

      // Scroll to toggles.
      if (VARIATION === "2") {
        $headerWrapper.get(0).scrollIntoView();
      }
    });

    $(`.${ID}_sortButton`).click(function (e) {
      if (isToggleOpen($(this))) hideToggles();
      else {
        hideToggles();
        $(this).toggleClass(`${ID}_active`);
        $sortWrapper.toggleClass(`${ID}_open`);
        fireEvent("Click - open sort by");
      }
    });
  };

  const changeBackButton = () => {
    const backButtonScope = $back.scope();
    if (!backButtonScope) return;
    backButtonScope.$parent.$apply(() => {
      backButtonScope.$parent.LoadPreviousPage = () => {
        let crumbIndex = rootScope.ShopContext.Breadcrumbs.length - 2;
        let backUrl = null;
        if (crumbIndex > 0)
          backUrl = rootScope.ShopContext.Breadcrumbs[crumbIndex].Url;

        if (backUrl) location.replace(backUrl);
        else location.replace(document.referrer);
      };
    });

    // Previous Page button change to icon
    if ($back.length > 0) {
      $backWrapper.addClass(`${ID}_back-button-wrapper`);
      const title =
        rootScope.ShopContext.Breadcrumbs[
          rootScope.ShopContext.Breadcrumbs.length - 1
        ].Text; // @todo
      $back.siblings("h1").text(title); // Set category title
      $back.find("a").siblings().remove(); // remove current arrow.
      $back
        .find("a")
        .html(
          '<img src="https://service.maxymiser.net/cm/images-eu/avon-mas/FB96CC9F628122B09AE85F4236EBEBD6F30B2E8223AA83415093A2D8DA5F46EF.svg?meta=/AG058a---Horizontal-category-scroll-on-mobile-PLP---UK/arrow_left.svg" alt="back" />'
        );
    }
  };

  const rearrangeHeader = () => {
    const $wrapper = $(`.${ID}_wrapper`); // Injected in categories.js

    $headerWrapper.append($buttonsWrapper);

    $wrapper.after($headerWrapper);
    $wrapper.prepend($backWrapper);
  };

  const adjustFiltersSort = () => {
    const $title = $(`<h2 class="${ID}_title">Filtry</h2>`);
    const $selectedFilters = $(`<div class="${ID}_selectedWrapper">
      <h3>Vybraný</h3>
      <div class="${ID}_selected">
        <div
          ng-repeat="filter in FacetService.Facets"
          ng-if="filter.FacetType !== 0 && (filter.SelectedItems.length > 0 || (filter.FacetType === 2 && (filter.From < filter.Min || filter.To > filter.Max)))"
          class="${ID}_selectedItemWrapper"
        >
          <div
            ng-if="[1, 3, 5].indexOf(filter.FacetType) !== -1"
            ng-repeat="item in filter.SelectedItems"
            class="${ID}_selectedItem"
          >
            <span ng-bind="item"></span>
            <div class="${ID}_clearFilter" ng-click="FacetService.clearFilter(filter, item)">${clearIcon}</div>

          </div>

          <div
            ng-if="filter.FacetType === 6"
            class="${ID}_selectedItem"
          >
            <div class="Rating ng-scope ng-isolate-scope">
              <div class="RatingStars">
                <div class="EmptyStars">
                  <span class="Star" data-star="4">${starEmpty}</span>
                  <span class="Star" data-star="3">${starEmpty}</span>
                  <span class="Star" data-star="2">${starEmpty}</span>
                  <span class="Star" data-star="1">${starEmpty}</span>
                  <span class="Star" data-star="0">${starEmpty}</span>
                </div>
                <div class="FullStars" style="width: {{filter.SelectedItems[0] * 20}}%">
                  <span class="Star" data-star="4">${starFull}</span>
                  <span class="Star" data-star="3">${starFull}</span>
                  <span class="Star" data-star="2">${starFull}</span>
                  <span class="Star" data-star="1">${starFull}</span>
                  <span class="Star" data-star="0">${starFull}</span>
                </div>
              </div>
            </div>
            <div class="${ID}_clearFilter" ng-click="FacetService.clearFilter(filter, filter.SelectedItems[0])">${clearIcon}</div>
          </div>

          <div
            ng-if="filter.FacetType === 4"
            ng-repeat="item in filter.SelectedItems"
            class="${ID}_selectedItem"
          >
            <span>{{item === 'true' ? 'New: Yes' : 'New: No'}}</span>
            <div class="${ID}_clearFilter" ng-click="FacetService.clearFilter(filter, item)">${clearIcon}</div>

          </div>

          <div
            ng-if="filter.FacetType === 2"
            class="${ID}_selectedItem"
          >
            <span>{{filter.Title}}: {{filter.Min | currency}} - {{filter.Max | currency}}</span>
            <div class="${ID}_clearFilter" ng-click="FacetService.clearFilter(filter)">${clearIcon}</div>

          </div>
        </div>
        <div class="${ID}_clearAllFilters" ng-click="FacetService.clearAllFilters()">
          vymazat vše
        </div>
      </div>
    </div>`);
    $filtersWrapper.prepend($title);
    $filtersWrapper.find(".CategoryLeftNav").prepend($selectedFilters);

    const $titleSorts = $(`<h2 class="${ID}_title">Seřadit podle</h2>`);
    $sortWrapper.prepend($titleSorts);

    // Add clear filters functionality
    $navScope.$apply(() => {
      // Clear All
      $navScope.FacetService.clearAllFilters = () => {
        fireEvent("Click - clear all filters");

        $navScope.FacetService.Facets.forEach((item, id) => {
          if ([1, 3, 4, 5, 6].indexOf(item.FacetType) !== -1) {
            item.SelectedItems = [];
          } else if (item.FacetType === 2) {
            item.From = item.Min;
            item.To = item.Max;
          }
          $navScope.Broadcast("CategoryLeftNav.FilterTagsChanged");
        });
      };

      // Clear one
      $navScope.FacetService.clearFilter = (filter, value = null) => {
        if ([1, 3, 4, 5, 6].indexOf(filter.FacetType) !== -1 && value) {
          const index = filter.SelectedItems.indexOf(value);
          if (index > -1) {
            filter.SelectedItems.splice(index, 1);
          }
        } else if (filter.FacetType === 2) {
          filter.From = filter.Min;
          filter.To = filter.Max;
        }
        $navScope.Broadcast("CategoryLeftNav.FilterTagsChanged");
      };
    });

    angularCompile($selectedFilters, $, $navScope);
  };

  const updateCheckboxes = () => {
    const $items = $(".CategoryAndBrandFilters li");
    $items.each(function () {
      if ($(this).find(`.${ID}_checkbox`).length < 1) {
        $items.append(`
          <div class="${ID}_checkbox"></div>
        `);
      }
    });
  };

  const updateRatings = () => {
    if ($(`.${ID}_ratings`).length > 0) return;
    const $stars = $(
      `<div class="${ID}_ratings Rating ng-scope ng-isolate-scope">
      <div class="RatingStars">
        <div class="EmptyStars">
          <span class="Star" data-star="1">${starEmpty}</span>
          <span class="Star" data-star="2">${starEmpty}</span>
          <span class="Star" data-star="3">${starEmpty}</span>
          <span class="Star" data-star="4">${starEmpty}</span>
          <span class="Star" data-star="5">${starEmpty}</span>
        </div>
        <div class="FullStars">
          <span class="Star" data-star="1">${starFull}</span>
          <span class="Star" data-star="2">${starFull}</span>
          <span class="Star" data-star="3">${starFull}</span>
          <span class="Star" data-star="4">${starFull}</span>
          <span class="Star" data-star="5">${starFull}</span>
        </div>
      </div>
    </div>`
    );

    const $wrapper = $(".CategoryAndBrandFilters.ratingband_facet ul");
    $wrapper.after($stars);

    // Click toggles
    $(`.${ID}_ratings .Star`).click(function () {
      const star = $(this).data("star");
      const width = `${parseInt(star, 10) * 20}%`;
      $navScope.$apply(() => {
        const rating = $navScope.FacetService.Facets.find(
          (facet) => facet.FacetType === 6
        );
        if (rating) rating.SelectedItems = [star];
        $navScope.Broadcast("CategoryLeftNav.FilterTagsChanged");
      });

      // Tick this one
      $(`.${ID}_ratings .FullStars`).css("width", width);

      fireEvent("Filtered by - rating");
    });
  };

  const updateSorts = () => {
    const $sortScope = $(
      ".ProductListHeading .select2.select2-container"
    ).scope();
    let $sorts = null;

    $(`.${ID}_content`).remove(); // clear out.

    // Is sortable
    if ($sortScope) {
      $sorts = $(`
      <div class="${ID}_content">
      <div
      ng-if="ProductListUI.FilteredProducts.length>1"
      class="${ID}_sortItem"
      ng-repeat="sortorder in $select.items"
      ng-click="$select.setActiveItem(sortorder); $select.select(sortorder, false, $event); trackClicks(sortorder.Translated);"
      ng-mouseenter="$select.setActiveItem(sortorder)"
      ng-class="{'${ID}_sortActive': $select.selected.ProductSortOrder == sortorder.ProductSortOrder}"
      >
      <span ng-bind="sortorder.Translated"></span>
      </div>
      </div>
      `);

      if (!$sortScope.hideToggles) {
        $sortScope.$apply(() => {
          $sortScope.hideToggles = hideToggles;
          $sortScope.trackClicks = (label) => {
            events.send(`${ID}-${VARIATION}`, "Sort by selected", label);
          };
        });
      }

      angularCompile($sorts, $, $sortScope);
    } else {
      $sorts = $(`
        <div class="${ID}_content">
          <p style="font-size: 16px">Niente da ordinare</p>
        </div>
      `);
    }

    $sortWrapper.append($sorts);
  };

  const eventTracking = () => {
    // Category.
    $(".CategoriesAndBrands li a").click(function () {
      const label = $(this).text().trim();
    });

    $(".CategoryAndBrandFilters.brand_facet li label").click(function () {
      const label = $(this)
        .text()
        .trim()
        .replace(/ *\([^)]*\) */g, "");

      fireEvent(`Filtered - brand (${label})`);
    });

    $(".CategoryAndBrandFilters.discountband_facet li label").click(
      function () {
        const label = $(this)
          .text()
          .trim()
          .replace(/ *\([^)]*\) */g, "");

        fireEvent(`Filtered - discount (${label})`);
      }
    );

    $(".CategoryAndBrandFilters.new_facet li label").click(function () {
      const label = $(this)
        .text()
        .trim()
        .replace(/ *\([^)]*\) */g, "");

      fireEvent(`Filtered - new (${label})`);
    });

    $("#PriceSlider .ngrs-handle").mousedown(function () {
      fireEvent(`Filtered - price`);
    });
  };

  /** Make all changes - can be re-run on page re-render  */
  const init = () => {
    // -----------------------------
    // If control, bail out from here
    // -----------------------------
    if (VARIATION == "control") {
      return;
    }

    // Filters.
    changeBackButton();
    rearrangeHeader();
    toggleButtons();
    adjustFiltersSort();
    updateCheckboxes();
    updateRatings();
    updateSorts();
    eventTracking();
  }; // init

  // Persists after PLP changes without a page refresh.
  rootScope.$on("ProductListUI.FilteringFinished", () => {
    updateCheckboxes();
    updateRatings();
    updateCatTitle();
    updateSorts();
  });

  init();
};
