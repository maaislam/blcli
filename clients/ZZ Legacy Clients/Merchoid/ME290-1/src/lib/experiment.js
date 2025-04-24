/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { getBrand, getBrandLink, getCategoryLink, getCategory } from '../data';
import { setup, fireEvent } from './services';
import shared from './shared';

export default () => {
  setup();

  const { ID, VARIATION } = shared;

  let clothingArr = [];
  let homeOfficeArr = [];
  let gadgetsArr = [];


  // put products in array to relevant categories
  const createArrProducts = () => {

    return new Promise((resolve, reject) => {
      const regexClothing = /shirt|wear|Trousers|Dressing|Hoodies|Scarves|Gloves|Top|Slippers|Bags|Jewellery|Sweater|Hats|Necklaces|Caps|Wallets|Purses|Accessories|Cosplay|Earrings/gm;
      const regexHomeOffice = /Home|Office|Stationery|Cup|Coaster|Mug|Throw|Blanket|Kitchen|Light|Computer|Tablet|Mobile|Poster|Wall|Decoration|Boxes/gm;
      const regexGadgets = /Badges|Games|Props|Figures|Plushies|Models|Keyring/gm;

      const allCatTabs = document.querySelectorAll('#related-brand-products .section-title .product-title');
      
      for (let i = 0; i < allCatTabs.length; i += 1) {
        let tabPosition = null;
        const tab = allCatTabs[i];
        const tabTitle = tab.innerText.trim();

        // if Home & Office
        if (tabTitle.match(regexHomeOffice) !== null) {
          tabPosition = i;
          const section = document.querySelector(`.section-content .products.wrapper[data-id-products="${i}"]`);

          let sectionProds = section.querySelectorAll('.products li.item');
          if (sectionProds.length > 0) {
            for (let index = 0; index < sectionProds.length; index += 1) {
              const prod = sectionProds[index];
              homeOfficeArr.push(prod);
            }
          }
          // if clothing
        } else if (tabTitle.match(regexClothing) !== null) {
          tabPosition = i;
          const section = document.querySelector(`.section-content .products.wrapper[data-id-products="${i}"]`);

          let sectionProds = section.querySelectorAll('.products li.item');
          if (sectionProds.length > 0) {
            for (let index = 0; index < sectionProds.length; index += 1) {
              const prod = sectionProds[index];
              clothingArr.push(prod);
            }
          }
          // if gadgets & toys
        } else if (tabTitle.match(regexGadgets) !== null) {
          tabPosition = i;
          const section = document.querySelector(`.section-content .products.wrapper[data-id-products="${i}"]`);
          let sectionProds = section.querySelectorAll('.products li.item');
          if (sectionProds.length > 0) {
            for (let index = 0; index < sectionProds.length; index += 1) {
              const prod = sectionProds[index];
              gadgetsArr.push(prod);
            }
          }
        }
        resolve();
      }
    });
  }

  const loadProductImages = () => {
    const products = document.querySelectorAll('.products.wrapper.grid.products-grid .item.product.product-item');
    for (let index = 0; index < products.length; index += 1) {
      const element = products[index];
      // make image src that actual product image to avoid blank lazy load
      const imageData = element.querySelector('img').getAttribute('data-original');
      element.querySelector('img').setAttribute('src', imageData);
    }
  
  };

  const createTabs = () => {
    const tabContainer = document.createElement('div');
    tabContainer.classList.add(`${ID}-tabs`);
    tabContainer.innerHTML = `
      <div class="section-title-inner">
          ${clothingArr.length > 0 ? `<div class="product-title active" data-title="Clothing" data-header="clothing">
            <h3 class="wrapper-head">Clothing</h3>
          </div>` : ''}
          ${homeOfficeArr.length > 0 ? `<div class="product-title" data-title="Home & Office" data-header="homeOffice">
          <h3 class="wrapper-head">Home & Office</h3>
          </div>` : ''}
          ${gadgetsArr.length > 0 ? `<div class="product-title" data-title="Gadgets & Toys" data-header="gadgetsToys">
          <h3 class="wrapper-head">Gadgets & Toys</h3>
          </div>` : ''}   
      </div>
      <div class="${ID}-tabContentWrap">
      ${clothingArr.length > 0 ? `<div class="${ID}-tabContent ${ID}-clothing"></div>` : ''}
      ${homeOfficeArr.length > 0 ? `<div class="${ID}-tabContent ${ID}-homeOffice"></div>` : ''}
      ${gadgetsArr.length > 0 ? `<div class="${ID}-tabContent ${ID}-gadgetsToys"></div>` : ''}
      </div>`;

    document.querySelector('#related-brand-products .brand-section-header').insertAdjacentElement('afterend', tabContainer);
  }

  const moveProducts = () => {
    const clothingContainer = document.querySelector(`.${ID}-tabContent.${ID}-clothing`);
    const gadgetsContainer = document.querySelector(`.${ID}-tabContent.${ID}-homeOffice`);
    const homeContainer = document.querySelector(`.${ID}-tabContent.${ID}-gadgetsToys`);

    if(clothingArr.length > 0) {
      for (let index = 0; index < clothingArr.length; index += 1) {
        const clothingEl = clothingArr[index];
        clothingContainer.appendChild(clothingEl);
      }
    }
    if(gadgetsArr.length > 0) {
      for (let index = 0; index < gadgetsArr.length; index += 1) {
        const gadgetEl = gadgetsArr[index];
        gadgetsContainer.appendChild(gadgetEl);
      }
    }
    if(homeOfficeArr.length > 0) {
      for (let index = 0; index < homeOfficeArr.length; index += 1) {
        const homeEl = homeOfficeArr[index];
        homeContainer.appendChild(homeEl);
      }
    }

  }

  const tabEvents = () => {
    const tabTitles =  document.querySelectorAll(`.section-title-inner .product-title`);
    
    // make first one active
    document.querySelector(`.section-title-inner .product-title`).classList.add(`${ID}-titleActive`);
    document.querySelector(`.${ID}-tabContent`).classList.add(`${ID}-tabContentActive`);

    const makeActive = (e) => {
      window.jQuery(`.${ID}-tabContent`).slick('resize');
        // remove if deselected
          if(!e.currentTarget.classList.contains(`${ID}-titleActive`)) {
            for (let index = 0; index < tabTitles.length; index += 1) {
              const element = tabTitles[index];
              element.classList.remove(`${ID}-titleActive`);
            }
            
            // remove active from current tab
            e.currentTarget.classList.add(`${ID}-titleActive`);
            
          }

          const tabTarget = e.currentTarget.getAttribute('data-header');
          if(document.querySelector(`.${ID}-tabContentActive`)) {
            document.querySelector(`.${ID}-tabContent.${ID}-tabContentActive`).classList.remove(`${ID}-tabContentActive`);
        }
        document.querySelector(`.${ID}-tabContent.${ID}-${tabTarget}`).classList.add(`${ID}-tabContentActive`);
    }
      
      for (let x = 0; x < tabTitles.length; x += 1) {
        const el = tabTitles[x];
        el.addEventListener('click', makeActive);
      }
    
  }

  const slickProducts = () => {
    window.jQuery(`.${ID}-tabContent`).slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      mobileFirst: true,
      arrows: true,
      responsive: [
        {
          breakpoint: 1280,
          settings: {
            slidesToShow: 5,
          }
        },
        {
          breakpoint: 1023,
          settings: {
            slidesToShow: 4,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 375,
          settings: {
            slidesToShow: 2,
          }
        }
      ]
    });
  }

  const addButtons = () => {
    const buttonsWrap = document.createElement('div');
    buttonsWrap.classList.add(`${ID}-buttons`);
    buttonsWrap.innerHTML = 
    `<a class="${ID}-button ${ID}-brand" href="${getBrandLink()}">Shop all ${getBrand()}</a>
    <a class="${ID}-button ${ID}-category" href="${getCategoryLink()}">Shop all ${getCategory()}</a>`;

    document.querySelector('.brand-section').appendChild(buttonsWrap);
  }

  // force images to load
  loadProductImages();

  createArrProducts().then(() => {
    createTabs();  
    moveProducts();
    addButtons();
    tabEvents();
    slickProducts();

  });
  
};
