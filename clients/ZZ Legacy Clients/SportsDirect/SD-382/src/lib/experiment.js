/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { events, logMessage } from '../../../../../lib/utils';

// Force set analytics reference
events.analyticsReference = '_gaUAT';
const { ID, VARIATION } = shared;

export default () => {
    setup();

    logMessage(ID + ' Variation: ' + VARIATION);

    fireEvent('Conditions Met');

    // -----------------------------
    // Add events that apply to both variant and control
    // -----------------------------
    // ...
    const inputSearchField = document.querySelector('input#MobtxtSearch');
    inputSearchField.addEventListener('input', (e) => {
        let inputFieldMessage = `input Field-${e.target.value}`;
        logMessage(inputFieldMessage);
        fireEvent(inputFieldMessage);
    });

    inputSearchField.addEventListener('focus', (e) => {
        let focusFieldMessage = `focus Field-${e.target.value}`;
        logMessage(focusFieldMessage);
        fireEvent(focusFieldMessage);
    });

    // -----------------------------
    // If control, bail out from here
    // -----------------------------
    if (shared.VARIATION == 'control') {
        return;
    }

    // Write experiment code here
    // ...
    const bodyWrap = document.querySelector('#BodyWrap').classList.add(`${ID}-BodyWrap`);

    const optionModal = document.querySelector('#ui-id-2');
    optionModal.classList.add(`${ID}-optionModal`);

    const createMarginTop = document.querySelector('.mp-scroller-inner .HeaderTopSpacer').nextElementSibling;
    if (createMarginTop == document.querySelector('#main-content.container-fluid')) {
        createMarginTop.classList.add('createMarginTop');
    } else {
        setTimeout(() => {
            createMarginTop.classList.add('createMarginTop');
        }, 500);
    }

    const searchField = document.querySelector('input[id="MobtxtSearch"]');
    searchField.setAttribute('placeholder', 'Search sports, brands or products');
    let visibleMessage = 'Visible - change made to search input to make it sticky';
    logMessage(visibleMessage);
    fireEvent(visibleMessage);
    // var lastScrollTop = 100;
    // window.addEventListener(
    //   'scroll',
    //   function () {
    //     var st = window.pageYOffset || document.documentElement.scrollTop;
    //     if (st > lastScrollTop) {
    //       // downscroll code
    //       document
    //         .querySelector(`.${ID}-BodyWrap .promotionBanner .swiper-container-promotionBanner`)
    //         .classList.add('disablePromotionBanner');
    //       document.querySelector(`.${ID}-BodyWrap #HeaderGroup`).classList.add('headerSection');
    //       document.querySelector('#TopPaginationWrapper .paginationWrapper') &&
    //         document.querySelector('#TopPaginationWrapper .paginationWrapper').classList.remove('paginationWrapperSection');
    //       document.querySelector('.SD-382-BodyWrap #mobTabNav #running .panel-heading.categoryTitle') &&
    //         document
    //           .querySelector('.SD-382-BodyWrap #mobTabNav #running .panel-heading.categoryTitle')
    //           .classList.remove('panel-heading-sticky');
    //       optionModal && optionModal.classList.add(`${ID}-downOptionModal`);
    //       document.querySelector(`.${ID}-BodyWrap #divMobSearch`).classList.add('searchSticky');
    //     } else {
    //       // upscroll code
    //       document
    //         .querySelector(`.${ID}-BodyWrap .promotionBanner .swiper-container-promotionBanner`)
    //         .classList.remove('disablePromotionBanner');
    //       document.querySelector(`.${ID}-BodyWrap #HeaderGroup`).classList.remove('headerSection');
    //       document.querySelector('#TopPaginationWrapper .paginationWrapper') &&
    //         document.querySelector('#TopPaginationWrapper .paginationWrapper').classList.add('paginationWrapperSection');
    //       document.querySelector('.SD-382-BodyWrap #mobTabNav #running .panel-heading.categoryTitle') &&
    //         document
    //           .querySelector('.SD-382-BodyWrap #mobTabNav #running .panel-heading.categoryTitle')
    //           .classList.add('panel-heading-sticky');
    //       optionModal && optionModal.classList.remove(`${ID}-downOptionModal`);
    //       document.querySelector(`.${ID}-BodyWrap #divMobSearch`).classList.remove('searchSticky');
    //     }
    //     lastScrollTop = st <= 0 ? 0 : st;
    //   },
    //   false
    // );

    var prevScrollpos = document.querySelector('.SDHOME_1 .sdHomepageTopContain').offsetTop;
    window.onscroll = function() {
        var currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
            //document.getElementById("navbar").style.top = "0";

            //console.log('scroll up');
            // document
            //   .querySelector(`.${ID}-BodyWrap .promotionBanner .swiper-container-promotionBanner`)
            //   .classList.remove('disablePromotionBanner');
            document.querySelector(`.${ID}-BodyWrap #HeaderGroup`).classList.remove('headerSection');
            document.querySelector('#TopPaginationWrapper .paginationWrapper') &&
                document.querySelector('#TopPaginationWrapper .paginationWrapper').classList.add('paginationWrapperSection');
            document.querySelector('.SD-382-BodyWrap #mobTabNav #running .panel-heading.categoryTitle') &&
                document
                .querySelector('.SD-382-BodyWrap #mobTabNav #running .panel-heading.categoryTitle')
                .classList.add('panel-heading-sticky');
            optionModal && optionModal.classList.remove(`${ID}-downOptionModal`);
            document.querySelector(`.${ID}-BodyWrap #divMobSearch`).classList.remove('searchSticky');
        } else {
            //document.getElementById("navbar").style.top = "-50px";
            //console.log('scroll down');
            // document
            //     .querySelector(`.${ID}-BodyWrap .promotionBanner .swiper-container-promotionBanner`)
            //     .classList.add('disablePromotionBanner');
            document.querySelector(`.${ID}-BodyWrap #HeaderGroup`).classList.add('headerSection');
            document.querySelector('#TopPaginationWrapper .paginationWrapper') &&
                document.querySelector('#TopPaginationWrapper .paginationWrapper').classList.remove('paginationWrapperSection');
            document.querySelector('.SD-382-BodyWrap #mobTabNav #running .panel-heading.categoryTitle') &&
                document
                .querySelector('.SD-382-BodyWrap #mobTabNav #running .panel-heading.categoryTitle')
                .classList.remove('panel-heading-sticky');
            optionModal && optionModal.classList.add(`${ID}-downOptionModal`);
            document.querySelector(`.${ID}-BodyWrap #divMobSearch`).classList.add('searchSticky');
        }
        prevScrollpos = currentScrollPos;
    };
};