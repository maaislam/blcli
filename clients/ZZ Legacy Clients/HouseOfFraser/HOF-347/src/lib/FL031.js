import { getCookie, events, setCookie } from "../../../../../lib/utils";
import { reg } from './brandMatch';
import { fireEvent } from '../../../../../core-files/services'; 
import shared from '../../../../../core-files/shared'; 
const { ID, VARIATION, CLIENT, LIVECODE } = shared;
export const FL031 = () => {
  const doc = document;
  const bodyVar = doc.body;
  let $ = null;
  
  const Exp = {
    /**
     * @desc Variation shared. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    
    cache: (() => {

      const bagItems = JSON.parse(doc.getElementById('divBagItems').getAttribute('data-basket'));
      const bagQuantity = (bagItems.quantity || bagItems.Quantity);
      const subTotal = (bagItems.subTotal || bagItems.SubTotal);
      
      const basketProducts = (bagItems.basketProductDetails || bagItems.BasketProductDetails);
      console.log(basketProducts);
      const basketLength = parseInt(document.getElementById('bagQuantity').innerText);
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
      const { services, shared, components } = Exp;

      bodyVar.classList.add(ID);
      
      console.log("SHOW MINI BAG");
      
      if (Exp.cache.basketLength > 0 && !getCookie('HOF-347NoShow')) {
        console.log("IF");
        components.render();
        components.revealMiniBag();
        components.closeMiniBag();
        components.revealProducts();
        components.tracking();
        // services.tracking();
      } else {
        console.log("ELSE");
      }
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking() {
        const { shared } = Exp;
        fullStory(ID, `Variation ${VARIATION}`);
        fireEvent('Visible - mini-basket shown on page: '+window.location.href);
      },

    },
    components: {
      getProductInfo() {
        let productContent = '';
        let viewAllAdded = false;
        for (let i = 0; Exp.cache.basketLength > i; i += 1) {
          const item = Exp.cache.basketProducts[i];
          const brandName = (item.productName || item.ProductName);
          const brandNameNoProduct = brandName.match(reg);
          let brandString = brandNameNoProduct ? brandNameNoProduct[0] : brandName;
          const productLink = (item.ProductUrl || item.productURL);

          const productNameNoBrand = brandName.toLowerCase().replace(brandString.toLowerCase(), '');
          
          if (i >= 5 && viewAllAdded == false) {
            productContent += `
              <div class="HOF-347-viewAll">
                <a href="/Cart">View All</a>
              </div>
            `;
            viewAllAdded = true;
          } else if (i < 6) {
            productContent += `
              <div class="HOF-347_product clearfix">
                <a href="#" class="removeClass HOF-347-remove" productvariantitem="${(item.variantId || item.VariantId)}" removequantity="Qty: 1"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAWCAYAAADAQbwGAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAASdEVYdFNvZnR3YXJlAEdyZWVuc2hvdF5VCAUAAADDSURBVDhP7dOxCsIwEMZxX04QJ0V8BqX6DqKj6Cr6QHZWZ7tnr/vpBwkh11zuUBfB/5ZSfrR3bY++3I+Bzjlq24c/6eF+XgKu1huaV0sTut3taVYt/CmWgIBwk4YCG02mdG8afyXWmaGGljCUXYqEahjKgoijFgyJIAro+AVZMFQEEZ6sPxiat18Ew2terjfT9pEI8pnxmUplQWkBFrQDatvU0AQ8HE+mbQYUvyovATF8y6eBgJ7r2p9i4lLe7Q9+GtETM9OBf6+mScIAAAAASUVORK5CYII=" alt="cross mark" class="close-icon" /></span></a>
                <a href="${(item.productUrl || item.ProductUrl)}"></a>
                <div class="HOF-347_product-details">
                  <h3>${brandString}</h3>
                  <p class="HOF-347-prod-name">${productNameNoBrand}</p>
                  
                  ${(item.productColour || item.ProductColour) ? `<p class="HOF-347-grey HOF-347-colour">${(item.productColour || item.ProductColour).toLowerCase()}</p>` : ''}
                  <p class="HOF-347-grey HOF-347-size">${(item.productSize || item.ProductSize).toLowerCase()}</p>
                  <p class="HOF-347-ib HOF-347-grey">Qty: ${(item.productQuantity || item.ProductQuantity)}</p>
                  <p class="HOF-347-ib" style="margin-left: 5px"><span class="HOF-347_product-price">${(item.lineTotalText || item.LineTotalText)}</span></p>
                </div>
                <img src="${(item.productImageUrl || item.ProductImageUrl)}" alt="${(item.productName || item.ProductName)}" />
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
          multipleProducts = 'HOF-347_multiple-products';
          if (Exp.cache.basketLength > 2) {
            slideTrigger = 'HOF-347_slider-amount';
          }
        }

        bodyVar.insertAdjacentHTML('beforeend', `
          <div class="HOF-347-tab-title">
                <p>Your Saved Bag</p>
              </div>
          <div class="HOF-347_mini-bag ${Exp.cache.basketLength > 3 ? 'arrows-required' : ''} cleafix">
          <div class="HOF-347-wrap">
              <h3 class="prod-total"><a class="HOF-347_reveal-products ${multipleProducts}">You have ${Exp.cache.bagQuantity} item${Exp.cache.bagQuantity > 1 ? 's' : ''} in your bag</a></h3>
              <a href="#" id="HOF-347-cartscroll-to-top" class="HOF-347-scroll-buttons to-top inactive"><span></span></a>
              <div class="HOF-347_mini-content ${Exp.cache.basketLength > 1 ? 'HOF-347-moreProds' : ''}">
                <div class="HOF-347_bag-slider ${slideTrigger}">
                  ${Exp.components.getProductInfo()}
                </div>
                
              </div>
              <a href="#" id="HOF-347-cartscroll-to-bottom" class="HOF-347-scroll-buttons to-bottom"><span></span></a>
              <div class="HOF-347_bag-btns clearfix">
                <p class="HOF-347_bag-total"></p>
                <a class="view-bag-button" href="/cart"><span>View Bag</span></a>
                <a class="secure-checkout-button" href="/checkoutselect"><span>Secure Checkout</span></a>
              </div>
              <a class="HOF-347_mini-close">I'd rather not see this</a>
            </div>
          </div>
        `);
      },
      revealMiniBag() {
        Exp.cache.miniBag = bodyVar.querySelector('.HOF-347_mini-bag');
        if (!getCookie('HOF-347NoExpand')) {

            setTimeout(() => {
              document.querySelector('.HOF-347-tab-title').classList.add('active');
              Exp.cache.miniBag.classList.add('HOF-347_active');
              setCookie('HOF-347NoExpand', true);
              fireEvent('Event - mini-basket visible');
            }, 1500);       
    
            

            setTimeout(() => {
              document.querySelector('.HOF-347-tab-title').classList.remove('active');
              Exp.cache.miniBag.classList.remove('HOF-347_active');
            }, 7000);
          
        }
      },
      closeMiniBag() {
        Exp.cache.miniBag.querySelector('.HOF-347_mini-close').addEventListener('click', () => {
          document.querySelector('.HOF-347-tab-title').classList.remove('active');
          Exp.cache.miniBag.classList.remove('HOF-347_active');
          sessionStorage.setItem('HOF-347', 'Seen');
          fireEvent('Click - user clicked I\'d rather not see this link');
          setCookie('HOF-347NoShow', 'true');
          // Remove element
          document.querySelector('.HOF-347-tab-title').parentNode.removeChild(document.querySelector('.HOF-347-tab-title'));
          component.parentNode.removeChild(component);
        }); 
        document.querySelector('.HOF-347-tab-title').addEventListener('click', () => {
          document.querySelector('.HOF-347-tab-title').classList.toggle('active');
          Exp.cache.miniBag.classList.toggle('HOF-347_active');
          sessionStorage.setItem('HOF-347', 'Seen');
        });
      },
      revealProducts () {
        const sliderReveal = bodyVar.querySelector('.HOF-347_reveal-products.HOF-347_multiple-products');
        const sliderTrigger = bodyVar.querySelector('.HOF-347_bag-slider.HOF-347_slider-amount');
        const bagBtns = bodyVar.querySelector('.HOF-347_bag-btns');
        let sliderInit = false;
 
        if (sliderReveal) {
          const slider = bodyVar.querySelector('.HOF-347_bag-slider');
          sliderReveal.addEventListener('click', () => {
            if (window.innerWidth < 960) {
              if (slider.classList.contains('HOF-347_show')) {
                slider.classList.remove('HOF-347_show');
                sliderReveal.classList.remove('HOF-347_active');
                bagBtns.classList.remove('HOF-347_show');
              } else {
                slider.classList.add('HOF-347_show');
                sliderReveal.classList.add('HOF-347_active');
                bagBtns.classList.add('HOF-347_show');
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
            $('.HOF-347_bag-slider').slick({
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
            $('.HOF-347_bag-slider').slick({
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
        const viewBagBtn = bodyVar.querySelector('.HOF-347_bag-btns a:first-of-type');
        const secureBtn = bodyVar.querySelector('.HOF-347_bag-btns a:last-of-type');
        const viewAllBtn = bodyVar.querySelector('.HOF-347-viewAll a');
        const productLinks = bodyVar.querySelectorAll('.HOF-347_product a');

        if (viewBagBtn) {
          viewBagBtn.addEventListener('click', () => {
            fireEvent('Click - View Bag', true);
          });
        }
        
        if (secureBtn) {
          secureBtn.addEventListener('click', () => {
            fireEvent('Click - Secure Checkout', true);
          });
        }

        if (viewAllBtn) {
          viewAllBtn.addEventListener('click', () => {
            fireEvent('Click - View All', true);
          });
        }

        if (productLinks.length) {
          for (let i = 0; productLinks.length > i; i += 1) {
            productLinks[i].addEventListener('click', () => {
              fireEvent('Click - Product', true);
            });
          }
        }

      },
    },
  };

  Exp.init();
};