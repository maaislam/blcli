/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { pollerLite } from '../../../../../lib/utils';

export default () => {
  setup();


  function matchHeight(){
    //Grab divs with the class name 'match-height'
    var getDivs = document.getElementsByClassName('match-height');
  
    //Find out how my divs there are with the class 'match-height' 
    var arrayLength = getDivs.length;
    var heights = [];
  
    //Create a loop that iterates through the getDivs variable and pushes the heights of the divs into an empty array
    for (var i = 0; i < arrayLength; i++) {
        heights.push(getDivs[i].offsetHeight);
    }
  
     //Find the largest of the divs
    function getHighest() {
      return Math.max(...heights);
    }
  
    //Set a variable equal to the tallest div
    var tallest = getHighest();
  
    //Iterate through getDivs and set all their height style equal to the tallest variable
    for (var i = 0; i < getDivs.length; i++) {
        getDivs[i].style.height = tallest + "px";
    }
  };

  const parsePage = (data, querySelectorsObj) => {
    
    if (!data) return;

    const el = document.createElement('div');
    el.insertAdjacentHTML('beforeend', data);


    // Check if fetch
    if (el.querySelector('#lblLowStock')) return null;

    // Query els
    const dataOb = {}
  
    for (const key in querySelectorsObj) {
      if (querySelectorsObj[key]) {
        dataOb[key] = el.querySelector(querySelectorsObj[key]);
      }
    }

    

    return dataOb;
  }

  const addHTML = (ref, html, pos) => ref.insertAdjacentHTML(pos, html);

  // Fetch product information from PDP
  const fetchProduct = link => fetch(link);


  const buildHTML = (dataObject, link) => {
    return `
      <div class="PL035-suggestion">
        <a href="${link}" class="PL-title">${dataObject.title.textContent}</a>

        
        <div>
          ${dataObject.sku ? `<div class="PL-sku">${dataObject.sku.outerHTML}</div>` : ''}
          <div class="PL-flexWrap">
            <div class="PL-flex">
              <a href="${link}">
                ${dataObject.image.outerHTML}
              </a>
            </div>

            ${dataObject.offers ? `<div class="PL-flex">${dataObject.offers.outerHTML}</div>` : ''}
          </div>
        </div>

        ${dataObject.price ? dataObject.price.parentElement.outerHTML : ''}
      </div>
    `;
  }


  let numPrintersNeeded = 2;
  


  // Fetch product(s) from top of PLP
  const fetchListProducts = (plpLink, itemAmt) => {
    fetch(plpLink).then((res) => {
      if (res.status === 200) {
        return res.text();
      }
    }).then((data) => {
      const listItems = document.querySelectorAll('.product__items > li');
      let len = itemAmt + 1; // To encount for 0 indexing,
      // console.log({itemAmt})
      for (let i = 1; len > i; i += 1) {
        let pageDataObject = parsePage(data, {
          title: `.product__items > li:nth-of-type(${i}) .header__text`,
          sku: '',
          offers: `.product__items > li:nth-of-type(${i}) .spec-offer__container`,
          price: `.product__items > li:nth-of-type(${i}) .product-item__footer .price__items`,
          image: `.product__items > li:nth-of-type(${i}) .product-item__img img`,
        });
    
        // console.log('price ', pageDataObject.price.childNodes);
        if (pageDataObject.price.childNodes.length < 2) {
          pageDataObject = parsePage(data, {
            title: `.product__items > li:nth-of-type(${i + 2}) .header__text`,
            sku: '',
            offers: `.product__items > li:nth-of-type(${i + 2}) .spec-offer__container`,
            price: `.product__items > li:nth-of-type(${i + 2}) .product-item__footer .price__items`,
            image: `.product__items > li:nth-of-type(${i + 2}) .product-item__img img`,
          });

          // len += 1;
        };

        let thisBtn = pageDataObject.price.parentElement.querySelector('a.btn.btn--yellow');
        
        thisBtn ? thisBtn.textContent = 'View Details' : null;

        let thisLink = thisBtn.getAttribute('href');

        // console.log({itemAmt})
        addHTML(wrapperRef, `
          <div>
            
            <div class="PL-altP match-height">
              ${itemAmt === 1 ? '<h2>Alternative Printer</h2>' : ''}
              
              ${buildHTML(pageDataObject, thisLink)}
            </div>
          </div>      
        `, 'beforeend');

        // numPrintersNeeded -= 1;
      }

    }).catch((err) => {
      console.error(err);
    });
  }


  // Add base wrapper for adding further elements
  const ref = document.querySelector('.product-page__header + .limited-row');
  addHTML(ref, `<div class="PL035-wrap"></div>`, 'afterend');
  const wrapperRef = document.querySelector('.PL035-wrap');

  const replacementLink = document.querySelector('span.replacement_link a');

  fetchProduct(replacementLink.getAttribute('href')).then((res) => {
    if (res.status === 200) {
      return res.text();
    }
  }).then((data) => {
    const pageDataObject = parsePage(data, {
      title: '.main__title > h1',
      sku: '.main__title + p',
      offers: '.product-tab__tab-content .product-container > div:first-of-type',
      price: '.product-container__pricing',
      image: '.Main_image img',
    });
    // console.log({pageDataObject});
    if (!pageDataObject) return;
    if (!pageDataObject.price) return;

    // Edit Price / ATB to View
    const btn = pageDataObject.price.querySelector('a.add-to-cart-action');
    
    // const newOffers = `<div class="spec-offer__container">${pageDataObject.offers.outerHTML}</div>`;

    // pageDataObject.offers ? pageDataObject.offers = `<div class="spec-offer__container">${pageDataObject.offers}</div>` : '';

    if (btn && btn.parentNode) {
      btn.parentElement.insertAdjacentHTML('beforeend', `
        <a href="${replacementLink.getAttribute('href')}" class="btn btn--yellow">View Details</a>
      `);

      btn.parentNode.removeChild(btn);
    }
    
    console.log(pageDataObject)

    addHTML(wrapperRef, `
      <div class=${pageDataObject.offers.childNodes.length > 1 ? "DR-PL" : ""}>
        <div class="match-height">
          <h2>Direct Replacement</h2>
          
          ${buildHTML(pageDataObject, replacementLink.getAttribute('href'))}
        </div>
      </div>      
    `, 'afterbegin');

    
    numPrintersNeeded = 1;

    return;
  }).then(() => {
    // let PLP_URL = 'https://www.printerland.co.uk/printers/';
    const urlEl = document.querySelector('.rewards.discontinued');
    let PLP_URL = urlEl ? urlEl.getAttribute('data-related-category') : 'https://www.printerland.co.uk/printers/';

    console.log({PLP_URL})
    // We can do PDP checks here to add filters to the URL. E.g. A4, colour 
    fetchListProducts(PLP_URL, numPrintersNeeded);
    // console.log({numPrintersNeeded})
    if (numPrintersNeeded === 2) {
      addHTML(wrapperRef, '<h2 class="PL035-header">Alternative Printers</h2>', 'afterbegin');
    }
    
  }).then(() => {
    if (window.innerWidth > 1149) {
      pollerLite(['.PL035-suggestion', '.PL-altP'], matchHeight);
    }
  }).catch((err) => {
    console.error(err);
    const urlEl2 = document.querySelector('.rewards.discontinued');
    let PLP_URL2 = urlEl2 ? urlEl2.getAttribute('data-related-category') : 'https://www.printerland.co.uk/printers/';
    fetchListProducts(PLP_URL2, numPrintersNeeded);
  });




  // Move elements
  const cartridgeBanner = document.querySelector('#pnlRelatedLink');
  const newRef = document.querySelector('.product-tabs');
  
  newRef && cartridgeBanner ? newRef.insertAdjacentElement('beforeend', cartridgeBanner) : null;


  // Change Replacement element
  const closestP = replacementLink.closest('p');
  closestP.classList.add('PL035-red');
  closestP.innerHTML = '';
  closestP.textContent = "We're sorry, this printer is no longer available.";


  const title = document.querySelector('.product-page__header');
  const titleRef = document.querySelector('.product-page__header + .row .column._50');

  titleRef.insertAdjacentElement('beforeend', title);

};
