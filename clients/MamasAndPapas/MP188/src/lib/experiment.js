/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { pollerLite, observer, events, poller } from '../../../../../lib/utils';

export default () => {
  setup();

  events.send('MP188', 'MP188 Active');

  const miniBag = document.querySelector('#miniCartSlider');
  let miniBagRef = miniBag.querySelector('.basket_checkout');

  // Does it exist in the mini bag?
  const inBasket = (link, weeksNum) => {
    const el = miniBag.querySelector(`a[href="${link}"]`);
    if (el) {
      el.setAttribute('data-preOrder', weeksNum);
      return true; 
    } else {
      return false;
    }
  }


  // Add banner
  const addBanner = (weekNum, ref, pos = 'afterbegin') => {
    if (weekNum) {
      // Remove existing if it does
      const banner = document.querySelector('.MP188-banner');
      if (banner) {
        banner.parentNode.removeChild(banner);
      }
      if (!document.querySelector('.MP188-banner')) {
        
        ref.insertAdjacentHTML(pos, `
          <div class="MP188-banner">
            <p>Your order will be delivered in ${weekNum} <span class="MP-weeks">${weekNum > 1 ? 'weeks' : 'week'}</span> <span>i</span></p>

            <div class="MP188-banner--tooltip">
              <p>Due to a pre-order item in your basket, all items within this order will be delivered together in ${weekNum} weeks.</p>
            </div>
          </div>
        `);


        // Add events
        const tooltipWrap = document.querySelector('.MP188-banner .MP188-banner--tooltip');
        const tooltip = document.querySelector('.MP188-banner > p span:not(.MP-weeks)');
        tooltip ? tooltip.addEventListener('mouseover', () => {
          tooltipWrap.classList.add('MP-show');
        }) : null;
        tooltip ? tooltip.addEventListener('mouseout', () => {
          tooltipWrap.classList.remove('MP-show');
        }) : null;
      }
    }
  }


  const pushToStorage = (url, week, objArr) => {
    const jsonObj = JSON.stringify({
      prodLink: url,
      weeksDel: parseFloat(week)
    });

    return objArr.push(jsonObj);
  };


  const getStorageLinks = (objArr) => {
    
    const storedLinks = objArr.map((obj) => {
      return obj.prodLink;
    });

    return storedLinks;
  };

  const getStorageObjects = (objArr) => {
    const storedObjects = objArr.map((obj) => {
      let parsedObj = JSON.parse(obj);
      return parsedObj;
    });

    return storedObjects;
  };
  

  const deleteFromStorage = (url, objArr) => {
    const storedObjects = objArr.map((obj) => {
      let parsedObj = JSON.parse(obj);
      return parsedObj;
    });

    if (storedObjects[url]) {
      return objArr.splice(objArr[url], 1);
    }
  };

  // PDP
  pollerLite(['button.addToCartButton.btn.btn-primary', '.stock_level p'], () => {
    
    // Get delivery text
    const pTags = document.querySelectorAll('.stock_level > p');
    let noOfWeeks = null;

    for (let i = 0; pTags.length > i; i += 1) {
      const pText = pTags[i].textContent.trim();
      if (pText && pText.indexOf('Order now for delivery in') > -1) {
        noOfWeeks = pText.match(/\d+/)[0];
        
      }
    }


    const atbBtn = document.querySelector('button.addToCartButton.btn.btn-primary');
    if (atbBtn.textContent.trim() == 'Pre Order') {

      atbBtn.addEventListener('click', (e) => {
        
        // Check for LS
        let storageArr = JSON.parse(window.localStorage.getItem('MP188-preOrder'));
        let url = window.location.pathname;
        let tempArr = [];

        // Exists?
        if (storageArr) { // Is array

          // Add existing to tempArr
          storageArr.map((storageObj) => {
            tempArr.push(storageObj);
          });

          
          // Add new to tempArr
          tempArr.push({
            prodLink: url,
            weeksDel: parseFloat(noOfWeeks)
          });

          
          // Replace LS with new tempArr
          window.localStorage.setItem('MP188-preOrder', JSON.stringify(tempArr));

        } else { // Never was any storage

          tempArr.push({
            prodLink: url,
            weeksDel: parseFloat(noOfWeeks)
          });

          // Sort
          const sortedStorage = tempArr.sort((a, b) => a.weeksDel - b.weeksDel);

          // Store LS with this products URL
          window.localStorage.setItem('MP188-preOrder', JSON.stringify(sortedStorage))       
        }

        events.send('MP188', 'MP188 Seen', 'MP188 Banner added');

      });

    }

  });


  const removeBanner = () => {
    const el = document.querySelector('.MP188-banner');
    return el ? el.parentNode.removeChild(el) : null;
  }


  // Check mini bag
  const checkBag = (bagRef, link) => !!bagRef.querySelector(`a[href="${link}"]`);

  // Observe Mini Bag
  
  observer.connect(miniBag, () => {
    
    miniBagRef = miniBag.querySelector('.basket_checkout');
   
    // Get storage array
    const storageArr = JSON.parse(window.localStorage.getItem('MP188-preOrder'));
    const url = window.location.pathname;

    // Stored links
    const storedLinks = getStorageLinks(storageArr);
    
    // Sort storage by weeks
    const sortedStorage = storageArr.sort((a, b) => a.weeksDel - b.weeksDel);

    
    // while (sortedStorage.length) {

      // Check if miniBag still has product
    //   pollerLite(['#miniCartSlider.activeRight'], () => {
    //     console.log('active poller');
    //     if (miniBag.querySelector(`a[href="${lastItem.prodLink}"]`)) {
    //       console.log('has item');
    //       addBanner(lastItem.weeksDel, miniBagRef);
    //     } else { // Not there, pop from storage
    //       sortedStorage.pop();
  
    //       const newLastItem = sortedStorage[sortedStorage.length - 1];
  
    //       if (miniBag.querySelector(`a[href="${newLastItem.prodLink}"]`)) {
    //         addBanner(newLastItem.weeksDel, miniBagRef) 
    //       }
    //     }
    //   });
    // }

    pollerLite(['#miniCartSlider.activeRight'], () => {
      do {
        let lastItem = sortedStorage[sortedStorage.length - 1];
        if (miniBag.querySelector(`a[href="${lastItem.prodLink}"]`)) {
          
          addBanner(lastItem.weeksDel, miniBagRef);
          return;
        } else {
          sortedStorage.pop();
        }
      } while (sortedStorage.length > 0);
    });

  }, {
    config: {
      attributes: true,
      childList: true,
      subtree: true,
    },
  });



  // Poll for /Cart
  pollerLite(['input.voucherCode', '.checkout_item.cartItem.cart-item'], () => {
    const ref = document.querySelector('.cart.checkout_split');

    // Check LS
    let storage = window.localStorage.getItem('MP188-preOrder');
    const storageObj = JSON.parse(storage)[0];
    
    const { prodLink } = storageObj;
    const { weeksDel } = storageObj;
    
    if (prodLink && weeksDel) {
      if (document.querySelector(`a[href="${prodLink}"]`)) {
        addBanner(weeksDel, ref, 'afterend');
      }
    }
  })



  // Gloab Check for product in basket
  pollerLite(['.basket_productView a'], () => {
    const globalStorageArr = JSON.parse(window.localStorage.getItem('MP188-preOrder'));
    let tempArr = [];
    
    if (globalStorageArr) { // We have storage
      globalStorageArr.map((obj) => {
    
        if (miniBag.querySelector(`a[href="${obj.prodLink}"]`)) { // Still in  the basket
    
          tempArr.push(obj);
        }
      }).join(' ');
    }
    
    
    window.localStorage.setItem('MP188-preOrder', JSON.stringify(tempArr));
  });
  

};
