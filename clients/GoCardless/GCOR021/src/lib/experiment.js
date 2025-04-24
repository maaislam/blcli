/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
//import { observer } from '../../../../../lib/utils';
import benefitBlock from './components/benefitsBlock';
import modalContent from './components/modalContent';
import { casestudyCopy } from './data';
import { initWistia, wistiaId } from './helpers/addWistia';
//import articleMiddle from './helpers/findMiddle';
import wistiaTrackings from './helpers/wistiaTrackings';

const { ID, VARIATION } = shared;

const DOM_RENDER_DELAY = 2000;

const initMutationconfig = {
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: ['style'],
};
//const pageHasNoGco08 = window.nonGco08Urls.includes(window.location.pathname);

const init = () => {
  if (document.querySelector(`.${ID}__casestudy`)) return;
  //const pageHasGco08 = window.gco08Urls.includes(window.location.pathname);

  console.log(ID);
  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  const getGeo = () => {
    return window.location.pathname.includes('/de') ? 'de' : window.location.pathname.includes('/en-au') ? 'au' : 'uk';
  };
  const getPosition = (el) => {
    const rect = el.getBoundingClientRect(),
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return rect.top + scrollTop;
  };
  const main = document.querySelector('main');
  const heading2 = main.querySelectorAll('h2')[0];
  const heading3 = main.querySelectorAll('h3')[0];
  const heading4 = main.querySelectorAll('h4')[0];
  const headings = [heading2, heading3, heading4];
  const yPos = headings.map((item) => (item ? getPosition(item) : document.body.offsetHeight));
  const paragraphs = main.querySelectorAll('.css-11in3md')[0].getElementsByTagName('p');

  const min = Math.min(...yPos);
  const firstHeading = min === document.body.offsetHeight ? paragraphs[0] : headings[yPos.indexOf(min)];
  //const articleMid = articleMiddle();
  //console.log(firstHeading);

  const anchorElm = firstHeading; //pageHasNoGco08 ? firstHeading : articleMid;
  anchorElm.insertAdjacentHTML('beforebegin', benefitBlock(ID, casestudyCopy[getGeo()]));

  if (document.querySelector(`.${ID}__overlay`)) return;
  //if (document.querySelector(`.${ID}__overlay`) || !pageHasNoGco08) return;

  //add modal
  const overlay = document.createElement('div');

  overlay.classList.add(`${ID}__overlay`, `${ID}__hide`);

  document.body.classList.add(`${ID}__body`);
  document.body.insertAdjacentElement('afterbegin', overlay);
  overlay.insertAdjacentHTML('afterbegin', modalContent(ID));
};

export default () => {
  setup();
  fireEvent('Conditions Met');

  document.body.addEventListener('click', ({ target }) => {
    const overlay = document.querySelector(`.${ID}__overlay`);
    const targetMatched = (desiredMatch) => target.closest(desiredMatch);
    const gaEventTriggerConditions = (classToCheck, classToCheckmobile, innerString) => {
      return (
        (targetMatched(`.${classToCheck}`) &&
          target.closest(`.${classToCheck}`).getElementsByTagName('span')[0].innerText == innerString) ||
        (targetMatched(`.${classToCheckmobile}`) &&
          target.closest(`.${classToCheckmobile}`).getElementsByTagName('span')[0].innerText == innerString)
      );
    };

    if (target.closest(`.${ID}__open-modal`)) {
      overlay.classList.remove(`${ID}__hide`);
      fireEvent('User interacts with play button');
    } else if (
      target.closest(`.${ID}__modalcontainer--close`) ||
      (target.closest(`.${ID}__overlay`) && !target.closest(`.${ID}__modalcontainer`))
    ) {
      const closedUsingOverlay = !target.closest(`.${ID}__modalcontainer--close`);
      overlay.classList.add(`${ID}__hide`);

      fireEvent(`${closedUsingOverlay ? 'User closes the pop up using the overlay background' : 'User interacts with x button'}`);
    } else if (target.closest('.signup-btn')) {
      fireEvent('User interacts with sign up in the element');
    } else if (target.closest('.customerstories-btn')) {
      fireEvent('User interacts with read more customer stories in the element ');
    } else if (gaEventTriggerConditions('css-mo3vs8', 'css-1cr3yw6', 'Login')) {
      fireEvent('Interacts with Login in header');
    } else if (
      gaEventTriggerConditions('css-uvst04', 'css-1bwxyks', 'Sign up') ||
      gaEventTriggerConditions('css-1ks30qh', 'css-1bwxyks', 'Sign up')
    ) {
      fireEvent('Interacts with Sign up in header');
    } else if (target.closest('[class*="_ctaSticky"]') || target.closest('[class*="_buttonSecondary"]')) {
      fireEvent('User interacts with the “Learn more” CTA in the sticky banner');
    } else if (target.closest('[class*="_ctaScSticky"]') || target.closest('[class*="_buttonPrimary"]')) {
      fireEvent('User interacts with the “Sign up” CTA in the sticky banner');
    } else if (target.closest('.css-m5wlkr')) {
      fireEvent('User interacts with sign up CTA  at the bottom of the article');
    } else if (target.closest('.css-140tqjo')) {
      fireEvent('User interacts with Learn More CTA at the bottom of the article');
    } else if (target.closest('.css-eh9p4w')) {
      fireEvent('User interacts with Contact Sales CTA at the bottom of the page');
    } else if (target.closest('.css-1xg51cq')) {
      fireEvent('User interacts with Contact Sales CTA in the footer');
    } else if (target.closest('.css-19nbx3n')) {
      fireEvent('User interacts with Sign up CTA in the header');
    } else if (target.closest('.css-mo3vs8')) {
      fireEvent('User interacts with Log in CTA in the header');
    }
  });

  if (VARIATION == 'control') {
    return;
  }

  init();

  //if (pageHasNoGco08) {
  //add wistia script to head

  const wistiaUrls = [
    `https://fast.wistia.com/embed/medias/${wistiaId()}.jsonp`,
    'https://fast.wistia.com/assets/external/E-v1.js',
  ];
  initWistia(wistiaUrls);
  wistiaTrackings(wistiaId(), fireEvent);
  //}

  const appContainer = document.querySelector('#___gatsby');

  const observer = new MutationObserver((mutations) => {
    mutations.forEach(() => {
      setTimeout(() => {
        init();
      }, DOM_RENDER_DELAY);
    });
  });

  observer.observe(appContainer, initMutationconfig);
};
