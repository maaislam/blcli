/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { Storage } from './helpers';
import { wishlist } from './component';
import { loadStyleSheet, pollerLite, events } from '../../../../../lib/utils';

export default () => {
  setup();  

  let domRef = document.querySelector('.searchPanel.search-panel #js_siteSearch');
  if (window.innerWidth <= 1024 && window.innerWidth > 649) {
    domRef = document.querySelector('.search-mobile');
  } else if (window.innerWidth <= 649) {
    domRef = document.querySelector('ul.nav_group li:last-of-type');
  }

  if (!window.localStorage.getItem('MP-wish')) {
    window.localStorage.setItem('MP-wish', JSON.stringify([]))
  }


  events.send('MP189', 'MP189 Active', 'MP189 Wishlist active');


  // Store the product
  const storeProduct = (location = 'pdp', obj) => {
    let prodObj = {};
    // let plpArr = [];
    switch (location) {
      case 'pdp':
        pollerLite([() => !!window.universal_variable.product.image_url], () => {
          
          let img = window.universal_variable.product.image_url;
          prodObj.url = window.location.href;
          prodObj.name = document.querySelector('.pdp__header > h1').textContent;
          prodObj.price = "£" + window.dataLayer[0].ecommerce.detail.products[0].price;
          prodObj.img = img;
        });
        
        break;
      case 'plp':
        
        prodObj.url = obj.url;
        prodObj.name = obj.name;
        prodObj.img = obj.img;
        prodObj.price = obj.price;

        // prodObj = Object.assign({}, prodObj, ...plpArr);

        break;
      default:
        break;
    }

    // Store in LS
    Storage.add(prodObj);
  };


  // Remove the product
  const removeProduct = (link) => Storage.delete(link);


  const checkWish = (urlToCheck, cb) => { // Run for PDP
    
    return Storage.fetch((res) => {
      if (res) {
        
        res.forEach(obj => {
          if (obj && obj.url) {
            
            const { url } = obj;
            if (url && url == urlToCheck || urlToCheck.indexOf(url) > -1) {
              
              cb(true);
            } else {
              cb(false);
            }
          } else {
            cb(false);
          }
        });
      } else {
        cb(false);
      }
    });
  }

  /**
   * @description Adds a single button to the reference. This then returns that element for further events to be attached.
   * @param {*} location 
   * @param {*} ref 
   * @param {*} pos 
   */
  const addButton = (location = 'pdp', ref, pos) => {
    let btn = null;

    switch (location) {
      case 'pdp':
        ref.insertAdjacentHTML(pos, `
          <div class="MP-wishClick MP-wish-pdp">
            <button class="MP-heart"></button> <p class="wishlist-add">Add to Wishlist</p> 
          </div>
        `);

        btn = document.querySelector('.MP-wishClick');

        break;
      case 'plp':
        ref.insertAdjacentHTML(pos, `
          <div class="MP-wishClick MP-wish-plp">
            <button class="MP-heart"></button>
          </div>
        `);

        btn = document.querySelector('.MP-wishClick');
        
        break;
      default:
        break;
    }

    return btn;

  }


  const pdp = (refString) => {
    // Add Element
    const ref = document.querySelector(refString);
    console.log('pdp ref =', ref);
    if (!ref) {
      return;
    }

    // addButton('pdp', ref, 'beforeend');
    let thisBtn = addButton('pdp', ref, 'afterend'); // Tried to return the added DOM element **** NEEDS TESTING **** May replace the below 'el'.

    // Check if this Href if already stored
    // checkWish(window.location.href).then((res) => {
    //   // True
    //   console.log('lets add, ', res);
    //   if (res) {
    //     thisBtn.classList.add('MP-active');
    //   }
    // }).catch((err) => console.log('MP189 checkwish error, ', err));

    checkWish(window.location.href, (res) => {
      if (res) { // true
        thisBtn.classList.add('MP-active');

        const p = thisBtn.querySelector('p');
        if (!p) return; 
        
        if (thisBtn.classList.contains('MP-active')) {
          p.textContent = 'Remove from Wishlist';
        } else {
          p.textContent = 'Add to Wishlist';
        }
        
      }
    });
    
    return thisBtn ? thisBtn.addEventListener('click', (e) => {
      let p = thisBtn.querySelector('p');
      
      e.preventDefault();
      if (!thisBtn.classList.contains('MP-active')) {
        storeProduct();
        thisBtn.classList.add('MP-active');
        p.textContent = 'Remove from Wishlist';
      } else {
        removeProduct(window.location.href);
        thisBtn.classList.remove('MP-active');

        p.textContent = 'Add to Wishlist';
      }

      // Update wishlist
      wishlist(domRef);


      events.send('MP189', 'MP189 Click', 'MP189 Wishlist clicked from PDP');
        
    }) : null;
  }


  const plp = (listItemSelector) => {
    if (!listItemSelector) {
      return;
    }

    const toggle = (e) => {

    }

    const els = document.querySelectorAll(`${listItemSelector} .productCard_mediaContainer`);

    els.length ? Array.from(els) // Map over list items
      .map((el) => {
        addButton('plp', el, 'beforeend'); // Add button and get the DOM ref.

        let thisUrl = el.querySelector('a').getAttribute('href');
        
        if (thisUrl) { // Check if already highlighted
          checkWish(thisUrl, (res) => {
            if (res) { // true
              let wishWrap = el.querySelector('.MP-wishClick');
              wishWrap.classList.add('MP-active');
            }
          });
        }

      }) : null;

    const wishButtons = document.querySelectorAll('.MP-wishClick');
    Array.from(wishButtons).map((el) => {
      let thisBtn = el;
      thisBtn.addEventListener('click', (e) => {
        
        e.preventDefault();
        events.send('MP189', 'MP189 Click', 'MP189 Wishlist clicked from PLP');

        const prodObj = { // Create product object
          url: el.parentElement.querySelector('a').getAttribute('href'), 
          name: el.parentElement.querySelector('a').getAttribute('title'),
          img: el.parentElement.querySelector('img').getAttribute('src'),
          price: el.parentElement.parentElement.querySelector('.productCard_price .price').textContent, 
        }
        if (!thisBtn.classList.contains('MP-active')) {
          thisBtn.classList.add('MP-active');
          storeProduct('plp', prodObj);
          
          // Update wishlist
          wishlist(domRef);
          
        } else {
          thisBtn.classList.remove('MP-active');
          removeProduct(prodObj.url);

          wishlist(domRef);
        }

      }); // Attach event and call storeProduct
    })
  };

  pollerLite(['#addToCartForm button', '#js-container.slick-initialized .slick-slide.slick-current img.img-responsive', () => !!domRef], () => pdp('#addToCartForm button')); // PDP


  pollerLite(['.productCard', () => !!domRef], () => plp('.productCard')); // PLP


  // Add Wishlist dropdown
  // if (window.innerWidth >= 479) {
  //   pollerLite(['.searchPanel.search-panel #js_siteSearch'], () => {
  //     wishlist(domRef)
  //   });
  // } else {
  //   pollerLite(['ul.nav_group li:last-of-type'], () => {
  //   });
  // }
  console.log('dom ref =', domRef);
  if (!document.querySelector('.MP-wishDropdown')) {
    pollerLite([() => !!domRef], () => wishlist(domRef));
  }

  
  


  // pollerLite(['a.MP-remove'], () => {
  //   const removeButtons = document.querySelectorAll('a.MP-remove');
    
  //   const len = removeButtons.length;
  //   for (let i = 0; len > i; i += 1) {
  //       let btn = removeButtons[i];
  //       let href = btn.getAttribute('data-href');
  //       btn ? btn.addEventListener('click', (e) => {
  //           console.log("COME ON");
  //           e.preventDefault();
  //           e.stopPropagation();
  //           Storage.delete(href);
  //           window.location.reload();
  //       }) : null;
  //   }
  // });

  // $(document).on('click', '.MP-remove', function(e) {

  //   e.preventDefault();
  //   e.stopPropagation();
  //   let $this = $(this);

  //   let href = $this.attr('data-href');

  //   Storage.delete(href);
  //   window.location.reload();

  // });


  // Remove Elements
  const removeLinks = document.querySelectorAll('.MP-wishDropdown .MP-remove');
  removeLinks ? Array.from(removeLinks).map((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      

      let href = el.getAttribute('data-href');

      Storage.delete(href);
      window.location.reload();
    });
  }) : null;
  


  pollerLite(['#shopSlider .slidePanel_top i.close-btn'], () => {
    const mobMenuClose = document.querySelector('#shopSlider .slidePanel_top i.close-btn');
    mobMenuClose ? mobMenuClose.addEventListener('click', () => {

      const closeWishlist = document.querySelector('.MP-wishDropdown--close');
      closeWishlist.click();
    }) : null;
  });


  setTimeout(() => {
    if (!document.querySelector('header .heart-holder')) {
      console.log('called!');
      pollerLite([() => !!domRef], () => wishlist(domRef));
    
    }
  }, 1500);


};
