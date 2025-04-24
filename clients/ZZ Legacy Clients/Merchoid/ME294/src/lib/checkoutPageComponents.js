import shared from '../../../../../core-files/shared';
import { fireEvent } from '../../../../../core-files/services';
import { pollerLite, observer } from './../../../../../lib/utils';
import { getCheckoutPage } from './helpers';
import { generateDropdown } from './dropdownComponent';

const { ID, VARIATION } = shared;

const creditCardTypes = `<ul class="${ID}-credit-card-types credit-card-types braintree-credit-card-types">
  <li class="item">
    <img data-bind="attr: {
          'src': $parent.getIcons(item).url
      }" src="https://www.merchoid.com/static/version1628070470/frontend/Merchoid/merchoid2/en_US/Magento_Braintree/images/cc/VI.png">
  </li>      
  <li class="item">
      <img data-bind="attr: {
          'src': $parent.getIcons(item).url
      }" src="https://www.merchoid.com/static/version1628070470/frontend/Merchoid/merchoid2/en_US/Magento_Braintree/images/cc/MC.png">
  </li>
  
  <li class="item">
      <img data-bind="attr: {
          'src': $parent.getIcons(item).url
      }" src="https://www.merchoid.com/static/version1628070470/frontend/Merchoid/merchoid2/en_US/Magento_Braintree/images/cc/DI.png">
      <!--/ko-->
  </li>
  <li class="item">
      <img data-bind="attr: {
          'src': $parent.getIcons(item).url
      }" src="https://www.merchoid.com/static/version1628070470/frontend/Merchoid/merchoid2/en_US/Magento_Braintree/images/cc/DN.png">
  </li>
  
  <li class="item">
      <img data-bind="attr: {
          'src': $parent.getIcons(item).url
      }" src="https://www.merchoid.com/static/version1628070470/frontend/Merchoid/merchoid2/en_US/Magento_Braintree/images/cc/MI.png">
  </li>
</ul>`;

const newLogoImg = 'https://merchoidcdn-pveiw4zwh96ot9z.netdna-ssl.com/media/wysiwyg/merchoid.png';


export const updateHeader = () => {
  // --- Move User Basket
  if (window.innerWidth > 767) {
    // --- DESKTOP
    const blueTopBanner = document.querySelector('.page-header .panel.header');
    const userBasket = document.querySelector('.minicart-container .minicart-wrapper');

    blueTopBanner.insertAdjacentHTML('beforeend', `<div class="${ID}-mini-wrapper"></div>`);
    document.querySelector(`.${ID}-mini-wrapper`).insertAdjacentElement('beforeend', userBasket);
    // --- Add Message
    blueTopBanner.insertAdjacentHTML('afterbegin', `<div class="${ID}-top-msg__wrapper"><strong>Free shipping on all products*</strong><a href="${document.querySelector('ul.header.links .link.help a').getAttribute('href')}" class="${ID}-top-msg">More info</a></div>`);
  } else {
    // --- MOBILE
    // pollerLite(['.logo-wrapper picture source[srcset]'], () => {
    //   const logoHeader = document.querySelector('.logo-wrapper picture');
    //   logoHeader.querySelector('source').setAttribute('srcset', newLogoImg);
    //   logoHeader.querySelector('img').setAttribute('src', newLogoImg);
    // });
    
  }

  
}

