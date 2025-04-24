/**
 * DO001 - PDP Restructure
 * @author User Conversion // JT
 */
import { setup } from './services';
import settings from './settings';
import { cacheDom } from '../../../../../lib/cache-dom';
import { events } from '../../../../../lib/utils';
import { observer } from '../../../../../lib/uc-lib';
import { freeDeliveryCalc, fetchProductPrice } from './components/freeDeliveryCalc';
import { iconBar } from './components/iconBar';
import { deliveryInfo } from './components/deliveryInfo';
import { drinkspiration } from './components/drinkspiration';
import { stickyAtb } from './components/stickyAtb';
import { tooltip } from './components/tooltip';

const activate = () => {
  setup();

  // Stores product price.
  fetchProductPrice();

  // Experiment code
  const mobCache = {
    delCalRef: cacheDom.get('.product--buybox'),
    iconBarRef: cacheDom.get('nav.product--navigation'),
    deliveryRef: cacheDom.get('.content-main.container'),
    drinkspirationRef: cacheDom.get('.trustpilot-widget--bottom'),
    productName: cacheDom.get('header.product--header h1.product--title'),
    productImg: cacheDom.get('.image-slider--item .image--media img'),
    productGift: cacheDom.get('.gift-options-checkbox-wrapper'),
    productCta: cacheDom.get('.is--ctl-detail .product--details .buybox--form .buybox--button-container'),
  };

  const deskCache = {
    delCalRef: cacheDom.get('.product--short-description'),
    iconBarRef: cacheDom.get('.product--details .product--image-container'),
  }

  const init = () => {
    // Feeds off mobCache.
    const productData = {
      name:(() => {
        return mobCache.productName ? mobCache.productName.textContent : null; // String
      })(),
      img:(() => {
        return mobCache.productImg ? mobCache.productImg : null; // Element
      })(),
      gift:(() => {
        return mobCache.productGift ? mobCache.productGift : null // Element
      })(),
      price:(() => {
        return window.dataLayer[0] ? window.dataLayer[0].productPrice : null // String
      })(),
      cta:(() => {
        return mobCache.productCta ? mobCache.productCta : null // Element
      })(),
    };

    
    // Run for mobile
    if (window.innerWidth < 1024) {
      freeDeliveryCalc(mobCache.delCalRef, 'afterbegin');
      iconBar(mobCache.iconBarRef, 'beforebegin');
      deliveryInfo(mobCache.deliveryRef, 'beforeend');
      drinkspiration(mobCache.drinkspirationRef, 'beforebegin');
      stickyAtb(document.body, 'beforeend', productData);
      tooltip(mobCache.productName, 'afterend');

      // Add scroll event for sticky ATB to slide up on scroll up and vice versa.
      let lastScrollTop = 0;
      const addedStickyBag = document.querySelector('.DO001-stickyAtb');
      window.addEventListener("scroll", () => {
        const st = window.pageYOffset || document.documentElement.scrollTop;
        if (st > lastScrollTop){
            // downscroll code
            addedStickyBag.classList.remove('slideUp');
        } else {
            // upscroll code
            addedStickyBag.classList.add('slideUp');
        }
        lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
      }, false);

    }

    // Desktop
    if (window.innerWidth >= 1024) {
      freeDeliveryCalc(deskCache.delCalRef, 'afterend');
      iconBar(deskCache.iconBarRef, 'beforeend', true);
      tooltip(mobCache.productName, 'afterend');
      deliveryInfo(mobCache.deliveryRef, 'beforeend');
      drinkspiration(mobCache.deliveryRef, 'beforeend');
      // stickyAtb(document.body, 'beforeend', productData);

      // Add event for tooltip
      mobCache.productName.addEventListener('mouseenter', () => {
        events.send(settings.ID, 'DO001 Tooltip', 'User saw tooltip');
      });

    }
  };

  init();


  // Observe the basket, re run init.
  // const cart = document.querySelector('.container--ajax-cart');
  // observer.connect(cart, () => {
  //   // Add an observer to the product list now
  //   const cartProductList = document.querySelector('.item--container');
    
  // }, {
  //   config: {
  //     attributes: false,
  //     childList: true,
  //     subtree: false,
  //   }
  // })

  const addToBag = document.querySelector('button.buybox--button.block.btn.is--primary.is--icon-left.is--center');
  if (addToBag) {
    addToBag.addEventListener('click', () => {
      setTimeout(() => {
        const el = document.querySelector('.DO001-freeDelIn');
        if (el) {
          el.parentNode.removeChild(el);
          return;
        }
      }, 700);
    });
  }

};

export default activate;
