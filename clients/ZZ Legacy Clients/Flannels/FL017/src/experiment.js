import { fullStory, events } from '../../../../lib/utils';
import basketHTML from './markup/basket';

/**
 * {{FL017}} - {{Test Description}}
 */
const storeBasket = () => {
  events.analyticsReference = '_gaUAT';
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'FL017',
      VARIATION: '1',
    },
    cache: (() => {
      const bodyVar = document.body;
      const continueBtn = bodyVar.querySelectorAll('.ContinueOn');
      const basketProducts = [];
      const basketInfo = {
        total: null,
        itemAmount: null,
        discountTotal: null,
      };

      return {
        bodyVar,
        continueBtn,
        basketProducts,
        basketInfo,
      };
    })(),
    init: () => {
      // Setup
      const { components } = Exp;
      components.bindClick();
    },
    components: {
      bindClick() {
        [].forEach.call(Exp.cache.continueBtn, (item) => {
          item.addEventListener('click', () => {
            Exp.components.captureBasket();
          });
        });
      },
      captureBasket() {
        /*
          Loop through each product
          Pull out relevant information from each product and send it to
          the next function for storing in JSON
         */
        const products = Exp.cache.bodyVar.querySelectorAll('table tbody tr');
        const itemCapture = Exp.cache.bodyVar.querySelector('#SubtotalRow').dataset.itemcount;
        const basketTotal = Exp.cache.bodyVar.querySelector('#TotalRow #TotalValue').textContent.trim();

        Exp.cache.basketInfo.total = basketTotal;
        Exp.cache.basketInfo.itemAmount = itemCapture;
        if (document.getElementById('BasketSummaryDiscountValue')) {
          Exp.cache.basketInfo.discountTotal = document.getElementById('BasketSummaryDiscountValue').textContent.trim();
        }

        [].forEach.call(products, (item) => {
          const prodHref = item.querySelector('.productdesc .prodDescContainer .productTitle').href;
          const prodImg = item.querySelector('.productimage img').src;
          const prodName = item.querySelector('.productdesc .prodDescContainer .productTitle').textContent.trim();
          const prodColor = item.querySelector('.productdesc .prodDescContainer .productcolour span + span').textContent.trim();
          const prodSize = item.querySelector('.productdesc .prodDescContainer .productsize span + span').textContent.trim();
          const prodPrice = item.querySelector('.itemprice .money').textContent.trim();
          const prodPriceTotal = item.querySelector('.itemtotalprice .money').textContent.trim();
          const prodQuantity = item.querySelector('.prdQuantity .qtybox').value;
          let checkForDiscount = null;
          if (item.querySelector('.money.discount')) {
            checkForDiscount = item.querySelector('.money.discount').textContent.trim();
          }
          // eslint-disable-next-line
          Exp.components.saveBasket(prodHref, prodImg, prodName, prodColor, prodSize, prodPrice, prodPriceTotal, prodQuantity, checkForDiscount);
        });

        Exp.components.storeBasket();
      },
      saveBasket(href, img, name, color, size, price, total, quantity, discount) {
        /*
          Push each bit of product information to an array as an object
          The objects can then be looped over later for easy access
         */
        Exp.cache.basketProducts.push({
          href,
          img,
          name,
          color,
          size,
          price,
          total,
          quantity,
          discount,
        });
      },
      storeBasket() {
        // Store it in localstorage when all the products have been pushed to an array
        localStorage.setItem('FL017_basket', JSON.stringify(Exp.cache.basketProducts));
        localStorage.setItem('FL017_basket-extras', JSON.stringify(Exp.cache.basketInfo));
      },
    },
  };

  Exp.init();
};

