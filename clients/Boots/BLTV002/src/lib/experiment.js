import { setup, bootsEvents, fireBootsEvent } from '../../../../../core-files/services';
import { pollerLite } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';
import eventTypes from './eventTypes';
import actionTypes from './actionTypes';
import advantageCardWrapper from './components/advantageCardWrapper';
import { advantageCard } from './assets/icons';
import pointsWrapper from './components/pointsWrapper';
import cardWithPoints from './components/cardWithPoints';
import { calculatePoints, extractNumber } from './helpers/utils';

const { ID, VARIATION } = shared;

const isMobile = () => window.matchMedia('(max-width: 767px)').matches;

const init = () => {
  if (window.location.pathname === '/') {
    const eventText = VARIATION == 'control' ? 'would have' : 'has';

    fireBootsEvent(`User ${eventText} seen Homepage`, true, eventTypes.experience_action, {
      action: actionTypes.view,
      action_detail: `User ${eventText} seen Homepage`,
    });
  }

  const targetElement = isMobile() ? document.body : document.querySelector('#adcardQuickLinkGuestContainer');
  if (window.userObj.isLoggedIn === 'true') document.body.classList.add(`${ID}__loggedIn`);

  if (window.userStatus === 'account-view') document.body.classList.add(`${ID}__accountView`);

  const adCardQuickLinkDesktopElem = document.querySelector('#adcardQuickLinkGuest');
  const adCardQuickLinkDesktopElem2 = document.querySelector('#adcardQuickLink');
  const adCardQuickLinkMobileElem = document.querySelector('#mobileLink_locator.mobileOnly');

  if (!document.querySelector(`.${ID}__advantageCardWrapper`)) {
    if (VARIATION == 'control') {
      return;
    }

    targetElement.insertAdjacentHTML('beforeend', advantageCardWrapper(ID));
    document.body.insertAdjacentHTML('afterbegin', `<span class="${ID}__advantageIcon-afterBody">${advantageCard}</span>`);

    if (!isMobile()) {
      window.userObj.isLoggedIn === 'false' && adCardQuickLinkDesktopElem.classList.add(`${ID}__adCardQuickLink`);
      adCardQuickLinkDesktopElem.insertAdjacentHTML('afterbegin', `<span class="${ID}__advantageIcon">${advantageCard}</span>`);
      adCardQuickLinkDesktopElem2.insertAdjacentHTML('afterbegin', `<span class="${ID}__advantageIcon">${advantageCard}</span>`);
    } else if (isMobile()) {
      window.userObj.isLoggedIn === 'false' && adCardQuickLinkMobileElem.classList.add(`${ID}__adCardQuickLink`);
      adCardQuickLinkMobileElem.insertAdjacentHTML('afterbegin', `<span class="${ID}__advantageIcon">${advantageCard}</span>`);
    }

    if (window.userStatus === 'adcard-view') {
      const POINTSRENDERDELAY = 1500;

      setTimeout(() => {
        const adcardPointsSectionElem = document.querySelector('#adcardPointsSection');

        const worthPrice = adcardPointsSectionElem?.textContent;

        const priceInNumber = extractNumber(worthPrice);

        const points = calculatePoints(priceInNumber);
        const pointText = `(${points} ${points === 0 ? 'point' : 'points'})`;
        const moneyTextElem = document.querySelector(`.${ID}__accountWrapper .${ID}__money`);
        const pointTextElem = document.querySelector(`.${ID}__accountWrapper .${ID}__points`);
        moneyTextElem.textContent = `${worthPrice} worth of points*`;
        pointTextElem.textContent = pointText;
      }, POINTSRENDERDELAY);
    }
  }

  // hamburger for logged in users
  if (isMobile() && window.userObj.isLoggedIn === 'true') {
    if (VARIATION == 'control') {
      return;
    }
    pollerLite(['#adcardQuickLinkContainer'], () => {
      const shopPriceHtml = `<li id="adcardQuickLinkContainer" class="adcard addCardBorder quickLinkmargRht burgerTop" style="display: block;"> 
        <a class='${ID}__shopPriceAdvantage' style="display: block;" href="https://www.boots.com/sitesearch?searchTerm=price+advantage" tabindex="6"> 
          <span >Shop Price Advantage</span>
        </a>
      </li>`;

      const advantageCardHTML = `<li id="adcardQuickLink" class="adcard addCardBorder quickLinkmargRht burgerTop" style="display: block;"> 
        <a class='${ID}__shopPriceAdvantage' style="display: block;" href="https://www.boots.com/MyAdvantageCardHomeView?catalogId=28501&storeId=11352&langId=-1" tabindex="6"> 
          <span>Advantage Card Account</span>
          ${window.userStatus !== 'logged-out' ? cardWithPoints(ID) : ''}
        </a>
      </li>`;

      const adCardQuickLinkElem = document.querySelector('#adcardQuickLinkContainer');
      adCardQuickLinkElem.insertAdjacentHTML('afterend', shopPriceHtml);
      adCardQuickLinkElem.insertAdjacentHTML('afterend', advantageCardHTML);
      adCardQuickLinkElem.classList.add(`${ID}__hide`);
    });
  }

  //PLP
  pollerLite(
    [
      '#hits',
      () =>
        isMobile()
          ? document.querySelector('[data-testid="row"]')
          : document.querySelector('.oct-listers-hits__top') || document.querySelector('.oct-listers-facet-sticky-ribbon'),
    ],
    () => {
      const eventText = VARIATION == 'control' ? 'would have' : 'has';

      fireBootsEvent(`User ${eventText} seen PLP`, true, eventTypes.experience_action, {
        action: actionTypes.view,
        action_detail: `User ${eventText} seen PLP`,
      });

      if (VARIATION == 'control') {
        return;
      }

      if (window.userStatus === 'adcard-view') {
        document.body.classList.add(`${ID}__plp`);
        const bannerWrapper = document.querySelector('[data-testid="row"]');
        const attachPoint = isMobile()
          ? bannerWrapper
          : document.querySelector('.oct-listers-hits__top') || document.querySelector('.oct-listers-facet-sticky-ribbon');
        const isSearchPage = window.location.href.includes('sitesearch');
        const attachPosition = isSearchPage ? 'beforebegin' : isMobile() ? 'afterend' : 'beforebegin';
        const adcardPointsSectionElem = document.querySelector('#adcardPointsSection');

        if (!document.querySelector(`.${ID}__pointsWrapper`)) {
          attachPoint.insertAdjacentHTML(attachPosition, pointsWrapper(ID, adcardPointsSectionElem.textContent));
        }
      }
    }
  );

  //my account
  pollerLite(['#advantageCardDetails'], () => {
    const eventText = VARIATION == 'control' ? 'would have' : 'has';

    fireBootsEvent(`User ${eventText} seen my account page`, true, eventTypes.experience_action, {
      action: actionTypes.view,
      action_detail: `User ${eventText} seen my account page`,
    });

    if (VARIATION == 'control') {
      return;
    }

    if (window.userStatus === 'adcard-view') {
      //account-view
      document.body.classList.add(`${ID}__myAccount`);
      const advantageCardDetails = document.querySelector('#advantageCardDetails');
      const worthPrice = advantageCardDetails.querySelector('span:nth-child(2)').textContent;

      if (!document.querySelector(`.${ID}__pointsWrapper`)) {
        advantageCardDetails.insertAdjacentHTML('beforebegin', pointsWrapper(ID, worthPrice));
      }

      const pointsWrapperElem = document.querySelector(`.${ID}__pointsWrapper`);
      const parentElem = pointsWrapperElem.parentElement;
      parentElem.classList.add(`${ID}__pointsWrapperContainer`);
      pointsWrapperElem.classList.add(`${ID}__pointsWrapper--account`);
      advantageCardDetails.classList.add(`${ID}__hide`);
    }
  });
};

