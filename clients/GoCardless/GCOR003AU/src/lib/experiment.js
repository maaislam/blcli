/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { throttle } from '../../../../../lib/uc-lib';
import { observer, scrollTo } from '../../../../../lib/utils';
import popupContent from '../popups';

const { ID, VARIATION } = shared;
// console.log(`%c${ID}-${VARIATION}`, `font-size: 30px; color: green;`);
const docHeight = document.body.offsetHeight;
const aws = 'https://brainlabs-media.s3.eu-west-2.amazonaws.com';
const imageStorage = 'https://ucds.ams3.digitaloceanspaces.com/GoCardless/GCOR003/gc003_';

const ctaCopy = (pageType) => {
  if (pageType === 'ach') return 'Collect ACH payments now';
  if (pageType === 'dd') return 'Collect Direct Debit payments now';
  if (pageType === 'op') return 'Collect online payments now';
  if (pageType === 'sepa') return 'Collect SEPA Direct Debit payments now';
};

const stickyCopy = (pageType) => {
  if (pageType === 'ach') {
    return `<span class="${ID}_mobileHide">GoCardless: A</span><span class="${ID}_desktopHide">Try a</span> better way to collect ACH payments.`;
  }
  if (pageType === 'dd') {
    return `<span class="${ID}_mobileHide">GoCardless: A</span><span class="${ID}_desktopHide">Try a</span> better way to collect Direct Debit payments.`;
  }
  if (pageType === 'op') {
    return `<span class="${ID}_mobileHide">GoCardless: A</span><span class="${ID}_desktopHide">Try a</span> better way to collect online payments.`;
  }
  if (pageType === 'sepa') {
    return `<span class="${ID}_mobileHide">GoCardless: A</span><span class="${ID}_desktopHide">Try a</span> better way to collect SEPA payments.`;
  }
};

const ctaBottomCopy = (pageType) => {
  if (pageType === 'ach') return 'collect ACH payments?';
  if (pageType === 'dd') return 'collect Direct Debit payments?';
  if (pageType === 'op') return 'collect online payments?';
  if (pageType === 'sepa') return 'collect SEPA Direct Debit payments?';
};

const learnMoreLink = (loc) => {
  return 'https://gocardless.com/en-au/solutions/learn-more';
};

const getPopupContent = (pageType, loc, btnContainer) => {
  if (pageType === 'dd') return popupContent(pageType, learnMoreLink(loc), btnContainer(pageType, loc));
  return popupContent(pageType, '', btnContainer(pageType, loc));
};
const getBtnContainer = (pageType, location) => {
  const htmlStr =
    pageType !== 'dd'
      ? `
              <div class="${ID}_ctas">
                <a class="${ID}_button ${ID}_popupCta" href="https://manage.gocardless.com/signup?lang=en-AU">Get started</a>
                <a class="${ID}_buttonSc ${ID}_popupCtaSecondary" href="${learnMoreLink(location)}">
                  Learn more
                </a>
              </div>
              `
      : ``;
  return htmlStr;
};

const trackScroll = (cb) => {
  const throttledListener = throttle(() => {
    const scrollTop = window.scrollY;
    const winHeight = window.innerHeight;
    const scrollPercent = scrollTop / (docHeight - winHeight);
    const scrollPercentRounded = Math.round(scrollPercent * 100);

    cb(scrollPercentRounded);
  }, 100);
  window.addEventListener('scroll', throttledListener);
};

