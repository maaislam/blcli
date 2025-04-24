/**
 * PJ087 - Dip Upsell on Sides
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, generateLightbox, changeSelection } from './services';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import shared from './shared';
import { eventFire } from './../../../../../lib/utils';
import data from './data';
import allowAddToBasket from './allowAddToBasket';

const { ID, VARIATION } = shared;

const activate = () => {
  setup();
  if (sessionStorage.getItem(`${shared.ID}-dipsLightbox`) == null
  && window.location.pathname.indexOf('/customise.aspx') == -1) {
  // if (sessionStorage.getItem(`${shared.ID}-pizzaOrSideAdded`)) {
    // setup();
    let dipsObj = document.querySelector('#hdnDipData').value;
    // let dipsObj = `[{"name":"Pizza Sauce","id":"f0ba9bd8-a27e-4244-b070-02c91ff3e045","price":0.4500},{"name":"BBQ","id":"2c7849f1-b6fe-4efc-81a2-4e3ae5b473c0","price":0.4500},{"name":"Special Garlic","id":"df071d77-84a8-4bd8-8dcc-58f3bb853e67","price":0.4500},{"name":"Sweet Chilli","id":"03bb4bcd-7891-49c8-825b-7549a6d22142","price":0.4500},{"name":"Garlic and Herb","id":"ecb059ed-5a0b-4376-b1a0-7a2980c7387d","price":0.4500},{"name":"Honey & Mustard","id":"77e84a30-5ecd-4e29-bc39-9b5e750c8413","price":0.4500},{"name":"Sour Cream & Chive","id":"4c775999-a43d-404a-97f2-be58ed7cd45f","price":0.4500},{"name":"Hot Buffalo","id":"5032d4a2-fb86-4f06-8287-d50797d3bfe8","price":0.4500}]`;
    dipsObj = JSON.parse(dipsObj);

    // Write experiment code here
    // console.log(`${shared.ID} is   running   on this page -----`);
    let device = '';
    if (window.innerWidth <= 433) {
      device = 'mobile';
    } else {
      device = 'desktop';
    }
    const pathname = window.location.pathname;
    const currentStore = pathname.split('/')[2];
    generateLightbox(currentStore, dipsObj);

    let menuItems;
    let dipsItem;
    
    
    // -- Deactivate basket button
    const basketContent = parseInt(document.querySelector('.basketIcon').innerText);
    // console.log(basketContent);
    if (basketContent > 0 
    && sessionStorage.getItem(`${shared.ID}-pizzaOrSideAdded`)) {
      const basketBtn = document.querySelector('.topInner.logoPadding table td.basket');
      const basketBtnLink = basketBtn.querySelector('a');
      basketBtnLink.setAttribute('href', 'javascript:void(0)');
      basketBtn.addEventListener('click', (e) => {
        /**
         * @desc Show DIPS LIGHTBOX when user clicks on Basket CTA
         */
        document.querySelector(`.${shared.ID}-lightbox__wrapper`).classList.remove('hide');
        // --- NO SCROLL
        document.querySelector(`body.${ID}`).classList.add(`${ID}-noScroll`);

        // --- Set Session Storage item - Experiment is running once per session
        sessionStorage.setItem(`${shared.ID}-dipsLightbox`, true);
      });

      if (device == 'desktop') {
        pollerLite(['.basketNotification .buttons',], () => {
          const hiddenBasketBtn = document.querySelector('.basketNotification .buttons');
          const hiddenBasketBtnLink = hiddenBasketBtn.querySelector('a.blackButton');
          hiddenBasketBtnLink.setAttribute('href', 'javascript:void(0)');

          hiddenBasketBtn.addEventListener('click', (e) => {
            /**
             * @desc Show DIPS LIGHTBOX when user clicks on (grey) Basket CTA
             */
            document.querySelector(`.${shared.ID}-lightbox__wrapper`).classList.remove('hide');
            // --- NO SCROLL
            document.querySelector(`body.${ID}`).classList.add(`${ID}-noScroll`);

            // --- Set Session Storage item - Experiment is running once per session
            sessionStorage.setItem(`${shared.ID}-dipsLightbox`, true);
          });
        });
      }

    } else {
      if (device == 'desktop') {
        pollerLite(['.basketNotification .buttons',], () => {
          if (sessionStorage.getItem(`${shared.ID}-pizzaOrSideAdded`)) {
            const hiddenBasketBtn = document.querySelector('.basketNotification .buttons');
            const hiddenBasketBtnLink = hiddenBasketBtn.querySelector('a.blackButton');
            hiddenBasketBtnLink.setAttribute('href', 'javascript:void(0)');

            hiddenBasketBtn.addEventListener('click', (e) => {
              /**
               * @desc Show DIPS LIGHTBOX when user clicks on Basket CTA
               */
              document.querySelector(`.${shared.ID}-lightbox__wrapper`).classList.remove('hide');
              // --- NO SCROLL
              document.querySelector(`body.${ID}`).classList.add(`${ID}-noScroll`); 
      
              // --- Set Session Storage item - Experiment is running once per session
              sessionStorage.setItem(`${shared.ID}-dipsLightbox`, true);
            });
          }
        });
        
      }
    }

    // -- Increase/Decrease
    const allDips = document.querySelectorAll(`.${shared.ID}-dip`);
    [].forEach.call(allDips, (dip) => {
      if (dip.querySelector(`.${shared.ID}-dip__title .dip-name`) ) {
        let dipName = dip.querySelector(`.${shared.ID}-dip__title .dip-name`).innerText;
        if (dipName.indexOf("Triple Garlic & Ghost") > -1) {
          dipName = "Triple Garlic & Ghost Chilli Dip";
        }
        
        const addToBasketCta = dip.querySelector(`.${shared.ID}-cta__btn`);
        const variationId = addToBasketCta.getAttribute('data-option');
        const quantity = dip.querySelector('.number').value;
        const dipID = dip.getAttribute('id');
        // if (addToBasketCta) {
        //   addToBasketCta.addEventListener('click', (e) => {
        //     /**
        //      * @desc Adds dip to basket
        //      */
        //     // const variationId = addToBasketCta.getAttribute('data-option');
        //     // const quantity = dip.querySelector('.number').value;

        //     //window.location.href = `https://staging.papajohns.co.uk/services/addtobasket.aspx?variationId=${variationId}&quantity=${quantity}`;
        //     // alert(`https://www.papajohns.co.uk/services/addtobasket.aspx?variationId=${variationId}&quantity=${quantity}`);
        //     window.location.href = `https://www.papajohns.co.uk/services/addtobasket.aspx?variationId=${variationId}&quantity=${quantity}`;
            
        //     setTimeout(() => {
        //       document.querySelector(`.${shared.ID}-lightbox__container`).innerHTML = 'One moment...';
        //       document.querySelector(`.${shared.ID}-lightbox__container`).setAttribute('style', 'padding: 3vw; text-align: center;');
        //       document.querySelector(`.${shared.ID}-lightbox__wrapper`).setAttribute('style', 'display: block !important;');
        //     }, 500);
            
        //   });
        // }

        const increaseClick = dip.querySelector('.increase');
        const decreaseClick = dip.querySelector('.decrease');
        if (increaseClick) {
          increaseClick.addEventListener('click', (e) => {
            let value = parseInt(dip.querySelector('.number').value, 10);
            value = isNaN(value) ? 0 : value;
            if (value < 20) {
              value++;
              dip.querySelector('.number').value = value;
              dip.querySelector('.number').setAttribute('value', value);
            }
            // changeSelection(addToBasketCta, device);

            // -- Update Value in Dips Container 
            data[`${dipName}`].quantity = value;
            if (document.querySelector(`.${shared.ID}-addToBasket__cta.${shared.ID}-dip__cta.inactive`)) {
              document.querySelector(`.${shared.ID}-addToBasket__cta.${shared.ID}-dip__cta.inactive`).classList.remove('inactive');
            }
          });
        }
        

        if (decreaseClick) {
          decreaseClick.addEventListener('click', (e) => {
            let value = parseInt(dip.querySelector('.number').value, 10);
            value = isNaN(value) ? 0 : value;
            if (value > 0) {
              value--;
              dip.querySelector('.number').value = value;
              dip.querySelector('.number').setAttribute('value', value);

              // changeSelection(addToBasketCta, device);

              // -- Update Value in Dips Container 
              // data.quantity = value;
              data[`${dipName}`].quantity = value;
              // console.log(data);

              /**
               * @desc Check if there's at least one dip selected
               * and change add-to-basket CTA status
               */
              let allow = false;
              for (const key in data) {
                if (data.hasOwnProperty(key)) {
                  // Do things here
                  const item = data[`${key}`];
                  if (item.quantity > 0) {
                    allow = true;
                    break;
                  }
                }
              }
              if (!allow) {
                document.querySelector(`.${shared.ID}-addToBasket__cta.${shared.ID}-dip__cta`).classList.add('inactive');
              } else {
                document.querySelector(`.${shared.ID}-addToBasket__cta.${shared.ID}-dip__cta`).classList.remove('inactive');
              }
            }
            
          });
        }
      }
      
      
    });

    const addAllDipsCta = document.querySelector(`.${shared.ID}-addToBasket__btn`);;
    if (addAllDipsCta) {
      addAllDipsCta.addEventListener('click', (e) => {
        // alert('clicked cta');
        /**
         * @desc Adds all selected dips to basket
         */
        let variations = '';
        let quantities = '';
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            // Do things here
            const item = data[`${key}`];
            if (item.quantity > 0) {
              variations += `${item.id},`;
              quantities += `${item.quantity},`;
            }
          }
        }
        variations = variations.slice(0, -1);
        quantities = quantities.slice(0, -1);
        sessionStorage.setItem(`${shared.ID}-dipsLightbox`, true);
        window.location.href = `https://www.papajohns.co.uk/services/addtobasket.aspx?variationId=${variations}&quantity=${quantities}`;
        
        setTimeout(() => {
          document.querySelector(`.${shared.ID}-lightbox__container`).innerHTML = 'One moment...';
          document.querySelector(`.${shared.ID}-lightbox__container`).setAttribute('style', 'padding: 3vw; text-align: center;');
          document.querySelector(`.${shared.ID}-lightbox__wrapper`).setAttribute('style', 'display: block !important;');
        }, 500);
        
      });
    }
  

    // -------------------------------------------
    // PRM Manager Listen for State Changes
    // -------------------------------------------
    window.prm.add_endRequest(function (sender, error) {
      try {
        // console.log(sender);
        if (sender['_postBackSettings'].asyncTarget === "ctl00$cphBody$lbProceedMobile"
        || sender['_postBackSettings'].asyncTarget === "ctl00$_objHeader$lbReturnToSignInMobile"
        || sender['_postBackSettings'].asyncTarget.indexOf("$_objMenuProduct$lbAddToBasket") > -1) {
          if (sender['_postBackSettings'].asyncTarget.indexOf("$_objMenuProduct$lbAddToBasket") > -1
          && (window.location.pathname.indexOf('pizzas.aspx') > -1 || window.location.pathname.indexOf('sides.aspx') > -1
          || window.location.pathname.indexOf('customise.aspx') > -1)) {
            // alert('pizza or side');
            sessionStorage.setItem(`${shared.ID}-pizzaOrSideAdded`, true);
          }
          activate();

          
          // -- DESKTOP - When item added to the basket, add event listener to grey button
          pollerLite(['#ctl00__objHeader_upBasketNotification', '.basketNotification .buttons',], () => {
            if (sessionStorage.getItem(`${shared.ID}-pizzaOrSideAdded`)) {
              if (device == 'desktop') {
                const hiddenBasketBtn = document.querySelector('.basketNotification .buttons');
                const hiddenBasketBtnLink = hiddenBasketBtn.querySelector('a.blackButton');
                hiddenBasketBtnLink.setAttribute('href', 'javascript:void(0)');
        
                hiddenBasketBtn.addEventListener('click', (e) => {
                  document.querySelector(`.${shared.ID}-lightbox__wrapper`).classList.remove('hide');
                  // --- NO SCROLL
                  document.querySelector(`body.${ID}`).classList.add(`${ID}-noScroll`); 
          
                  // --- Set Session Storage item - Experiment is running once per session
                  sessionStorage.setItem(`${shared.ID}-dipsLightbox`, true);
                });
              }
            }
            
          });

        }

      } catch (e) {} 
    });

    
  // }

  } else if (window.location.pathname.indexOf('/customise.aspx') > -1) {
  // --- CUSTOMISE YOUR PIZZA page -----
    const addToBasketCustomise = document.querySelector('.AddBasketBButton');

    addToBasketCustomise.addEventListener('click', () => {
      sessionStorage.setItem(`${shared.ID}-pizzaOrSideAdded`, true);
    });
    // -------------------------------------------
    // PRM Manager Listen for State Changes
    // -------------------------------------------
    window.prm.add_endRequest(function (sender, error) {
      try {
        // console.log(sender);
        if (sender['_postBackSettings'].asyncTarget.indexOf("ctl00$cphBody$_objCustomise") > -1) {
          // alert('PRM');
          const addToBasketCustomise = document.querySelector('.AddBasketBButton');

          addToBasketCustomise.addEventListener('click', () => {
            sessionStorage.setItem(`${shared.ID}-pizzaOrSideAdded`, true);
          });
        }

      } catch (e) {} 
    });
  } else if (window.location.pathname.indexOf('/basket-confirmation.aspx') > -1
  && window.innerWidth <= 420
  && sessionStorage.getItem(`${shared.ID}-basket-confirmation`) == null) {
    pollerLite(['#ctl00__objHeader_lbBasketItem',], () => {
      document.querySelector('body').insertAdjacentHTML('afterbegin', '<div class="PJ097-overlay"></div>');
      document.querySelector('#ctl00__objHeader_lbBasketItem').click();

      // console.log('--- BEFORE POLLER ---');
      pollerLite(['#fancyBasketMobile', '.fancybox-overlay.fancybox-overlay-fixed'], () => {
        if (document.querySelector('.PJ097-overlay')) {
          document.querySelector('.PJ097-overlay').parentNode.removeChild(document.querySelector('.PJ097-overlay'));
        }
        document.querySelector('#ctl00__objHeader_aCheckoutMobile').setAttribute('style', 'display: none !important;');
        document.querySelector('#ctl00__objHeader_aCheckoutMobile').setAttribute('style', 'display: none !important;');
        // --- NEW CHANGES
        document.querySelector('#ctl00__objHeader_divMobileBasketButtons .plainClose').innerText = "Checkout";
        document.querySelector('#ctl00__objHeader_divMobileBasketButtons .plainClose').setAttribute('style', 'background-color: #007a53;');
        document.querySelector('#ctl00__objHeader_divMobileBasketButtons .plainClose').classList.add('PJ097-proceedCta');
        // --- BACK BUTTON
        const previousPage = document.referrer;
        const backBtn = `<a href="${previousPage}" class="plainClose">Back</a>`;
        document.querySelector('#ctl00__objHeader_divMobileBasketButtons .plainClose.PJ097-proceedCta').insertAdjacentHTML('beforebegin', backBtn);

        // --- SCROLL INTO VIEW Checkout Buttons
        document.querySelector('#ctl00__objHeader_divMobileBasketButtons .plainClose.PJ097-proceedCta').addEventListener('click', (e) => {
          setTimeout(() => {
            const checkoutButtonsEl = document.querySelector('#ctl00_cphBody_upBasket');
            checkoutButtonsEl.querySelector('.m-checkout-buttons').scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
          }, 2000);
        });
        document.querySelector('#fancyBasketMobile a.close').addEventListener('click', (e) => {
          setTimeout(() => {
            const checkoutButtonsEl = document.querySelector('#ctl00_cphBody_upBasket');
            checkoutButtonsEl.querySelector('.m-checkout-buttons').scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
          }, 2000);
        });

        sessionStorage.setItem(`${shared.ID}-basket-confirmation`, true);
        // -------------------------------------------
        // PRM Manager Listen for State Changes
        // -------------------------------------------
        window.prm.add_endRequest(function (sender, error) {
          try {
            // console.log(sender);
            if (sender['_postBackSettings'].asyncTarget === "ctl00$_objHeader$lbBasketItem") {
              // alert('PRM CHANGE');
              document.querySelector('#ctl00__objHeader_aCheckoutMobile').setAttribute('style', 'display: none !important;');
              // --- NEW CHANGES
              document.querySelector('#ctl00__objHeader_divMobileBasketButtons .plainClose').innerText = "Checkout";
              document.querySelector('#ctl00__objHeader_divMobileBasketButtons .plainClose').setAttribute('style', 'background-color: #007a53;');
              document.querySelector('#ctl00__objHeader_divMobileBasketButtons .plainClose').classList.add('PJ097-proceedCta');
              // --- BACK BUTTON
              const previousPage = document.referrer;
              const backBtn = `<a href="${previousPage}" class="plainClose">Back</a>`;
              document.querySelector('#ctl00__objHeader_divMobileBasketButtons .plainClose.PJ097-proceedCta').insertAdjacentHTML('beforebegin', backBtn);
              // // --- SCROLL INTO VIEW Checkout Buttons
              document.querySelector('#ctl00__objHeader_divMobileBasketButtons .plainClose.PJ097-proceedCta').addEventListener('click', (e) => {
                setTimeout(() => {
                  const checkoutButtonsEl = document.querySelector('#ctl00_cphBody_upBasket');
                  checkoutButtonsEl.querySelector('.m-checkout-buttons').scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
                }, 2000);
              });
              document.querySelector('#fancyBasketMobile a.close').addEventListener('click', (e) => {
                setTimeout(() => {
                  const checkoutButtonsEl = document.querySelector('#ctl00_cphBody_upBasket');
                  checkoutButtonsEl.querySelector('.m-checkout-buttons').scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
                }, 2000);
              });

            }

          } catch (e) {} 
        });

      });
    });
    
    
  }
  
};


export default activate;
