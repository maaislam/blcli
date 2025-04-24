import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import VelvetiserUpsell from './upsellBox';

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...



  const checkVelvetiser = () => {

    return new Promise((resolve, reject) => {
      const allBasketItems = document.querySelectorAll('.cart-row');
      if(allBasketItems.length === 1) {
        const itemName = document.querySelector('.item-details .name');

        if(itemName.textContent.indexOf('The Velvetiser') > -1) {
          resolve();
        } else {
          reject();
        }
      }
    });
  }

  checkVelvetiser();

  const slickProducts = () => {
    
    const runSlick = () => {
      window.jQuery(`.${ID}-carousel .${ID}-products`).slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        mobileFirst: true, 
        infinite: false,
        responsive: [
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
              }
            },
            {
              breakpoint: 1008,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
              }
            },
            {
                breakpoint: 600,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                }
              },
            {
                  breakpoint: 500,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                  }
              },
              {
                  breakpoint: 374,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                  }
              },
              {
                  breakpoint: 300,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                  }
              },

            ]
    });      
    }

    if(window.jQuery.fn.slick) {
      runSlick();
    } else {
      jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js', () => {
        runSlick();
      });
    }
   
  }

  function isScrolledIntoView(el) {
    var rect = el.getBoundingClientRect();
    var elemTop = rect.top;
    var elemBottom = rect.bottom;

    // Only completely visible elements return true:
    var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    // Partially visible elements return true:
    //isVisible = elemTop < window.innerHeight && elemBottom >= 0;

    return isVisible;
  }


  checkVelvetiser().then(() => {
    fireEvent('Velvetiser in basket');

    

    if(VARIATION !== 'control') {
      document.documentElement.classList.add(`${ID}-velvetiserInBag`);
      new VelvetiserUpsell();
      //slickProducts();

      window.addEventListener("scroll", () => {
        if(isScrolledIntoView(document.querySelector(`.${ID}-addonsBox`)) === true) {
            fireEvent('Velvetiser upsell in view', true);
        }
      });
    }
    
  });

};