let hideTimeout;

const showAdvantageCard = (advantageCardWrapperElem) => {
  clearTimeout(hideTimeout);
  document.documentElement.style.overflow = 'hidden';
  advantageCardWrapperElem.classList.remove(`${ID}__hide`);
};

const hideAdvantageCard = (advantageCardWrapperElem) => {
  hideTimeout = setTimeout(() => {
    document.documentElement.style.overflow = 'inherit';
    advantageCardWrapperElem.classList.add(`${ID}__hide`);
  }, 100);
};

export default () => {
  const testID = `${ID}|BLTV002: Ad card balance as a motivator for purchase.`; // same as triggers.js
  const testVariant = `${VARIATION === 'control' ? 'Control' : `V${VARIATION}`}`;
  const testIDAndVariant = `${testID}|${testVariant}`;

  bootsEvents.initiate = true;
  bootsEvents.methods = ['datalayer'];
  bootsEvents.property = 'G-C3KVJJE2RH';
  bootsEvents.testID = testIDAndVariant;

  setup();

  // fireBootsEvent('Conditions Met');

  if (window.usabilla_live) {
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }

  document.body.addEventListener('click', (e) => {
    const { target } = e;

    const advantageCardWrapperElem = document.querySelector(`.${ID}__advantageCardWrapper`);

    if (isMobile() && target.closest(`.${ID}__advantageIcon`)) {
      showAdvantageCard(advantageCardWrapperElem);
      document.documentElement.style.overflow = 'hidden';
    } else if (isMobile() && (!target.closest(`.${ID}__advantageCardWrapper`) || target.closest(`.${ID}__overlay`))) {
      hideAdvantageCard(advantageCardWrapperElem);
      document.documentElement.style.overflow = 'auto';
    } else if (target.closest(`.${ID}__continue`)) {
      hideAdvantageCard(advantageCardWrapperElem);
    } else if (target.closest('#storeLocatorQuickLink')) {
      // console.log('Customer clicks the store locator');
      fireBootsEvent('Customer clicks the store locator', true, eventTypes.experience_action, {
        action: actionTypes.click_cta,
        action_detail: 'Customer clicks the store locator',
      });
    } else if (target.closest('#adcardQuickLinkGuest') || target.closest('#adcardQuickLink')) {
      // console.log('Customer clicks the advantage card');
      fireBootsEvent('Customer clicks the advantage card area', true, eventTypes.experience_action, {
        action: actionTypes.click_cta,
        action_detail: 'Customer clicks the advantage card area',
      });
    }
  });

  const { isLoggedIn, advantageCardFlag } = window.userObj;

  if (isLoggedIn === 'true' && advantageCardFlag === 'true') {
    window.userStatus = 'adcard-view';
  } else if (isLoggedIn === 'true' && advantageCardFlag === 'false') {
    window.userStatus = 'account-view';
  } else if (isLoggedIn === 'false') {
    window.userStatus = 'logged-out';
  }

  init();

  if (VARIATION == 'control') {
    return;
  }

  const adCardQuickLinkElem = document.querySelector('#adcardQuickLinkGuestContainer');
  const advantageCardWrapperElem = document.querySelector(`.${ID}__advantageCardWrapper`);

  const adcardQuickLinkContainer = document.querySelector('#adcardQuickLinkContainer');

  //Add event listeners for showing and hiding the advantage card
  adCardQuickLinkElem.addEventListener('mouseenter', () => showAdvantageCard(advantageCardWrapperElem));
  advantageCardWrapperElem.addEventListener('mouseenter', () => showAdvantageCard(advantageCardWrapperElem));
  // adCardQuickLinkElem.addEventListener('mouseleave', () => hideAdvantageCard(advantageCardWrapperElem));
  advantageCardWrapperElem.addEventListener('mouseleave', () => hideAdvantageCard(advantageCardWrapperElem));

  adcardQuickLinkContainer.addEventListener('mouseenter', () => showAdvantageCard(advantageCardWrapperElem));
  adcardQuickLinkContainer.addEventListener('mouseleave', () => hideAdvantageCard(advantageCardWrapperElem));
};
