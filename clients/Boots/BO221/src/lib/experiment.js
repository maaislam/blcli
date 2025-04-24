/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import FavouritesModal from "./components/favourites";
import { h, render } from "preact";
import { pageType } from "./helpers";

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  fireEvent("Conditions Met");

  if (window.usabilla_live) {
    window.usabilla_live("trigger", `${ID} V${VARIATION} trigger`);
  }

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == "control") {
    return;
  }

  if (!localStorage.getItem("favourites")) {
    localStorage.setItem("favourites", '{"items": [], "lists": []}');
  }

  const addFavouritesIcon = () => {
    let favourite;

    if(VARIATION === '1' || VARIATION == '2') {
      favourite = `
        <div class="${ID}-favouriteProduct">
          <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4924 5.29311L9.49597 4.34633L9.33819 4.20364C7.63105 2.73901 5.09289 2.81612 3.48418 4.38429C1.8192 6.00731 1.74855 8.66073 3.32481 10.37L10.4992 18.1501L17.6848 10.2755C19.2536 8.55627 19.176 5.90265 17.5094 4.27809C15.8454 2.65604 13.1913 2.65748 11.5291 4.28135L10.4924 5.29311ZM17.0316 5.04149C18.2299 6.34473 18.246 8.36241 17.0385 9.68565L10.495 16.8554L3.96806 9.77687C2.713 8.41587 2.76925 6.30314 4.09495 5.01085C5.37885 3.75932 7.40481 3.69776 8.7601 4.86038L8.90128 4.98809L10.5004 6.50863L12.1405 4.90733C13.4631 3.61526 15.5747 3.61411 16.8987 4.90466L17.0316 5.04149Z" fill="#05054B"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4928 5.66992L9.53383 4.79139L9.38198 4.65898C7.739 3.29992 5.29621 3.37148 3.74796 4.82661C2.14554 6.33264 2.07755 8.79479 3.59457 10.3809L10.4994 17.6001L17.415 10.2931C18.9248 8.69786 18.8501 6.23552 17.2462 4.72807C15.6447 3.22294 13.0903 3.22428 11.4906 4.73108L10.4928 5.66992Z" fill="#05054B"/>
          </svg>
          <span>Add to favourites</span>
        </div>`;
    } else if(VARIATION === '3') {
      favourite = `
      <div class="${ID}-favouriteProduct">
        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4924 5.29311L9.49597 4.34633L9.33819 4.20364C7.63105 2.73901 5.09289 2.81612 3.48418 4.38429C1.8192 6.00731 1.74855 8.66073 3.32481 10.37L10.4992 18.1501L17.6848 10.2755C19.2536 8.55627 19.176 5.90265 17.5094 4.27809C15.8454 2.65604 13.1913 2.65748 11.5291 4.28135L10.4924 5.29311ZM17.0316 5.04149C18.2299 6.34473 18.246 8.36241 17.0385 9.68565L10.495 16.8554L3.96806 9.77687C2.713 8.41587 2.76925 6.30314 4.09495 5.01085C5.37885 3.75932 7.40481 3.69776 8.7601 4.86038L8.90128 4.98809L10.5004 6.50863L12.1405 4.90733C13.4631 3.61526 15.5747 3.61411 16.8987 4.90466L17.0316 5.04149Z" fill="#05054B"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4928 5.66992L9.53383 4.79139L9.38198 4.65898C7.739 3.29992 5.29621 3.37148 3.74796 4.82661C2.14554 6.33264 2.07755 8.79479 3.59457 10.3809L10.4994 17.6001L17.415 10.2931C18.9248 8.69786 18.8501 6.23552 17.2462 4.72807C15.6447 3.22294 13.0903 3.22428 11.4906 4.73108L10.4928 5.66992Z" fill="#05054B"/>
        </svg>
      </div>`;
    }

    // If PLP
    if(pageType() === 'PLP' || pageType() === 'Search') {
      const allProducts = document.querySelectorAll(".estore_product_container .product_add");
      for (let index = 0; index < allProducts.length; index += 1) {
        const element = allProducts[index];

        if(VARIATION === '1') {
          element.insertAdjacentHTML("afterbegin", favourite);
        }
        else if(VARIATION === '2' || VARIATION === '3') {
          element.parentNode.insertAdjacentHTML("afterbegin", favourite);
        }
      }
    }

    if(pageType() === 'PDP') {
      if(VARIATION === '1' || VARIATION === '2') {
        const pdpContainer = document.querySelector('#estore_pdp_trcol #estore_pdp_trcol_1');
        pdpContainer.insertAdjacentHTML('afterend', favourite)
      } else if(VARIATION === '3'){
        const imageContainer = document.querySelector('#estore_pdp_image');
        imageContainer.insertAdjacentHTML('afterbegin', favourite)
      }
      
    }

    
  };

  const favouritesInstructions = () => {
    if(!document.querySelector(`.${ID}-usage`)) {
      const favUsage = document.createElement("div");
      favUsage.classList.add(`${ID}-usage`);
      favUsage.innerHTML = `
      <div class="${ID}-inner">
        <span></span>
        <p>Access your favourite products and create your own lists here.</p>
      </div>`;
      document.querySelector(`.${ID}-favouritesToggle .usage`).append(favUsage);
    }
  }


  const addModalToggle = () => {
    const favouritesIcon = `<div class="${ID}-favouritesToggle"><div class="fave-icon"></div><span>Favourites</span><div class="usage"></div></div>`;
    document.querySelector("#mobileLink_basket").insertAdjacentHTML("beforebegin", favouritesIcon);

    const basketIcon = document.querySelector('#oct-basket-container');
    basketIcon.insertAdjacentHTML('beforeend', '<span class="basketName">Basket</span>');
  };

  if(!document.querySelector(`.${ID}-overlay`)) {
    const overlay = document.createElement("div");
    overlay.classList.add(`${ID}-overlay`);
    document.body.append(overlay);
  }

  // Add modal
  if(!document.querySelector(`.${ID}-favourites-wrapper`)) {
    const root = document.createElement("div");
    root.classList.add(`${ID}-favourites-wrapper`);
    document.body.append(root);
  
    render(<FavouritesModal />, root);
  }
  

  const openFavourites = () => {
    document.querySelector(`.${ID}-favouritesToggle`).addEventListener("click", () => {
      document.querySelector(`.${ID}-favourites-wrapper`).classList.add("open");
      document.querySelector(`.${ID}-overlay`).classList.add('active');
      document.documentElement.classList.add(`${ID}-noScroll`);
      fireEvent('Clicked open favourites');
    });
  };

  addModalToggle();
  
  addFavouritesIcon();

  if(VARIATION === '2' || VARIATION === '3') {
    favouritesInstructions();
  }
  openFavourites();
};
