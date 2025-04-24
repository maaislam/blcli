import { fireEvent } from "../../../../../../core-files/services";
import shared from "../../../../../../core-files/shared";

export default () => {
  const { ID } = shared;

  /* ------ Helpers  ------- */
  const closeFilters = () => {
    const allFilterHeadings = document.querySelectorAll(".ais-RefinementList details.section");
    for (let index = 0; index < allFilterHeadings.length; index++) {
      const element = allFilterHeadings[index];
      if (element.getAttribute("open")) {
        element.querySelector(".section__title").click();
      }
    }
  };
  /*
Pull out the matching filter and put in a dropdown
*/
  const generatePopularFilters = (filter) => {
    const allFilters = document.querySelectorAll(".facet-category");
    for (let index = 0; index < allFilters.length; index += 1) {
      const element = allFilters[index];
      const filterTitle = element.querySelector(".facet-category__title span").textContent.trim();

      if (filterTitle === filter) {
        // add top filter title
        const popularFilter = document.createElement("div");
        popularFilter.classList.add(`${ID}-filter`);
        popularFilter.setAttribute("filter-target", filter);
        popularFilter.innerHTML = `
            <div class="${ID}-filterTitle"><span>${filter}</span></div>`;

        document.querySelector(`.${ID}-filterBar`).appendChild(popularFilter);

        let filterLinks;
        if (element.querySelector(".filter-group")) {
          filterLinks = element.querySelector(".filter-group");
        } else {
          filterLinks = element.querySelector("ul");
        }

        // add inner filters
        const filterBlock = document.createElement("div");
        filterBlock.setAttribute("filter-content", filter);
        filterBlock.classList.add(`${ID}-filterBlock`);
        filterBlock.innerHTML = filterLinks.innerHTML;

        //filterBlock.innerHTML = `<div class="${ID}-checkbox"></div><p></p>`

        document.querySelector(`.${ID}-filterBar`).insertAdjacentElement("afterbegin", popularFilter);
        document.querySelector(`.${ID}-filterDropdown`).appendChild(filterBlock);
      }
    }

    if (document.querySelector(`[filter-content="Brands"]`)) {
      document.querySelector(`.${ID}-filterBlock ul`).classList.add("filter-group");
    }
  };

  /*
 On the new filter clicks, click existing ones
*/
  const filterClicks = () => {
    const allFilters = document.querySelectorAll(`.${ID}-filterDropdown .facet-menu__item`);

    for (let index = 0; index < allFilters.length; index += 1) {
      const element = allFilters[index];
      element.addEventListener("click", (e) => {
        e.stopPropagation();
        e.preventDefault();
        const currentValue = e.currentTarget.querySelector("input").getAttribute("value");

        if (element.querySelector("input").checked === true) {
          element.querySelector("input").checked = false;
        } else {
          element.querySelector("input").checked = true;
        }

        fireEvent("Clicked popular filter" + currentValue);

        if (document.querySelector(`.refinements .facet-section .facet-category .facet-menu__item input[value="${currentValue}"]`)) {
          document.querySelector(`.refinements .facet-section .facet-category .facet-menu__item input[value="${currentValue}"]`).click();
        }
      });
    }
  };

  // const brandFilterClicks = () => {
  //   const brandFilters = document.querySelectorAll(`.${ID}-filterDropdown [filter-content="Brands"] ul li`);
  //   for (let index = 0; index < brandFilters.length; index += 1) {
  //     const brandEl = brandFilters[index];
  //     brandEl.addEventListener("click", (e) => {
  //       const currentValue = e.currentTarget.querySelector('input[type="checkbox"]').getAttribute("value");
  //       fireEvent("Clicked popular filter - brand filter");
  //       window.location.href = window.location.href + `?brand.lvl0=${currentValue.toLowerCase()}`;
  //     });
  //   }
  // };

  /*
 Show/hide filter dropdowns
*/
  const makeFilterActive = () => {
    const filters = document.querySelectorAll(`.${ID}-popularFilters .${ID}-filter`);

    // loop through and show active ones
    for (let index = 0; index < filters.length; index += 1) {
      const element = filters[index];

      element.addEventListener("click", (e) => {
        const filterTarget = e.currentTarget.getAttribute("filter-target");
        const filterToShow = document.querySelector(`.${ID}-filterBlock[filter-content="${filterTarget}"]`);

        if (element.classList.contains("active")) {
          element.classList.remove("active");
          filterToShow.classList.remove("active");
        } else {
          // make current link active

          // remove any currently active
          if (document.querySelector(`.${ID}-filter.active`)) {
            document.querySelector(`.${ID}-filter.active`).classList.remove("active");
          }
          // make dropdown active
          if (document.querySelector(`.${ID}-filterBlock.active`)) {
            document.querySelector(`.${ID}-filterBlock.active`).classList.remove("active");
          }

          element.classList.add(`active`);

          if (filterToShow) {
            filterToShow.classList.add("active");
          }
        }
      });
    }
  };

  const filterToggle = () => {
    /*Toggle for popular filters vs all*/
    if (document.documentElement.classList.contains("popularOnly")) {
      document.documentElement.classList.remove("popularOnly");
      if (document.querySelector(`.${ID}-filter.active`)) {
        document.querySelector(`.${ID}-filter.active`).classList.remove("active");
        document.querySelector(`.${ID}-filterBlock.active`).classList.remove("active");
      }
    } else {
      document.documentElement.classList.add("popularOnly");
    }
  };

  const allFilterClicks = () => {
    const allFilters = document.querySelectorAll(".facet-menu__item input");
    for (let index = 0; index < allFilters.length; index += 1) {
      const filterEl = allFilters[index];
      filterEl.addEventListener("click", () => {
        fireEvent("Clicked Filter");
      });
    }
  };

  const gridContainer = document.querySelector(".list-page");
  gridContainer.insertAdjacentElement("beforebegin", document.querySelector(".page-info"));

  if (!document.querySelector(`.${ID}-filterBlock`)) {
    document.documentElement.classList.add(`popularOnly`);

    // remove any existing
    if (document.querySelector(`.${ID}-filter.active`)) {
      document.querySelector(`.${ID}-filter.active`).classList.remove("active");
      document.querySelector(`.${ID}-filterBlock.active`).classList.remove("active");
    }

    const createFilterHeader = () => {
      const filterBlock = document.createElement("div");
      filterBlock.classList.add(`${ID}-filtersBlock`);
      filterBlock.innerHTML = `
        <div class="${ID}-filters-container">
          <div class="${ID}-filterToggle ${ID}--mobHide">
            <div class="${ID}-toggleButton"><span></span>View popular filters</div>
          </div>
          <div class="${ID}-popularFilters">
            <span>Filter by:</span>
            <div class="${ID}-filterBar">
              <div class="${ID}-all ${ID}--mobHide">View all filters</div>
              <div class="${ID}-results"></div>
            </div>
            <div class="${ID}-filterDropdown"></div>
          </div>  
        </div>`;

      document.querySelector(".page-info").insertAdjacentElement("afterend", filterBlock);

      if(window.innerWidth >= 768) {
        filterBlock.querySelector(`.${ID}-results`).insertAdjacentElement('afterbegin', document.querySelector('.ais-Stats.hit-counter'));
      }

      document.querySelector(`.${ID}-filterToggle`).addEventListener("click", () => {
        fireEvent("clicked view popular filters");
        filterToggle();
      });
      document.querySelector(`.${ID}-all`).addEventListener("click", () => {
        fireEvent("clicked view all filters");

        const heroProduct = document.querySelector(`.${ID}-heroProduct`);
        if(heroProduct) {
          heroProduct.remove();
        }

        filterToggle();
      });
    };

    closeFilters();
    createFilterHeader();

    // Move sort by
    if (window.innerWidth >= 1200) {
      const sortBy = document.querySelector(".top-section__view-switcher");
      if (sortBy) {
        document.querySelector(`.${ID}-filters-container`).appendChild(sortBy);
      }
    }

    // change filter text
    if (document.querySelector(".top-section__filter-switch")) {
      document.querySelector(".top-section__filter-switch").textContent = "View all filters";
    }

    // add popular filters
    if (window.location.href.indexOf("wedding-rings") > -1) {
      generatePopularFilters("Stone Shape");
      generatePopularFilters("Material Type");
      generatePopularFilters("Style");
    } else if (window.location.href.indexOf("engagement-rings") > -1 || window.location.href.indexOf("diamond-rings") > -1) {
      generatePopularFilters("Stone Shape");
      generatePopularFilters("Material Type");
      generatePopularFilters("Style");
    } else if (window.location.href.indexOf("rings") > -1) {
      generatePopularFilters("Material Type");
      generatePopularFilters("Recipient");
      generatePopularFilters("Occasion");
    } else if (window.location.href.indexOf("luxury-watches") > -1) {
      generatePopularFilters("Brand");
      generatePopularFilters("Recipient");
      generatePopularFilters("Strap Material");
      generatePopularFilters("Movement");

      //brandFilterClicks();
    } else if (window.location.href.indexOf("mens-watches") > -1) {
      generatePopularFilters("Brand");
      generatePopularFilters("Strap Material");
      generatePopularFilters("Movement");
    }

    makeFilterActive();
    // click on existing filters
    filterClicks();

    // Filter tracking
    allFilterClicks();
  }
};
