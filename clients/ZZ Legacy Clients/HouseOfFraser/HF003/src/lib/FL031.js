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
      ID: 'HF003',
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
      
      
      if (Exp.cache.basketLength > 0 && !getCookie('HF003NoShow')) {
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
          
          if (i >= 5 && viewAllAdded == false) {
            productContent += `
              <div class="HF003-viewAll">
                <a href="/Cart">View All</a>
              </div>
            `;
            viewAllAdded = true;
          } else if (i < 6) {
            productContent += `
              <div class="HF003_product clearfix">
                <a href="#" class="removeClass HF003-remove" productvariantitem="${item.variantId}" removequantity="Qty: 1"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAWCAYAAADAQbwGAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAASdEVYdFNvZnR3YXJlAEdyZWVuc2hvdF5VCAUAAADDSURBVDhP7dOxCsIwEMZxX04QJ0V8BqX6DqKj6Cr6QHZWZ7tnr/vpBwkh11zuUBfB/5ZSfrR3bY++3I+Bzjlq24c/6eF+XgKu1huaV0sTut3taVYt/CmWgIBwk4YCG02mdG8afyXWmaGGljCUXYqEahjKgoijFgyJIAro+AVZMFQEEZ6sPxiat18Ew2terjfT9pEI8pnxmUplQWkBFrQDatvU0AQ8HE+mbQYUvyovATF8y6eBgJ7r2p9i4lLe7Q9+GtETM9OBf6+mScIAAAAASUVORK5CYII=" alt="cross mark" class="close-icon" /></span></a>
                <a href="${item.productUrl}"></a>
                <div class="HF003_product-details">
                  <h3>${brandString}</h3>
                  <p class="HF003-prod-name">${productNameNoBrand}</p>
                  
                  ${item.productColour ? `<p class="HF003-grey HF003-colour">${item.productColour.toLowerCase()}</p>` : ''}
                  <p class="HF003-grey HF003-size">${item.productSize.toLowerCase()}</p>
                  <p class="HF003-ib HF003-grey">Qty: ${item.productQuantity}</p>
                  <p class="HF003-ib" style="margin-left: 5px"><span class="HF003_product-price">${item.lineTotalText}</span></p>
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
          multipleProducts = 'HF003_multiple-products';
          if (Exp.cache.basketLength > 2) {
            slideTrigger = 'HF003_slider-amount';
          }
        }

        bodyVar.insertAdjacentHTML('beforeend', `
          <div class="HF003-tab-title">
                <p>Your Saved Bag</p>
              </div>
          <div class="HF003_mini-bag ${Exp.cache.basketLength > 3 ? 'arrows-required' : ''} cleafix">
          <div class="HF003-wrap">
              <h3 class="prod-total"><a class="HF003_reveal-products ${multipleProducts}">You have ${Exp.cache.bagQuantity} item${Exp.cache.bagQuantity > 1 ? 's' : ''} in your bag</a></h3>
              <a href="#" id="HF003-cartscroll-to-top" class="HF003-scroll-buttons to-top inactive"><span></span></a>
              <div class="HF003_mini-content ${Exp.cache.basketLength > 1 ? 'HF003-moreProds' : ''}">
                <div class="HF003_bag-slider ${slideTrigger}">
                  ${Exp.components.getProductInfo()}
                </div>
                
              </div>
              <a href="#" id="HF003-cartscroll-to-bottom" class="HF003-scroll-buttons to-bottom"><span></span></a>
              <div class="HF003_bag-btns clearfix">
                <p class="HF003_bag-total"></p>
                <a class="view-bag-button" href="/cart"><span>View Bag</span></a>
                <a class="secure-checkout-button" href="/checkoutselect"><span>Secure Checkout</span></a>
              </div>
              <a class="HF003_mini-close">I'd rather not see this</a>
            </div>
          </div>
        `);
      },
      revealMiniBag() {
        Exp.cache.miniBag = bodyVar.querySelector('.HF003_mini-bag');
        if (!sessionStorage.getItem('HF003')) {
  
          setTimeout(() => {
            document.querySelector('.HF003-tab-title').classList.add('active');
            Exp.cache.miniBag.classList.add('HF003_active');
          }, 1500);       
  
          events.send('HF003', 'HF003 User Saw', 'HF003 Test Variation');

          setTimeout(() => {
            document.querySelector('.HF003-tab-title').classList.remove('active');
            Exp.cache.miniBag.classList.remove('HF003_active');
          }, 7000);
        }
      },
      closeMiniBag() {
        Exp.cache.miniBag.querySelector('.HF003_mini-close').addEventListener('click', () => {
          document.querySelector('.HF003-tab-title').classList.remove('active');
          Exp.cache.miniBag.classList.remove('HF003_active');
          sessionStorage.setItem('HF003', 'Seen');
          events.send('HF003', 'HF003 Clicked', 'HF003 “I’d rather not see this” link');
          setCookie('HF003NoShow', 'true');
          // Remove element
          document.querySelector('.HF003-tab-title').parentNode.removeChild(document.querySelector('.HF003-tab-title'));
          component.parentNode.removeChild(component);
        }); 
        document.querySelector('.HF003-tab-title').addEventListener('click', () => {
          document.querySelector('.HF003-tab-title').classList.toggle('active');
          Exp.cache.miniBag.classList.toggle('HF003_active');
          sessionStorage.setItem('HF003', 'Seen');
        });
      },
      revealProducts () {
        const sliderReveal = bodyVar.querySelector('.HF003_reveal-products.HF003_multiple-products');
        const sliderTrigger = bodyVar.querySelector('.HF003_bag-slider.HF003_slider-amount');
        const bagBtns = bodyVar.querySelector('.HF003_bag-btns');
        let sliderInit = false;
 
        if (sliderReveal) {
          const slider = bodyVar.querySelector('.HF003_bag-slider');
          sliderReveal.addEventListener('click', () => {
            if (window.innerWidth < 960) {
              if (slider.classList.contains('HF003_show')) {
                slider.classList.remove('HF003_show');
                sliderReveal.classList.remove('HF003_active');
                bagBtns.classList.remove('HF003_show');
              } else {
                slider.classList.add('HF003_show');
                sliderReveal.classList.add('HF003_active');
                bagBtns.classList.add('HF003_show');
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
            $('.HF003_bag-slider').slick({
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
            $('.HF003_bag-slider').slick({
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
        const viewBagBtn = bodyVar.querySelector('.HF003_bag-btns a:first-of-type');
        const secureBtn = bodyVar.querySelector('.HF003_bag-btns a:last-of-type');
        const viewAllBtn = bodyVar.querySelector('.HF003-viewAll a');
        const productLinks = bodyVar.querySelectorAll('.HF003_product a');

        if (viewBagBtn) {
          viewBagBtn.addEventListener('click', () => {
            events.send(`${Exp.settings.ID}`, 'HF003 Clicked', 'HF003 View Bag', { sendOnce: true });
          });
        }
        
        if (secureBtn) {
          secureBtn.addEventListener('click', () => {
            events.send(`${Exp.settings.ID}`, 'HF003 Clicked', 'HF003 Secure Checkout', { sendOnce: true });
          });
        }

        if (viewAllBtn) {
          viewAllBtn.addEventListener('click', () => {
            events.send(`${Exp.settings.ID}`, 'HF003 Clicked', 'HF003 View All', { sendOnce: true });
          });
        }

        if (productLinks.length) {
          for (let i = 0; productLinks.length > i; i += 1) {
            productLinks[i].addEventListener('click', () => {
              events.send('HF003', 'HF003 Click', 'HF003 Product');
            });
          }
        }

      },
    },
  };

  Exp.init();
};