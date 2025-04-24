/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import { events, pollerLite } from '../../../../../lib/utils';

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  let title;

  if(VARIATION === '1') {
    title = 'Need a Chocolat fix now? Other customers love...';
  } else if(VARIATION === '2') {
    title = 'Need a Chocolat fix now?';
  }
  const bestSellMarkup = () => {
    const upsellBlock = document.createElement('div');
    upsellBlock.classList.add(`${ID}-otherWrapper`);
    upsellBlock.innerHTML = `
    <div class="${ID}-container">
      <h3>${title}</h3>
      <div class="${ID}-contentContainer">
        <div class="${ID}-contentCarousel"></div>
      </div>
    </div>`;

    if(window.innerWidth >= 767) {

      // create content to move description and delivery info
      const bottomContent = document.createElement('div');
      bottomContent.classList.add(`${ID}-bottomContent`);
      bottomContent.innerHTML = `<div class="${ID}-column ${ID}-left"></div><div class="${ID}-column ${ID}-right"></div>`;

      document.querySelector('.product-col-2').insertAdjacentElement('afterend', bottomContent);

      const tabs = document.querySelector('.product-detail');
      const info1 = document.querySelector('.prod-info.prod-info-b');
      const info2 = document.querySelector('.prod-info.prod-info-c');

      const contentImg = document.querySelector('.content-zone .craigsmaincontainer');

      const recs = document.querySelector('#cq_recomm_slot-35a16bdabf87e9bcfd58e5632e');

      bottomContent.querySelector(`.${ID}-left`).appendChild(tabs);
      bottomContent.querySelector(`.${ID}-right`).appendChild(info1);
      bottomContent.querySelector(`.${ID}-right`).appendChild(info2);

      if(contentImg) {
        bottomContent.querySelector(`.${ID}-right`).appendChild(contentImg);
      }
     
      const allContent = document.querySelectorAll('.content-zone');
      if(allContent) {
        for (let index = 0; index < allContent.length; index++) {
          const element = allContent[index];
          if(!element.querySelector('#klarna-placement-cart')) {
            bottomContent.querySelector(`.${ID}-right`).appendChild(element);
          }
        }
      }


      document.querySelector(`.${ID}-bottomContent`).insertAdjacentElement('beforebegin', upsellBlock);


      if(recs) {
        document.querySelector(`.${ID}-otherWrapper`).insertAdjacentElement('beforebegin', recs);
      }
    } else {
      document.querySelector('.product-add-to-cart').insertAdjacentElement('afterend', upsellBlock);
    }
  }

  const getBestSellers = () => {
      window.jQuery.ajax({
          url: 'https://www.hotelchocolat.com/uk/shop/collections/products/all-products/?srule=Sorting%20based%20on%20review&start=0&sz=24',
          type: 'post',
          success: function(data) {
            const pageData = data;
            const products = jQuery(pageData).find('#search-result-items .grid-tile');
            const prodArr = Array.from(products);
            const firstEight = prodArr.slice(0,9);
            for (let index = 0; index < firstEight.length; index += 1) {
                const element = firstEight[index];

                // hide if gift card
                if(element.querySelector('.product-tile').getAttribute('data-itemid') === 'gift-card') {
                 element.style.display = 'none';
                }
                element.classList.add(`${ID}-product`);

                // click event
                const name = element.querySelector('.name-link').getAttribute('title');
                element.addEventListener('click', () => {
                  events.send(`${ID} variation: ${VARIATION}`, 'click', `Recommended product: ${name}`);
                });

                document.querySelector(`.${ID}-contentContainer .${ID}-contentCarousel`).appendChild(element);
              }             
          }
      });
  }

  const addCategories = () => {

    const categories = {
      'Christmas Gifts': {
        background: 'https://www.hotelchocolat.com/on/demandware.static/-/Sites-HotelChocolat-Library/default/dw2a5b7c8f/HC/2021/Christmas/800px-Images/Christmas-Boxed-800pxb.png',
        catLink: 'https://www.hotelchocolat.com/uk/shop/christmas/',
      },
      'Chocolate Boxes': {
        background: 'https://editor-assets.abtasty.com/48343/61a8ed519cd081638460753.jpg',
        catLink: 'https://www.hotelchocolat.com/uk/shop/collections/products/chocolate-box/',
      },
      'Bestselling Gifts': {
        background: 'https://www.hotelchocolat.com/on/demandware.static/-/Sites-HotelChocolat-Library/default/dw647180fb/HC/2020/Core/640px-Images/Gifts-For-Her-640px.jpg',
        catLink: 'https://www.hotelchocolat.com/uk/shop/gift-ideas/shop-by-occasion/best-chocolate/',
      },
      'Hot Chocolate': {
        background: 'https://www.hotelchocolat.com/on/demandware.static/-/Sites-HotelChocolat-Library/default/dw604ba204/HC/2020/Core/640px-Images/Hot-Chocolate-640px.jpg',
        catLink: 'https://www.hotelchocolat.com/uk/shop/collections/products/hot-chocolate/',
      },
    }


    Object.keys(categories).forEach((i) => {
      const data = categories[i];
      const categoryBox = document.createElement('li');
      categoryBox.classList.add(`${ID}-category`);
      categoryBox.style = `background-image:url(${data.background})`;
      categoryBox.innerHTML = `
      <a href="${data.catLink}">
        <div class="${ID}-title"><h4>${[i][0]}</h4></div>
      </a>`;

      document.querySelector(`.${ID}-contentContainer .${ID}-contentCarousel`).appendChild(categoryBox);
    });

    const allCategories = document.querySelectorAll(`.${ID}-category`);
    for (let index = 0; index < allCategories.length; index += 1) {
      const element = allCategories[index];
      element.addEventListener('click', () => {
        const elName = element.querySelector(`.${ID}-title`).textContent;
        events.send(`${ID} variation: ${VARIATION}`, 'click', `category: ${elName}`);
      });
    }

  }

  const slickProducts = () => {
    window.jQuery(`.${ID}-contentCarousel`).slick({
        infinite: true,
        arrows: true,
        slidesToShow: 4,
        slidesToScroll: 1,
    });

}

  bestSellMarkup();
  if(VARIATION === '1') {
    getBestSellers();

    pollerLite([`.${ID}-contentCarousel li`], () => {
      if(window.innerWidth >= 767) {
          slickProducts();
          window.jQuery(`.${ID}-contentCarousel`).slick('resize');
      }
    });
  } 

  if(VARIATION === '2') {
   addCategories();

   const checkStock = document.querySelector('#check-store-stock');
   const notify = document.querySelector('.back-in-stock-notification.button');

   if(notify) {
     document.documentElement.classList.add(`${ID}-notify`)
    checkStock.insertAdjacentElement('afterend', notify);
   }
  }

  // At end of code, reset window.einstein expect type array
  window.einstein.loaded = [];
};
