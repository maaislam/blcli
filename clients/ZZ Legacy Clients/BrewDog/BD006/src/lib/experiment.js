/**
 * BD006 - Pre Basket Add-ons
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import settings from './shared';
import { observer, events, getUrlParameter } from '../../../../../lib/utils';

// Google Optimize char limits
// Comment out this:
import config from './config';

// And uncomment this..
// And attach the config to the window in a separate script
//const config = window.BD006config;

export default () => {
  setup();

  const { ID, VARIATION } = settings;
  
  const boxQty = document.querySelector('.box-basket .box-wrapper .box-filled-data');
  const boxRef = document.querySelector('.box-basket .box-wrapper .box-body');
  let qty = 0;
  
  // Get boxQty
  const getQty = () => { 
    const slotsFilled = boxQty.querySelector('.slot-count');
    let slots = 0;

    if (slotsFilled) {
      slots = parseFloat(slotsFilled.textContent);
    }
    return slots;
  }

  // Pass 12?
  const pass = (qty) => {
    
    if (qty >= 8) {
      return true;
    } else {
      false;
    }
  }

  const scrollMenu = () => {
    const menu = document.querySelector('.BD006-menu');
    if(menu && menu.getBoundingClientRect()) {
      const bounds = menu.getBoundingClientRect();
      if(bounds && bounds.top) {
        menu.classList.add('xshake');
        setTimeout(() => {
          menu.classList.remove('xshake');
        }, 2000);
        window.scrollTo(0, bounds.top + window.scrollY - 100);
      }
    }
  };
  
  // Add toggle button
  const addBtn = ref => {
    
    if (document.querySelector('.BD006-toggle')) {
      let btn = document.querySelector('.BD006-toggle');
      btn.parentNode.removeChild(btn);
    };
    

    if (!pass(qty)) {
      return;
    };

    let thisConf = null;

    qty = getQty();
    // if (!config[qty]) {
    //   thisConf = config[qty + 1];
    // } else {
    // }
    thisConf = config[qty];

    if (!thisConf) return;

    if (!document.querySelector('.BD006-toggle')) {
      ref.insertAdjacentHTML('afterend', `<button class="BD006-toggle">
        Fill My Box
  
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAdCAYAAADsMO9vAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADLSURBVHgB7dDtDYIwAITh00l1EzbxHM1JVJJeYgShhX5cDW/SXzb0OYGj/+4WTpeN8Gc43Y34xHc3Yg7fzYglvP2IGLztiBS83YgteJsRa3iGYzkiBq8IsxEpeEWYjNiCV0TjEXvwimgw4oR1fMrDRMURufGKqDCiFF6x4LeL4xVLvFELr5jzrdp4xRxvtsIr7nm7NV5xi8EFr4hEixNeERGmc7j8WPnQFfW7vM994feJeYDHP/8dMXUNvy4P8MIrIgKvxgtOeEXM4F8cLE7OyiSIpQAAAABJRU5ErkJggg==" alt="chevron"/>
      </button>`);
      let thisBtn = document.querySelector('.BD006-toggle');
  
      thisBtn.addEventListener('click', () => thisBtn ? thisBtn.classList.toggle('BD-active') : null);

      if(VARIATION == 2) {
        thisBtn.addEventListener('click', () => {
          if(!document.body.classList.contains('page-products')) {
            // PDP
            window.location = '/uk/shop/beer?fill-box=1';
          } else {
            // PLP
            scrollMenu();
          }
        });
      }

      return thisBtn;
    }

  }



  const menu = (ref) => {
    if (document.querySelector('.BD006-menu')) { // If exists, remove and reset
      let el = document.querySelector('.BD006-menu');
      el ? el.parentNode.removeChild(el) : null;
    };

    let thisConf = null;

    // if (!config[qty]) {
    //   thisConf = config[qty + 1];
    // } else {
    // }
    qty = getQty();
    console.log('qty ', qty);
    thisConf = config[qty];

    if (!thisConf) return;

    if (24 - qty === 0) return;

    const thisFormKey = document.querySelector('input[name="form_key"]');
    if (!thisFormKey) return;


    const uencKey = document.querySelector('input[name="uenc"]');
    if (!uencKey) return;

    let pos = 'beforeend';
    if (VARIATION == 2) {
      pos = 'afterbegin';
    }
    ref.insertAdjacentHTML(pos, `
      <div class="${ID}-menu BD-hidden">
        <div class="${ID}-close">
          <p>Close</p>
          <img class="icon " src="https://www.brewdog.com/static/version1599713463/frontend/Born/arcticFox/en_US/design-system/icons/icon-cross-16.svg" alt="close icon">
        </div>
        <div class="${ID}-menu--wrap">
          <div class="${ID}-title--wrap">
            <h2 class="heading">WE THINK YOU MIGHT LIKE</h2>

            <p>You are ${24 - qty} slots away from filling your box for free delivery!</p>
          </div>

          <ul class="${ID}-list">
            ${thisConf.map((obj) => {
              
              return `<li>
                <div class="p-2 md:p-0 productTile  flex flex-col justify-between " data-container="product-grid">
                    <a class="link productTile__link" href="${obj.link}">
                        <div class="productTile__imgContainer">
                                                        
                            <span class="product-image-container" style="width:240px;">
                                <span class="BD-slotsFilled">Fills ${obj.slots} slots</span>
                                <span class="product-image-wrapper responsively-lazy" style="padding-bottom: 125%;">
                                    <img class="product-image-photo productTile__img w-full max-w-4/5" src="${obj.img}" width="" height="" alt="${obj.name}">
                                </span>
                            </span>
                                                                                </div>

                            <div class="BD-ib">
                            <h3 class="heading heading-3 productTile__name">${obj.name}</h3>

                            <ul class="productTile__features">
                                    <li class="productTile__type odd">
                                      ${obj.tag}                
                                    </li>

                                    <li class="productTile__packaging even">${obj.amt}</li>
                            </ul>

                                                                                                                
                            <span class="productTile__price productTile__price--special">${obj.price}</span>                        
                            </div>
                        
                    </a>

                    
                    <div class="productTile__footer bd-base">
                        <form data-role="tocart-form" data-product-sku="${obj.sku ? obj.sku : ''}" action="${obj.formLink}" method="post">
                        
                                <input type="hidden" name="product" value="${obj.id}">
                                <input type="hidden" name="item" value="${obj.id}">
                                <input type="hidden" name="uenc" value="${uencKey.value}">

                                ${typeof obj.bundleName == 'object' ? `
                                  ${obj.bundleName.map((opt) => {
                                    return `
                                      <input type="hidden" 
                                        name="${opt[0]}" 
                                        value="${opt[1]}">
                                    `;
                                  }).join('')}
                                ` : `
                                  <input type="hidden" name="${obj.bundleName}" value="${obj.bundleValue}">
                                `}
                                <input name="form_key" type="hidden" value="${thisFormKey.value}">   
                                <input name="selected_configurable_option" type="hidden" value="">

                                <input type="hidden" name="return_url" value="${window.location.href}" />

                                <div class="productTile__qtyToggles" data-bind="scope: 'qty_change-${obj.id ? obj.id : ''}'">
                                    <span class="productTile__qtyToggle productTile__qtyToggle--minus qty-updator ${obj.id ? obj.id : ''}" data-bind="click: decreaseQty">
                                        <svg class="productTile__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                            <path d="M0 7h16v2H0z"></path>
                                        </svg>
                                    </span>
                                    <input type="text" class="productTile__qtyToggle productTile__qtyToggle--input" style="max-width: 16.666666%; padding: 0;" data-role="qty" data-bind="value: qty()" value="1" name="qty" data-validate="{'required-number':true,'validate-greater-than-zero':true}">
                                    <span class="productTile__qtyToggle productTile__qtyToggle--plus qty-updator ${obj.id ? obj.id : ''}" data-bind="click: increaseQty">
                                          <svg class="productTile__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                              <path d="M9 7V0H7v7H0v2h7v7h2V9h7V7H9z"></path>
                                          </svg>
                                    </span>
                                    <button class="tocart button button--secondary">
                                        <svg role="img" aria-labelledby="title desc" class="pro ductTile__icon fill-current pb-1 pr-1" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <title>Cart</title>
                                            <path role="presentation" fill="none" d="M0 0h20v20H0z"></path>
                                            <path role="presentation" fill-rule="evenodd" clip-rule="evenodd" d="M4.5 17a.5.5 0 100 1 .5.5 0 000-1zm-2.5.5a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0zM15.5 17a.5.5 0 100 1 .5.5 0 000-1zm-2.5.5a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0zM3.207 1.293C2.866.952 2.402.65 2.077.455a10.998 10.998 0 00-.574-.32l-.039-.02-.011-.007-.004-.001-.002-.001L1 1l-.413.827-.034.067.005.003.027.014a7.323 7.323 0 01.463.259c.291.175.57.367.731.523l.001.002c.007.012.03.055.06.145.045.133.081.304.108.489a5.528 5.528 0 01.051.629v.036l.001.007v7.749c0 .847.556 1.422.99 1.726.434.304 1.005.524 1.51.524H18v-2H4.507h-.003c-.011-.002-.05-.009-.113-.032a1.107 1.107 0 01-.255-.131.58.58 0 01-.136-.124v-.28l12.069-.832c.662-.046 1.3-.256 1.79-.736s.713-1.114.773-1.774L19.095 3H3.921a4.793 4.793 0 00-.183-.793c-.09-.27-.246-.629-.53-.914z"></path>
                                        </svg>
                                                                                    Add                                                                            </button>
                                </div>
                        </form>
                      </div>
                 </div>
              </li>`;
            }).join(' ')}
          </ul>

        </div>
      
      </div>
    `);

    
    // Add toggle events for QTY
    const qtyWraps = document.querySelectorAll('.BD006-menu .productTile__qtyToggles');
    for (let i = 0; qtyWraps.length > i; i += 1) {
      let qtyWrap = qtyWraps[i];
      const btn = qtyWrap.querySelector('button.tocart');
      
      qtyWrap ? qtyWrap.addEventListener('click', (e) => {
        const input = qtyWrap.querySelector('input.productTile__qtyToggle');
        const plus = qtyWrap.querySelector('.productTile__qtyToggle--plus');
        const minus = qtyWrap.querySelector('.productTile__qtyToggle--minus');
        let { target } = e;

      
        if (plus.contains(target)) { // Plus
      
          input.setAttribute('value', parseInt(input.value, 10) + 1);
        }
        if (minus.contains(target)) { // Minus
      
          if (input.value == 1) return;
  
          input.setAttribute('value', parseInt(input.value, 10) - 1);
        }
        
      }) : null;

      btn ? btn.addEventListener('click', (e) => {
        // e.preventDefault();
        
        // const form = btn.closest('form');
        // const input = form.querySelector('input.productTile__qtyToggle');
        // const sku = form.getAttribute('data-product-sku');
        // const link = form.getAttribute('action');
        // const prodId = link.match(/(\d+)\/$/)[1];
        // const uenc = form.querySelector('input[name="uenc"]')
        // const bundleEl = form.querySelector('input[name*="bundle_option"]');
        // const formKey = form.querySelector('input[name="form_key"]');
        // let bundleName,
        //   bundleValue,
        //   formKeyValue;

        // if (bundleEl) {
        //   bundleName = bundleEl.getAttribute('name');
        //   bundleValue = bundleEl.getAttribute('value');
        // }

        // if (formKey) {
        //   formKeyValue = formKey.value;
        // }

        // console.log('click', {
        //   form,
        //   sku,
        //   uenc,
        //   link,
        //   prodId
        // });

        // let dataObj = {
        //   product: prodId,
        //   uenc: uenc.value,
        //   form_key: formKeyValue,
        //   qty: input.value,
        // }

        // dataObj[bundleName] = bundleValue;

        // console.log('data obj = ', dataObj);

        // if (sku && link && prodId) {
        //   fetch(link, {
        //     credentials: "same-origin",
        //     method: "POST",
        //     headers: {
        //       "Accept": "application/json, text/javascript, */*; q=0.01",
        //       "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify(dataObj)
        //   }).then((res) => {
        //     if (res) return res.text();
        //   }).then((response) => {
        //       document
        //   }).catch(err => console.log(err));
        // }

        events.send(ID, `${ID} Click`, `${ID} Users adding items from this section to their basket`);
      }) : null;
    }


    // Click outside el to close.
    const pageWrap = document.querySelector('.page-wrapper');
    const thisEl = document.querySelector('.BD006-menu');
    const openBtn = document.querySelector('.BD006-toggle');
    pageWrap.addEventListener('click', (e) => {
      if (openBtn != e.target) {
        // Is open
        if (!thisEl.contains(e.target)) {
          thisEl.classList.add('BD-hidden');
          document.body.classList.remove('BD006-fade');
        }
      }
    });

    return;

  };


  const menuToggle = (el) => {
    el ? el.classList.toggle('BD-hidden') : null;
    document.body.classList.toggle('BD006-fade');
  };

  qty = getQty();
  
  if (pass(qty)) {
    // Add btn
    let btn = addBtn(boxRef);
    // console.log('btn = ', btn);
    // Build menu
    if (VARIATION == 2) {
      let ref = document.querySelector('#amasty-shopby-product-list .layout__max-width');
      menu(ref);
    } else {
      menu(document.body)
    }

    const menuWrap = document.querySelector('.BD006-menu');
    const close = document.querySelector('.BD006-menu .BD006-close');
    // Show menu
    btn ? btn.addEventListener('click', () => {
      events.send(ID, `${ID} Click`, `${ID} User clicks 'fill my box'`);
      menuToggle(menuWrap);
    }) : null;
    close ? close.addEventListener('click', () => {
      menuToggle(menuWrap);
      document.body.classList.remove('BD006-fade');
    }) : null;
  }


  // Observer box for changes to QTY
  observer.connect(boxQty, () => {
    

    qty = getQty();
    if (pass(qty)) {
      // Add btn
      let btn = addBtn(boxRef);
      
      // Build menu
      if (VARIATION == 2) {
        let ref = document.querySelector('#amasty-shopby-product-list .layout__max-width');
        menu(ref);
      } else {
        menu(document.body)
      }
  
      const menuWrap = document.querySelector('.BD006-menu');
      const close = document.querySelector('.BD006-menu .BD006-close');
      // Show menu
      btn ? btn.addEventListener('click', () => {
        
        events.send(ID, `${ID} Click`, `${ID} User clicks 'fill my box'`);
        menuToggle(menuWrap);
      }) : null;
      close ? close.addEventListener('click', () => {
        menuToggle(menuWrap);
        document.body.classList.remove('BD006-fade');
      }) : null;
    }


  }, {
    config: {
      attributes: true,
      childList: true,
      subtree: true
    }
  });
  
  if(getUrlParameter('fill-box')) {
    scrollMenu();
  }
};
