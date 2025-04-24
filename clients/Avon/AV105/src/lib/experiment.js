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
import renderProdlist from './components/products';

import { addToCart, getCart } from './helpers/addToCart';
import clickHandler from './helpers/clickHandler';
import getRatings from './helpers/getRatings';

import obsIntersection from './helpers/observeIntersection';
//import resizeHandler from './helpers/resizeHandler';
import scrollStop from './helpers/scrollstopDetect';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
  setup();

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  //**********************hide var selector for future use***************** //

  const intersectionAnchor = document.getElementById('desktop-continue-shopping');
  const intersectionCallback = (entry) => {
    if (entry.isIntersecting && location.pathname.indexOf('/cart') !== -1 && !document.querySelector(`.${ID}__seen`)) {
      entry.target.classList.add(`${ID}__seen`);
      fireEvent('Conditions Met');
    }
  };

  // -----------------------------
  // If control, bail out from here
  // -----------------------------

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  const isMobile = window.matchMedia('(max-width: 768px)').matches;

  DYO.recommendationWidgetData(
    143282,
    {
      context: {
        type: 'HOMEPAGE',
      },
    },
    function (error, data) {
      if (data.slots.length <= 0) return;
      data.slots.length > 0 && obsIntersection(document.getElementById('basket-sidebar'), 0.1, intersectionCallback);
      pollerLite(['.inc_af_product-list_block'], () => {
        const callbackFunc = () => {
          fireEvent('User scrolls on the “You may also like” carousel');
        };
        scrollStop(document.querySelector('.inc_af_product-list-main_block'), callbackFunc);
      });
      if (VARIATION == 'control') {
        document.body.addEventListener('click', (e) => {
          const target = e.target;
          const targetMatched = (desiredMatch) => target.matches(desiredMatch) || target.closest(desiredMatch);
          if (target.closest('.inc_product_desc_add_text_block')) {
            fireEvent('user adds to cart from the "you may also like" carousel');
          } else if (targetMatched(`.inc_af_right_btn_img`) || targetMatched(`.inc_af_left_btn_img`)) {
            fireEvent('User scrolls on the “You may also like” carousel');
          } else if (targetMatched(`.inc_product_desc_add_block`)) {
            fireEvent('user adds to cart from the "you may also like" carousel');
          } else if (targetMatched(`.inc_product_desc_title_block`) || targetMatched(`.inc_product_img_main_img`)) {
            fireEvent('User clicks on product from "you may also like" section');
          }
        });
        return;
      }

      const wrapperElm = document.createElement('div');

      const overlay = document.createElement('div');
      overlay.id = `${ID}__site-overlay`;
      wrapperElm.className = `${ID}__cards-wrapper`;
      intersectionAnchor.insertAdjacentElement('beforebegin', wrapperElm);
      document.getElementsByTagName('footer')[0].insertAdjacentElement('afterend', overlay);
      const anchorElm = document.querySelector(`.${ID}__cards-wrapper`);
      //anchorElm.classList.add('col-12', ' col-lg-8');

      //console.log(data);
      const excludeSample = data.slots.filter((slot) => slot.item.name.indexOf('Sample') === -1);
      const recentPurchase = excludeSample.slice(0, 12); //increase to 4 when testing done
      console.log(recentPurchase);

      const getAvonProdData = (slicedDtaFromDY) =>
        slicedDtaFromDY.map((data) => fetch(`${data.item.url.split('?')[0].split('.com')[1]}.js`));
      const fetchProdDetails = getAvonProdData(recentPurchase);
      const activeVariants = recentPurchase.map((item) => item.item.url.split('variant=')[1]);

      Promise.all(fetchProdDetails)
        .then((results) => Promise.all(results.map((response) => response.json())))
        .then((datas) => {
          console.log('data', datas);
          datas.forEach((item, i) => {
            item.activeVariant = item.variants.filter((variant) => variant.id == activeVariants[i])[0];
          });
          getCart().then((cartData) => {
            console.log('cartData', cartData);
            const cartItems = cartData.items;
            const filteredData = datas.reduce((prev, curr) => {
              const currentVariant = curr.activeVariant ? curr.activeVariant.sku : curr.variants[0].sku;
              const prodInCart = cartItems.some((cartItem) => cartItem.sku == currentVariant);
              console.log('prodInCart', prodInCart);
              if (!prodInCart) {
                prev.push(curr);
              }
              return prev;
            }, []);
            console.log('filteredData', filteredData);
            if (filteredData.length > 12 || filteredData.length <= 0) return;

            //get rating rating data and add to prod data

            const allRatings = filteredData.map((data) => getRatings(data.id));
            Promise.all(allRatings)
              .then((res) => Promise.all(res.map((response) => response.json())))
              .then((ratingData) => {
                filteredData.forEach((item, i) => {
                  item.ratingData = ratingData[i].response.bottomline;
                });

                renderProdlist(filteredData, anchorElm, ID, 'Buy it again');
                obsIntersection(document.querySelector(`.${ID}__cards-wrapper h2`), 0.1, intersectionCallback);
                const visibleCard =
                  document.querySelectorAll(`.swiper-slide`).length -
                  document.querySelectorAll(`.swiper-slide.${ID}__hide`).length;
                fireEvent(`User sees ${visibleCard} products in “Buy it again” list`);
              });
          });
        })

        .catch((err) => console.log('tada', err));
    }
  );

  VARIATION !== 'control' && clickHandler(addToCart, getCart, isMobile, ID, fireEvent);
};