const buildBasket = () => {
  events.analyticsReference = '_gaUAT';
  let slideQ = false;
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'FL017',
      VARIATION: '1',
    },
    cache: (() => {
      const bodyVar = document.body;
      const productData = JSON.parse(localStorage.getItem('FL017_basket'));
      const basketData = JSON.parse(localStorage.getItem('FL017_basket-extras'));
      const currentTotal = bodyVar.querySelector('#TotalValue');
      let reviewBasket;

      return {
        bodyVar,
        productData,
        basketData,
        reviewBasket,
        currentTotal,
      };
    })(),
    init: () => {
      // Setup
      const { services, settings, components } = Exp;

      Exp.cache.bodyVar.classList.add(settings.ID);
      // eslint-disable-next-line
      if (Exp.cache.currentTotal && (Exp.cache.basketData.itemAmount === Exp.cache.currentTotal.dataset.itemcount)) {
        services.tracking();
        components.contentBuilder();
        components.bindReveal();
      } else if (!Exp.cache.currentTotal) {
        services.tracking();
        components.contentBuilder();
        components.bindReveal();
      } else {
        Exp.cache.productData = [];
        Exp.cache.basketData = {
          total: null,
          itemAmount: null,
          discountTotal: null,
        };
        services.requestBasket();
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
      requestBasket() {
        const request = new XMLHttpRequest();
        const div = document.createElement('div');
        request.open('GET', 'https://www.flannels.com/Cart', true);
        request.onload = () => {
          if (request.status >= 200 && request.status < 400) {
            const resp = request.responseText;
            div.insertAdjacentHTML('afterbegin', resp);

            const products = div.querySelectorAll('table tbody tr');
            const itemCapture = div.querySelector('#SubtotalRow').dataset.itemcount;
            const basketTotal = div.querySelector('#TotalRow #TotalValue').textContent.trim();

            Exp.cache.basketData.total = basketTotal;
            Exp.cache.basketData.itemAmount = itemCapture;
            if (div.querySelector('BasketSummaryDiscountValue')) {
              Exp.cache.basketData.discountTotal = div.querySelector('BasketSummaryDiscountValue').textContent.trim();
            }

            [].forEach.call(products, (item) => {
              const prodHref = item.querySelector('.productdesc .prodDescContainer .productTitle').href;
              const prodImg = item.querySelector('.productimage img').src;
              const prodName = item.querySelector('.productdesc .prodDescContainer .productTitle').textContent.trim();
              const prodColor = item.querySelector('.productdesc .prodDescContainer .productcolour span + span').textContent.trim();
              const prodSize = item.querySelector('.productdesc .prodDescContainer .productsize span + span').textContent.trim();
              const prodPrice = item.querySelector('.itemprice .money').textContent.trim();
              const prodPriceTotal = item.querySelector('.itemtotalprice .money').textContent.trim();
              const prodQuantity = item.querySelector('.prdQuantity .qtybox').value;
              let checkForDiscount = null;
              if (item.querySelector('.money.discount')) {
                checkForDiscount = item.querySelector('.money.discount').textContent.trim();
              }
              // eslint-disable-next-line
              Exp.components.saveBasket(prodHref, prodImg, prodName, prodColor, prodSize, prodPrice, prodPriceTotal, prodQuantity, checkForDiscount);
            });

            Exp.components.storeBasket();

            Exp.services.tracking();
            Exp.components.contentBuilder();
            Exp.components.bindReveal();
          }
        };

        request.send();
      },
      /*
        events.send(`${Exp.settings.ID}`, 'Action', 'Label', { sendOnce: true });
      */
    },
    components: {
      contentBuilder() {
        Exp.cache.bodyVar.insertAdjacentHTML('beforeend', basketHTML);
        Exp.cache.reviewBasket = Exp.cache.bodyVar.querySelector('.FL017_basket');
        const productSection = Exp.cache.reviewBasket.querySelector('.FL017_product-wrap');

        Exp.cache.reviewBasket.querySelector('.FL017_title-info .FL017_items span').textContent = Exp.cache.basketData.itemAmount;
        Exp.cache.reviewBasket.querySelector('.FL017_title-info .FL017_total .FL017_total-text').textContent = Exp.cache.basketData.total;

        if (Exp.cache.basketData.discountTotal !== null) {
          Exp.cache.reviewBasket.querySelector('.FL017_title-info .FL017_total .FL017_total-text').textContent = Exp.cache.basketData.discountTotal;
        }

        Exp.cache.productData.forEach((item) => {
          // <a href="${item.href}" class="FL017_name">${item.name}</a>
          if (item.discount !== null && item.discount !== '') {
            productSection.insertAdjacentHTML('afterbegin', `
              <div class="FL017_product">
                <div class="FL017_img">
                  <a><img src="${item.img}" /></a>
                </div>
                <div class="FL017_product-info">
                  <a class="FL017_name">${item.name}</a>
                  <span class="FL017_detail">${item.color}</span>
                  <span class="FL017_detail">${item.size}</span>
                  <span class="FL017_detail">QTY: ${item.quantity}</span>
                  <div class="FL017_price">
                    <span>TOTAL: ${item.total}</span>
                    <span class="FL017_disc">Discount ${item.discount}</span>
                  </div>
                </div>
              </div>
            `);
          } else {
            productSection.insertAdjacentHTML('afterbegin', `
              <div class="FL017_product">
                <div class="FL017_img">
                  <a><img src="${item.img}" /></a>
                </div>
                <div class="FL017_product-info">
                  <a class="FL017_name">${item.name}</a>
                  <span class="FL017_detail">${item.color}</span>
                  <span class="FL017_detail">${item.size}</span>
                  <span class="FL017_detail">QTY: ${item.quantity}</span>
                  <div class="FL017_price">
                    <span>TOTAL: ${item.total}</span>
                  </div>
                </div>
              </div>
            `);
          }
        });
      },
      bindReveal() {
        const reveal = Exp.cache.reviewBasket.querySelector('.FL017_basket-reveal');
        const continueBtn = Exp.cache.reviewBasket.querySelector('.FL017_continue');

        reveal.addEventListener('click', () => {
          events.send(Exp.settings.ID, 'Clicked', 'Review Basket Opened', { sendOnce: true });
          if (slideQ === false) {
            slideQ = true;
            Exp.cache.reviewBasket.classList.toggle('FL017_active');
            Exp.cache.bodyVar.classList.toggle('FL017_overflow');
            setTimeout(() => {
              slideQ = false;
            }, 500);
          }
        });

        continueBtn.addEventListener('click', () => {
          events.send(Exp.settings.ID, 'Clicked', 'Continue to checkout clicked', { sendOnce: true });
          reveal.click();
        });
      },
      saveBasket(href, img, name, color, size, price, total, quantity, discount) {
        /*
          Push each bit of product information to an array as an object
          The objects can then be looped over later for easy access
         */
        Exp.cache.productData.push({
          href,
          img,
          name,
          color,
          size,
          price,
          total,
          quantity,
          discount,
        });
      },
      storeBasket() {
        // Store it in localstorage when all the products have been pushed to an array
        localStorage.setItem('FL017_basket', JSON.stringify(Exp.cache.productData));
        localStorage.setItem('FL017_basket-extras', JSON.stringify(Exp.cache.basketData));
      },
    },
  };

  Exp.init();
};