export default () => {
  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    return;
  }

  // Page vats

  let loc = 'uk';
  if (window.location.pathname.indexOf('en-us') !== -1) loc = 'us';
  const pageType = window.gc3_urls[window.location.pathname] || false;

  // Event listeners.
  const addeventListeners = () => {
    const cta = document.querySelectorAll(`.${ID}_openPopup`);
    const ctaLink = document.querySelector(`.${ID}_ctaLink`);
    const popup = document.querySelector(`.${ID}_popupWrapper`);
    const close = document.querySelector(`.${ID}_close`);
    const scrollDown = document.querySelector(`.${ID}_scroll`);
    const overlay = document.querySelector(`.${ID}_overlay`);
    const stickyLink = document.querySelector(`.${ID}_ctaScSticky`);
    const bottomLink = document.querySelector(`.${ID}_ctaSecondaryBottom`);
    const popupCta = document.querySelector(`.${ID}_popupCta`);
    const popupSecondary = document.querySelector(`.${ID}_popupCtaSecondary`);

    //  popup
    if (cta) {
      cta.forEach((btn) => {
        btn.addEventListener('click', () => {
          popup.classList.add(`${ID}_active`);
          const label = btn.getAttribute('data-trackingname');
          fireEvent(`Open popup - ${label}`);
        });
      });
    }
    if (ctaLink) {
      ctaLink.addEventListener('click', () => {
        popup.classList.add(`${ID}_active`);
        fireEvent('Open popup - banner');
      });
    }
    close.addEventListener('click', () => {
      popup.classList.remove(`${ID}_active`);
    });
    overlay.addEventListener('click', () => {
      popup.classList.remove(`${ID}_active`);
    });

    if (scrollDown) {
      scrollDown.addEventListener('click', () => {
        const article = document.querySelector('.css-11in3md');
        if (article) {
          const pos = article.getBoundingClientRect().y + window.scrollY;
          scrollTo(pos);
        }
      });
    }

    // Sticky secondary
    if (stickyLink) {
      stickyLink.addEventListener('click', () => {
        fireEvent('Signup click - sticky');
      });
    }

    // cta block secondary
    if (bottomLink) {
      bottomLink.addEventListener('click', () => {
        fireEvent('Signup click - cta block');
      });
    }

    // Popup buttons with text
    if (popupCta) {
      popupCta.addEventListener('click', () => {
        fireEvent(`Click - popup get started`);
      });
    }
    if (popupSecondary) {
      popupSecondary.addEventListener('click', () => {
        fireEvent(`Click - popup learn more`);
      });
    }
  };

  const stickyCta = () => {
    if (document.querySelector(`.${ID}_sticky`)) return;

    const sticky = document.createElement('div');
    sticky.classList.add(`${ID}_sticky`);
    sticky.insertAdjacentHTML(
      'afterbegin',
      `
      <div class="${ID}_stickyContent">
        <p>${stickyCopy(pageType)}</p>
        <div class="${ID}_buttons">
          <span class="${ID}_buttonSc ${ID}_openPopup ${ID}_ctaSticky" data-trackingname="sticky">Learn more</span>
          <a class="${ID}_button ${ID}_ctaScSticky" href="https://manage.gocardless.com/signup?lang=en-AU">Sign up</a>
        </div>
      </div>
  `
    );
    document.body.insertAdjacentElement('beforeend', sticky);

    // Show trigger button on scroll (mobile)
    const banner = document.querySelector('#mainContent article > div:first-child');
    if (banner) {
      const bannerHeight = banner.offsetHeight - 100;
      const winHeight = window.innerHeight;
      const bannerHeightPerc = Math.round((bannerHeight / (docHeight - winHeight)) * 100);

      // Hide trigger button after banner.
      const cb = (percScrolled) => {
        if (percScrolled > bannerHeightPerc) {
          sticky.classList.add(`${ID}_active`);
        } else {
          sticky.classList.remove(`${ID}_active`);
        }
      };

      trackScroll(cb);
    }
  };

  const runChanges = () => {
    // Update hero with new buttons.
    const hero = document.querySelector(`h1`);
    const wrapper = document.getElementById('mainContent');
    if (hero && wrapper && !document.querySelector(`.${ID}_ctas`)) {
      hero.insertAdjacentHTML(
        'afterend',
        `
        <div class="${ID}_ctas">
        ${
          VARIATION === '1'
            ? `
          <span class="${ID}_button ${ID}_openPopup ${ID}_cta" data-trackingname="header">
            ${ctaCopy(pageType)}
          </span>
          <span class="${ID}_scroll">Read the article</span>
          `
            : `
          <span class="${ID}_ctaLink">
            ${ctaCopy(pageType)}
            </span>
            <img src="${aws}/gc/gc003_icon.png" />
          `
        }
        </div>
      `
      );

      // Create the popup
      if (!document.querySelector(`.${ID}_popupWrapper`)) {
        wrapper.insertAdjacentHTML(
          'afterend',
          `
        <div class="${ID}_popupWrapper">
          <div class="${ID}_overlay"></div>

          <div class="${ID}_popup ${ID}_bg-${pageType}">
            <div class="${ID}_close"></div>

            <div class="${ID}_content" >
              <div class="${ID}_inner">
                ${getPopupContent(pageType, loc, getBtnContainer)}
              </div>
              ${
                pageType !== 'dd'
                  ? `
              <div class="${ID}_ctas ${ID}_hidden">
                <a class="${ID}_button ${ID}_popupCta" href="https://manage.gocardless.com/signup?lang=en-AU">Get started</a>
                <a class="${ID}_buttonSc ${ID}_popupCtaSecondary" href="${learnMoreLink(loc)}">
                  Learn more
                </a>
              </div>
              `
                  : ``
              }
            </div>
          </div>
        </div>
      `
        );
        document.querySelector(`.${ID}_popupCtaSecondary`).setAttribute('href', learnMoreLink(loc));
      }

      // Update bottom CTA.
      if (document.querySelector(`.${ID}_ctaWrapperBottom`)) {
        //document.querySelector(`.${ID}_ctaWrapperBottom`).remove();
      }

      stickyCta();

      const ctaPanel = `
            <div class="${ID}_ctaWrapperBottom">
              <div class="image" style="background-image:url(${imageStorage}img6.png)">
                <img src="${imageStorage}img7.png" alt="" />
              </div>
              <div class="${ID}_ctaContent">
                <div class="title">What would you like to do next?</div>
                <div class="${ID}_buttons">
                  <span class="${ID}_button ${ID}_openPopup ${ID}_ctaBottom" data-trackingname="CTA block">How does GoCardless ${ctaBottomCopy(
        pageType
      )}</span>
                  <a class="${ID}_buttonSc ${ID}_ctaSecondaryBottom" href="https://manage.gocardless.com/signup?lang=en-AU">Sign Up and start taking payments</a>
                </div>
              </div>
            </div>
          `;

      setTimeout(() => {
        let bottomCta = document.querySelector('[data-module-name="publicationCTA"]');
        if (bottomCta && !document.querySelector(`.${ID}_ctaWrapperBottom`)) {
          bottomCta.insertAdjacentHTML('beforebegin', ctaPanel);
          //bottomCta.classList.add(`${ID}_hidden`);
        } else if (!bottomCta && !document.querySelector(`.${ID}_ctaWrapperBottom`)) {
          bottomCta = document.querySelector('.css-2mik2o');
          if (bottomCta) {
            bottomCta.insertAdjacentHTML('beforebegin', ctaPanel);
          }
        }

        // Add listeners.
        addeventListeners();
      }, 500);
    }
  };

  setTimeout(runChanges, 500);

  observer.connect(
    document.querySelector('#mainContent'),
    () => {
      setTimeout(runChanges, 500);
    },
    {
      throttle: 300,
      config: {
        attributes: true,
        childList: true,
        subtree: true,
      },
    }
  );
};
