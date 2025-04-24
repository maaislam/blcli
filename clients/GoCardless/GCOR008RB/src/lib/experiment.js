/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/uc-lib';
import renderHowItWorks from './components/howItWorks';
//import { contents } from './data';
import { initWistia, wistiaId } from './helpers/addWistia';
import articleMiddle from './helpers/findMiddle';
//import { getArticleType } from './helpers/getArticleType';
import obsIntersection from './helpers/observeIntersection';

const { ID, VARIATION } = shared;

const init = (mutation) => {
  // Experiment Code...
  setup();

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    return;
  }
  if (!window.gco008__Pagetypes[location.pathname]) {
    return;
  }
  document.querySelectorAll('[data-testid="linkCTASecondaryLink"]').forEach((item) => {
    item.closest('div').style.display = '';
  });
  const { addedNodes } = mutation;
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

  const lastParagraph = paragraphs[paragraphs.length - 2];

  // const heading2s = document.querySelectorAll('h2');
  // const heading3s = document.querySelectorAll('h3');
  //const firstHeading3 = heading2s.length > 0 ? heading2s[0] : heading3s[0];
  const module1 = document.querySelectorAll(`.${ID}__howitworks--module1`);
  const module3 = document.querySelectorAll(`.${ID}__howitworks--module3`);
  const module2 = document.querySelectorAll(`.${ID}__quote--module2`);
  //const articleType = getArticleType();
  const articleType = window.gco008__Pagetypes[location.pathname];
  // console.log('articleType', articleType);
  const articleContents = window.GCOR008__data[articleType]; //contents[articleType]; window.GCOR008__data[articleType]; //contents[articleType];
  const articleMid = articleMiddle();

  module1.length <= 0 && renderHowItWorks(ID, articleContents, firstHeading, 'module1');
  module2.length <= 0 && renderHowItWorks(ID, articleContents, articleMid, 'module2');
  module3.length <= 0 && renderHowItWorks(ID, articleContents, lastParagraph, 'module3');

  const intersectionCallback = (entry) => {
    if (entry.isIntersecting) {
      fireEvent(`user sees value prop component ${entry.target.className.split('module')[1]}`);
    }
  };

  addedNodes.forEach((node) => {
    if (node.nodeType === 1 && node.matches(`.${ID}__howitworks--module1`)) {
      obsIntersection(module1[0], 0.6, intersectionCallback);
      fireEvent('Conditions Met');
    } else if (node.nodeType === 1 && node.matches(`.${ID}__quote--module2`)) {
      obsIntersection(module2[0], 0.6, intersectionCallback);
    } else if (node.nodeType === 1 && node.matches(`.${ID}__howitworks--module3`)) {
      obsIntersection(module3[0], 0.6, intersectionCallback);
    }
  });
};

export default () => {
  // Poll and re-run init

  pollerLite(['#___gatsby'], () => {
    const appContainer = document.querySelector('#___gatsby');
    setup();
    fireEvent('Test Code Fired');

    //add wistia script to head

    const wistiaUrls = [
      `https://fast.wistia.com/embed/medias/${wistiaId()}.jsonp`,
      'https://fast.wistia.com/assets/external/E-v1.js',
    ];
    initWistia(wistiaUrls);

    document.body.addEventListener('click', (e) => {
      const target = e.target;
      const targetMatched = (desiredMatch) => target.matches(desiredMatch) || target.closest(desiredMatch);
      const gaEventTriggerConditions = (classToCheck, classToCheckmobile, innerString) => {
        return (
          (targetMatched(`.${classToCheck}`) &&
            target.closest(`.${classToCheck}`).getElementsByTagName('span')[0].innerText == innerString) ||
          (targetMatched(`.${classToCheckmobile}`) &&
            target.closest(`.${classToCheckmobile}`).getElementsByTagName('span')[0].innerText == innerString)
        );
      };
      const articleType = window.gco008__Pagetypes[location.pathname];
      // console.log("is article page?", articleType);

      if (!articleType) {
        return;
      }

      if (target.matches(`.${ID}__howitworks--cta`)) {
        const ctaPosition = target.getAttribute('data-position');
        fireEvent(`clicks signup CTA from value prop component ${ctaPosition.split('e')[1]}`);
      } else if (gaEventTriggerConditions('css-1ks30qh', 'css-1bwxyks', 'Sign up')) {
        fireEvent('Interacts with Sign up in header');
      } else if (gaEventTriggerConditions('css-uvst04', 'css-1bwxyks', 'Sign up')) {
        fireEvent('Interacts with Sign up in header');
      }
    });

    // ------------------------------------
    // Added Poller:
    // Checks for page changes and checks to see if the URL has changed
    // ------------------------------------
    let oldHref = document.location.href;
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        // console.log(mutation);
        setTimeout(() => {
          init(mutation);
        }, 2000);
        if (oldHref != document.location.href) {
          oldHref = document.location.href;

          document.body.classList.remove(`${shared.ID}`);

          setTimeout(() => {
            init(mutation);
          }, 2000);
        }
      });
    });

    const config = {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style'],
    };

    observer.observe(appContainer, config);
  });
};
