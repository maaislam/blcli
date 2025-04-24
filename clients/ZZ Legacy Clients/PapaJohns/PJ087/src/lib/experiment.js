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

const { ID, VARIATION } = shared;

const activate = () => {
  if (sessionStorage.getItem(`${shared.ID}-dipsLightbox`) == null) {
    setup();
    // alert('test running');
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
    if (basketContent > 0) {
      const basketBtn = document.querySelector('.topInner.logoPadding table td.basket');
      const basketBtnLink = basketBtn.querySelector('a');
      basketBtnLink.setAttribute('href', 'javascript:void(0)');
      basketBtn.addEventListener('click', (e) => {
        document.querySelector(`.${shared.ID}-lightbox__wrapper`).classList.remove('hide');

        // --- Set Session Storage item - Experiment is running once per session
        sessionStorage.setItem(`${shared.ID}-dipsLightbox`, true);
      });

      // -- DESKTOP - When item added to the basket, add event listener to grey button
      // pollerLite(['#ctl00__objHeader_upBasketNotification', 'a#ctl00__objHeader_lbNotificationCheckout',], () => {
      //   alert('here');
      //   const greyBtn = document.querySelector('a#ctl00__objHeader_lbNotificationCheckout');
      //   greyBtn.addEventListener('click', (e) => {
      //     greyBtn.setAttribute('href', 'javascript:void(0)');
      //     if (sessionStorage.getItem(`${shared.ID}-dipsLightbox`) == null) {
      //       document.querySelector(`.${shared.ID}-lightbox__wrapper`).classList.remove('hide');
      //     }
      //   });
      // });

      if (device == 'desktop') {
        pollerLite(['.basketNotification .buttons',], () => {
          const hiddenBasketBtn = document.querySelector('.basketNotification .buttons');
          const hiddenBasketBtnLink = hiddenBasketBtn.querySelector('a.blackButton');
          hiddenBasketBtnLink.setAttribute('href', 'javascript:void(0)');

          hiddenBasketBtn.addEventListener('click', (e) => {
            document.querySelector(`.${shared.ID}-lightbox__wrapper`).classList.remove('hide');
    
            // --- Set Session Storage item - Experiment is running once per session
            sessionStorage.setItem(`${shared.ID}-dipsLightbox`, true);
          });
        });
      }

    } else {
      if (device == 'desktop') {
        pollerLite(['.basketNotification .buttons',], () => {
          const hiddenBasketBtn = document.querySelector('.basketNotification .buttons');
          const hiddenBasketBtnLink = hiddenBasketBtn.querySelector('a.blackButton');
          hiddenBasketBtnLink.setAttribute('href', 'javascript:void(0)');

          hiddenBasketBtn.addEventListener('click', (e) => {
            document.querySelector(`.${shared.ID}-lightbox__wrapper`).classList.remove('hide');
    
            // --- Set Session Storage item - Experiment is running once per session
            sessionStorage.setItem(`${shared.ID}-dipsLightbox`, true);
          });
        });
        
      }
    }

    // -- Increase/Decrease
    const allDips = document.querySelectorAll(`.${shared.ID}-dip`);
    [].forEach.call(allDips, (dip) => {
      const addToBasketCta = dip.querySelector(`.${shared.ID}-cta__btn`);
      const dipID = dip.getAttribute('id');
      if (addToBasketCta) {
        addToBasketCta.addEventListener('click', (e) => {
          /**
           * @desc Adds dip to basket
           */
          const variationId = addToBasketCta.getAttribute('data-option');
          const quantity = dip.querySelector('.number').value;

          //window.location.href = `https://staging.papajohns.co.uk/services/addtobasket.aspx?variationId=${variationId}&quantity=${quantity}`;
          // alert(`https://www.papajohns.co.uk/services/addtobasket.aspx?variationId=${variationId}&quantity=${quantity}`);
          window.location.href = `https://www.papajohns.co.uk/services/addtobasket.aspx?variationId=${variationId}&quantity=${quantity}`;
          
          setTimeout(() => {
            document.querySelector(`.${shared.ID}-lightbox__container`).innerHTML = 'One moment...';
            document.querySelector(`.${shared.ID}-lightbox__container`).setAttribute('style', 'padding: 3vw; text-align: center;');
            document.querySelector(`.${shared.ID}-lightbox__wrapper`).setAttribute('style', 'display: block !important;');
          }, 500);
          
        });
      }

      const increaseClick = dip.querySelector('.increase');
      const decreaseClick = dip.querySelector('.decrease');
      if (increaseClick) {
        increaseClick.addEventListener('click', (e) => {
          let value = parseInt(dip.querySelector('.number').value, 10);
          value = isNaN(value) ? 0 : value;
          if (value < 10) {
            value++;
            dip.querySelector('.number').value = value;
            dip.querySelector('.number').setAttribute('value', value);
          }
          // changeSelection(addToBasketCta, device);

          // -- Update Value in Dips Container 
          data.quantity = value;
        });
      }
      

      if (decreaseClick) {
        decreaseClick.addEventListener('click', (e) => {
          let value = parseInt(dip.querySelector('.number').value, 10);
          value = isNaN(value) ? 0 : value;
          if (value > 1) {
            value--;
            dip.querySelector('.number').value = value;
            dip.querySelector('.number').setAttribute('value', value);

            // changeSelection(addToBasketCta, device);

            // -- Update Value in Dips Container 
            data.quantity = value;
          }
          
        });
      }
      
    });
    

    // -------------------------------------------
    // PRM Manager Listen for State Changes
    // -------------------------------------------
    window.prm.add_endRequest(function (sender, error) {
      try {
        // console.log(sender);
        if (sender['_postBackSettings'].asyncTarget === "ctl00$cphBody$lbProceedMobile"
        || sender['_postBackSettings'].asyncTarget === "ctl00$_objHeader$lbReturnToSignInMobile"
        || sender['_postBackSettings'].asyncTarget.indexOf("$_objMenuProduct$lbAddToBasket") > -1) {
          activate();

          
          // -- DESKTOP - When item added to the basket, add event listener to grey button
          pollerLite(['#ctl00__objHeader_upBasketNotification', '.basketNotification .buttons',], () => {
            if (device == 'desktop') {
              const hiddenBasketBtn = document.querySelector('.basketNotification .buttons');
              const hiddenBasketBtnLink = hiddenBasketBtn.querySelector('a.blackButton');
              hiddenBasketBtnLink.setAttribute('href', 'javascript:void(0)');
      
              hiddenBasketBtn.addEventListener('click', (e) => {
                document.querySelector(`.${shared.ID}-lightbox__wrapper`).classList.remove('hide');
        
                // --- Set Session Storage item - Experiment is running once per session
                sessionStorage.setItem(`${shared.ID}-dipsLightbox`, true);
              });
            }
          });

        }

      } catch (e) {} 
    });
  }
  
};


export default activate;
