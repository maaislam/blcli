/**
 * MP166 - CLOTHING BASKET CROSS-SELL
 * @author User Conversion
 */
import { setup } from './services';
import settings from './settings';
import { observer, pollerLite } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';

const activate = () => {
  setup();

  const { ID, VARIATION } = settings;

  events.send(ID, 'Active');
  
  // Elements
  const basket = document.querySelector('#miniCartSlider');
  let newSlider = null;
  let numOfSlides;

  // Does the basket pass the checks; Contains a 'Clothing' product?
  const passChecks = () => {
    let run = false;
    
    // Get info from Datalayer
    if (window.dataLayer && window.dataLayer[0]) {
      const { ecommerce } = window.dataLayer[0];
      if (ecommerce && ecommerce.detail) {
        const { products } = ecommerce.detail;
        if (products) {
          products.map((prod) => {
            const { category } = prod;
            if (category.match(/Clothes|Clothing/gmi)) {
              run = true;
            }
          });
        }
      }
    }

    return run;

  }

  // **Will only run on PDP containing CLOTHING reccomended products
  if (passChecks()) {
    pollerLite(['.relatedItems ul.relatedItems_slider', '.pdp__btn-group .add-to-cart button'], () => {

      // On ATB Click on Clothing product
      const atbBtn = document.querySelector('.pdp__btn-group .add-to-cart button');

      const PdpSliderTitle = document.querySelector('.pdp_product_zone1 .pdp__carousel > .title span');

      if (atbBtn && PdpSliderTitle && PdpSliderTitle.textContent && PdpSliderTitle.textContent.indexOf('You may also like...') > -1) {
        atbBtn.addEventListener('click', () => {

          const recProdSlider = document.querySelector('.relatedItems ul.slick-initialized.slick-slider');
          const recProdSliderSlides = recProdSlider.querySelectorAll('li');
      
          numOfSlides = recProdSliderSlides.length;
      
          // Dupe them
          const recProdSliderDup = recProdSlider.cloneNode(true);
          recProdSliderDup.classList.remove('slick-initialized');
          recProdSliderDup.classList.remove('slick-slider');
          recProdSliderDup.classList.remove('relatedItems_slider');
          recProdSliderDup.classList.remove('slick-dotted');
      
          // Remove dots and extras
          const dots = recProdSliderDup.querySelector('ul.slick-dots');
          if (dots) {
            dots.parentNode.removeChild(dots);
          }
          
          const slickTrack = recProdSliderDup.querySelector('.slick-track');
          const listItems = recProdSliderDup.querySelectorAll('li');
          for (let i = 0; listItems.length > i; i += 1) {
            listItems[i].removeAttribute('style');
            listItems[i].removeAttribute('class');
            listItems[i].removeAttribute('data-slick-index');
          }
          slickTrack.removeAttribute('style');
        
          // Build the slider
          newSlider = `
            <div class="MP166-recSlider">
              <h2>Style with...</h2>
        
              ${recProdSliderDup.outerHTML}
            </div>
          `;

      
          // Clear any storage if any.
          if (localStorage.getItem('MP166-recSlider')) {
            const prevStoredSlider = JSON.parse(localStorage.getItem('MP166-recSlider'));
            if (prevStoredSlider.url !== window.location.href) {
              localStorage.removeItem('MP166-recSlider');
            }
          }
          
          // Store most recent related clothing products along with URL.
          const sliderToStore = {
            url: window.location.href,
            html: newSlider,
          }
          localStorage.setItem('MP166-recSlider', JSON.stringify(sliderToStore));    
        }); // End of click
      }

    });
  }


  const addEvents = () => {
    const addedButtons = document.querySelectorAll('.MP166 .MP166-recSlider li > .border .cta');
    if (addedButtons) {
      for (let i = 0; addedButtons.length > i; i += 1) {
        addedButtons[i].addEventListener('click', () => {
          events.send(ID, 'Click', 'More info clicked');
        });
      }
    }
  };

  // If we're not on a clothing PDP page, fetch from Local Storage
  if (!newSlider) {
    const storedSlider = localStorage.getItem('MP166-recSlider');
    if (storedSlider) {
      const storedSliderObj = JSON.parse(storedSlider);
      newSlider = storedSliderObj.html;
    }
  }


  // Remove rec slider on close of mini bag
  const miniBagClose = document.querySelector('#miniCartSlider.cartSlider .close-btn');
  if (miniBagClose) {
    miniBagClose.addEventListener('click', () => {
      const slider = document.querySelector('#miniCartSlider .MP166-recSlider');
      if (slider) {
        slider.parentNode.removeChild(slider);
      }
    });
  }

  // Get slick.
  window.jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', (data, textStatus, jqxhr) => {
    // Observe Basket opening
    observer.connect(basket, () => {

      // If no items in basket && it's an open basket.
      if (!basket.querySelector('.js-basketProducts > .my-3.text-center') && basket.classList.contains('activeRight')) {
        // Remove if it exists.
        if (document.querySelector('#miniCartSlider .MP166-recSlider')) {
          const slider = document.querySelector('#miniCartSlider .MP166-recSlider');
          if (slider) {
            slider.parentNode.removeChild(slider);
          }
        }
        
        // Wait and add
        if (newSlider) {
          setTimeout(() => {
              // Add slider
              if (!document.querySelector('#miniCartSlider .MP166-recSlider')) {
                const ref = basket.querySelector('#basket');
                ref.insertAdjacentHTML('beforeend', newSlider);
                
                const $slider = window.jQuery('#miniCartSlider .MP166-recSlider ul')
                // Re run slick.
                
                window.jQuery('#miniCartSlider .MP166-recSlider ul .slick-track').slick({
                  arrows: true,
                  slidesToShow: 1,
                  dots: false,
                  infinite:false,
                });

                // Re style slick buttons
                const slickButtons = document.querySelectorAll('#miniCartSlider .MP166-recSlider button.slick-arrow');
                for (let i = 0; slickButtons.length > i; i += 1) {
                  slickButtons[i].removeAttribute('class');
                  slickButtons[i].setAttribute('class', 'MP166-sliderBtns');
                }

                // Add events
                const sliderLinks = document.querySelectorAll('#miniCartSlider .MP166-recSlider li.slick-slide');
                for (let i = 0; sliderLinks.length > i; i += 1) {
                  sliderLinks[i].addEventListener('click', () => {
                    events.send(ID, 'Click', 'Clicked reccomended product');
                  });
                }
              }

              // Add events
              addEvents();

          }, 200);
        }

        // Backup refresh in case
        setTimeout(() => {
          window.jQuery('#miniCartSlider .MP166-recSlider ul.slick-slider').slick('setPosition');
        }, 800);


      }
    }, {
      config: {
        attributes: true,
        childList: false,
        subtree: false,
      },
    });
  });


  // If on /cart, append to the bottom of the list.
  // if (window.location.href.indexOf('/cart')) {
  //   const ref = document.querySelector('#orderTotals > .content');
  //   if (ref) {
  //     // If no items in basket
  //     if (!basket.querySelector('.js-basketProducts > .my-3.text-center')) {

  //       // Add slider
  //       if (!ref.querySelector('.MP166-recSlider') && newSlider) {
  //         ref.insertAdjacentHTML('beforebegin', newSlider);
          
  //         const $slider = window.jQuery('#cartItems .MP166-recSlider ul')
  //         // Re run slick.
  //         window.jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', (data, textStatus, jqxhr) => {
  //           window.jQuery('.MP166-recSlider ul .slick-track').slick({
  //             arrows: true,
  //             slidesToShow: 2,
  //             dots: false,
  //             infinite:false,
  //             responsive: [
  //               {
  //                 breakpoint: 769,
  //                 settings: {
  //                   slidesToShow: 1,
  //                 }
  //               },
  //             ],
  //           });

  //           // Re style slick buttons
  //           const slickButtons = document.querySelectorAll('.MP166-recSlider button.slick-arrow');
  //           for (let i = 0; slickButtons.length > i; i += 1) {
  //             slickButtons[i].removeAttribute('class');
  //             slickButtons[i].setAttribute('class', 'MP166-sliderBtns');
  //           }

  //           // Add events
  //           const sliderLinks = document.querySelectorAll('.MP166-recSlider li.slick-slide');
  //           for (let i = 0; sliderLinks.length > i; i += 1) {
  //             sliderLinks[i].addEventListener('click', () => {
  //               events.send(ID, 'Click', 'Clicked reccomended product');
  //             });
  //           }
  //         });
          
  //       }

  //       // Add events
  //       addEvents();

  //     }
  //   }
  // }


};

export default activate;
