/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import categories from './categories';
import PageMarkup from './markup';
import MobileFilter from './mobileFilter';
import oosProducts from './oosProducts';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {

  setup();

  // TO DO:
  // out of stock once products are added

  fireEvent('Conditions Met');
  const isMobile = () => window.innerWidth < 768;

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    return;
  }



   // loop through all products to add an attribute based on the category heading
   const addProductAttr = () => {

    const clothingCategories = ['christmas-sweaters', 'jackets-and-outerwear', "mens-t-shirts", 'ladies-nightwear-and-pyjamas', 'nightwear-and-pyjamas', 'dressing-gowns--bathrobes', 'cosplay', 'accessories', 'jewellery', 'bags', 'wallets-and-purses', 'scarves', 'earrings', 'gloves', 'necklaces', 'watches', 'slippers', 'badges'];
    const homeCategories = ['candles', 'home-and-office', 'kitchen-gadgets', 'lights', 'computer-tablets--mobile', 'posters-and-wallscrolls', 'kitchenware', 'stationery', 'keyrings', 'money-boxes', 'cups-coasters-and-mugs', 'christmas-decorations'];
    const toysCategories = ['models-and-figures', 'games', 'props-figures-and-plushies', 'props--replicas'];

    const allProducts = document.querySelectorAll('.products.wrapper.grid.products-grid .item.product.product-item');
    for (let index = 0; index < allProducts.length; index += 1) {
      const element = allProducts[index];
      const categoryHeading = element.parentNode.parentNode.id;

      // make image src that actual product image to avoid blank lazy load
      //const imageData = element.querySelector('img').getAttribute('data-original');
     // element.querySelector('img').setAttribute('src', imageData);
    
  

      if(categoryHeading) {

        // add target based on categories
        if(clothingCategories.indexOf(categoryHeading) > -1) {
        element.setAttribute('cat-data', 'clothing');
          document.querySelector(`.${ID}-categoryList.${ID}-clothingList .${ID}-list`).appendChild(element);
        
        }

        if(homeCategories.indexOf(categoryHeading) > -1) {
        element.setAttribute('cat-data', 'home');
        document.querySelector(`.${ID}-categoryList.${ID}-homeList .${ID}-list`).appendChild(element);
        }

        if(toysCategories.indexOf(categoryHeading) > -1) {
        element.setAttribute('cat-data', 'toys');
        document.querySelector(`.${ID}-categoryList.${ID}-toysList .${ID}-list`).appendChild(element);
        }
      }
    }
  }

  // Seperate brand name from product name
  const changeProductTitle = () => {
    const productNameElms = document.querySelectorAll('.product-item-details .product-item-name');
    [].forEach.call(productNameElms, (productNameElm) => {
      const link = productNameElm.querySelector('.product-item-link');
      if(link) {
        const text = link.innerText.trim();
        const regex = /^([^:]+:)/i;
        const regexMatches = text.match(regex);
  
        if(regexMatches && regexMatches[1]) {
          const newTitle = text.replace(regex, '');
          link.innerHTML = newTitle;
  
          link.insertAdjacentHTML('afterbegin', `
            <span class="${ID}-cat-name">${regexMatches[1].replace(/:$/, '')}</span>
          `);
        }
      }
    });
  }

  // limited qty banner
  const limitedQTY = () => {
    const limitedBanner = document.createElement('div');
    limitedBanner.classList.add(`${ID}-limitedMessage`);
    limitedBanner.innerHTML = `
    <div class="${ID}-content">
      <div class="${ID}-icon"></div>
      <h3>Don't miss out on your favourite merch!</h3>
      <p>All our products run on limited quantities</p>
    </div>`;

    if(window.location.href.indexOf('/brand/') > -1) {
      document.querySelector(`.${ID}-categoryList`).insertAdjacentElement('afterend', limitedBanner);
    } else {
      if(isMobile()) { 
        if(document.querySelectorAll(`.products.list.items.product-items .item.product.product-item`)[3]) {
          document.querySelectorAll(`.products.list.items.product-items .item.product.product-item`)[3].insertAdjacentElement('afterend', limitedBanner);
        }
      } else {
        if(document.querySelectorAll(`.products.list.items.product-items .item.product.product-item`)[7]) {
          document.querySelectorAll(`.products.list.items.product-items .item.product.product-item`)[7].insertAdjacentElement('afterend', limitedBanner);
        }
      }
    }

  }


  // -----------------------------
  // Brand page
  // -----------------------------

  if(window.location.href.indexOf('/brand/') > -1) {
    pollerLite(['.brand-logo-mobile'], () => {
      document.documentElement.classList.add(`${ID}-brand`);
      new PageMarkup();
  
      
      addProductAttr();
      categories();
      limitedQTY();
      oosProducts();
      changeProductTitle();
    });
   


  // -----------------------------
  // Category page
  // -----------------------------
  } else {
    document.documentElement.classList.add(`${ID}-category`);
    if(window.location.href.indexOf('/?') === -1) {
      oosProducts();
    }
    changeProductTitle();
    // -----------------------------
    // Filter & Sort
    // -----------------------------
    const createSortAndFilterBar = (elmToInsertBefore) => {
      const html = `
        <div class="${ID}-filter-sort">
          <div class="${ID}-filter-sort__filter"><a>Filter</a></div>
          <div class="${ID}-filter-sort__sort">
            <a>Sort</a>
            <div class="${ID}-filter-sort__sort-opts">
            <ul>
              <li>
                <a target="product_list_dir=asc">Recommended</a>
              </li>
              <li>
                <a target="product_list_order=price&product_list_dir=desc">Price (High to Low)</a>
              </li>
              <li>
                <a target="product_list_order=price&product_list_dir=asc">Price (Low to High)</a>
              </li>
              <li>
                <a target="product_list_order=name&product_list_dir=asc">Product Name</a>
              </li>
              <li>
                <a target="product_list_order=popularity&product_list_dir=desc">Popularity</a>
              </li>
            </ul>
          </div>
        </div>
          </div>
    
         
      `;
    
      elmToInsertBefore.insertAdjacentHTML('beforebegin', html);
    };

    

    if(isMobile()) {
      let elmToInsertBefore = null;
      elmToInsertBefore = document.querySelector('.subcategory-filters');
  
      if(elmToInsertBefore) {
        // Create sort / filter bar
        createSortAndFilterBar(elmToInsertBefore);
  
        // Show page x of y summary
        const filterSortWrapper = document.querySelector(`.${ID}-filter-sort`);
        const toolbarAmount = document.querySelector('#toolbar-amount');
  
        if(toolbarAmount && filterSortWrapper) {
          filterSortWrapper.insertAdjacentHTML('afterend', `
            <div class="${ID}-toolbar-amount">
              Showing ${toolbarAmount.innerText.trim()}
            </div>
          `);
        }
      }

      const sortButton = document.querySelector(`.${ID}-filter-sort__sort a`);
      const sortOpts = document.querySelector(`.${ID}-filter-sort__sort-opts`);
      
      if(sortButton && sortOpts) {
        sortButton.addEventListener('click', (e) => {
          if(e.currentTarget.classList.contains('xactive')) {
            e.currentTarget.classList.remove('xactive');
          } else {
            e.currentTarget.classList.add('xactive');
          }
  
          if(sortOpts && sortOpts.classList.contains(`${ID}-filter-sort__sort-opts--active`)) {
            sortOpts.classList.remove(`${ID}-filter-sort__sort-opts--active`);
          } else if(sortOpts && !sortOpts.classList.contains(`${ID}-filter-sort__sort-opts--active`)) {
            sortOpts.classList.add(`${ID}-filter-sort__sort-opts--active`);
          }
        });
  
        [].forEach.call(sortOpts.querySelectorAll('li'), (opt) => {
          const optLink = opt.querySelector('a');
  
          if(optLink) {
            optLink.addEventListener('click', (e) => {
              const target = e.currentTarget.getAttribute('target');
              if(target) {
                window.location.search = target;
              }
            });
  
            // On page load prepopulate sort opts
            const target = optLink.getAttribute('target');
  
            if(target == window.location.search.replace('?', '')) {
              // Is active
              opt.classList.add(`xactive`);
            }
          }
        });
      }

      new MobileFilter();


    }

    limitedQTY();

  }
  
};
