/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { observer, pollerLite } from '../../../../../lib/utils';

export default () => {
  setup();

  const url = window.location.href;
  let page = null;


  const preCartPopup = document.querySelector('.preCartPopUp');


  const storePageProduct = () => {
    let el = document.querySelector('.selectric .label');
    if (!el) {
      el = document.querySelector('.mobile-pdp-head > h2');
    };

    if (!el) return;

    const text = el.textContent.trim();
    const skuLabel = text.match(/\(SKU:\s\d+\)/);
    
    let image = document.querySelector('img.primaryPDPImage');

    return {
      title: skuLabel ? text.replace(skuLabel[0], '').trim() : text,
      sku: skuLabel ? skuLabel[0].match(/\d+/)[0] : '',
      img: image,
    }
  }


  // Add HTML
  const renderHTML = (htmlEl, prodObject) => `
    <div class="row added-row">
      <div class="HSS025-freq col-lg-12 col-md-12 col-sm-12 col-xs-12 left-column">

      <div class="precart_available">
        <div class="product_listing_inner">
          <h2>Select your product extras</h2>
          <form id="addToCart2" class="add_to_cart_form" action="/hire/your-basket/add" method="post">
            <input id="addToCartForms0.qty2" name="addToCartForms[0].qty" type="hidden" value="1"><!-- Task#10545 Starts here -->
            <input id="addToCartForms0.fromDate" name="addToCartForms[0].fromDate" type="hidden" value="Jan 28, 2021, 8:00:00 AM"><input id="addToCartForms0.entryContainsPromotion" name="addToCartForms[0].entryContainsPromotion" type="hidden" value="false"><input id="addToCartForms0.toDate" name="addToCartForms[0].toDate" type="hidden" value="Feb 4, 2021, 8:00:00 AM"><input id="addToCartForms0.baseProduct" name="addToCartForms[0].baseProduct" type="hidden" value="true"><input id="priceCheckFailed" name="priceCheckFailed" type="hidden" value="false"><!-- Task#10545 Ends here -->
            <input id="addToCartForms0.collectingBranchCode" name="addToCartForms[0].collectingBranchCode" type="hidden" value="5113"><input id="addToCartForms0.collectingBranchName" name="addToCartForms[0].collectingBranchName" type="hidden" value="manchester-cdc"><input id="addToCartForms0.collectingBranchDisplayName" name="addToCartForms[0].collectingBranchDisplayName" type="hidden" value="Manchester CDC"><!--  Task#10545 Starts -->
            <!-- Task#12562 Starts -->
            <input id="addToCartForms0.productPrice.stockNo" name="addToCartForms[0].productPrice.stockNo" type="hidden" value="50011"><input id="addToCartForms0.productPrice.actualPrice" name="addToCartForms[0].productPrice.actualPrice" type="hidden" value="7.0"><input id="addToCartForms0.productPrice.autoPrice" name="addToCartForms[0].productPrice.autoPrice" type="hidden" value="7.0"><input id="addToCartForms0.productPrice.basicPrice" name="addToCartForms[0].productPrice.basicPrice" type="hidden" value="17.0"><input id="addToCartForms0.productPrice.priceFlag" name="addToCartForms[0].productPrice.priceFlag" type="hidden" value="D"><input id="addToCartForms0.productPrice.discountLevel" name="addToCartForms[0].productPrice.discountLevel" type="hidden" value="0"><input id="addToCartForms0.productPrice.discount" name="addToCartForms[0].productPrice.discount" type="hidden" value="0.0"><input id="addToCartForms0.productPrice.rateStructure" name="addToCartForms[0].productPrice.rateStructure" type="hidden" value="WKS"><input id="addToCartForms0.productPrice.tax" name="addToCartForms[0].productPrice.tax" type="hidden" value="0.0"><input id="addToCartForms0.optional" name="addToCartForms[0].optional" type="hidden" value="false"><!-- Task#12562 Ends -->
            <input id="addToCartForms0.productCode" name="addToCartForms[0].productCode" type="hidden" value="50011"><input id="addToCartForms0.promotionEndDate" name="addToCartForms[0].promotionEndDate" type="hidden" value=""><input type="hidden" id="referenceProductCount" value="4">
            <!--  Task#10545 Ends -->
            <input type="hidden" id="defaultB2BCheckboxFlag" value="true" name="defaultB2BCheckboxFlag">
            <input type="hidden" id="isUserB2BCustomer" value="false" name="isUserB2BCustomer">
            <input type="hidden" id="entryNumber" value="0" name="entryNumber">
            <input type="hidden" id="isDeliveryOption" name="isDeliveryOption" value="false">
            <input type="hidden" name="productURI" value="/hire/p/steel-prop-1-8-3-0m-no-1">
            <input type="hidden" name="isDayMondayOrBankHoliday" value="">
            <input type="hidden" name="brandName" value="hire">
            <!-- 	<ul class="carousel jcarousel-skin"> -->
            <!-- 	</ul> -->
            <!-- 	</div> -->
            <!-- 	<ul class="carousel jcarousel-skin"> -->
            <div class="row product_row product_list_section active" id="otheritems2">
              <div class="precart_available_head">
                  <h2>Frequently hired together</h2>
              </div>
            </div>
            
            <div class="carouselItems active">
              <div class="row precart_slider slider_0" data-slider-count="0">
                <div class="prod_list_outer">
                  <div class="prod_list">
                    <div class="prod_inner">
                      <div class="details clearfix">
                        <h2>${prodObject.title}</h2>

                        <span>
                          ${prodObject.sku.length > 0 ? `<strong>Product Code:	</strong>` : ''}
                          ${prodObject.sku}</span>
                      </div>

                      <div class="thumb">
                        ${prodObject.img.outerHTML}
                      </div>

                      <div class="HSS025-cta">
                        <button>In Basket</button>
                      </div>
                    </div>
                  </div>
                </div>  

                
                <div class="HS-plusLine">
                  <span class="close-popup"></span>
                </div>
                
                  <div class="prod_list_outer">
                    ${htmlEl.outerHTML}
                  </div>  

              </div>
            </div>
            <!-- 	</ul> -->
            <!-- 	</div> -->
            <!-- 	<ul class="carousel jcarousel-skin"> -->
            
              <div class="clearfix"></div>
            </div>
          </form>
          </div>
        </div>
      </div>
    </div>
  `;


  let closedOnce = false;

  // Observe the cart
  observer.connect(preCartPopup, () => {
    
    if (preCartPopup.classList.contains('active')) {

      
      // Fetch current product
      const prodObj = storePageProduct();
      
      setTimeout(() => {
        pollerLite(['.precart_slider .prod_list', '.checkout_main .row'], () => {
          let firstItem = document.querySelector('.precart_slider .prod_list');
          
          if (window.innerWidth < 649) {
            firstItem = document.querySelector('.bx-wrapper .prod_list_outer:nth-of-type(2)');
          }

          if (window.innerWidth > 649 && window.innerWidth < 949) {
            firstItem = document.querySelector('.bx-wrapper .prod_list_outer:nth-of-type(3)');
          }
          
          if (url.indexOf('https://www.hss.com/hire/p/steel-prop-1-8-3-0m-no-1') > -1) { // For Steel Props Only
            const htmlToAdd = renderHTML(firstItem, prodObj);
  
            const lastRow = document.querySelector('.checkout_main .row:last-of-type');
            
            if (!document.querySelector('.HSS025-freq')) {
              lastRow.insertAdjacentHTML('beforebegin', htmlToAdd);
              
              // Original Buttons
              const origPlus = document.querySelector('.added-row + .row .no_items .controls-wrapper button.plus');
              const origMinus = document.querySelector('.added-row + .row .no_items .controls-wrapper button.minus');
  
              // Add Events to Mimic +/-
              const addedToggle = document.querySelector('.HSS025-freq .no_items .controls-wrapper');
              const toggleAmount = document.querySelector('.HSS025-freq .no_items .controls-wrapper .qtyrange.form-control');
              let currentVal = addedToggle.querySelector('input.qtyrange');
              const minusInput = addedToggle.querySelector('button.minus');
  
              const thisWrap = addedToggle.closest('.prod_inner');
              const thisThumb = thisWrap.querySelector('.thumb');
  
              addedToggle.addEventListener('click', (e) => {
                
                e.preventDefault();
  
                let val = parseFloat(currentVal.value);  
  
                if (e.target.classList.contains('plus')) {
                  origPlus.click();
                  currentVal.value = parseFloat(val += 1);
                }
  
                if (e.target.classList.contains('minus')) {
                  origMinus.click();
                  if (val > 0) {
                    currentVal.value = parseFloat(val -= 1);
                  }
                }
  
                if (val > 0) {
                  minusInput.removeAttribute('disabled');
                  thisThumb.classList.add('tick');
                } else {
                  minusInput.setAttribute('disabled', 'disabled');
                  thisThumb.classList.remove('tick');
                }
  
              });
            }
  
            // Close Extras or all but first.
            const containers = document.querySelectorAll('.row.product_row.product_list_section.active h2');
  
            const allButFirstContainers = Array.from(containers).slice(1);
  
            if (!closedOnce) {
              for (let i = 0; allButFirstContainers.length > i; i += 1) {
                allButFirstContainers[i].click();
              }
  
              closedOnce = true;
            }
          }
  
          if (url.indexOf('https://www.hss.com/hire/p/floor-and-edge-sander-hire-pack') > -1) { // 
            const titleHeaders = document.querySelectorAll('.precart_available_head h2');
            
            const allButFirstHeaders = Array.from(titleHeaders).slice(1);
            
  
            allButFirstHeaders.map((header, index) => {
              if (!header.querySelector('.HSS-highlight')) {
                let headText = header.textContent.trim();
                header.textContent = '';
  
                header.insertAdjacentHTML('beforeend', `
                  <span class="HSS-underline">${headText}</span>
                  <span class="HSS-highlight">ESSENTIAL</span> <span class="HS-small">(not included)</span>
                `);

                header.click();
              }
            });
  
          }
        });
      }, 1500);
    }
  }, {
    config: {
      attributes: true,
      childList: true,
      subtree: true,    
    }
  });

};
