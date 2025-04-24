import { pollerLite, observer } from '../../../../../../lib/uc-lib';
import { setCookie, getCookie, events } from '../../../../../../lib/utils';

const ID = 'MP175';

export const MP166 = () => {    
  // Elements
  const basket = document.querySelector('#miniCartSlider');
  const cart = document.querySelector('#page > .row');
  let newSlider = null;
  let numOfSlides;
  let productUrl = '';

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
            if (category.match(/Furniture/gmi)) {
              run = true;
            }
          });
        }
      }
    }

    return run;

  }

  // **Will only run on PDP containing FURNITURE reccomended products
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
            <div class="MP175-recSlider">
              <h2>You may also like...</h2>
        
              ${recProdSliderDup.outerHTML}
            </div>
          `;

          // Collect product URL to check for later.
          productUrl = window.location.pathname;
          setCookie('MP175-prodUrl', productUrl);
      
          // Clear any storage if any.
          if (localStorage.getItem('MP175-recSlider')) {
            const prevStoredSlider = JSON.parse(localStorage.getItem('MP175-recSlider'));
            if (prevStoredSlider.url !== window.location.href) {
              localStorage.removeItem('MP175-recSlider');
            }
          }
          
          // Store most recent related clothing products along with URL.
          const sliderToStore = {
            url: window.location.href,
            html: newSlider,
          }
          localStorage.setItem('MP175-recSlider', JSON.stringify(sliderToStore));    
        }); // End of click
      }

    });
  }


  const addEvents = () => {
    const addedButtons = document.querySelectorAll('.MP175 .MP175-recSlider li .border');
    if (addedButtons) {
      for (let i = 0; addedButtons.length > i; i += 1) {
        addedButtons[i].addEventListener('click', () => {
          events.send(ID, 'MP175 Click', 'MP175 product interaction');
        });
      }
    }
  };


  // Remove rec slider on close of mini bag
  const miniBagClose = document.querySelector('#miniCartSlider.cartSlider .close-btn');
  if (miniBagClose) {
    miniBagClose.addEventListener('click', () => {
      const slider = document.querySelector('#miniCartSlider .MP175-recSlider');
      if (slider) {
        slider.parentNode.removeChild(slider);
      }
    });
  }
  

  // Get slick.
  window.jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', (data, textStatus, jqxhr) => {

    if (window.location.href !== 'https://www.mamasandpapas.com/en-gb/cart') {
      // Observe Basket opening
      pollerLite(['#miniCartSlider #basket'], () => {
        const cartSlider = document.querySelector('#miniCartSlider');
        observer.connect(cartSlider, () => {
          
          productUrl = getCookie('MP175-prodUrl');
    
          // If no items in basket && it's an open basket.
          if (!document.querySelector('.js-basketProducts > .my-3.text-center') && cartSlider.classList.contains('activeRight')) {
            // Remove if it exists.
            if (document.querySelector('#miniCartSlider .MP175-recSlider')) {
              const slider = document.querySelector('#miniCartSlider .MP175-recSlider');
              if (slider) {
                slider.parentNode.removeChild(slider);
              }
            }
            
            // Check if the furniture productUrl exists still
            
            if (document.querySelector(`#miniCartSlider a[href="${productUrl}"]`)) {
              // Wait and add
              if (newSlider) {
                setTimeout(() => {
                    // Add slider
                    if (!document.querySelector('#miniCartSlider .MP175-recSlider')) {
                      const ref = cartSlider.querySelector('#basket');
                      ref.insertAdjacentHTML('beforeend', newSlider);

                      events.send(ID, 'MP175 Added', 'MP175 Product slider added');
                      
                      const $slider = window.jQuery('#miniCartSlider .MP175-recSlider ul')
                      // Re run slick.
                      
                      window.jQuery('#miniCartSlider .MP175-recSlider ul .slick-track').slick({
                        arrows: true,
                        slidesToShow: 1,
                        dots: false,
                        infinite:false,
                      });
      
                      // Re style slick buttons
                      const slickButtons = document.querySelectorAll('#miniCartSlider .MP175-recSlider button.slick-arrow');
                      for (let i = 0; slickButtons.length > i; i += 1) {
                        slickButtons[i].removeAttribute('class');
                        slickButtons[i].setAttribute('class', 'MP175-sliderBtns');
                      }
      
                      // Add events
                      const sliderLinks = document.querySelectorAll('.MP175-recSlider li .border');
                      for (let i = 0; sliderLinks.length > i; i += 1) {
                        sliderLinks[i].addEventListener('click', () => {
                          events.send(ID, 'MP175 Click', 'MP175 Clicked reccomended product');
                        });
                      }
                    }
      
                    // Add events
                    addEvents();
      
                }, 200);
              }
      
              // Backup refresh in case
              setTimeout(() => {
                window.jQuery('#miniCartSlider .MP175-recSlider ul.slick-slider').slick('setPosition');
              }, 800);
    
            }
    
          }
        }, {
          config: {
            attributes: true,
            childList: false,
            subtree: false,
          },
        });
      });
    }
    

    // If we're not on a clothing PDP page, fetch from Local Storage
    if (!newSlider) {
      const storedSlider = localStorage.getItem('MP175-recSlider');
      if (storedSlider) {
        const storedSliderObj = JSON.parse(storedSlider);
        newSlider = storedSliderObj.html;
      }
    }
    
    // Check if we're on the /cart
    if (window.location.href == 'https://www.mamasandpapas.com/en-gb/cart' && newSlider) {

      productUrl = getCookie('MP175-prodUrl');

      // Check if the furniture productUrl exists still
      if (document.querySelector(`#page a[href="${productUrl}"]`)) {

        document.body.classList.add('MP175-cart--show');
        
        // Wait and add
        setTimeout(() => {
            // Add slider
            if (!document.querySelector('#page .MP175-recSlider')) {
              const ref = document.querySelector('#page > .row #orderTotals');
            
              ref.insertAdjacentHTML('beforebegin', newSlider);
              
              const $slider = window.jQuery('#page .MP175-recSlider ul');
              // Re run slick.
              
              window.jQuery('#page .MP175-recSlider ul .slick-track').slick({
                arrows: true,
                slidesToShow: 2,
                dots: false,
                infinite:false,
                responsive: [
                  {
                    breakpoint: 479,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1,
                      infinite: true,
                    }
                  },
                ]
              });

              // Re style slick buttons
              const slickButtons = document.querySelectorAll('#page .MP175-recSlider button.slick-arrow');
              for (let i = 0; slickButtons.length > i; i += 1) {
                slickButtons[i].removeAttribute('class');
                slickButtons[i].setAttribute('class', 'MP175-sliderBtns');
              }

              // Add events
              const sliderLinks = document.querySelectorAll('#page .MP175-recSlider li.slick-slide');
              for (let i = 0; sliderLinks.length > i; i += 1) {
                sliderLinks[i].addEventListener('click', () => {
                  events.send(ID, 'MP175 Click', 'MP175 product interaction');
                });
              }
            }

            // Add events
            addEvents();

        }, 200);

        // Backup refresh in case
        setTimeout(() => {
          window.jQuery('#page .MP175-recSlider ul.slick-slider').slick('setPosition');
        }, 800);

      }

    }

  });

};