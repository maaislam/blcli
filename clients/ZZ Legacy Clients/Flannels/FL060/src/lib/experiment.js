/**
 * FL060 - Delivery Test
 * @author User Conversion
 */
import { setup } from './services';
import settings from './settings';
import { cacheDom } from '../../../../../lib/cache-dom';
import { pollerLite } from '../../../../../lib/uc-lib';
import { observer } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';
import { changeTitle, addHTML, createFeatureList, storeChosenOption } from './helpers/adjustments';
import { timeRemaining } from './helpers/timeRemaining';
import { FL068 } from './tests/FL068';

events.analyticsReference = '_gaUAT';

const activate = () => {
  setup();

  if (settings.VARIATION === '2') {
    events.send(settings.ID, 'FL060 Control', 'Control is active');
    return false;
  }

  events.send(settings.ID, 'FL060 Variation 1 Active', 'Test is active');

  // Experiment code
  const els = {
    container: cacheDom.get('.Delivery.leftWrap'),
    title: cacheDom.get('.Delivery.leftWrap > h1'),
    shippingGroupCont: cacheDom.get('.shippingServiceGroupType'),
    deliveryTitles: cacheDom.getAll('.DeliveryOptions .DeliveryNaming span.deliveryHead'),
    locationHead: cacheDom.getAll('.DeliveryOptions .DeliveryNaming span.locationHead'),
    countryList: cacheDom.get('.DeliveryOptions .DeliveryNaming'),
    freeVoucher: cacheDom.get('.deliveryGroup_StoreDelivery .DeliveryNaming'),
    deliveryOptions: cacheDom.getAll('.DeliveryOptions li.deliveryGroupTypeLi'),
    changeLinks: cacheDom.getAll('.deliveryWrapper .changeDeliveryLink a'),
    billingChangeLink: cacheDom.get('.CheckWrap #DeliveryAddressForm2Wrapper .billGroup'),
    // Second delivery page elements
    standardDelivery: cacheDom.get('.DeliveryOptionsItem_STD .DeliveryNaming'),
    nextDayDelivery: cacheDom.get('.DeliveryOptionsItem_NDD .DeliveryNaming'),
    expressDelivery: cacheDom.get('.DeliveryOptionsItem_INA .DeliveryNaming'),
    homeDeliveryTitle: cacheDom.getAll('.changeDeliveryWrap .innerDelWrap'),
    deliveryAddress: cacheDom.get('.homeDelWrap .CurrentAddressWrapper'),
    differentAddressLinks: cacheDom.getAll('.DifferentAddressLinkWrapper a'),
    formWrap: cacheDom.get('#DeliveryAddressForm2Wrapper'),
    icons: cacheDom.getAll('.innerDeliSection .hidden-xs'),
    shippingGroup: cacheDom.get('#DeliveryOptionsWrapper .homeDelWrap .DeliveryOptions'),
    shippingGroupOptions: cacheDom.getAll('.homeDelWrap .DeliveryOptions .DeliveryOptionsItem'),
    homeDelRadioBtns: cacheDom.getAll('.DeliveryOptions .DeliveryOptionsItem .SelectIt .RadioBut'),
  }

  // Get remaining time before next day delivery ends.
  let timeLeft = timeRemaining();
  if (typeof timeLeft === 'undefined') {
    timeLeft = '';
  }

  // Get from delivery price
  let firstShippingOption;
  if (els.shippingGroup) {
    firstShippingOption = els.shippingGroup.querySelector('ul > li:first-of-type input');
  }
  let price = '6.99'; // UK Default
  if (firstShippingOption) {
    price = firstShippingOption.getAttribute('data-price');
  }

  // The first page with the three options
  const initialPage = () => {

    // Add 'Please choose...' message
    if (els.shippingGroupCont) {
      els.shippingGroupCont.insertAdjacentHTML('afterbegin', `
        <p class="FL060-pleaseSelect"><strong>Please select one of the following</strong></p>
      `)
    }

    // If landing here from the Change link on the billing address row, proceed to next page.
    if (window.localStorage.getItem('FL060-changedBilling')) {
      const firstOption = document.querySelector('.DeliveryOptions .deliveryGroupTypeLi .innerDeliSection');
      if (firstOption) {
        firstOption.click();
        window.localStorage.removeItem('FL060-changedBilling');
      }
    }

    // Change Titles
    changeTitle(els.deliveryTitles[0], 'Home / Work Delivery');
    // Change Subtitles
    addHTML(els.locationHead[0], `<span class="locationHead"> from £${price}</span>`, true, 'beforeend');
    addHTML(els.locationHead[1], `<span class="locationHead">Delivery to one of our 32 stores across UK<span> <span class="locationHead">from £${price}</span>`, false, 'beforeend');
    addHTML(els.locationHead[2], `<span class="locationHead">Collect from a locker / shop (UK or Europe only)<span> <span class="locationHead">from £${price}</span>`, false, 'beforeend');

    // Create feature lists
    let homeFeatures;
    if (timeLeft) {
      homeFeatures = createFeatureList([
        `${timeLeft}`,
        'Receive a 1 hour delivery window on the day of delivery via text',
        'Options to leave with a neighbour or in a safe place if you aren\’t home',
        'Your delivery will be automatically rearranged for another time if you miss it',
        'Option to divert your package while it\’s en-route',
      ]);
    } else {
      homeFeatures = createFeatureList([
        'Receive a 1 hour delivery window on the day of delivery via text',
        'Options to leave with a neighbour or in a safe place if you aren\’t home',
        'Your delivery will be automatically rearranged for another time if you miss it',
        'Option to divert your package while it\’s en-route',
      ]);
    }
    const storeFeature = createFeatureList(['FREE £10 voucher to spend in store on next purchase']);

    // Add feature lists
    addHTML(els.countryList, homeFeatures.outerHTML, true, 'afterend');
    addHTML(els.freeVoucher, storeFeature.outerHTML, true, 'afterend');

    // Remove hidden-xs class from icons for mobile
    if (els.icons) {
      for (let i = 0; els.icons.length > i; i += 1) {
        els.icons[i].classList.remove('hidden-xs');
        if (els.icons[i].nextElementSibling && els.icons[i].nextElementSibling.classList.contains('DeliveryNaming')) {
          els.icons[i].nextElementSibling.classList.remove('col-xs-10');
          els.icons[i].nextElementSibling.classList.add('col-xs-8');
        }
      }
    }
  };
  

  // This is refering to the page with the delivery methods (standard, next day..)
  const secondPage = () => {

    // Run FL068 if it's not applied already (currently is at 100%)
    if (!document.body.classList.contains('FL068')) {
      FL068();
    }

    const termsConditionsLink = document.querySelectorAll('.MessageGroupB.GoodsSupplyTermsAndConditions .EtailTermsText');
    // For some reason there are 3.
    if (termsConditionsLink) {
      for (let i = 0; termsConditionsLink.length > i; i += 1) {
        addHTML(termsConditionsLink[i], `
          <div class="FL060-tcTooltip">
            <span class="FL060-tcIcon">i</span>
            <div class="FL060-info">
              <p>These are the terms and conditions of Wareshop2 Limited ("Sports Direct"), which is the company that sells goods to Customers on the Website. If you access the Website, and/or place an order for goods, you agree to be bound by these terms and conditions.</p>
            </div>
          </div>
        `, true, 'beforeend');

        // Add moouseover / touch
      }
    }

    // Add Selected Choice 
    const homeDeliveryTitleLength = els.homeDeliveryTitle.length;
    if (localStorage.getItem('FL060-option')) {
      for (let i = 0; homeDeliveryTitleLength > i; i += 1) {
        addHTML(els.homeDeliveryTitle[i], localStorage.getItem('FL060-option'), true);
      }
    } else {
      for (let i = 0; homeDeliveryTitleLength > i; i += 1) {
        addHTML(els.homeDeliveryTitle[i], `
          <div class="FL060-chosenOption">
            <p>Home / Work Delivery</p>
            <p><span>from £6.99</span></p>
  
            <span class="FL060-tick FL060-tickActive"></span>
          </div>
        `, true);
      }
    }
    

    /**
     * If different billing address was selected, show one message, else duplicate address.
     * 
     * !!!! IMPORTANT !!!! Will need to check other delivery edge cases. The below is for a basic home delivery journey.
     */



    if (els.deliveryAddress) {
      const addressInfo = els.deliveryAddress.querySelector('.col-xs-12');
      const addressInfoDupe = addressInfo.cloneNode(true);
      const dupdeTitle = addressInfoDupe.querySelector('.CurrentAddressLabel');
      const dupeInnerDeli = addressInfoDupe.querySelector('.innerDelWrap');
      addressInfoDupe.classList.add('FL060-billingAddress');

      // Add tick
      // dupeInnerDeli.insertAdjacentHTML('beforeend', '<span class="FL060-tick FL060-tickActive"></span>');

      // Change title to 'Billing Address'
      if (dupdeTitle) {
        dupdeTitle.textContent = 'Billing Address:';
      }

      // Remove it if already exists incase not up to date.
      if (document.querySelector('.FL060-billingAddress')) {
        const elToRemove = document.querySelector('.FL060-billingAddress');
        if (elToRemove) {
          elToRemove.parentNode.removeChild(elToRemove);
        }
      }

      // If NOT unchecked different billing, show same delivery address.
      if (!localStorage.getItem('FL060-differentAdd')) {
        addHTML(els.deliveryAddress, addressInfoDupe.outerHTML ,true);

        // Else, clear and show the mesage.
      } else if (localStorage.getItem('FL060-differentAdd')) {
        const dupedDeliverAdd = addressInfoDupe.querySelector('.CurrentAddressText > span');

        if (dupedDeliverAdd) {
          dupedDeliverAdd.innerHTML = '';
          dupedDeliverAdd.insertAdjacentHTML('beforeend', '<p class="FL060-addedBilling">You can edit your billing address after the payment options</p>');
        }

        addHTML(els.deliveryAddress, addressInfoDupe.outerHTML ,true);
      }
    }

    // Add WHen do you want it title
    if (!document.querySelector('h1.FL060-quickTitle')) {
      addHTML(els.shippingGroup, '<h1 class="FL060-quickTitle" id="dnn_ctr102498_Delivery_Header">How Quick Do You Want It?</h1>', true, 'afterbegin');
    }

    // Pull and add prices from each option
    if (els.shippingGroupOptions) {
      let currentPrice = 0;
      for (let i = 0; els.shippingGroupOptions.length > i; i += 1) {
        const input = els.shippingGroupOptions[i].querySelector('input');
        if (input) {
          const thisPrice = input.getAttribute('data-price');

          const ref = els.shippingGroupOptions[i].querySelector('.DeliveryNaming');

          if (ref && thisPrice) {
            if (i === 0) {
              currentPrice = parseFloat(thisPrice).toFixed(2);
              if (!ref.querySelector('p.FL060-fromPrice')) {
                addHTML(ref, `<p class="FL060-fromPrice">from £${thisPrice}</p>` ,true);
              }
            } else {
              const priceDiff = parseFloat(currentPrice - thisPrice);
              if (!ref.querySelector('p.FL060-fromPrice')) {
                addHTML(ref, `<p class="FL060-fromPrice">+ £${priceDiff.toString(10).replace('-', '')}</p>` ,true);
              }
            }
          }
          
        }
      }
    }

    // Generate feature lists
    const standardFeatures = createFeatureList([
      'Receive a 1 hour delivery window on the day of delivery via text',
      'Options to leave with a neighbour or in a safe place if you aren’t home',
      'Your delivery will be automatically rearranged for another time if you miss it',
      'Option to divert your package while it’s en-route',
    ]);
    
    const nextDayFeatures = timeLeft ? createFeatureList([`${timeLeft}`]) : '';

    // Add Feature lists
    addHTML(els.standardDelivery, standardFeatures.outerHTML ,true, 'afterend');
    addHTML(els.nextDayDelivery, nextDayFeatures.outerHTML ,true, 'afterend');
    
    // Change class of radio buttons for ticks.
    if (els.homeDelRadioBtns) {
      for (let i = 0; els.homeDelRadioBtns.length > i; i += 1) {
        els.homeDelRadioBtns[i].classList.remove('RadioBut');
        els.homeDelRadioBtns[i].classList.add('FL060-tick');
      }
    }

    // Check if option is selected, when landing from the first address form input 
    // No ticks will show.
    const addressBoxes = document.querySelectorAll('.homeDelWrap .CurrentAddressWrapper .innerDelWrap');
    if (addressBoxes) {
      for (let i = 0; addressBoxes.length > i; i += 1) {
        if (!addressBoxes[i].querySelector('.FL060-chosenOption')) {
          addHTML(addressBoxes[i], `
            <div class="FL060-chosenOption">
              <span class="FL060-tick FL060-tickActive"></span>
            </div>
          `, true, 'beforeend');
        }
      }
    }


    // If user is logged in, remove the option to 'Change' the billing address.
    const { visitorLoginState } = window.dataLayer[1];
    if (visitorLoginState && visitorLoginState === 'logged+in') {
      document.body.classList.add('FL060-loggedIn');
    }


    // If user clicks the 'Change'
    const billingChangeLink = document.querySelector('.FL060-billingAddress .DifferentAddressLinkWrapper > a');
    if (billingChangeLink) {
      billingChangeLink.addEventListener('click', () => {
        window.localStorage.setItem('FL060-changedBilling', 'true');
      });
    }

  };

  // Trigger them.
  if (window.location.href.indexOf('deliverychoices') > -1 ){
    pollerLite([
      '.DeliveryOptions .DeliveryNaming span.deliveryHead',
    ], initialPage);
    secondPage();
  }


  // Move the continue button higher on /yourdetails
  if (window.location.href.indexOf('yourdetails') > -1 && window.innerWidth < 479) {
    const contBtn = document.querySelector('.ProgressButContain');
    const detailsRef = document.querySelector('.CheckoutLeft');
    if (contBtn && detailsRef) {
      detailsRef.insertAdjacentHTML('afterbegin', contBtn.outerHTML);
      contBtn.parentNode.removeChild(contBtn);
    }
  }

  // Run the click events
  const clickEvents = (() => {
    // Attach click events to all delivery options
    if (els.deliveryOptions) {
      for (let i = 0; els.deliveryOptions.length > i; i += 1) {
        els.deliveryOptions[i].addEventListener('click', (e) => storeChosenOption(e));
      }
    }

    // Attach click events to the change link to remove added option
    if (els.changeLinks) {
      for (let i = 0; els.changeLinks.length > i; i += 1) {
        els.changeLinks[i].addEventListener('click', () => {
          // Check for added HTML
          const chosenOption = document.querySelector('.FL060-chosenOption');
          if (chosenOption) {
            chosenOption.parentNode.removeChild(chosenOption);
          }
        });
      }
    }

    // Billing address click event to show message
    if (window.location.href === 'https://www.flannels.com/checkout/yourdetails') {
      els.billingChangeLink = document.querySelector('.CheckWrap #UseAsBillingAddressWrapper');
    }
    if (els.billingChangeLink) {
      els.billingChangeLink.addEventListener('click', () => {
        localStorage.setItem('FL060-differentAdd', 'true');
        if (!document.querySelector('.FL060-billingMessage')) {
          addHTML(els.billingChangeLink, '<p class="FL060-billingMessage">You can add a new billing address after the payment options screen</p>', true)
        }
      });
    }

    // Different address link, reset LS
    if (els.differentAddressLinks) {
      for (let i = 0; els.differentAddressLinks.length > i; i += 1) {
        els.differentAddressLinks[i].addEventListener('click', () => {
          localStorage.removeItem('FL060-differentAdd');
        });
      }
    }

    // Click events for delivery methods, e.g. STD, next day.
    if (els.shippingGroupOptions) {
      const len = els.shippingGroupOptions.length;
      const scrollToEl = document.querySelector('#DeliveryOptionsWrapper .ProgressButContain .AddressContainBut.DeliveryContinueButton');
      for (let i = 0; len > i; i += 1) {
        els.shippingGroupOptions[i].addEventListener('click', () => {
          if (scrollToEl) {
            scrollToEl.scrollIntoView({behavior: 'smooth', block: 'start'});
          }
          
          // console.log(e.currentTarget);
          const thisTick = els.shippingGroupOptions[i].querySelector('.FL060-tick');
          if (thisTick) {
            thisTick.classList.add('FL060-tickActive');
          }

        });
      }
    }
  })();
};

export default activate;