export const updateMainContent = () => {
  const mainContentWrapper = `<div class="${ID}-main-content__wrapper"></div>`;
  document.querySelector('#maincontent .cart-container').insertAdjacentHTML('beforeend', mainContentWrapper);
  
  const productsListEl = document.querySelector('#form-validate.form.form-cart');
  const cartSummaryEl = document.querySelector('.cart-summary');
  document.querySelector(`.${ID}-main-content__wrapper`).insertAdjacentElement('beforeend', productsListEl);
  document.querySelector(`.${ID}-main-content__wrapper`).insertAdjacentElement('beforeend', cartSummaryEl);

  let cartItemsText = '';
  if (dataLayer[0].google_tag_params.ecomm_prodid.length == 1) {
    cartItemsText = `${dataLayer[0].google_tag_params.ecomm_prodid.length} item`;
  } else {
    cartItemsText = `${dataLayer[0].google_tag_params.ecomm_prodid.length} items`;
  }
  productsListEl.insertAdjacentHTML('afterbegin', `<div class="${ID}-cart-header"><h3>Your Shopping Cart</h3><span>(${cartItemsText})</span></div>`);

  // --- PRODUCT LIST
  const allProducts = document.querySelectorAll('tbody.cart.item');
  [].forEach.call(allProducts, (prod) => {

    const officialMerchLabel = prod.querySelector('.official-licensed');
    if (officialMerchLabel) {
      // https://editor-assets.abtasty.com/49254/611a49b973a401629112761.png
      pollerLite(['.official-licensed picture source[srcset]'], () => {
        const officialLogo = officialMerchLabel.querySelector('picture');
        if (officialLogo) {
          officialLogo.querySelector('source').setAttribute('srcset', 'https://editor-assets.abtasty.com/49254/611a49b973a401629112761.png');
          officialLogo.querySelector('img').setAttribute('src', 'https://editor-assets.abtasty.com/49254/611a49b973a401629112761.png');
        }
      });
      
    }
    
    generateDropdown();
  });
  // --- MOBILE PRODUCT LIST
  if (window.innerWidth < 768) {
    pollerLite(['tbody.cart.item a.action.action-delete'], () => {
      const allProducts = document.querySelectorAll('tbody.cart.item');
      [].forEach.call(allProducts, (prod) => {
        const removeCTA = prod.querySelector('a.action.action-delete');
        prod.insertAdjacentElement('afterbegin', removeCTA);

        const officialMerchLabel = prod.querySelector('.official-licensed');
        if (officialMerchLabel) {
          prod.insertAdjacentElement('beforeend', officialMerchLabel);
          
        }
        
      });
    });
  }
  
}

export const updateCartSummary = () => {
  // --- Show Discount
  const discountCTA = document.querySelector('#block-discount-heading');
  if (!document.querySelector('.fieldset.coupon.applied')) {
    discountCTA.click();
  } else {
    // --- Discount Code has been applied
    document.querySelector('.fieldset.coupon.applied').setAttribute('style', 'margin-top: 55px;');
  }

  togglePromoCodeInput();

  const discountCouponForm = document.querySelector('#discount-coupon-form');
  // --- Change Discount Field Label Text
  if (discountCouponForm.querySelector('label.label span')) {
    discountCouponForm.querySelector('label.label span').innerText = "Add a promo code";
  }
  // --- Change Apply CTA Text
  if (discountCouponForm.querySelector('.action.apply.primary span')) {
    discountCouponForm.querySelector('.action.apply.primary span').innerText = "Apply";
  }

  if (document.querySelector('button.action.apply.primary')) {
    const applyDiscountCTA = document.querySelector('button.action.apply.primary');
    document.querySelector('#coupon_code').insertAdjacentElement('afterend', applyDiscountCTA);
  }

  // --- Add Payment Buttons
  const paymentButtons = `<div class="${ID}-payment-methods__wrapper">
    <button type="button" data-role="proceed-to-checkout" title="Checkout Securely" class="${ID}-button action primary checkout default">
      <span>Checkout Securely</span>
    </button>
    <button type="button" data-role="proceed-to-checkout" title="PayPal Checkout" class="${ID}-button action primary checkout paypal">
      <div class="paypal__img"></div>
      <span>Checkout</span>
    </button>
  </div>`;

  if (!document.querySelector(`.${ID}-payment-methods__wrapper`)) {
    document.querySelector('.cart-summary').insertAdjacentHTML('beforeend', paymentButtons);
  }
  // --- Payment Buttons Event Listeners
  const controlPaymentBtnsContainer = document.querySelector('ul.checkout.methods.items.checkout-methods-items');
  const allControlPaymentsBtns = controlPaymentBtnsContainer.querySelectorAll('li');
  document.querySelector(`.${ID}-payment-methods__wrapper .${ID}-button.checkout.default`).addEventListener('click', (e) => {
    allControlPaymentsBtns[0].querySelector('button').click();
  });
  document.querySelector(`.${ID}-payment-methods__wrapper .${ID}-button.checkout.paypal`).addEventListener('click', (e) => {
    allControlPaymentsBtns[1].querySelector('.paypal input').click();
  });

  if (document.querySelector(`.${ID}-payment-methods__wrapper`)) {
    document.querySelector(`.${ID}-payment-methods__wrapper`).insertAdjacentHTML('afterend', creditCardTypes);
  }
  
}

export const togglePromoCodeInput = () => {
  const couponField = document.querySelector('.fieldset.coupon .field');
  couponField.querySelector('label.label').addEventListener('click', (e) => {
    couponField.classList.toggle('show');
  });
  
}

