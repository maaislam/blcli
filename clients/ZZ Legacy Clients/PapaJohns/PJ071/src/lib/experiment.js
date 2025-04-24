/**
 * PJ071 - Journey Progress Bar
 * @author User Conversion
 */
import { setup, addTopPaddingToProgressBar, bindOrderMethodClickEvent, generateNavStepsProgress, removeSessionStorageItems, clickCtaBtn } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import settings from './settings';
import stepsData from './steps_data';

const { ID, VARIATION } = settings;

const activate = () => {
  setup();
  // Experiment code
  if (document.querySelector('.mobileHeaderPJ') && document.querySelector('ul.sectionsMenu li')) {
    const navMenuItems = document.querySelectorAll('ul.sectionsMenu li');
    /* --- HOMEPAGE WITHOUT POSTCODE --- */
    if (navMenuItems.length <= 3) {
      if (navMenuItems[0].innerHTML !== '') {

        generateNavStepsProgress();
        // HEADER - Select Store
        if (window.location.href.indexOf('/?selectstore=1') > -1) {
          pollerLite(['#ctl00__objHeader_upStoreSectionMobile', 
          '.splitButtons.wider-buttons-mobile',
          'span.butContainer',
          '#ctl00__objHeader_lbCollectionMobile',
          '#ctl00__objHeader_lbDeliveryMobile'], () => {
            bindOrderMethodClickEvent();
          });
        }
      } else {
        // console.log('[035] Remove   session storage   item');
        removeSessionStorageItems();
        generateNavStepsProgress();

        /* HOMEPAGE */
        if (window.location.pathname === '/') {
          if (document.querySelector('#ctl00_cphBody_pnlPostCodeErrorMobile')) {
            addTopPaddingToProgressBar();
          } else {
            pollerLite(['#ctl00_cphBody_pnlPostCodeErrorMobile'], () => {
              addTopPaddingToProgressBar();
            });
          }
            
          // }
          bindOrderMethodClickEvent();
          
          // HEADER - Select Store
          if (window.location.href.indexOf('/?selectstore=1') > -1) {
            pollerLite(['#ctl00__objHeader_upStoreSectionMobile', 
            '.splitButtons.wider-buttons-mobile',
            'span.butContainer',
            '#ctl00__objHeader_lbCollectionMobile',
            '#ctl00__objHeader_lbDeliveryMobile'], () => {
              bindOrderMethodClickEvent();
            });
          }

        }
      }
      // --- Current Step
      const currentStep = document.querySelector('.PJ071-step__store');
      const currentStepProgress = document.querySelector('ul.PJ071-navStepsProgress .PJ071-step.PJ071-step__store');

      if (currentStep && currentStepProgress) {
        // currentStep.querySelector('.PJ071-icon').classList.add('active');
        if (!sessionStorage.getItem('PJ071-orderMethod')) {
          currentStep.querySelector('.PJ071-text').classList.add('currentStep');
          currentStepProgress.classList.add('active');
        } else if (sessionStorage.getItem('PJ071-orderMethod')) {
          // document.querySelector('li.PJ071-step__store .PJ071-text').classList.remove('currentStep');
          currentStep.querySelector('.PJ071-text').classList.add('success');
          document.querySelector('.PJ071-icon__store').classList.add('success');
          currentStepProgress.classList.add('active');
        }
      }

      // --- If Offer has been selected in previous step
      // --- Activate Offer Step
      if (sessionStorage.getItem('PJ071-offerSelected')) {
        // document.querySelector('li.PJ071-step__store .PJ071-text').classList.remove('currentStep');
        const offerStep = document.querySelector('.PJ071-step__offers')
        offerStep.querySelector('.PJ071-text').classList.add('success');
        offerStep.querySelector('.PJ071-icon').classList.add('success');
        currentStepProgress.classList.add('active');
        document.querySelector('.PJ071-navStepsProgress .PJ071-step.PJ071-step__offers').classList.add('active');
      }

      if (window.location.pathname.indexOf('/offers.aspx') > -1 || window.location.pathname.indexOf('/store-locator.aspx') > -1 || window.location.pathname.indexOf('paparewards') > -1) {
        const storeStepIcon = document.querySelector('.PJ071-step__store .PJ071-icon__store');
        storeStepIcon.classList.add('skipped');
        const stepProgressStore = document.querySelector('.PJ071-navStepsProgress .PJ071-step__store');
        stepProgressStore.classList.remove('active');
        stepProgressStore.classList.add('inactive');
        stepProgressStore.classList.add('skipped');
        pollerLite([ '#ctl00__objHeader_txtPostCodeTownMobile',
        '#ctl00__objHeader_lbCollectionMobile',
        '#ctl00__objHeader_lbDeliveryMobile'], () => {
          const collectionHeaderCta = document.querySelector('#ctl00__objHeader_lbCollectionMobile');
          const deliveryHeaderCta = document.querySelector('#ctl00__objHeader_lbDeliveryMobile');

          clickCtaBtn(collectionHeaderCta);
          clickCtaBtn(deliveryHeaderCta);
        });
      }
      /* --- HOMEPAGE WITH POSTCODE --- */
    } else if (navMenuItems.length > 3) {
      generateNavStepsProgress();
      // --- OFFERS Page
      if (window.location.pathname.indexOf('/offers.aspx') > -1) {
        if (sessionStorage.getItem('PJ071-orderMethod')) {
          const storeLabelContainer = document.querySelector('li.PJ071-step__store');
          const storeLabel = storeLabelContainer.querySelector('.PJ071-text');
          storeLabelContainer.classList.add('orderMethodSelected');
          switch(sessionStorage.getItem('PJ071-orderMethod')) {
            case 'DeliveryMobile':
              storeLabel.innerText = 'Delivery';
              break;
            case 'CollectionMobile':
              storeLabel.innerText = 'Collection';
              break;
          }
        }

        // --- Current Step
        const currentStep = document.querySelector('.PJ071-step__offers');
        const currentStepProgress = document.querySelector('ul.PJ071-navStepsProgress .PJ071-step.PJ071-step__offers');

        if (currentStep && currentStepProgress) {
          if (sessionStorage.getItem('PJ071-offerSelected') !== null) {
            currentStep.querySelector('.PJ071-icon').classList.add('success');
            currentStep.querySelector('.PJ071-text').classList.add('success');
          } else {
            // currentStep.querySelector('.PJ071-icon').classList.add('active');
            currentStep.querySelector('.PJ071-text').classList.add('currentStep');
          }
          
          currentStepProgress.classList.add('active');
        }
        // --- Previous Steps
        const completedStep = document.querySelector('.PJ071-step__store');
        const completedStepProgress = document.querySelector('ul.PJ071-navStepsProgress .PJ071-step.PJ071-step__store');

        if (completedStep && completedStepProgress) {
          completedStep.querySelector('.PJ071-icon').classList.add('success');
          completedStep.querySelector('.PJ071-text').classList.add('success');

          completedStepProgress.classList.add('active');
        }

        /**
         * @desc Bind Click Events on offers
         * Store sessionStorage item if user has selected offer
         */
        const allOffers = document.querySelectorAll('.offer-m');
        [].forEach.call(allOffers, (offer) => {
          const cta = offer.querySelector('.actionButton');
          if (cta) {
            cta.addEventListener('click', () => {
              sessionStorage.setItem('PJ071-offerSelected', true);
              const offerStep = document.querySelector('.PJ071-icon.PJ071-icon__offers');
              offerStep.classList.remove('active');
              offerStep.classList.add('success');
            });
            
          }
        });

        // /**
        //  * @desc When deal builder is open
        //  * if user clicks on close then remove offerSelected from sessionStorage
        //  */
        // pollerLite([ '.aside-pick-deal span.close'], () => {
        //   console.log(document.querySelector('.aside-pick-deal span.close'));
        //   const closeDealBuilder = document.querySelector('.aside-pick-deal span.close');
        //   closeDealBuilder.addEventListener('click', () => {
        //     sessionStorage.removeItem('PJ071-offerSelected');
        //     const offerStep = document.querySelector('.PJ071-icon.PJ071-icon__offers');
        //     offerStep.classList.add('active');
        //     offerStep.classList.remove('success');
        //   });
        // });

      } else if (window.location.pathname.indexOf('/pizzas.aspx') > -1
        || window.location.pathname.indexOf('/sides.aspx') > -1
        || window.location.pathname.indexOf('/drinks.aspx') > -1
        || window.location.pathname.indexOf('/desserts.aspx') > -1
        || window.location.pathname.indexOf('/vegan.aspx') > -1) {
        
        // --- Current Step
        const currentStep = document.querySelector('.PJ071-step__menu');
        const currentStepProgress = document.querySelector('ul.PJ071-navStepsProgress .PJ071-step.PJ071-step__menu');

        if (currentStep && currentStepProgress) {
          // currentStep.querySelector('.PJ071-icon').classList.add('active');
          currentStep.querySelector('.PJ071-text').classList.add('currentStep');
          currentStepProgress.classList.add('active');
        }

        // --- Previous Steps
        const completedStep1 = document.querySelector('.PJ071-step__store');
        const completedStepProgress1 = document.querySelector('ul.PJ071-navStepsProgress .PJ071-step.PJ071-step__store');

        const completedStep2 = document.querySelector('.PJ071-step__offers');
        const completedStepProgress2 = document.querySelector('ul.PJ071-navStepsProgress .PJ071-step.PJ071-step__offers');

        if (completedStep1 && completedStepProgress1) {
          completedStep1.querySelector('.PJ071-icon').classList.add('success');
          completedStep1.querySelector('.PJ071-text').classList.add('success');

          completedStepProgress1.classList.add('active');

          if (sessionStorage.getItem('PJ071-offerSelected') === null) {
            completedStep2.querySelector('.PJ071-icon').classList.add('skipped');
            // completedStep2.querySelector('.PJ071-text').classList.add('success');

            completedStepProgress2.classList.add('skipped');
          } else {
            completedStep2.querySelector('.PJ071-icon').classList.add('success');
            completedStep2.querySelector('.PJ071-text').classList.add('success');

            completedStepProgress2.classList.add('active');
          }
        }
      } else if (window.location.pathname.indexOf('/basket-confirmation.aspx') > -1) {
        // --- Current Step
        const currentStep = document.querySelector('.PJ071-step__basket');
        const currentStepProgress = document.querySelector('ul.PJ071-navStepsProgress .PJ071-step.PJ071-step__basket');

        if (currentStep && currentStepProgress) {
          // currentStep.querySelector('.PJ071-icon').classList.add('active');
          currentStep.querySelector('.PJ071-text').classList.add('currentStep');
          currentStepProgress.classList.add('active');
        }
        // --- Previous Steps
        const completedStep1 = document.querySelector('.PJ071-step__store');
        const completedStepProgress1 = document.querySelector('ul.PJ071-navStepsProgress .PJ071-step.PJ071-step__store');

        const completedStep2 = document.querySelector('.PJ071-step__offers');
        const completedStepProgress2 = document.querySelector('ul.PJ071-navStepsProgress .PJ071-step.PJ071-step__offers');

        const completedStep3 = document.querySelector('.PJ071-step__menu');
        const completedStepProgress3 = document.querySelector('ul.PJ071-navStepsProgress .PJ071-step.PJ071-step__menu');

        if (completedStep1 && completedStepProgress1) {
          completedStep1.querySelector('.PJ071-icon').classList.add('success');
          completedStep1.querySelector('.PJ071-text').classList.add('success');

          completedStepProgress1.classList.add('active');

          if (sessionStorage.getItem('PJ071-offerSelected') === null) {
            completedStep2.querySelector('.PJ071-icon').classList.add('skipped');
            // completedStep2.querySelector('.PJ071-text').classList.add('success');

            completedStepProgress2.classList.add('skipped');
          } else {
            completedStep2.querySelector('.PJ071-icon').classList.add('success');
            // completedStep2.querySelector('.PJ071-text').classList.add('success');

            completedStepProgress2.classList.add('active');

            const offerStep = document.querySelector('.PJ071-icon.PJ071-icon__offers');
            offerStep.classList.remove('active');
            offerStep.classList.add('success');
          }

          completedStep3.querySelector('.PJ071-icon').classList.add('success');
          completedStep3.querySelector('.PJ071-text').classList.add('success');

          completedStepProgress3.classList.add('active');
        }

        // --- Move Progress Bar to right position
        pollerLite([ '#ctl00_cphBody_upUpsell',
        '.upsell-mobile', 
        '.upsell-mobile .inlineProducts',
        '.upsell-mobile .inlineProducts .product',
        '.upsell-mobile .inlineProducts .product .productinfo',
        '.upsell-mobile .inlineProducts .product .productinfo .m-checkout-buttons'], () => {
          const progressBarEl = document.querySelector('.PJ071-navSteps__wrapper');
          setTimeout(function(){ 
            document.querySelector('.main').insertAdjacentElement('afterbegin', progressBarEl);
            progressBarEl.setAttribute('style', 'display: block;');
          }, 2000);
        });
        
      } else if (window.location.href.indexOf('/?selectstore=1') > -1) {
        pollerLite(['#ctl00__objHeader_upStoreSectionMobile', 
        '.splitButtons.wider-buttons-mobile',
        'span.butContainer',
        '#ctl00__objHeader_lbCollectionMobile',
        '#ctl00__objHeader_lbDeliveryMobile'], () => {
          bindOrderMethodClickEvent();
        });
      } 
    }
  }
  

  if (window.location.pathname.indexOf('/dealbuilder.aspx') > -1) {
    /**
     * @desc When deal builder is open
     * if user clicks on close then remove offerSelected from sessionStorage
     */
    pollerLite([ '.aside-pick-deal span.close'], () => {
      const closeDealBuilder = document.querySelector('.aside-pick-deal span.close');
      closeDealBuilder.addEventListener('click', () => {
        if (sessionStorage.getItem('PJ071-offerSelected') !== null) {
          sessionStorage.removeItem('PJ071-offerSelected');
        }
      });
    });
  }


  // -------------------------------------------
  // PRM Manager Listen for State Changes
  // -------------------------------------------
  window.prm.add_endRequest(function (sender, error) {
    try {
      // console.log(sender);
      if (sender['_postBackSettings'].asyncTarget === "ctl00$cphBody$lbDeliveryMobile" 
        || sender['_postBackSettings'].asyncTarget === "ctl00$cphBody$lbCollectionMobile"
        || sender['_postBackSettings'].asyncTarget.indexOf("_objMenuProduct$lbAddToBasket")) {
        activate();
      } else if (sender['_postBackSettings'].asyncTarget === "ctl00$_objHeader$lbSelectStoreMenuItem") {
        activate();
        pollerLite(['#ctl00__objHeader_spnDefaultButtons', 
        '#ctl00__objHeader_lbChangeStoreMobile',
        '#ctl00__objHeader_hypContinueOrdering'], () => {
          const changeStoreBtn = document.querySelector('#ctl00__objHeader_lbChangeStoreMobile');
          changeStoreBtn.addEventListener('click', () => {
          });
          
        });
      } 
      if (sender['_postBackSettings'].asyncTarget === "ctl00$_objHeader$lbBasketItem") {
        pollerLite(['#fancyBasketMobile a.close'], () => {
          const closeBasketItemsBtn = document.querySelector('#fancyBasketMobile a.close');
          const backBtn = document.querySelector('#ctl00__objHeader_divMobileBasketButtons .plainClose');
          // --- Move Progress Bar to right position
          closeBasketItemsBtn.addEventListener('click', () => {
            activate();
            const progressBarEl = document.querySelector('.PJ071-navSteps__wrapper');
            document.querySelector('.main').insertAdjacentElement('afterbegin', progressBarEl);
          });

          backBtn.addEventListener('click', () => {
            activate();
            const progressBarEl = document.querySelector('.PJ071-navSteps__wrapper');
            document.querySelector('.main').insertAdjacentElement('afterbegin', progressBarEl);
          });
          
        });
      }
    } catch (e) {} 
  });
};

export default activate;
