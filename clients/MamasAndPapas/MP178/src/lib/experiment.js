/**
 * MP178 - Furniture names Restructure
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion JT
 */
import { setup } from './services';
import { pollerLite } from '../../../../../lib/uc-lib';

export default () => {
  setup();
  
  const passChecks = () => {
    let run = false;

    if (window.location.href.indexOf('https://www.mamasandpapas.com/en-gb/c/nursery/nursery-furniture') > -1 ||
        window.location.href.indexOf('https://www.mamasandpapas.com/en-gb/c/nursery/nursery-furniture/furniture-bundles') > -1) {
      run = true;
    }

    if (document.body.classList.contains('MP171')) {
      run = false;
    }

    return run;
  };

  if (!passChecks()) return false;

  const brandList = [
    'Mia Sleigh',
    'Mia',
    'Atlas',
    'Lawson',
    'Franklin',
    'Dover',
    'Oxford',
    'Lucca',
    'Hilston',
    'Snuzpod',
    'Millie & Boris',
    'Welcome to the World',
    'Welcome To The World',
    'Chicco',
    'Dream Upon a Cloud',
    'Heaton',
    'Little Forest',
    'Melrose',
    'Pembroke',
    'Petite',
    'Ripley',
    'Lawson Convertible',
    'Breeze',
    'Millie',
    'Boris',
    'Maxi-Cosi',
    'Flyn',
    'Clair De Lune',
  ]

  // Edit multiple products at once
  const changeProduct = (product) => {
    const title = product.querySelector('.productCard_title > a');
    const titleText = title.textContent;

    let brand = '';
    let piece = '';
    let colour = '';
    let main = '';

    // Split the title up
    for (let i = 0; brandList.length > i; i += 1) {
      // Brand name
      if (titleText.indexOf(brandList[i]) > -1) {
        // console.log('true ', brandList[i]);
        brand = brandList[i];      
      }
    }

    // Piece
    if (titleText.match(/to\s\d+\s\w+/i)) {
      piece = titleText.match(/to\s\d+\s\w+/i)[0];
    } else if (titleText.match(/\d\s\w+\s\d+/i)) {
      piece = titleText.match(/\d\s\w+\s\d+/i)[0];
    } else if (titleText.match(/\d+\s\w+/i)) {
      // console.log('piece true ', titleText.match(/\d+\s\w+/i));
      piece = titleText.match(/\d+\s\w+/i)[0];
    }


    // Colour
    if (titleText.match(/\-\s\w.+/i)) {
      colour = titleText.match(/\-\s\w.+/i)[0];
      if (colour) {
        colour = colour.replace('- ', '');
      } 
    } 
    
    main = titleText.replace(brand, '');
    main = main.replace(piece, '');
    main = main.replace(colour, '');
    main = main.replace(' -', '');

    title.innerHTML = '';
    brand ? title.insertAdjacentHTML('beforeend', `<span class="MP178-span MP178-brand">${brand}</span>`) : null;
    piece ? title.insertAdjacentHTML('beforeend', `<span class="MP178-span">${piece}</span>`) : null;
    title.insertAdjacentHTML('beforeend', `<span class="MP178-span">${main}</span>`);
    title.insertAdjacentHTML('beforeend', `<span class="MP178-span">${colour}</span>`);
  
    
  };

  
  // Loop over each product
  pollerLite([
    '.productLister .productCard',
    '.productCard_title > a',
  ], () => {
    const pageProducts = document.querySelectorAll('.productLister .productCard');
    const productCount = pageProducts.length;
    for (let i = 0; productCount > i; i += 1) {
      changeProduct(pageProducts[i]);
    }
  });

};