export const updateProgressContent = () => {
  const stockGuaranteeMsg = document.querySelector('.cart-stock-guarantee__message');
  if (stockGuaranteeMsg && getCheckoutPage() == 'cart' && document.querySelector(`.${ID}_headerContent`)) {
    // --- Move Stock Guarantee Message
    // document.getElementById('store.menu').querySelector('.navigation').insertAdjacentElement('afterend', stockGuaranteeMsg);
    
    // document.querySelector(`.${ID}_headerContent`).insertAdjacentElement('afterend', stockGuaranteeMsg);
    document.querySelector(`.sections.nav-sections`).insertAdjacentElement('afterend', stockGuaranteeMsg);
  } else if (stockGuaranteeMsg && getCheckoutPage() == 'cart' && document.querySelector(`header.page-header`)) {
    // document.querySelector(`header.page-header`).insertAdjacentElement('afterend', stockGuaranteeMsg);

    document.querySelector(`.sections.nav-sections`).insertAdjacentElement('afterend', stockGuaranteeMsg);
  }
  

  // --- Progress Message Changes
  let progressMsg = document.querySelector('.cart-message-progress p').innerText;
  if (progressMsg.indexOf('2 steps away') > -1) {
    document.querySelector('.cart-message-progress p').innerHTML = progressMsg.replace('2 steps away', `<strong>2 steps away</strong>`);
  } else if (progressMsg.indexOf('1 step away') > -1) {
    document.querySelector('.cart-message-progress p').innerHTML = progressMsg.replace('1 step away', `<strong>1 step away</strong>`);
  }
  
  // --- Continue Shopping Link
  if (getCheckoutPage() == 'cart' 
  && window.innerWidth > 767
  && document.querySelector(`.${ID}-main-content__wrapper`)) {
    document.querySelector(`.${ID}-main-content__wrapper`).insertAdjacentHTML('afterbegin', `<a href="/" class="${ID}-continue-shopping__link">Continue Shopping</a>`);
  } else if (getCheckoutPage() == 'cart' 
  && window.innerWidth < 768
  && document.querySelector(`.${ID}-main-content__wrapper`)) {
    pollerLite([`.cart-summary`], () => {
      document.querySelector(`.cart-summary`).insertAdjacentHTML('beforebegin', `<a href="/" class="${ID}-continue-shopping__link">Continue Shopping</a>`);
    });
    
  }
}

// --- CHECKOUT PAGE --- //
export const updateSideCart = () => {
  pollerLite([`.block.items-in-cart .title`, '.minicart-items-wrapper ol.minicart-items li', '.content.minicart-items[style]'], () => {
    const sideCartBlock = document.querySelector(`.block.items-in-cart`);
    const title = sideCartBlock.querySelector('.title');
    const cartItemsNum = title.querySelector('span[data-bind]').innerText;
    title.querySelector('strong').innerHTML = `<div class="step-title ME294-cart-summary" data-role="title"><strong>Your Basket</strong> (${cartItemsNum} items)</div>`;

    // --- Open Mini Cart
    if (document.querySelector('.content.minicart-items').getAttribute('style').indexOf('none') > -1) {
      title.click();
    }
    
  });
}

export const updateUserForm = () => {
  const userDetailsBlock = document.querySelector('#checkout .opc-wrapper');
  
  // --- Change Title Text
  pollerLite(['#checkout .opc-wrapper li#shipping .step-title'], () => {
    const shippingDetails = userDetailsBlock.querySelector('li#shipping');
    shippingDetails.querySelector('.step-title').innerText = 'Your Details';
    shippingDetails.querySelector('.step-title').classList.add(`${ID}-step-title`);
    shippingDetails.querySelector('.step-title').classList.add(`details`);
  });

  pollerLite(['.field[name="shippingAddress.country_id"]', `.field[name="shippingAddress.firstname"]`, `.field[name="shippingAddress.lastname"]`], () => {
    const countryField = userDetailsBlock.querySelector('.field[name="shippingAddress.country_id"]');
    const lastNameField = userDetailsBlock.querySelector('.field[name="shippingAddress.lastname"]');
    lastNameField.insertAdjacentElement('afterend', countryField);

    const postcodeField = userDetailsBlock.querySelector('.field[name="shippingAddress.postcode"]');
    countryField.insertAdjacentElement('afterend', postcodeField);
    postcodeField.insertAdjacentHTML('beforebegin', `<div class="${ID}-step-title step-title shipping" data-role="title">Shipping Address</div>`);

    // --- USER NAME
    if (window.innerWidth > 767) {
      setTimeout(() => {
        countryField.insertAdjacentHTML('beforebegin', `<div class="field ${ID}-userName__wrapper user_name"></div>`);
        const fname = document.querySelector(`.field[name="shippingAddress.firstname"]`);
        const lname = document.querySelector(`.field[name="shippingAddress.lastname"]`);
        document.querySelector(`.${ID}-userName__wrapper`).insertAdjacentElement('beforeend', fname);
        document.querySelector(`.${ID}-userName__wrapper`).insertAdjacentElement('beforeend', lname);
      }, 2000);
    }
    
    
  });

  
}

