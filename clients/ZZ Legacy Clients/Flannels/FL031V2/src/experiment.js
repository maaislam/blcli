import { fullStory, events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';

/**
 * {{FL031}} - {{Test Description}}
 */
const Run = () => {
  events.analyticsReference = '_gaUAT';
  const doc = document;
  const bodyVar = doc.body;
  let $ = null;
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'FL031',
      VARIATION: '2',
    },
    cache: (() => {
      const bagItems = JSON.parse(doc.getElementById('divBagItems').getAttribute('data-basket'));
      const bagQuantity = bagItems.Quantity;
      const subTotal = bagItems.SubTotal;
      const basketProducts = bagItems.BasketProductDetails;
      const basketLength = basketProducts.length;
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
      
      if (Exp.cache.basketLength > 0) {
        components.render();
        components.revealMiniBag();
        components.closeMiniBag();
        components.revealProducts();
        components.tracking();
        services.tracking();
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

        for (let i = 0; Exp.cache.basketLength > i; i += 1) {
          const item = Exp.cache.basketProducts[i];
          // console.log(item);

          productContent += `
            <a href="${item.ProductUrl}" class="FL031_product clearfix">
              <img src="${item.ProductImageSmallUrl}" alt="${item.ProductImageAltText}" />
              <div class="FL031_product-details">
                <h3>${item.ProductName}</h3>
                <p>${item.ProductColour}</p>
                <p>${item.ProductSize}</p>
                <p>${item.ProductQuantityText} <span class="FL031_product-price">${item.ProductSellingPriceText}</span></p>
              </div>
            </a>
          `;
        }

        return productContent;
      },
      render() {
        let multipleProducts = '';
        let slideTrigger = '';
        if (Exp.cache.basketLength > 1) {
          multipleProducts = 'FL031_multiple-products';
          if (Exp.cache.basketLength > 2) {
            slideTrigger = 'FL031_slider-amount';
          }
        }

        bodyVar.insertAdjacentHTML('beforeend', `
          <div class="FL031_mini-bag cleafix">
            <div class="FL031_mini-content">
              <h3><a class="FL031_reveal-products ${multipleProducts}">You have ${Exp.cache.bagQuantity} items in your bag</a></h3>
              <div class="FL031_bag-slider ${slideTrigger}">
                ${Exp.components.getProductInfo()}
              </div>
            </div>
            <div class="FL031_bag-btns clearfix">
              <div class="FL031_bag-total">Total: ${Exp.cache.subTotal}</div>
              <a href="/cart">View Bag</a>
              <a href="/checkout/login">Secure Checkout</a>
            </div>
            <a class="FL031_mini-close"></a>
          </div>
        `);
      },
      revealMiniBag() {
        Exp.cache.miniBag = bodyVar.querySelector('.FL031_mini-bag');

        setTimeout(() => {
          Exp.cache.miniBag.classList.add('FL031_active');
        }, 800);       
      },
      closeMiniBag() {
        Exp.cache.miniBag.querySelector('.FL031_mini-close').addEventListener('click', () => {
          Exp.cache.miniBag.classList.remove('FL031_active');
          sessionStorage.setItem('FL031', 'Seen');
        });
      },
      revealProducts () {
        const sliderReveal = bodyVar.querySelector('.FL031_reveal-products.FL031_multiple-products');
        const sliderTrigger = bodyVar.querySelector('.FL031_bag-slider.FL031_slider-amount');
        const bagBtns = bodyVar.querySelector('.FL031_bag-btns');
        let sliderInit = false;

        if (sliderReveal) {
          const slider = bodyVar.querySelector('.FL031_bag-slider');
          sliderReveal.addEventListener('click', () => {
            if (window.innerWidth < 960) {
              if (slider.classList.contains('FL031_show')) {
                slider.classList.remove('FL031_show');
                sliderReveal.classList.remove('FL031_active');
                bagBtns.classList.remove('FL031_show');
              } else {
                slider.classList.add('FL031_show');
                sliderReveal.classList.add('FL031_active');
                bagBtns.classList.add('FL031_show');
              }
            }
          });
        }

        if (sliderTrigger) {
          pollerLite([
            () => {
              let trigger = false;
              if (window.jQuery) trigger = true;
              return trigger;
            },
          ], Exp.components.slideShow);
        }
      },
      slideShow() {
        $ = window.jQuery;

        $.getScript( "https://cdn.jsdelivr.net/jquery.slick/1.6.0/slick.min.js", () => {
          if (window.innerWidth > 959) {
            $('.FL031_bag-slider').slick({
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
                }
              ]
            });
          } else {
            $('.FL031_bag-slider').slick({
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
        const viewBagBtn = bodyVar.querySelector('.FL031_bag-btns .FL031_bag-total + a');
        const secureBtn = bodyVar.querySelector('.FL031_bag-btns .FL031_bag-total + a + a');

        viewBagBtn.addEventListener('click', () => {
          events.send(`${Exp.settings.ID}`, 'Click', 'View Bag', { sendOnce: true });
        });
        
        secureBtn.addEventListener('click', () => {
          events.send(`${Exp.settings.ID}`, 'Click', 'Secure Checkout', { sendOnce: true });
        });
      },
    },
  };

  Exp.init();
};

export default Run;
