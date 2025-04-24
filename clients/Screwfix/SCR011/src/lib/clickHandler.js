import { fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { pollerLite } from "../../../../../lib/utils";
import { links } from "./helper/links";

const { ID, VARIATION } = shared;
const { $2makita, $2dewalt, $2bosch } = links;



const selectedFilterFinder = () => {
  let brands = [];
  if (window.location.href.includes(`brand=`)) {
    brands = new URLSearchParams(window.location.href.split("#")[1])?.get("brand")?.split(`|`);
  }
  return brands;
};
const selectedFilterFn = () => {
  const brands = selectedFilterFinder();
  if (brands.length > 0) {
    pollerLite([`body > .lb-DataHolder-Wrap #facet_brand h3`], () => {
      const filterBrand = document.querySelector(`body > .lb-DataHolder-Wrap #facet_brand h3`);
      const selectedBrand = filterBrand?.querySelector(`span.selected-filters.mobile-only`);
      if (!selectedBrand) {
        const newSelectedBrand = `<span class="selected-filters mobile-only">${brands
          .map((brand, id) => {
            if (id < brands.length - 1) return `${brand}`;
            else return `${brand}`;
          })
          .join(", ")}</span>`;
        filterBrand?.insertAdjacentHTML("beforeend", newSelectedBrand);
      }
    });
  }
};
const filterFn = (filter) => {
  let text = filter.textContent?.toLowerCase();
  let numReg = /\(([^)]+)\)/;
  let variable = numReg.exec(text)[1];
  return parseInt(variable);
};
const specificFilterOperations = (target) => {
  // const brandListContainer = document.querySelector(`body > .lb-DataHolder-Wrap #facet_brand > ul`);
  const filters = target?.querySelectorAll(`li`);
  let makita = 0,
    dewalt = 0,
    bosch = 0;
  // active = false;
  filters.length > 0 &&
    filters.forEach((filter) => {
      if (filter.textContent?.toLowerCase()?.includes(`makita`)) makita = filterFn(filter);
      else if (filter.textContent?.toLowerCase()?.includes(`dewalt`)) dewalt = filterFn(filter);
      else if (filter.textContent?.toLowerCase()?.includes(`bosch`)) bosch = filterFn(filter);
      // console.log(filter.classList.contains(`fh__active`));
      // else if (filter?.querySelector(`a`).classList.contains(`fh__active`)) active = true;
    });
  // if (!active) {
  //   filters.forEach((filter) => {
  //     if (filter.classList.contains(`view-all`)) filter.style.cssText = `display:block;`;
  //     else filter.classList.add(`hidden`);
  //   });
  // }
  return { makita, dewalt, bosch };
};
const selectedFilters = () => {
  let target = document.querySelector(`body > .lb-DataHolder-Wrap #facet_brand > ul`);
  let newFilters = ``;
  setTimeout(() => {
    const { makita, dewalt, bosch } = specificFilterOperations(target);
    const brandSelected = {
      makita: ``,
      dewalt: ``,
      bosch: ``,
    };
   
    if (VARIATION == 1) {
      const brands = selectedFilterFinder();
      if (brands.length > 0) {
        const objKeys = Object.keys(brandSelected);
        // console.log(objKeys, brands);
        objKeys.forEach((key) => {
          if (brands.findIndex((brand) => brand == key || brand.includes(key)) > -1) {
            brandSelected[key] = `active-brand`;
          }
        });
      }
    }
    document.querySelector(`.${ID}-staticListContainer`)?.remove();
    newFilters = `<div class="${ID}-staticListContainer ln__cats ln__cats--fh">
        <div class="${ID}-staticList makita"><a ${
      VARIATION == 1 ? `href="javascript:void(0)" class="fh_facet_click ${brandSelected.makita}"` : `href="${$2makita}"`
    }>Makita <span>(${makita})</span></a></div>
        <div class="${ID}-staticList dewalt"><a ${
      VARIATION == 1 ? `href="javascript:void(0)" class="fh_facet_click ${brandSelected.dewalt}"` : `href="${$2dewalt}"`
    }>DeWalt <span>(${dewalt})</span></a></div>
        <div class="${ID}-staticList bosch"><a ${
      VARIATION == 1 ? `href="javascript:void(0)" class="fh_facet_click ${brandSelected.bosch}"` : `href="${$2bosch}"`
    }>Bosch <span>(${bosch})</span></a></div>
      </div>`;
    target = document.querySelector(`body > .lb-DataHolder-Wrap #facet_brand > ul`);
    target.insertAdjacentHTML("beforebegin", newFilters);
  }, 100);
};
const brandSelector = (target) => {
  
  const classListOperator = () => {
    if (target.closest(`.${ID}-staticList`).querySelector(`a.fh_facet_click`)?.classList.contains(`active-brand`)) {
      target.closest(`.${ID}-staticList`).querySelector(`a.fh_facet_click`)?.classList.remove(`active-brand`);
    } else {
      target.closest(`.${ID}-staticList`).querySelector(`a.fh_facet_click`)?.classList.add(`active-brand`);
    }
  };
  if (target.closest(`.${ID}-staticList`).classList.contains(`makita`)) {
    classListOperator();
    document.querySelector(`body > .lb-DataHolder-Wrap #facet_brand > ul a[data-facet-value="makita"]`)?.click();
  } else if (target.closest(`.${ID}-staticList`).classList.contains(`dewalt`)) {
    classListOperator();
    document.querySelector(`body > .lb-DataHolder-Wrap #facet_brand > ul a[data-facet-value="dewalt"]`)?.click();
  } else if (target.closest(`.${ID}-staticList`).classList.contains(`bosch`)) {
    classListOperator();
    document.querySelector(`body > .lb-DataHolder-Wrap #facet_brand > ul a[data-facet-value="bosch"]`)?.click();
  }
};