export const restyleShippingMethods = () => {
  pollerLite(['#opc-shipping_method', 'table.table-checkout-shipping-method tr.row th', 'td.col.col-method input.radio'], () => {
    setTimeout(() => {
      const shippingMethodsBlock = document.querySelector('#opc-shipping_method');
      shippingMethodsBlock.querySelector('.step-title').classList.add(`${ID}-step-title`);
      shippingMethodsBlock.querySelector('.step-title').classList.add(`shipping`);
      const shippingMethods = shippingMethodsBlock.querySelector('#checkout-step-shipping_method');

      const allShippingMethods = shippingMethods.querySelectorAll('table.table-checkout-shipping-method tr.row');
      for (let i = 1; i < allShippingMethods.length; i += 1) {
        let method = allShippingMethods[i];
        if (method.querySelector('.col-price')) {
          const price = method.querySelector('.col-price');
          method.insertAdjacentElement('beforeend', price);
        }
        
        if (method.querySelector('input')) {
          const input = method.querySelector('input');
          // --- Pre-selected Method
          if (input.getAttribute('checked') == input.getAttribute('value')) {
            method.classList.add(`${ID}-selected`);
          }

          // --- User Select Click
          method.addEventListener('click', (e) => {
            if (document.querySelector(`.row.${ID}-selected`)) {
              document.querySelector(`.row.${ID}-selected`).classList.remove(`${ID}-selected`);
            }
            method.classList.add(`${ID}-selected`);
          });
        } 

        if (method.querySelectorAll('td.col.col-method').length == 2 && method.querySelectorAll('td.col.col-method')[1]) {
          method.querySelectorAll('td.col.col-method')[1].setAttribute('style', 'display: none !important;');
        }

      }

      document.querySelector('.opc-wrapper .actions-toolbar#shipping-method-buttons-container .primary button.action span').innerText = "Continue to Payment";
    }, 1000);


    // --- OBSERVE any changes on Shipping Methods Table and Re-run function
    observer.connect(document.querySelector('#opc-shipping_method'), () => {
      restyleShippingMethods();
    }, {
      throttle: 200,
      config: {
        attributes: false,
        childList: true,
        // subtree: true,
      },
    });
  
    
  });
  
  
}
// --- END OF CHECKOUT PAGE --- //

// --- MOBILE MINI CART --- //
export const generateMobileMiniCart = () => {
  pollerLite(['.minicart-items-wrapper'], () => {
    const miniCartWrapper = `<div class="${ID}-mini-cart__header">
      <strong>Your Basket</strong><span id="${ID}-mini-cart-items"></span>
    </div>
    <div class="${ID}-mini-cart__wrapper">
      <div class="${ID}-mini-cart__overlay">
        
      </div>
      
      <div class="${ID}-mini-cart__container">
        <div class="${ID}-mini-cart__header--inner"><strong>Your Basket</strong><span id="${ID}-mini-cart-items-total"></span></div>
      </div>
      <div class="${ID}-mini-cart__cta"><a href="/checkout/cart"><button class="action primary checkout">Edit Basket</button></a></div>
    </div>`;

    document.querySelector('body').insertAdjacentHTML('afterbegin', miniCartWrapper);

    const miniCartProductList = document.querySelector('.minicart-items-wrapper').outerHTML;
    // document.querySelector(`.${ID}-mini-cart__container`).insertAdjacentElement('afterbegin', miniCartProductList);
    document.querySelector(`.${ID}-mini-cart__container`).insertAdjacentHTML('beforeend', miniCartProductList);

    const numOfBasketItems = document.querySelectorAll(`.${ID}-mini-cart__wrapper .minicart-items-wrapper ol li`).length;
    let basketItems = '';
    if (dataLayer[0].ecommerce.checkout.products.length == 1) {
      basketItems = `(${dataLayer[0].ecommerce.checkout.products.length} item)`;
    } else {
      basketItems = `(${dataLayer[0].ecommerce.checkout.products.length} items)`;
    }
    document.querySelector(`#${ID}-mini-cart-items`).innerHTML = basketItems;
    document.querySelector(`#${ID}-mini-cart-items-total`).innerHTML = basketItems;

    // --- Toggle Show/Hide Mini Cart Content
    document.querySelector(`.${ID}-mini-cart__header`).addEventListener('click', (e) => {
      document.querySelector(`.${ID}-mini-cart__wrapper`).classList.toggle('show');

      if (document.querySelector(`.${ID}-mini-cart__wrapper`).classList.contains('show')) {
        document.querySelector('body').classList.add(`${ID}-noScroll`);
      } else {
        document.querySelector('body').classList.remove(`${ID}-noScroll`);
      }
      let jQuery = null;
      jQuery = window.jQuery || window.$;
      var contactTopPosition = jQuery(".ME294-mini-cart__container").position().top;
      jQuery(".ME294-mini-cart__container").animate({scrollTop: contactTopPosition});
    });
    document.querySelector(`.${ID}-mini-cart__overlay`).addEventListener('click', (e) => {
      document.querySelector(`.${ID}-mini-cart__wrapper`).classList.toggle('show');

      if (document.querySelector(`.${ID}-mini-cart__wrapper`).classList.contains('show')) {
        document.querySelector('body').classList.add(`${ID}-noScroll`);
      } else {
        document.querySelector('body').classList.remove(`${ID}-noScroll`);
      }
    });

    document.querySelector(`.${ID}-mini-cart__header--inner`).addEventListener('click', (e) => {
      document.querySelector(`.${ID}-mini-cart__wrapper`).classList.toggle('show');

      if (document.querySelector(`.${ID}-mini-cart__wrapper`).classList.contains('show')) {
        document.querySelector('body').classList.add(`${ID}-noScroll`);
      } else {
        document.querySelector('body').classList.remove(`${ID}-noScroll`);
      }
    });

    // --- Footer
    document.querySelector('footer.page-footer').setAttribute('style', 'padding-bottom: 69px;');
  });
   
}
// --- END OF MOBILE MINI CART --- //

