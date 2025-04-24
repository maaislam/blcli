/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { events } from '../../../../../lib/utils';
import { brandLinks, categoryLinks } from './data';
import { setup } from './services';
import shared from './shared';

export default () => {
  setup();


  const { ID, VARIATION } = shared;

  // Write experiment code here
  const getCategory = () => {
    const category = window.dataLayer[0].google_tag_params["ecomm_category"];
    if(category) {
      let catName;
      
      if(category.match(/[^(\/)]*/) && category.match(/[^(\/)]*/)[0]) {
        catName = category.match(/[^(\/)]*/)[0]
      
      } else {
        catName = category;
      }

      
      return catName;
    }
  }

  const getCategoryLink = () => {
    let catLink;
    if(categoryLinks[getCategory()]) {
      catLink = categoryLinks[getCategory()];
      return catLink;
    }
  }

  const getBrand = () => {
    const brandName = document.querySelector('meta[property="og:brand"]').content.match(/[^,]*/);
    if(brandName[0] && brandName[0].indexOf('geek') === -1) {
      return brandName[0];
    }
  }

  const getBrandLink = () => {
    let brandLink;
    if(brandLinks[getBrand()]) {
      brandLink = brandLinks[getBrand()].link;
      return brandLink;
    }
  }

  const createButtons = () => {
    const buttonsWrap = document.createElement('div');
    buttonsWrap.classList.add(`${ID}-buttons`);
    buttonsWrap.innerHTML = 
    `<h3>See more like this...</h3>
    <div class="${ID}-inner">
      <a class="${ID}-button ${ID}-brand" href="${getBrandLink()}">Shop all ${getBrand()}</a>
      <a class="${ID}-button ${ID}-category" href="${getCategoryLink()}">Shop all ${getCategory()}</a>
    </div>`;

    if(window.innerWidth >= 768) {
      document.querySelector('.product-info-main').insertAdjacentElement('beforeend', buttonsWrap);
    } else {
      document.querySelector('#maincontent').insertAdjacentElement('afterend', buttonsWrap);
     
    }
   


    const brandButton = document.querySelector(`.${ID}-button.${ID}-brand`);
    const catButton = document.querySelector(`.${ID}-button.${ID}-category`);

    brandButton.addEventListener('click', () => {
      events.send(`${ID} v${VARIATION}`, 'click', 'shop brand button');
    });

    catButton.addEventListener('click', () => {
      events.send(`${ID} v${VARIATION}`, 'click', 'shop category button');
    });
  }


  const cloneButtons = () => {
    const buttonsTop = document.querySelector(`.${ID}-buttons`);
    const buttonsBottom = buttonsTop.cloneNode(true);
    buttonsBottom.classList.add(`${ID}-bottom`);

    document.querySelector(`#related-brand-products`).insertAdjacentElement('beforebegin', buttonsBottom);


    const bottombrandButton = document.querySelector(`.${ID}-bottom .${ID}-button.${ID}-brand`);
    const bottomcatButton = document.querySelector(`.${ID}-bottom .${ID}-button.${ID}-category`);

    bottombrandButton.addEventListener('click', () => {
      events.send(`${ID} v${VARIATION}`, 'click', 'shop bottom brand button');
    });

    bottomcatButton.addEventListener('click', () => {
      events.send(`${ID} v${VARIATION}`, 'click', 'shop bottom category button');
    });
  }

  if(getBrand() !== '' && getCategory() !== '') {
    createButtons();

    if(VARIATION === '2') {
      cloneButtons();
    }
  }
};
