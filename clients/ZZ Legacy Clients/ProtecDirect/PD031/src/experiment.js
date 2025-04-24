import { fullStory, events } from '../../../../lib/utils';


/**
 * {{PD031}} - {{Mobile Basket Redesign}}
 */

const Run = () => {
  const $ = window.jQuery;
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'PD031',
      VARIATION: '1',
    },
    cache: (() => {
      const docVar = document;
      const bodyVar = docVar.body;
      const basketHeader = bodyVar.querySelector('h1.title-inner1');
      const allProducts = bodyVar.querySelectorAll('.grid_12 >.common-cart-item');
      const VATText = bodyVar.querySelector('.order_totals > .vat .ui-block-a');
      const subtotalContainer = bodyVar.querySelectorAll('.order_totals > .sub-total');
      let priceVAT = bodyVar.querySelector('.order_totals .ui-grid-a .ui-block-b').textContent.trim().replace(/£/g, '');
      priceVAT = parseFloat(priceVAT);
      const saveBasketParent = bodyVar.querySelector('.grid_12.linkButton.row1');
      const checkoutParent = bodyVar.querySelector('.grid_12.linkButton.row2');
      const saveBasketButton = docVar.getElementById('saveBasket');
      const checkoutButton = docVar.getElementById('checkoutButton');
      const orderTotalsContainer = bodyVar.querySelector('.order_totals');
      let basketBarCheckout;
      let basketBar;
      let basketBarContainer;
      // Next line disabled, reassigned on lines 206-208
      // eslint-disable-next-line
      let grandTotal = bodyVar.querySelector('.order_totals .total> .ui-grid-a>.ui-block-b').textContent.trim();
      const grandTotalText = bodyVar.querySelector('.order_totals .total> .ui-grid-a > .ui-block-a');
      // Elements may not exist

      const promotionalMessage = bodyVar.querySelector('.cart-promotions-potential-bar > li');
      const applyVoucherButton = docVar.getElementById('applyVoucher');

      // Markup

      const repositionedElementsMarkup = `
        <div class="PD031-Product-Element-Wrap">
        </div>
      `;

      // Experiment config

      const freeDeliveryThreshold = 25.00;

      return {
        docVar,
        bodyVar,
        basketHeader,
        promotionalMessage,
        allProducts,
        repositionedElementsMarkup,
        applyVoucherButton,
        VATText,
        subtotalContainer,
        priceVAT,
        saveBasketParent,
        checkoutParent,
        saveBasketButton,
        basketBarCheckout,
        checkoutButton,
        orderTotalsContainer,
        freeDeliveryThreshold,
        grandTotalText,
        grandTotal,
        basketBar,
        basketBarContainer,
      };
    })(),
    init: () => {
      // Setup
      const { services } = Exp;
      const { settings } = Exp;
      const { components } = Exp;

      Exp.cache.bodyVar.classList.add(settings.ID);
      services.tracking();
      components.setupElements();
      const hide = document.getElementById(`${settings.ID}_flickerPrevention`);
      hide.parentElement.removeChild(hide);
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking: () => {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
        // Default running event
        events.send(Exp.settings.ID, 'View', `${Exp.settings.ID} activated - Variation ${Exp.settings.VARIATION}`);
      },
    },
    components: {
      setupElements() {
        // Change basket title
        Exp.cache.basketHeader.textContent = 'My Basket';
        // If promotional message exist remove '>>'
        if (Exp.cache.promotionalMessage) {
          Exp.cache.promotionalMessage.textContent = Exp.cache.promotionalMessage.textContent.replace(/»/g, '');
        }
        // Edit grand total text
        Exp.cache.grandTotalText.textContent = 'GRAND TOTAL (inc VAT):';
        // Restructure products
        this.setupProducts();
        // Set up the checkout section
        this.setupCheckoutSection();
        // Render basket bar
        Exp.cache.basketHeader.insertAdjacentHTML('afterend', `
        <div class="PD031-Basket-Bar-Wrap">
          <div class="PD031-Basket-Bar">
            <span class="PD031-Basket-Bar-Price Basket-Bar-Element">Grand Total: ${Exp.cache.grandTotal}</span>
            <button class="PD031-Basket-Bar-Button Basket-Bar-Element">Checkout</button>
          </div>
        </div>`);
        Exp.cache.basketBarContainer = Exp.cache.bodyVar.querySelector('.PD031-Basket-Bar-Wrap');
        Exp.cache.basketBar = Exp.cache.bodyVar.querySelector('.PD031-Basket-Bar');
        Exp.cache.basketBarCheckout = Exp.cache.bodyVar.querySelector('.PD031-Basket-Bar-Button');
        // Elements ready, add functions
        this.experimentFunctions();
        this.setupStickyBar();
      },
      setupProducts() {
        // Restructures each product in the basket
        for (let i = 0; i < Exp.cache.allProducts.length; i += 1) {
          const currentProduct = Exp.cache.allProducts[i];
          const productCode = currentProduct.querySelector('.code');
          const quantitySelector = currentProduct.querySelector('form');
          const updateQuantityButton = currentProduct.querySelector('.ui-block-a');
          const nextToImage = currentProduct.querySelector('.item > .grid_4');
          const deleteButtonText = currentProduct.querySelector('.remove-item-qnt');
          const totalPrice = currentProduct.querySelector('.label-value.totalPrice');
          // Change delete button text - if it exists
          // May not always exist, for example when redeeming a voucher for a travel mug
          if (deleteButtonText) {
            deleteButtonText.textContent = 'Remove';
          }
          // Create new container for repositioned elements
          nextToImage.insertAdjacentHTML('afterend', Exp.cache.repositionedElementsMarkup);
          // Store refrence to newly added markup
          const newLocation = Exp.cache.bodyVar.querySelectorAll('.PD031-Product-Element-Wrap')[i];
          // Add elements to new location
          newLocation.insertAdjacentElement('beforebegin', productCode);
          newLocation.insertAdjacentElement('beforeend', quantitySelector);
          newLocation.insertAdjacentElement('beforeend', updateQuantityButton);
          // Move total price next to remove button
          currentProduct.querySelector('.common-qty').insertAdjacentElement('beforeend', totalPrice);
        }
      },
      setupCheckoutSection() {
        // Check conditions for delivery text
        this.renderDeliveryText();
        // Change the text of apply voucher button
        if (Exp.cache.applyVoucherButton) {
          Exp.cache.applyVoucherButton.textContent = 'Apply';
        }
        // Change VAT text
        Exp.cache.VATText.textContent = 'VAT (20%)';
        // Move checkout above save basket
        Exp.cache.saveBasketParent.insertAdjacentElement('beforebegin', Exp.cache.checkoutParent);
        // Change save basket button text
        Exp.cache.saveBasketButton.textContent = 'Save basket for later';
        // Render delivery text
        Exp.cache.saveBasketParent.insertAdjacentHTML('afterend', `
        <div class="PD031-Delivery-Information-Container">
          <span class="PD031-Delivery-Information-Header">Delivery</span>
          <p class="PD031-Delivery-Information-Text">Orders less than £25.00 are subject to a small order charge of £4.95. For UK Islands, Scottish Highlands, some parts of Northern Scotland, a small order charge of £15 for orders under £200 applies. For Northern Ireland, a small order charge of £12.50 for orders under £200 applies. For the Channel Islands, a small order charge of £18.95 for orders under £200 applies. All pricing excludes VAT.</p>
        </div>
        `);
      },
      renderDeliveryText() {
        // Check if delivery price is already added to subtotals
        // If not then render PD031 delivery information
        let renderDeliveryMarkup = true;
        for (let i = 0; i < Exp.cache.subtotalContainer.length; i += 1) {
          const comparisonString = Exp.cache.subtotalContainer[i].querySelector('.ui-block-a').textContent.toUpperCase().trim();
          if (comparisonString.indexOf('DELIVERY') > -1) {
            renderDeliveryMarkup = false;
            // check if free delivery has been chosen
            if (Exp.cache.subtotalContainer[i].querySelector('.ui-block-b').textContent.toUpperCase().trim().indexOf('FREE') > -1) {
              // Add styling class
              Exp.cache.bodyVar.querySelector('.freeDelivery').classList.toggle('PD031-Delivery-Selected');
            }
            break;
          }
        }
        if (renderDeliveryMarkup) {
          let deliveryCharge = 'Free';
          // Check if eligible for free delivery
          if (Exp.cache.priceVAT < Exp.cache.freeDeliveryThreshold) {
            deliveryCharge = '£4.95';
            // Render spend more for free delivery banner
            Exp.cache.orderTotalsContainer.insertAdjacentHTML('beforebegin', `
            <div class="PD031-Spend-More-Container">
              <span class="PD031-Spend-More-Text">Spend £${(Exp.cache.freeDeliveryThreshold - Exp.cache.priceVAT).toFixed(2)} more for free delivery!</span>
            </div>
            `);
            // Adjust grand total to include 4.95 delivery charge
            Exp.cache.grandTotal = parseFloat(Exp.cache.grandTotal.replace(/£/g, ''));
            Exp.cache.grandTotal += 4.95;
            Exp.cache.grandTotal = Exp.cache.grandTotal.toFixed(2);
            Exp.cache.grandTotal = `£${Exp.cache.grandTotal}`;
            // Set bottom grand total new text
            Exp.cache.bodyVar.querySelector('.order_totals .total> .ui-grid-a>.ui-block-b').textContent = Exp.cache.grandTotal;
          }
          // Render estimated delivery cost
          Exp.cache.subtotalContainer[0].insertAdjacentHTML('afterend', `
            <div class="PD031-Delivery-Charge-Wrap sub-total">
              <p class="PD031-Delivery-Charge-Text PD031-Delivery-Element">Estimated Delivery Cost<span class="PD031-Delivery-Cost-Icon">i</span></p>
              <p class="PD031-Delivery-charge-Price PD031-Delivery-Element">${deliveryCharge}</p>
            </div>
          `);
        }
      },
      experimentFunctions() {
        // Click the checkout button when add checkout button is clicked
        Exp.cache.basketBarCheckout.addEventListener('click', () => {
          Exp.cache.checkoutButton.click();
        });
        // Scroll to delivery information when icon is clicked
        $('.PD031-Delivery-Cost-Icon').on('click', () => {
          $('html, body').animate({ scrollTop: $('.PD031-Delivery-Information-Container').offset().top });
          events.send(`${Exp.settings.ID}`, 'Click', 'Delivery Tooltip', { sendOnce: true });
        });
        // Click tracking to Quantity increase/Decrease
        $('.ui-btn.ui-icon-plus').on('touchstart', () => {
          events.send(`${Exp.settings.ID}`, 'Click', 'Quantity increased', { sendOnce: true });
        });
        $('.ui-btn.ui-icon-minus').on('touchstart', () => {
          events.send(`${Exp.settings.ID}`, 'Click', 'Quantity decreased', { sendOnce: true });
        });
        // Save basket event
        Exp.cache.saveBasketButton.addEventListener('click', () => {
          events.send(`${Exp.settings.ID}`, 'Click', 'Save Basket For Later', { sendOnce: true });
        });
        // Checkout event
        Exp.cache.checkoutButton.addEventListener('click', () => {
          events.send(`${Exp.settings.ID}`, 'Click', 'Checkout', { sendOnce: true });
        });
      },
      setupStickyBar() {
        // Build sticky bar
        $(window).on('scroll', () => {
          const scrollTop = $(window).scrollTop();
          const elementOffset = $(Exp.cache.basketBarContainer).offset().top;
          const distance = (elementOffset - scrollTop);
          // Check if element will be out of view
          if (distance <= 0) {
            // Add sticky class
            Exp.cache.basketBar.classList.add('PD031-Sticky');
          } else if (distance > 0 && Exp.cache.basketBar.classList.contains('PD031-Sticky')) {
            // Remove class
            Exp.cache.basketBar.classList.remove('PD031-Sticky');
          }
        });
      },
    },
  };

  Exp.init();
};

export default Run;
