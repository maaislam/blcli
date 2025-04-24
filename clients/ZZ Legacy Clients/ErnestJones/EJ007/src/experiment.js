/**
 * EJ007 - Basket Redesign
 * @author Lewis Needham - User Conversion
 */
import { setup } from './services';
import componentFactory from './utils/componentFactory';
import { cacheDom } from './../../../../lib/cache-dom';
import settings from './settings';
import { events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';

/* eslint-disable */
const activate = () => {
  setup();
  const { ID, VARIATION } = settings;

  /** New Header */
  const newHeaderComponent = componentFactory({
    polling: ['.site-logo'],
    create: () => {
      const logoSVG = cacheDom.get('.site-logo').outerHTML;
      const element = document.createElement('div');
      element.classList.add(`${ID}_Header`);
      let html = '<div class="container">';
      html += `<div class="${ID}_col-4 ${ID}_align--left"><div class="${ID}_Header__logo">${logoSVG}</div></div>`;
      html += `<div class="${ID}_col-4 ${ID}_align--middle"><div class="${ID}_Header__link"><a href="https://www.ernestjones.co.uk/">Continue Shopping</a></div></div>`;
      html += `<div class="${ID}_col-4 ${ID}_align--right"><div class="${ID}_Header__info"><div>Call us on 0800 458 1066</div><div class="${ID}_small">9am - 5:30pm Monday to Friday, 9am - 1:00pm Saturdays</div></div></div>`;
      html += '</div>'; // close container
      element.innerHTML = html;
      return element;
    },
    events: (component) => {
      // Continue shopping event
      component.querySelector(`.${ID}_Header__link`).addEventListener('click', () => {
        events.send(ID, `Variation ${VARIATION}`, 'Continue Shopping clicked');
      });
    },
    render: (component) => {
      const originalHeader = cacheDom.get('.main-site-header');
      originalHeader.parentElement.insertBefore(component, originalHeader);
    },
    renderOnCreate: true,
  });

  /** Title */
  const pageTitleComponent = componentFactory({
    /* eslint-disable */
    polling: [
      'main .container',
      () => {
        try {
          return !!window.digitalData.cart.item.length;
        } catch(e) {}
      }
    ],
    /* eslint-enable */
    create: () => {
      const itemCount = window.digitalData.cart.item.length;
      const element = document.createElement('div');
      element.classList.add(`${ID}_PageTitle`);
      element.innerHTML = [
        `<div class="${ID}_PageTitle__title">`,
        `<h1>Basket</h1> Items (${itemCount})`,
        '</div>',
        `<div class="${ID}_Header__info ${ID}_Header__info--mobile">`,
        '<div>Call us on 0800 458 1066</div>',
        `<div class="${ID}_small">9am - 5:30pm Monday to Friday, 9am - 1:00pm Saturdays</div>`,
        '</div>',
      ].join('');
      return element;
    },
    render: (component) => {
      const container = cacheDom.get('main .container');
      container.insertBefore(component, container.firstChild);
    },
    renderOnCreate: true,
  });

  /** USP */
  const uspComponent = componentFactory({
    polling: ['main .container'],
    create: () => {
      const containsWatch = (() => {
        const items = window.digitalData.cart.item;
        let watchFound;
        for (let i = 0; i < items.length; i += 1) {
          const item = items[i];
          if (item.category.primaryCategory === 'Watches') {
            watchFound = true;
            break;
          }
        }
        return watchFound;
      })();
      const messages = {
        watch: `<span class="${ID}_USP__large">Free Watch Adjustments</span><span class="${ID}_USP__divider"></span><span>We can adjust your watch in store to ensure it's the perfect fit</span>`,
        nonWatch: `<span class="${ID}_USP__large">0% APR Finance Options</span><span class="${ID}_USP__divider"></span><span>Great choice! 0% APR interest free finance is available for your order</span>`,
      };
      const element = document.createElement('div');
      element.classList.add(`${ID}_USP`);
      element.innerHTML = `<div class="${ID}_USP__message">${(containsWatch ? messages.watch : messages.nonWatch)}</div>`;
      return element;
    },
    render: (component) => {
      const isFinance = !!cacheDom.get('#ifcPaymentPlan');
      const financeAvailable = !!cacheDom.get('.ifcBuyButton');

      // Do not render if finance is unavailable
      if (isFinance || financeAvailable) {
        pageTitleComponent.component.insertAdjacentElement('afterend', component);
      }
    },
    renderOnCreate: true,
  });

  /** Basket Items */
  const basketItems = componentFactory({
    create: () => {
      // Hide upsell items if finance is selected
      const isFinance = !!cacheDom.get('#ifcPaymentPlan');
      if (isFinance) {
        const upsellItems = cacheDom.getAll('.product-summary.offer');
        for (let i = 0; i < upsellItems.length; i += 1) {
          const item = upsellItems[i];
          item.style.display = 'none';
          const heading = item.previousElementSibling.querySelector('.product-summary__offer-text');
          if (heading) {
            heading.style.display = 'none';
          }
        }
      }
    },
  });

  /** put price on one line */
  const productPrice = componentFactory({
    polling: ['.product-summary__right'],
    create: () => {
      const allProducts = document.querySelectorAll('.product-summary');
      for (let index = 0; index < allProducts.length; index += 1) {
        const element = allProducts[index];
        const priceLine = element.querySelector('.product-summary__right');
        const productSku = element.querySelector('.product-summary__center .product-summary__sku');

        if (priceLine && productSku) {
          productSku.insertAdjacentElement('afterend', priceLine);
        }
      }
    },
  });

  /** Order Summary */
  const orderSummaryComponent = componentFactory({
    polling: ['.order-summary'],
    create: () => {
      const orderSummary = cacheDom.get('.order-summary');
      const products = Array.from(cacheDom.getAll('.product-summary')).filter(el => !el.classList.contains('offer'));

      // Add title
      orderSummary.insertAdjacentHTML('afterbegin', `<h3 class="${ID}_order-summary-title">Order Summary</h3>`);

      // Move promo code field to bottom
      const promoCode = cacheDom.get('.basket__promo-code');
      orderSummary.insertAdjacentElement('afterend', promoCode);

      // Add gift packaging option
      const total = orderSummary.querySelector('.order-summary__row__divider');
      const giftPackaging = products[products.length - 1];
      const giftPackagingElement = (() => {
        const controls = {
          add: giftPackaging.querySelector('.cta--secondary'),
          remove: giftPackaging.querySelector('.product-summary__remove-button'),
          edit: giftPackaging.querySelector('.product-summary__edit-button'),
        };
        const giftPackagingAdded = (() => {
          const desc = giftPackaging.querySelector('.product-summary__definition');
          return desc && desc.innerHTML.trim() === 'Gift packaging added.';
        })();

        const element = document.createElement('div');
        element.classList.add(`${ID}_giftPackaging`);

        if (giftPackagingAdded) {
          const giftMessage = (() => {
            let toReturn;
            const giftMessageElement = giftPackaging.querySelector('.product-summary__gift-message');
            if (giftMessageElement) {
              toReturn = giftMessageElement.innerHTML.trim();
            } else {
              toReturn = false;
            }
            return toReturn;
          })();
          element.classList.add(`${ID}_giftPackaging--active`);
          element.innerHTML = [
            '<div><p>Gift packaging added.</p></div>',
            giftMessage ? `<div class="${ID}_giftPackaging__messageContainer"><p><em>Your gift message:</em></p></div><div class="${ID}_giftPackaging__message"><p>"${giftMessage}"</p></div>` : '',
            `<div class="${ID}_giftPackaging__controls">`,
            `<div class="${ID}_giftPackaging__control" id="${ID}_giftPackaging__control--remove">remove</div>`,
            `<div class="${ID}_giftPackaging__control" id="${ID}_giftPackaging__control--edit">edit</div>`,
            '</div>',
          ].join('');
          element.querySelector(`#${ID}_giftPackaging__control--remove`).addEventListener('click', () => {
            controls.remove.click();
          });
          element.querySelector(`#${ID}_giftPackaging__control--edit`).addEventListener('click', () => {
            controls.edit.click();
          });
        } else {
          element.innerText = '+ Add gift packaging for £3';
          element.addEventListener('click', () => {
            events.send(ID, `Variation ${VARIATION}`, 'Add gift packaging clicked');
            controls.add.click();
          });
        }
        return element;
      })();
      total.insertAdjacentElement('beforebegin', giftPackagingElement);
      giftPackaging.style.display = 'none'; // Hide original element
    },
    events: () => {
      // Promo code event
      const promoCode = cacheDom.get('.promo-code-input__button > button');
      if (promoCode) {
        promoCode.addEventListener('click', () => {
          events.send(ID, `Variation ${VARIATION}`, 'Apply voucher code clicked');
        });
      }
    },
  });

  /** Payment Block */
  const paymentComponent = componentFactory({
    polling: ['#lower-button-group'],
    create: () => {
      const element = document.createElement('div');
      element.classList.add(`${ID}_Payment`);
      const isFinance = !!cacheDom.get('#ifcPaymentPlan');
      const financeAvailable = !!cacheDom.get('.ifcBuyButton');
      const getFinanceOptionHTML = () => {
        let html;
        if (isFinance) {
          const financeBlock = cacheDom.getAll('#ifcPaymentPlan tbody tr td');
          const financeData = {
            total: financeBlock[0].innerHTML.trim(),
            term: financeBlock[1].innerHTML.trim(),
            deposit: financeBlock[2].innerHTML.trim(),
            paymentPerMonth: financeBlock[3].innerHTML.trim(),
            totalInstallmentPayment: financeBlock[4].innerHTML.trim(),
          };

          /* eslint-disable indent */
          html = [
            `<div class="${ID}_Payment__option ${ID}_Payment__option--active" id="${ID}_Payment__option--finance">`,
              `<input type="radio" id="${ID}_Payment__input--finance" name="${ID}_finance" checked />`,
              `<label for="${ID}_finance">Pay ${financeData.deposit} today, and ${financeData.paymentPerMonth} over ${financeData.term} months at 0% APR interest free credit</label>`,
              `<div class="${ID}_Payment__desc ${ID}_Payment__desc--financeSummary">`,
                `<div><em>Order Total</em> ${financeData.total}</div>`,
                `<div><em>Deposit (pay today)</em> ${financeData.deposit}</div>`,
                `<div><em>${financeData.term} x Monthly payments</em> ${financeData.paymentPerMonth} per month</div>`,
                `<div>Total payment in installments <em>${financeData.total}</em></div>`,
              '</div>',
              `<div class="${ID}_Payment__CTAS">`,
                `<div class="${ID}_Payment__CTA" id="${ID}_CTA--financeConfirm">Checkout Now</div>`,
                `<div class="${ID}_Payment__CTA__subtext">With 0% APR Interest Free Credit</div>`,
                `<div class="${ID}_Payment__CTA--sideLink" id="${ID}_CTA--financeEdit">Edit options</div>`,
              '</div>',
              `<div class="${ID}_Payment__CTA__desc ${ID}_Payment__CTA__desc--fullWidth">`,
                '<p>You will now be asked to pay the deposit selected in the 0% APR Interest Free Credit calculator. This money will be held as a deposit against your full credit application. After you have completed this page you will be transferred to the Hitachi PayByFinance website to complete your application.</p>',
                `<p>Hitachi PayByFinance will be a form that asks you questions about your personal details, address details, employment status, and bank details.${window.innerWidth >= 768 ? ` See questions <a href="#" id="${ID}_CTA--financeInfo">here.</a>` : ''}</p>`,             
                '<ul>',
                  '<li><p>If your application is successful your deposit will be taken immediately.</p></li>',
                  '<li><p>If your application is declined then funds will NOT be removed from your account, however the pre-authorisation will be linked to your credit/debit card up to 5 working days.</p></li>',
                '</ul>',
              '</div>',
              `<div class="${ID}_Payment__bottomImgs">`,
                `<div class="${ID}_Payment__bottomImgs__img ${ID}_col-6">`,
                  `<img src="https://ab-test-sandbox.userconversion.com/experiments/${ID}-Hitatchi_logo.png" />`,
                '</div>',
                `<div class="${ID}_Payment__bottomImgs__img ${ID}_col-6">`,
                  `<img src="https://ab-test-sandbox.userconversion.com/experiments/${ID}-Paybyfinance_logo.png" />`,
                '</div>',
              '</div>',
            '</div>',
          ].join('');
          /* eslint-enable indent */
        } else if (financeAvailable) {
          /* eslint-disable indent */
          html = [
            `<div class="${ID}_Payment__option" id="${ID}_Payment__option--finance">`,
              `<input type="radio" id="${ID}_Payment__input--finance" name="${ID}_finance" />`,
              `<label for="${ID}_finance">Pay in 0% APR interest free monthly instalments</label>`,
              `<div class="${ID}_Payment__desc">From just 10% deposit, maximum 48 months 0% APR interest free</div>`,
              `<div class="${ID}_Payment__CTAS">`,
                `<div class="${ID}_Payment__CTA" id="${ID}_CTA--finance">0% APR Interest Free Credit Options</div>`,
              '</div>',
              `<div class="${ID}_Payment__CTA__desc">`,
                '<p>Only available when there is 1 product in your basket (excluding gift options)</p>',
              '</div>',
              `<div class="${ID}_Payment__bottomImgs">`,
                `<div class="${ID}_Payment__bottomImgs__img ${ID}_col-6">`,
                  `<img src="https://ab-test-sandbox.userconversion.com/experiments/${ID}-Hitatchi_logo.png" />`,
                '</div>',
                `<div class="${ID}_Payment__bottomImgs__img ${ID}_col-6">`,
                  `<img src="https://ab-test-sandbox.userconversion.com/experiments/${ID}-Paybyfinance_logo.png" />`,
                '</div>',
              '</div>',
            '</div>',
          ].join('');
          /* eslint-enable indent */
        } else {
          // Finance unavailable for these basket products
          /* eslint-disable indent */
          html = [
            `<div class="${ID}_Payment__option ${ID}_Payment__option--disabled" id="${ID}_Payment__option--finance">`,
              `<div class="${ID}_Payment__option__message">`,
                `<p>Unfortunately your order isn't eligible for finance. For more information please see our <a target="_blank" class="${ID}_Payment__option--blockSelect" href="/webstore/static/customerservice/customer_paymentoptions.do#credit">Terms and Conditions</a></p>`,
              '</div>',
              `<input type="radio" id="${ID}_Payment__input--finance" name="${ID}_finance" />`,
              `<label for="${ID}_finance">Pay in 0% APR interest free monthly instalments</label>`,
              `<div class="${ID}_Payment__desc">From just 10% deposit, maximum 48 months 0% APR interest free</div>`,
              `<div class="${ID}_Payment__CTAS">`,
                `<div class="${ID}_Payment__CTA" id="${ID}_CTA--finance">0% APR Interest Free Credit Options</div>`,
              '</div>',
              `<div class="${ID}_Payment__CTA__desc">`,
                '<p>Only available when there is 1 product in your basket (excluding gift options)</p>',
              '</div>',
              `<div class="${ID}_Payment__bottomImgs">`,
                `<div class="${ID}_Payment__bottomImgs__img ${ID}_col-6">`,
                  `<img src="https://ab-test-sandbox.userconversion.com/experiments/${ID}-Hitatchi_logo.png" />`,
                '</div>',
                `<div class="${ID}_Payment__bottomImgs__img ${ID}_col-6">`,
                  `<img src="https://ab-test-sandbox.userconversion.com/experiments/${ID}-Paybyfinance_logo.png" />`,
                '</div>',
              '</div>',
            '</div>',
          ].join('');
          /* eslint-enable indent */
        }
        return html;
      };
      const getCheckoutOptionHTML = () => {
        // Total basket cost
        const { basketTotal } = window.digitalData.cart.attributes;

        /* eslint-disable indent */
        return [
          `<div class="${ID}_Payment__option${isFinance ? ` ${ID}_Payment__option--pageReload` : ` ${ID}_Payment__option--active`}" id="${ID}_Payment__option--standard">`,
            `<input type="radio" id="${ID}_Payment__input--standard" name="${ID}_standard"${isFinance ? '' : ' checked'} />`,
            `<label for="${ID}_standard">Pay full amount of £${basketTotal.toFixed(2)}</label>`,
            `<div class="${ID}_Payment__desc">Total £${basketTotal.toFixed(2)}</div>`,
            `<div class="${ID}_Payment__CTAS">`,
              `<div class="${ID}_Payment__CTABlock">`,
                `<div class="${ID}_Payment__CTA" id="${ID}_CTA--standard">Checkout Now</div>`,
                `<div class="${ID}_Payment__CTA__imgs">`,
                  `<div class="${ID}_Payment__icon ${ID}_col-5ths"><img src="https://ab-test-sandbox.userconversion.com/experiments/${ID}-icon-visa.gif" /></div>`,
                  `<div class="${ID}_Payment__icon ${ID}_col-5ths"><img src="https://ab-test-sandbox.userconversion.com/experiments/${ID}-icon-visa-electron.gif" /></div>`,
                  `<div class="${ID}_Payment__icon ${ID}_col-5ths"><img src="https://ab-test-sandbox.userconversion.com/experiments/${ID}-icon-mastercard.gif" /></div>`,
                  `<div class="${ID}_Payment__icon ${ID}_col-5ths"><img src="https://ab-test-sandbox.userconversion.com/experiments/${ID}-icon-maestro.gif" /></div>`,
                  `<div class="${ID}_Payment__icon ${ID}_col-5ths"><img src="https://ab-test-sandbox.userconversion.com/experiments/${ID}-icon-american-express.gif" /></div>`,
                '</div>',
              '</div>',
              `<div class="${ID}_Payment__CTA--divider">or</div>`,
              `<div class="${ID}_Payment__CTABlock">`,
                `<div class="${ID}_Payment__CTA" id="${ID}_CTA--paypal"></div>`,
              '</div>',
            '</div>',
          '</div>',
        ].join('');
        /* eslint-enable indent */
      };

      /* eslint-disable indent */
      const html = [
        `<div class="${ID}_Payment__head ${ID}_sectionHead">`,
          `<h2 class="${ID}_Payment__head__title">Select your payment option</h2>`,
        '</div>',
        '<form>',
          `<div class="${ID}_Payment__options">`,
            getFinanceOptionHTML(),
            getCheckoutOptionHTML(),
          '</div>',
        '</form>',
      ].join('');
      /* eslint-enable indent */
      element.innerHTML = html;

      // Add PayPal button
      const paypalCTA = cacheDom.get('#PayPalcheckoutform');
      if (paypalCTA) {
        element.querySelector(`#${ID}_CTA--paypal`).appendChild(paypalCTA);
      }

      return element;
    },
    events: (component) => {
      const options = component.querySelector(`.${ID}_Payment__options`);
      const isFinance = !!cacheDom.get('#ifcPaymentPlan');
      const financeAvailable = !!cacheDom.get('.ifcBuyButton');

      // Switch active state
      options.addEventListener('click', (e) => {
        let node = e.target;

        // If user clicked a blockSelect element, do nothing
        if (node && node.classList && node.classList.contains(`${ID}_Payment__option--blockSelect`)) {
          return false;
        }

        // Find the selected option node
        while (!node.classList.contains(`${ID}_Payment__option`)) {
          if (node === options) return false;
          node = node.parentElement;
        }

        // Set active option
        if (!node.classList.contains(`${ID}_Payment__option--active`)) {
          // If switching from Finance to Pay in Full, require confirmation before changing
          if (node.classList.contains(`${ID}_Payment__option`) && isFinance) {
            if (window.confirm('You are now changing your order from 0% APR Interest Free Credit to pay in full')) {
              cacheDom.get('.ifc-btn-remove').click();
            } else {
              const financeTab = document.querySelector('.EJ007_finance_tab');
              if (financeTab) {
                setTimeout(() => {
                  financeTab.click();
                }, 100);
              }
              return false;
            }
          }

          const active = options.querySelector(`.${ID}_Payment__option--active`);
          if (active) {
            active.classList.remove(`${ID}_Payment__option--active`);
            const input = active.querySelector('input[type="radio"][checked]');
            input.checked = false;
            input.removeAttribute('checked');
          }
          node.classList.add(`${ID}_Payment__option--active`);
          const input = node.querySelector('input[type="radio"]');
          input.checked = true;
          input.setAttribute('checked', '');
        }
        return true;
      });

      // Finance functionality and event
      const financeCTA = component.querySelector(`#${ID}_CTA--finance`);
      const originalFinanceCTA = cacheDom.get('.ifcBuyButton');
      if (financeCTA && originalFinanceCTA) {
        financeCTA.addEventListener('click', () => {
          events.send(ID, `Variation ${VARIATION}`, 'Interest Free options clicked');
          originalFinanceCTA.click();
        });
      }

      // Finance confirm functionality and event
      const financeConfirmCTA = component.querySelector(`#${ID}_CTA--financeConfirm`);
      const originalFinanceConfirmCTA = cacheDom.get('.cta--basket.cta--secondary');
      if (financeConfirmCTA && originalFinanceConfirmCTA) {
        financeConfirmCTA.addEventListener('click', () => {
          events.send(ID, `Variation ${VARIATION}`, 'Checkout Now Interest Free clicked');
          originalFinanceConfirmCTA.click();
        });
      }

      const financeEditCTA = component.querySelector(`#${ID}_CTA--financeEdit`);
      pollerLite(['.ifc-btn-edit'], () => {
        const originalFinanceEditCTA = cacheDom.get('.ifc-btn-edit');
        if (financeEditCTA && originalFinanceEditCTA) {
          financeEditCTA.addEventListener('click', () => {
            events.send(ID, `Variation ${VARIATION}`, 'Edit finance options clicked');
            originalFinanceEditCTA.click();
          });
        }
      });

      // Checkout functionality and event
      const checkoutCTA = component.querySelector(`#${ID}_CTA--standard`);
      const originalCheckoutCTA = cacheDom.get('.cta--basket[name="checkOut"]');
      if (checkoutCTA && originalCheckoutCTA) {
        checkoutCTA.addEventListener('click', () => {
          events.send(ID, `Variation ${VARIATION}`, 'Checkout Now button clicked');
          originalCheckoutCTA.click();
        });
      }

      // Paypal event
      const paypalCTA = cacheDom.get('#PayPalcheckoutform');
      if (paypalCTA) {
        paypalCTA.addEventListener('click', () => {
          events.send(ID, `Variation ${VARIATION}`, 'Paypal button clicked');
        });
      } else {
        const newPaypalCTA = component.querySelector(`#${ID}_CTA--paypal`);
        newPaypalCTA.parentElement.style.display = 'none';
        const divider = component.querySelector(`.${ID}_Payment__CTA--divider`);
        divider.style.display = 'none';
      }

      // Finance availibility event
      if (isFinance || financeAvailable) {
        events.send(ID, `Variation ${VARIATION}`, 'Finance is available');
      }
    },
    render: (component) => {
      const basketButtons = cacheDom.get('#lower-button-group');
      basketButtons.insertAdjacentElement('afterend', component);
    },
    renderOnCreate: true,
  });

  /** Create the tabs for the payment options */
  const optionMobileTabs = componentFactory({
    polling: [`.${ID}_Payment`],
    create: () => {
      const optionTabs = document.createElement('div');
      optionTabs.classList.add(`${ID}_tab-options`);
      const isFinance = !!cacheDom.get('#ifcPaymentPlan');
      const financeAvailable = !!cacheDom.get('.ifcBuyButton');

      const tabHtml = [
        `<div class="${ID}_finance_tab ${ID}_tab${!isFinance && !financeAvailable ? ` ${ID}_tab--disabled` : ''}">Pay by finance</div>`,
        `<div class="${ID}_pay-full ${ID}_tab">Pay in full</div>`,
      ].join('');

      optionTabs.innerHTML = tabHtml;
      document.querySelector(`.${ID}_Payment form`).insertAdjacentElement('beforebegin', optionTabs);
    },
  });

  /** trigger the tabs */
  const triggerTabs = componentFactory({
    polling: [`.${ID}_tab`],
    create: () => {
      const activeTab = document.querySelector(`.${ID}_Payment__option--active`);

      const financeTab = document.querySelector(`.${ID}_finance_tab`);
      const fullAmountTab = document.querySelector(`.${ID}_pay-full`);

      // options
      const financeOption = document.querySelector(`#${ID}_Payment__option--finance`);
      const payInFull = document.querySelector(`#${ID}_Payment__option--standard`);

      // check which tab is active on page loads
      if (activeTab) {
        if (activeTab.id === `${ID}_Payment__option--standard`) {
          fullAmountTab.classList.add(`${ID}_tab-active`);
          financeTab.classList.remove(`${ID}_tab-active`);

          // hide the tab that is not active
          payInFull.classList.add(`${ID}_tab_option-active`);
          financeOption.classList.remove(`${ID}_tab_option-active`);
        } else if (activeTab.id === `${ID}_Payment__option--finance`) {
          fullAmountTab.classList.remove(`${ID}_tab-active`);
          financeTab.classList.add(`${ID}_tab-active`);

          // remove the active class that hides it
          payInFull.classList.remove(`${ID}_tab_option-active`);
          financeOption.classList.add(`${ID}_tab_option-active`);
        }
      }

      // loop through the tabs, when each one clicked, click one of the finance options
      const bothTabs = document.querySelectorAll(`.${ID}_tab`);

      for (let i = 0; i < bothTabs.length; i += 1) {
        bothTabs[i].addEventListener('click', (e) => {
          // remove active from tabs that currently open
          for (let j = 0; j < bothTabs.length; j += 1) {
            bothTabs[j].classList.remove(`${ID}_tab-active`);
          }
          e.currentTarget.classList.add(`${ID}_tab-active`);

          if (e.currentTarget.classList.contains(`${ID}_finance_tab`)) {
            financeOption.click();
           
            financeOption.classList.add(`${ID}_tab_option-active`);
            payInFull.classList.remove(`${ID}_tab_option-active`);
          } else {
            payInFull.click();

            payInFull.classList.add(`${ID}_tab_option-active`);
            financeOption.classList.remove(`${ID}_tab_option-active`);
          }
        });
      }
    },
  });

  /** Delivery and Returns Block */
  const deliveryComponent = componentFactory({
    create: () => {
      const element = document.createElement('div');
      // const isSaturday = new Date().getDay() === 6;
      /* eslint-disable indent */
      element.innerHTML = [
        `<div class="${ID}_Delivery__head ${ID}_sectionHead">`,
          `<h2 class="${ID}_Delivery__head__title">Delivery and Returns Information</h2>`,
          // isSaturday ? '' : '<p>Order before 3pm to dispatch your item <em>today</em></p>',
        '</div>',
        `<div class="${ID}_Delivery__body ${ID}_sectionBody">`,
          `<div class="${ID}_col-6">`,
            '<h3>Delivery</h3>',
            '<p>Your order will arrive in 3 - 6 days (excluding Sundays) between 9am and 5pm. You will be provided with estimated delivery dates for your order in checkout.</p>',
            '<p>Each item has a tracking number available when it is dispatched and will require signing for upon delivery.</p>',
            '<p>If taking out finance please note that the delivery address must be the same as the billing address. It can take up to 48 hours to fully process finance applications and items will not be dispatched until this process is complete. This may affect the delivery date of your item.</p>',
            '<p><a target="_blank" href="/webstore/static/customerservice/customer_deliveryinfo.do">Full Delivery policy</a></p>',
          '</div>',
          `<div class="${ID}_col-6">`,
            '<h3>Returns</h3>',
            '<p>You can return items by post or in store within 30 days for a full refund or exchange (except for pierced jewellery).</p>',
            '<p>If taking out finance, our 30 day returns policy still applies - you can return your items in store or via post.</p>',
            '<p><a target="_blank" href="/refunds/">Full Returns policy</a></p>',
          '</div>',
        '</div>',
      ].join('');
      /* eslint-enable indent */
      return element;
    },
    render: (component) => {
      paymentComponent.component.insertAdjacentElement('afterend', component);
    },
    renderOnCreate: true,
  });

  /** DX logo area */
  const DXLogoComponent = componentFactory({
    create: () => {
      const element = document.createElement('div');
      element.classList.add(`${ID}_DX`);
      element.innerHTML = `<div class="${ID}_DX__logo"><img src="https://ab-test-sandbox.userconversion.com/experiments/EJ007-dx_logo.png"/></div><div class="${ID}_DX__usps"></div>`;

      const usps = [
        'Preferred provider of the UK Government and foreign embassies for identity documents and visas which resulted in 95% reduction in losses for UK Government',
        'Secure, effective delivery - every consignment has a tracking number assigned to it and needs to be signed for',
      ];

      for (let i = 0; i < usps.length; i += 1) {
        const usp = usps[i];
        const uspEl = document.createElement('div');
        uspEl.innerHTML = `<span class="${ID}_img--tick"></span><p>${usp}</p>`;
        element.querySelector(`.${ID}_DX__usps`).appendChild(uspEl);
      }

      return element;
    },
    render: (component) => {
      deliveryComponent.component.insertAdjacentElement('afterend', component);
    },
    renderOnCreate: true,
  });

  /** Finance Ligthbox */
  const financeLightbox = componentFactory({
    polling: [
      `#${ID}_CTA--financeInfo`,
      () => !!window.jQuery,
    ],
    create: () => {
      const element = document.createElement('div');
      element.classList.add(`${ID}_financeLightbox`);
      /* eslint-disable indent */
      const html = [
        `<div class="${ID}_lightbox-overlay"></div>`,
        `<div class="${ID}_lightbox-inner">`,
          `<div class="${ID}_lightbox-exit"></div>`,
          `<div class="${ID}_lightbox-title">Example questions to apply for Finance</div>`,
          `<div class="${ID}_prevSlide"></div>`,
          `<div class="${ID}_lightbox-slide">`,
            `<div class="${ID}_lightbox-image"><img src="https://ab-test-sandbox.userconversion.com/experiments/EJ007-Lightbox_1.png"/></div>`,
            `<div class="${ID}_lightbox-image"><img src="https://ab-test-sandbox.userconversion.com/experiments/EJ007-Lightbox_2.png"/></div>`,
            `<div class="${ID}_lightbox-image"><img src="https://ab-test-sandbox.userconversion.com/experiments/EJ007-Lightbox_3.png"/></div>`,
          '</div>',
          `<div class="${ID}_nextSlide"></div>`,
        '</div>',
      ].join('');
      /* eslint-enable indent */
      element.innerHTML = html;
      return element;
    },
    events: (component) => {
      let slickExists = false;
      const controls = {
        show: () => {
          if (!document.querySelector(`${ID}_financeLightbox`)) {
            financeLightbox.render(component);
          }
          component.classList.add(`${ID}_lightbox_show`);
        },
        hide: () => {
          component.classList.remove(`${ID}_lightbox_show`);
        },
      };

      // Custom arrow events
      const customArrowEvents = () => {
        const prevButton = document.querySelector('.slick-prev.slick-arrow');
        const nextButton = document.querySelector('.slick-next.slick-arrow');
        component.querySelector(`.${ID}_prevSlide`).addEventListener('click', () => {
          prevButton.click();
        });
        component.querySelector(`.${ID}_nextSlide`).addEventListener('click', () => {
          nextButton.click();
        });
      };

      // Close events
      component.querySelector(`.${ID}_lightbox-exit`).addEventListener('click', () => {
        controls.hide();
      });
      component.querySelector(`.${ID}_lightbox-overlay`).addEventListener('click', () => {
        controls.hide();
      });

      // Show events
      const financeInfoBtn = paymentComponent.component.querySelector(`#${ID}_CTA--financeInfo`);
      let blockClicks = false;
      const loadSlick = () => {
        window.jQuery.ajax({
          type: 'GET',
          url: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js',
          dataType: 'script',
          success: () => {
            slickExists = true;
            blockClicks = false;
            controls.show();
            window.jQuery(component.querySelector(`.${ID}_lightbox-slide`)).slick({
              dots: true,
            });
            customArrowEvents();
          },
        });
      };
      financeInfoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (blockClicks) return false;
        if (slickExists) {
          controls.show();
        } else {
          blockClicks = true;
          loadSlick();
        }
        events.send(ID, `Variation ${VARIATION}`, 'See example questions from finance clicked');
      });
    },
    render: (component) => {
      document.body.appendChild(component);
    },
  });

  /** Footer */
  const footerComponent = componentFactory({
    create: () => {
      const footer = cacheDom.get('.site-footer');

      const newFooter = document.createElement('div');
      newFooter.classList.add(`${ID}_footer`);
      newFooter.innerHTML = `
      <div class="${ID}_footer-inner">
        <span class="${ID}_copyright">©Signet Trading Limited 2018. All rights reserved. Ernest Jones and Love & Life are trade marks of Signet or its licensors.</span>
        <span class="${ID}_nortonlogo"></span>
      </div>`;
      footer.insertAdjacentElement('beforebegin', newFooter);
    },
  });
};

export default activate;
