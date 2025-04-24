import { getCookie, events, setCookie } from "../../../../../lib/utils";
import { pollerLite } from '../../../../../lib/uc-lib';
import { reg } from './brandMatch';

export const FL031 = () => {
  const doc = document;
  const bodyVar = doc.body;
  let $ = null;
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'FL044',
      VARIATION: '1',
    },
    cache: (() => {

      const bagItems = JSON.parse(doc.getElementById('divBagItems').getAttribute('data-basket'));
      const bagQuantity = bagItems.quantity;
      const subTotal = bagItems.subTotal;
      
      const basketProducts = bagItems.basketProductDetails;
      
      const basketLength = basketProducts && basketProducts.length ? basketProducts.length : 0;
      let miniBag;
      return {
        bagItems,
        bagQuantity,
        subTotal,
        basketProducts,
        basketLength,
        miniBag,
      };
    })(),
    init: () => {
      // Setup
      const { services, settings, components } = Exp;

      bodyVar.classList.add(settings.ID);
      
      
      if (Exp.cache.basketLength > 0 && !getCookie('FL044NoShow')) {
        components.render();
        components.revealMiniBag();
        components.closeMiniBag();
        components.revealProducts();
        components.tracking();
        // services.tracking();
      }
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking() {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
        events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
      },
      /*
        events.send(`${Exp.settings.ID}`, 'Action', 'Label', { sendOnce: true });
      */
    },
    components: {
      getProductInfo() {
        let productContent = '';
        let viewAllAdded = false;
        for (let i = 0; Exp.cache.basketLength > i; i += 1) {
          const item = Exp.cache.basketProducts[i];
          console.log(item);
          const brandName = item.productName;
          // let brandNameMatched = '';
          // console.log('brand name ', brandName);
          // if (brandName && brandName.match(reg)) {
          //   brandNameMatched = brandName.match(reg);
          //   console.log('match', brandNameMatched);
          // }
          // const regex = new RegExp("#" + brandName + "#", "i");
          
          const brandNameNoProduct = brandName.match(reg);
          let brandString = brandNameNoProduct ? brandNameNoProduct[0] : brandName;
          const productLink = item.ProductUrl;

          const productNameNoBrand = brandName.toLowerCase().replace(brandString.toLowerCase(), '');
          
          if (i >= 3 && viewAllAdded == false) {
            productContent += `
              <div class="FL044-viewAll">
                <a href="/Cart">View All</a>
              </div>
            `;
            viewAllAdded = true;
          } else if (i < 4) {
            productContent += `
              <div class="FL044_product clearfix">
                <a href="#" class="removeClass FL044-remove" productvariantitem="${item.variantId}" removequantity="Qty: 1">X</a>
                <a href="${item.productUrl}"></a>
                <div class="FL044_product-details">
                  <h3>${brandString}</h3>
                  <p>${productNameNoBrand}</p>
                  
                  ${item.productColour ? `<p class="FL044-grey">${item.productColour}</p>` : ''}
                  <p class="FL044-grey">${item.productSize}</p>
                  <p class="FL044-ib FL044-grey"><strong>QTY:</strong> ${item.productQuantity}</p>
                  <p class="FL044-ib" style="margin-left: 5px"><span class="FL044_product-price">${item.lineTotalText}</span></p>
                </div>
                <img src="${item.productImageUrl}" alt="${item.productName}" />
              </div>
            `;
          }

        }

        return productContent;
      },
      render() {
        let multipleProducts = '';
        let slideTrigger = '';
        if (Exp.cache.basketLength > 1) {
          multipleProducts = 'FL044_multiple-products';
          if (Exp.cache.basketLength > 2) {
            slideTrigger = 'FL044_slider-amount';
          }
        }

        bodyVar.insertAdjacentHTML('beforeend', `
          <div class="FL044_mini-bag cleafix">
          <div class="FL044-wrap">
              <h3><a class="FL044_reveal-products ${multipleProducts}">You have ${Exp.cache.bagQuantity} items in your bag</a></h3>
              <div class="FL044-tab-title">
                <p>Your Saved Basket</p>
              </div>
              <div class="FL044_mini-content ${Exp.cache.basketLength > 1 ? 'FL044-moreProds' : ''}">
                <div class="FL044_bag-slider ${slideTrigger}">
                  ${Exp.components.getProductInfo()}
                </div>
                
              </div>
              <div class="FL044_bag-btns clearfix">
                <p class="FL044_bag-total">Total: ${Exp.cache.subTotal}</p>
                <a href="/cart">View Bag</a>
                <a href="/checkout/launch">Secure Checkout</a>
              </div>
              <a class="FL044_mini-close">I'd rather not see this</a>
            </div>
          </div>
        `);
      },
      revealMiniBag() {
        Exp.cache.miniBag = bodyVar.querySelector('.FL044_mini-bag');
        if (!sessionStorage.getItem('FL044')) {
  
          setTimeout(() => {
            Exp.cache.miniBag.classList.add('FL044_active');
          }, 800);       
  
          events.send('FL044', 'FL044 User Saw', 'FL044 Test Variation');

          setTimeout(() => {
            Exp.cache.miniBag.classList.remove('FL044_active');
          }, 5000);
        }
      },
      closeMiniBag() {
        Exp.cache.miniBag.querySelector('.FL044_mini-close').addEventListener('click', () => {
          Exp.cache.miniBag.classList.remove('FL044_active');
          sessionStorage.setItem('FL044', 'Seen');
          events.send('FL044', 'FL044 Clicked', 'FL044 “I’d rather not see this” link');
          setCookie('FL044NoShow', 'true');
          // Remove element
          component.parentNode.removeChild(component);
        }); 
        document.querySelector('.FL044-tab-title').addEventListener('click', () => {
          Exp.cache.miniBag.classList.toggle('FL044_active');
          sessionStorage.setItem('FL044', 'Seen');
        });
      },
      revealProducts () {
        const sliderReveal = bodyVar.querySelector('.FL044_reveal-products.FL044_multiple-products');
        const sliderTrigger = bodyVar.querySelector('.FL044_bag-slider.FL044_slider-amount');
        const bagBtns = bodyVar.querySelector('.FL044_bag-btns');
        let sliderInit = false;
 
        if (sliderReveal) {
          const slider = bodyVar.querySelector('.FL044_bag-slider');
          sliderReveal.addEventListener('click', () => {
            if (window.innerWidth < 960) {
              if (slider.classList.contains('FL044_show')) {
                slider.classList.remove('FL044_show');
                sliderReveal.classList.remove('FL044_active');
                bagBtns.classList.remove('FL044_show');
              } else {
                slider.classList.add('FL044_show');
                sliderReveal.classList.add('FL044_active');
                bagBtns.classList.add('FL044_show');
              }
            }

            
          });
        }

        // if (sliderTrigger) {
        //   pollerLite([
        //     () => {
        //       let trigger = false;
        //       if (window.jQuery) trigger = true;
        //       console.log(window.jQuery);
        //       return trigger;
        //     },
        //   ], Exp.components.slideShow);
        // }
      },
      slideShow() {
        $ = window.jQuery;

        $.getScript( "https://cdn.jsdelivr.net/jquery.slick/1.6.0/slick.min.js", () => {
          if (window.innerWidth > 959) {
            $('.FL044_bag-slider').slick({
              swipe: false,
              touchMove: false,
              draggable: false,
              infinite: false,
              dots: false,
              autoplay: false,
              slidesToShow: 4,
              vertical: false,
              slidesToScroll: 1,
              responsive: [
                {
                  breakpoint: 1120,
                  settings: {
                    slidesToShow: 3,
                  }
                },
                {
                  breakpoint: 790,
                  settings: {
                    slidesToShow: 2,
                  }
                },
                {
                  breakpoint: 479,
                  settings: {
                    slidesToShow: 1,
                  }
                }
              ]
            });
          } else {
            $('.FL044_bag-slider').slick({
              swipe: false,
              touchMove: false,
              draggable: false,
              infinite: false,
              dots: false,
              autoplay: false,
              slidesToShow: 2,
              vertical: true,
              slidesToScroll: 1,
            });
          }
        });
      },
      tracking() {
        const viewBagBtn = bodyVar.querySelector('.FL044_bag-btns a:first-of-type');
        const secureBtn = bodyVar.querySelector('.FL044_bag-btns a:last-of-type');
        const viewAllBtn = bodyVar.querySelector('.FL044-viewAll a');
        const productLinks = bodyVar.querySelectorAll('.FL044_product a');

        if (viewBagBtn) {
          viewBagBtn.addEventListener('click', () => {
            events.send(`${Exp.settings.ID}`, 'FL044 Clicked', 'FL044 View Bag', { sendOnce: true });
          });
        }
        
        if (secureBtn) {
          secureBtn.addEventListener('click', () => {
            events.send(`${Exp.settings.ID}`, 'FL044 Clicked', 'FL044 Secure Checkout', { sendOnce: true });
          });
        }

        if (viewAllBtn) {
          viewAllBtn.addEventListener('click', () => {
            events.send(`${Exp.settings.ID}`, 'FL044 Clicked', 'FL044 View All', { sendOnce: true });
          });
        }

        if (productLinks.length) {
          for (let i = 0; productLinks.length > i; i += 1) {
            productLinks[i].addEventListener('click', () => {
              events.send('FL044', 'FL044 Click', 'FL044 Product');
            });
          }
        }

      },
    },
  };

  Exp.init();
};