const storeBasketPDP = () => {
  events.analyticsReference = '_gaUAT';
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'FL017',
      VARIATION: '1',
    },
    cache: (() => {
      const bodyVar = document.body;
      const addToBag = bodyVar.querySelector('.addToBag');
      const basketProducts = [];
      const basketInfo = {
        total: null,
        itemAmount: null,
      };

      return {
        bodyVar,
        addToBag,
        basketProducts,
        basketInfo,
      };
    })(),
    init: () => {
      // Setup
      const { components } = Exp;

      components.bindClick();
    },
    components: {
      bindClick() {
        Exp.cache.addToBag.addEventListener('click', () => {
          setTimeout(() => {
            Exp.components.captureBasket();
          }, 400);
        });
      },
      captureBasket() {
        /*
          Loop through each product
          Pull out relevant information from each product and send it to
          the next function for storing in JSON
         */
        const products = Exp.cache.bodyVar.querySelectorAll('#ulBag .liPrdLnk');
        const itemCapture = Exp.cache.bodyVar.querySelector('#bagQuantity').textContent.trim();
        const basketTotal = Exp.cache.bodyVar.querySelector('#spanBagSubTotalValue').textContent.trim();

        Exp.cache.basketInfo.total = basketTotal;
        Exp.cache.basketInfo.itemAmount = itemCapture;

        [].forEach.call(products, (item) => {
          const prodHref = item.dataset.prdurl;
          const prodImg = item.querySelector('.Baskimg').src;
          const prodName = item.querySelector('.BaskName').textContent.trim();
          const prodColor = item.querySelector('.ColrandSize .BaskColr').textContent.trim();
          const prodSize = item.querySelector('.ColrandSize .BaskSize').textContent.trim();
          const prodPrice = item.querySelector('.BaskPrice').textContent.trim();
          const prodQuantity = item.querySelector('.BaskQuant').textContent.trim().replace('Qty: ', '');
          let priceNum;
          if (Exp.cache.bodyVar.classList.contains('currency-eur')) {
            priceNum = prodPrice.replace(/(£|$|€)/, '').replace(',', '.').replace(/\s+/g, '');
            priceNum = parseFloat(priceNum);
          } else {
            priceNum = prodPrice.replace(/(£|$|€)/, '').replace(',', '');
            priceNum = parseFloat(priceNum);
          }
          const prodPriceTotal = priceNum * parseInt(prodQuantity, 10);
          // eslint-disable-next-line
          Exp.components.saveBasket(prodHref, prodImg, prodName, prodColor, prodSize, prodPrice, prodPriceTotal, prodQuantity);
        });

        Exp.components.storeBasket();
      },
      saveBasket(href, img, name, color, size, price, total, quantity) {
        /*
          Push each bit of product information to an array as an object
          The objects can then be looped over later for easy access
         */
        Exp.cache.basketProducts.push({
          href,
          img,
          name,
          color,
          size,
          price,
          total,
          quantity,
        });
      },
      storeBasket() {
        // Store it in localstorage when all the products have been pushed to an array
        localStorage.setItem('FL017_basket', JSON.stringify(Exp.cache.basketProducts));
        localStorage.setItem('FL017_basket-extras', JSON.stringify(Exp.cache.basketInfo));
        Exp.cache.basketInfo = {
          total: null,
          itemAmount: null,
        };
        Exp.cache.basketProducts = [];
      },
    },
  };

  Exp.init();
};

export { storeBasket, buildBasket, storeBasketPDP };
