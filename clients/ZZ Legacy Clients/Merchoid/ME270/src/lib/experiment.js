/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import mobileHeader from './mobileHeader';
import { setup } from './services';
import shared from './shared';

export default () => {
  setup();

  const { ID } = shared;

  let jumperText;
  if(window.location.href.indexOf('/uk/') > -1) {
    jumperText = 'jumpers';
  } else {
    jumperText = 'sweaters';
  }

  if(window.innerWidth < 767) {
    mobileHeader();
  }

  const addBrandCatBar = () => {
    const blueBar = document.createElement('div');
    blueBar.classList.add(`${ID}-blueBox`);
    blueBar.innerHTML = `
    <div class="${ID}-content">
      <p><b>Welcome to Merchoid.</b> THE place to get your officially licensed</p>
   
      <p class="${ID}-generated">
        <span class="${ID}-brand"></span>
        <span class="${ID}-category"></span>
      </p>
      </div>`;
      if(window.innerWidth < 767) {
        document.querySelector('.header.content').insertAdjacentElement('afterend', blueBar);
      } else {
        document.querySelector('.sections.nav-sections').insertAdjacentElement('afterend', blueBar);
        
      }
  }

  const addListItems = () => {
    const brands = [
      'Zelda',
      'Star Wars',
      'Harry Potter',
      'Marvel',
      'Batman',
      'Disney',
      'Nintendo',
      'Jurassic Park',
      'Playstation',
      'Friends',
      'Spiderman'
    ];
    const categorys = [
      `${jumperText}`,
      'T-Shirts',
      'Mugs',
      'Hoodies',
      'Pyjamas',
      'Swimwear',
      'Bags',
      'Games',
      'Wallets',
      'Jewellery',
      'Lights'
    ];

    const randomBrand = () => {
      const brandEl = document.querySelector(`.${ID}-blueBox .${ID}-brand`);
      const brand = brands[Math.floor(Math.random() * brands.length)];
      brandEl.classList.add(`${ID}-animated`);
      brandEl.innerHTML = brand;

      setTimeout(() => {
        brandEl.classList.remove(`${ID}-animated`);
      }, 3000);

    }

    const randomCategory = () => {
      const catEl = document.querySelector(`.${ID}-blueBox .${ID}-category`);
      const category = categorys[Math.floor(Math.random() * categorys.length)];
      catEl.classList.add(`${ID}-animated`);
      catEl.innerHTML = category;

      setTimeout(() => {
        catEl.classList.remove(`${ID}-animated`);
      }, 3000);

    }

    randomBrand();
    setTimeout(() => {
      randomCategory();
      runCategoryLater()
    }, 2000);

    setInterval(() => {
      randomBrand();
    }, 4000);

   function runCategoryLater() { 
    setInterval(() => {
        randomCategory();
      }, 4000);
    }
   
  }

  addBrandCatBar();
  addListItems();

};
