import {
  setup,
  fireEvent
} from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { observer } from '../../../../../lib/utils';
import UpsellBox from './upsellBox';

export default () => {
  const {
    ID,
    VARIATION
  } = shared;

  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    return;
  }
  const checkNoSelector = () => {

    const allProducts = document.querySelectorAll('.cart-row');
    for (let index = 0; index < allProducts.length; index += 1) {
      const element = allProducts[index];
      const name = element.querySelector('.item-details .name');


      if (name.textContent.trim().indexOf('Selector') > -1) {
        return true;
      }
    }

  }

  const checkPrice = () => {
    const totalPrice = document.querySelector('.order-subtotal td:last-of-type');
    const parsePrice = parseFloat(totalPrice.textContent.trim().replace('£', ''));
    return parsePrice.toFixed(2);
  }

  const slickProducts = () => {

    const runSlick = () => {
      window.jQuery(`.${ID}-carousel .${ID}-products`).slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        mobileFirst: true,
        infinite: false,
        draggable: false,
        responsive: [{
            breakpoint: 1200,
            settings: {
              slidesToShow: VARIATION == '1' ? 4 : 3,
              slidesToScroll: 1,
            }
          },
          
          {
            breakpoint: 1023,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              arrows: true,
            }
          },
          {
            breakpoint: 300,
            settings: "unslick",
          },
        ]
      });
    }

      
    if (window.innerWidth >= 1024) {
      if (window.jQuery.fn.slick) {
        runSlick();
      } else {
        jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js', () => {
          runSlick();
        });
      }
    }

    window.jQuery(window).resize(function() {
        if(window.innerWidth >= 1024) {
            if(!document.querySelector(`.${ID}-product.slick-slide`)) {
              runSlick();
                window.jQuery(`.${ID}-carousel`).slick('resize');
            }
        } else {
            if(document.querySelector(`.${ID}-carousel.slick-initialized`)) {
                window.jQuery(`.${ID}-carousel`).slick('unslick');
            }
        }
    });

  }

  const addMessage = () => {
    const message = `
    <div class="${ID}-delivery">
      <p>
        <span></span>
        <b>FREE delivery</b> when you add 3 selectors for £10.
        <a class="${ID}-link">Learn More</a>
      </p>
    </div>`;
    document.querySelector('#page_heading').insertAdjacentHTML('afterend', message);
  }

  
  if ((checkNoSelector() !== true && checkPrice() >= 20) || sessionStorage.getItem(`${ID}-selectorAdded`)) {
    if (VARIATION === '2') {
      addMessage();
    }

    new UpsellBox();

    slickProducts();
  } 


  const checkSelectorAmount = () => {

    const allProducts = document.querySelectorAll('.cart-row');
    for (let index = 0; index < allProducts.length; index += 1) {
      const element = allProducts[index];
      const name = element.querySelector('.item-details .name');


      if (name.textContent.trim().indexOf('Selector') > -1) {
        if (index >= 3) {
          return true;
        }
      }

    }
  }

  // if 3 selectors in bag add discount
  if (VARIATION === '2') {
    if (sessionStorage.getItem(`${ID}-selectorAdded`)) {
      if (checkSelectorAmount() === true) {
        const formAction = document.querySelector('.cart-action-checkout').getAttribute('action');
        if (!document.querySelector('.applied-coupon-code[promo="15092020_free_delivery_30"]')) {
          window.jQuery.ajax({
            url: formAction,
            type: 'post',
            data: `dwfrm_cart_couponCode=FREEDEL30&dwfrm_cart_addCoupon=dwfrm_cart_addCoupon`,
            success: () => {
              window.location.reload();
            }
          });
        }
      }
    }
  }
  

  



};