// --- PAYMENT PAGE --- //
export const restylePaymentForm = () => {
  pollerLite(['.payment-method-title.field.choice', '.checkout-billing-address', '.billing-address-details h5.billing-address-details_title'], () => {
    // --- Add Cards
    const paymentMethodTile = document.querySelector('.payment-method-title.field.choice');
    const cardInputLabelText = document.querySelector('.payment-method-title.field.choice .label').innerText.replace(' or ', '/');
    document.querySelector('.payment-method-title.field.choice .label').innerText = cardInputLabelText;
    paymentMethodTile.insertAdjacentHTML('beforeend', creditCardTypes);

    // --- Add New Content
    document.querySelector('.payment-group').insertAdjacentHTML('afterbegin', `<div class="${ID}-step-title step-title payment-details" data-role="title">Payment Details</div>`);
    document.querySelector(`.${ID}-step-title.payment-details`).insertAdjacentElement('afterend', document.querySelector('.checkout-billing-address'));

    // --- Amend Text
    document.querySelector('.billing-address-details h5.billing-address-details_title').innerText = 'Billing Address';
  });
  
  
}

export const restyleOrderSummary = () => {
  pollerLite(['.opc-block-summary table.data.table.table-totals', '.opc-block-shipping-information .shipping-information', 'tr.grand.totals.incl th.mark', `.block.items-in-cart`, '.content.minicart-items[style]'], () => {
    // --- Close Mini Cart
    const sideCartBlock = document.querySelector(`.block.items-in-cart`);
    const title = sideCartBlock.querySelector('.title');
    if (document.querySelector('.content.minicart-items').getAttribute('style').indexOf('block') > -1) {
      title.click();
    }

    const orderSummaryBlock = document.querySelector('.opc-block-summary');
    const orderSummary = orderSummaryBlock.querySelector('table.data.table.table-totals');

    // --- Add New Order Summary Block
    document.querySelector('.opc-block-shipping-information').classList.add(`${ID}-opc-block-summary`);
    document.querySelector('.opc-block-shipping-information .shipping-information').insertAdjacentElement('afterend', orderSummary);

    const newTitle = `<div class="step-title ME294-cart-summary initial" data-role="title" data-was-processed="true"><strong>Order Summary</strong></div>`;
    document.querySelector(`.${ID}-opc-block-summary`).insertAdjacentHTML('afterbegin', newTitle);

    // --- Amend Titles
    document.querySelector('.shipping-information .ship-to span').innerText = 'Shipping Address';
    document.querySelector('tr.grand.totals.incl th.mark').innerHTML = `<strong>Total</strong> (inc tax)`;
    
  });
  
  
}
// --- END OF PAYMENT PAGE --- //