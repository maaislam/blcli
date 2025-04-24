/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { addJsToPage, events, pollerLite } from '../../../../../lib/utils';
import PageMarkup from './markup';
import { setup } from './services';
import shared from './shared';

export default () => {
  setup();

  const { ID, VARIATION } = shared;
  // Write experiment code here
  new PageMarkup();

  const addMagnifyer = `
    <div class="${ID}-zoom">
      <svg id="svg_search" viewBox="0 0 32 32">
        <path d="M24.7 13.2zM30.1 28.4l-8-7.9c1.7-2 2.7-4.5 2.7-7.3 0-6.3-5.2-11.4-11.5-11.4-6.5 0-11.7 5.1-11.7 11.4 0 6.3 5.2 11.4 11.5 11.4 2.8 0 5.4-1 7.4-2.6l8 7.9c.4.4 1.1.4 1.5 0 .4-.4.5-1.1.1-1.5zM3.8 13.2c0-5.1 4.2-9.3 9.4-9.3s9.4 4.2 9.4 9.3c0 5.1-4.2 9.3-9.4 9.3s-9.4-4.1-9.4-9.3z"></path>
      </svg>
    </div>`;

    if(document.querySelector('.gallery-placeholder')) {
      document.querySelector('.gallery-placeholder').insertAdjacentHTML('beforeend', addMagnifyer);
    }


  /**
   * Create the shop all brands button
   */

  let brand;
  let brandLink;

  // get brand name from JSON on page
  const getBrandName = () => {
    const getJSON = document.querySelectorAll('script[type="application/ld+json"]');
    for (let index = 0; index < getJSON.length; index += 1) {
      const element = getJSON[index];
      const parseEL = JSON.parse(element.innerHTML.trim());
      
      if(parseEL.brand && parseEL.brand.name) {
         const brandName = parseEL.brand.name;
         return brandName;
      }
    }
  }

  brand = getBrandName();

  // get brand link from brands page
  const getBrandLink = () => {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
        request.open('GET','https://www.salonsdirect.com/brands', true);
        request.onload = () => {
          if (request.status >= 200 && request.status < 400) {
            const temp = document.createElement('html');
            temp.innerHTML = request.responseText;

            const allBrandsLink = temp.querySelectorAll('.brand-listing__item .brand-listing__link');
            for (let index = 0; index < allBrandsLink.length; index += 1) {
              const element = allBrandsLink[index];
              if(element.textContent.trim() === brand) {
                brandLink = element.getAttribute('href');
              }
            }
            
            resolve(brandLink);
          }
        };
        request.send();
        
      });
  }

  const addBrandButton = (brandLink) => {
    const brandButton = document.createElement('a');
    brandButton.classList.add(`${ID}-button`)
    brandButton.setAttribute('href', brandLink);
    brandButton.innerHTML = `Shop all ${brand}`;

    document.querySelector(`.${ID}-buttons`).appendChild(brandButton);
  }

  // add link once brand name and link exist
  getBrandLink().then(addBrandButton);
  

  /**
   * Get the category based on the SKU
   */
  const getCategory = () => {


    let matchingCategory;
    let matchingLink;

    const barberSKU = window.SD076barberData["barberSKU"];

    const beauty1SKU = window.SD076beauty1Data['beautySKU'];
    const beauty2SKU = window.SD076beauty2Data['beautySKU'];

    const furnitureSKU = window.SD076furnitureData['furnitureSKU'];
    
    const hairColour1SKU = window.SD076hair1ColData['hairColourSKU'];
    const hairColour2SKU = window.SD076hairCol2Data['hairColourSKU'];

    const hair1SKU = window.SD076hair1Data['hairSKU'];
    const hair2SKU = window.SD076hair2Data['hairSKU'];

    const nails1SKU = window.SD076nails1Data['nailsSKU'];
    const nails2SKU = window.SD076nails2Data['nailsSKU'];

    


    const catArr = [];

    const productSKUEl = document.querySelector('.product.attribute.sku .value');
    if(productSKUEl) {
      const sku = productSKUEl.textContent.trim();

      if(barberSKU.indexOf(sku) > -1) {
        matchingCategory = 'Barbers';
        matchingLink = 'https://www.salonsdirect.com/barbering';
      } else if(beauty1SKU.indexOf(sku) > -1 || beauty2SKU.indexOf(sku) > -1 ) {
        matchingCategory = 'Beauty';
        matchingLink = 'https://www.salonsdirect.com/beauty';
      }
      else if(furnitureSKU.indexOf(sku) > -1) {
        matchingCategory = 'Furniture';
        matchingLink = 'https://www.salonsdirect.com/furniture';
      }
      else if(hairColour1SKU.indexOf(sku) > -1 || hairColour2SKU.indexOf(sku) > -1) {
        matchingCategory = 'Hair Colour';
        matchingLink = 'https://www.salonsdirect.com/hair-colour';
      }
      else if(hair1SKU.indexOf(sku) > -1 || hair2SKU.indexOf(sku) > -1) {
        matchingCategory = 'Hair';
        matchingLink = 'https://www.salonsdirect.com/hair';
      }
      else if(nails1SKU.indexOf(sku) > -1 || nails2SKU.indexOf(sku) > -1) {
        matchingCategory = 'Nails';
        matchingLink = 'https://www.salonsdirect.com/nails';
      }

      catArr.push(matchingCategory, matchingLink);
      return catArr;
     }
    }



  const addCategoryButton = () => {
    const catButton = document.createElement('a');
    catButton.classList.add(`${ID}-button`)
    catButton.setAttribute('href', getCategory()[1]);
    catButton.innerHTML = `Shop all ${getCategory()[0]}`;

    document.querySelector(`.${ID}-buttons`).appendChild(catButton);
  }

 // addCategoryButton();


  /**
   * Create the carousel
   */
  const createCarousel = () => {
    // get all rec products
    const allProducts = document.querySelectorAll('.additional-product-grids .product-item');
    for (let index = 0; index < allProducts.length; index += 1) {
      const element = allProducts[index];

      element.querySelector('button').addEventListener('click' , () => {
        events.send(`${ID} V${VARIATION}`, 'click', 'Added Product Recommendation');
      });
      element.querySelector('.product.photo').addEventListener('click' , () => {
        events.send(`${ID} V${VARIATION}`, 'click', 'View Product Recommendation');
      });
      document.querySelector(`.${ID}-recommended .${ID}-carousel`).appendChild(element);
      
    }
  }
  
  createCarousel();

  /**
   * Image lightbox
   */

  const imageLightbox = () => {
    


    const overlay = `<div class="${ID}-overlay"></div>`;
    const lightbox = document.createElement('div');
    lightbox.classList.add(`${ID}-galleryLightbox`);
    lightbox.innerHTML = `<div class="${ID}-close">x</div>
    <div class="${ID}-images"></div>`;

    document.body.appendChild(lightbox);
    document.body.insertAdjacentHTML('beforeend', overlay);


    const newImages = document.querySelectorAll('.gallery-placeholder .fotorama__stage__frame img');

    for (let index = 0; index < newImages.length; index += 1) {
      const element = newImages[index];
      const imgSrc = element.getAttribute('src');
      const newImage = document.createElement('div');
      newImage.classList.add(`${ID}-carouselImage`);
      newImage.setAttribute('style', `background-image: url(${imgSrc})`);
      document.querySelector(`.${ID}-galleryLightbox .${ID}-images`).appendChild(newImage);
    }


    const mainimageEl = document.querySelector('.gallery-placeholder');
    const lightboxEl = document.querySelector(`.${ID}-galleryLightbox`);
    const overlayEl = document.querySelector(`.${ID}-overlay`);

    

      // lightbox events
    const openBox = () => {
      document.body.classList.add(`${ID}-noScroll`);
      lightboxEl.classList.add(`${ID}-boxShow`);
      overlayEl.classList.add(`${ID}-show`);


      requirejs(['js/carousels'], (carouselFunction) => {
        carouselFunction( {
          cellAlign: 'left',
          contain: true,
          wrapAround: true,
          pageDots: true,
        }, document.querySelector(`.${ID}-galleryLightbox .${ID}-images`));
      });
      
    }
    const closeBox = () => {
      document.body.classList.remove(`${ID}-noScroll`);
      lightboxEl.classList.remove(`${ID}-boxShow`);
      overlayEl.classList.remove(`${ID}-show`);
    }

    document.querySelector(`.${ID}-zoom`).addEventListener('click', (e) => {
      openBox();
    });

    lightboxEl.querySelector(`.${ID}-close`).addEventListener('click', () => {
      closeBox();
    });

    overlayEl.addEventListener('click', () => {
      closeBox();
    });  
  }

  imageLightbox();

  const buttonEvents = () => {
    const allMoreButtons = document.querySelectorAll(`.${ID}-buttons a.${ID}-button`);
    for (let index = 0; index < allMoreButtons.length; index += 1) {
      const element = allMoreButtons[index];
      element.addEventListener('click', () => {
        events.send(`${ID} v${VARIATION}`, 'click', `See more: ${element.textContent}`);
      });
    }
  }

  buttonEvents();
  

  /* Run carousels */

  requirejs(['js/carousels'], (carouselFunction) => {
    
    carouselFunction( {
            cellAlign: 'left',
            contain: true,
            wrapAround: true,
            pageDots: true,
    }, document.querySelector('.SA076-recommended .SA076-carousel'));
  });
  
};