export const clickHandler = (target) => {
  //console.log(target.closest(`li.${ID}__custom_close`), "jjjj")
  if (target.closest(`a.show-leftnav-popup`) || target.closest(`h2.show-leftnav-popup`)) {
    // console.log(target.closest(`a.show-leftnav-popup`) || target.closest(`h2.show-leftnav-popup`));
    // auto update selected filter text under Brand
    if (VARIATION != "control") selectedFilterFn();
    if (target.closest(`a.show-leftnav-popup`)) {
       //console.log(`Interaction clicks the filter button`);
      fireEvent(`Interaction clicks the filter button`);
    }
  }else if (target.closest(`.lb-DataHolder-Wrap #facet_brand > h3`)) {
    // Mobile only
     //console.log(`Interaction - clicks to expand the brand filter`);
    fireEvent(`Interaction - clicks to expand the brand filter`);
    // Brand's Main DOM Handler
    if (VARIATION != "control") selectedFilters();
  } else if (target.closest(`.cls__mobile .ls__banner--container .rsb-suggestions .slick-slide a`)) {
    
    const brand = target.textContent?.trim();
    //console.log(brand, "brand");
    if (brand) {
       //console.log(`Interaction with category quicklinks : ${brand}`);
      fireEvent(`Interaction with category quicklinks : ${brand}`);
    }
  }
  else if(target.closest(`.n.ln__cats.ln__cats--fh`)){
    //console.log("inn")
    
    if(target.closest(`li.view-all`)){
      //console.log(`Interaction with view all in the brand filter`);
      fireEvent(`Interaction with view all in the brand filter`);
    }else if(target.closest(".SCR011-stickyLeft-makita")||target.closest(".SCR011-stickyLeft-dewalt")||target.closest(".SCR011-stickyLeft-bosch")){
      const brand = target.textContent?.trim();
      //console.log(brand, "brand");
      if (brand) {
         //console.log(`Interaction with category quicklinkssssssss : ${brand}`);
        fireEvent(`Interaction with category quicklinks : ${brand}`);
      }
      
    }
    else if(target.closest(`li.${ID}__custom_close`)){
      {
        //console.log("Interaction clicks the brand filter in the filterrrrr list")
        fireEvent(`Interaction clicks the brand filter in the filter list`);

      }
      
    }

  }
  else if (target.closest(`.sticky-left-parent #facet_brand`)) {  
    if (target.closest(`li.view-all`)) {
       console.log(`Interaction with view all in the brand filter`);
      fireEvent(`Interaction with view all in the brand filter`);

    }else{
      console.log(`Interaction uses the brand filter in the filter list`);
      fireEvent(`Interaction uses the brand filter in the filter list`);

    }
  } else if (target.closest(`.${ID}-staticList`)) {
    // Mobile only
    let link = target.closest(`.${ID}-staticList`)?.classList[1];
     //console.log(`Interaction - clicks on the hard coded brand linkssss ${link}`);
    fireEvent(`Interaction - clicks on the hard coded brand links ${link}`);
    // Handling the click select event of Brand
    if (VARIATION == 1) brandSelector(target);
  }else if(target.closest(`.rsb-suggestions`)){
    console.log(`Interaction uses the brand quick filter on the PLP page`);
    fireEvent(`Interaction uses the brand quick filter on the PLP page`);
  }
};
