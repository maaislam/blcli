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
const docHeight = document.body.offsetHeight;
const aws = 'https://brainlabs-media.s3.eu-west-2.amazonaws.com';

const ctaCopy = (pageType, loc) => {
  if (pageType === 'ach') return 'Collect ACH payments now';
  if (pageType === 'dd') return 'Collect Direct Debit payments now';
  if (pageType === 'op') return 'Collect online payments now';
  if (pageType === 'sepa') return 'Collect SEPA Direct Debit payments now';
  if (pageType === 'any' && loc === 'de') return ``;
};

const stickyCopy = (pageType, loc) => {
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
  if (pageType === 'any' && loc === 'de') {
    return `Automatisieren Sie Ihre Zahlungseinzüge mit GoCardless.`;
  }
};

const ctaBottomCopy = (pageType, loc) => {
  if (pageType === 'ach') return 'collect ACH payments?';
  if (pageType === 'dd') return 'collect Direct Debit payments?';
  if (pageType === 'op') return 'collect online payments?';
  if (pageType === 'sepa') return 'collect SEPA Direct Debit payments?';
  if (pageType === 'any' && loc === 'de') return ``;
};

const learnMoreLink = (loc) => {
  return; //loc === 'uk' ? 'https://gocardless.com/solutions/learn-more' : 'https://gocardless.com/en-us/solutions/learn-more';
};

const getPopupContent = (pageType, loc) => {
  if (pageType !== 'dd') return popupContent(pageType, learnMoreLink(loc));
  return popupContent(pageType);
};

const getPopupTitle = (pageType) => {
  if (pageType === 'ach') {
    return '<h3>A modern way to collect ACH debit payments: GoCardless</h3>';
  }
  if (pageType === 'op') {
    return '<h3>Collect payments hassle-free</h3>';
  }
  if (pageType === 'sepa') {
    return '<h3>A modern way to collect SEPA Direct Debit payments: GoCardless</h3>';
  } else return '';
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

  const signupBtnInControl = document.querySelector('[data-module-name="signupLink"]');
  signupBtnInControl.addEventListener('click', () => {
    fireEvent('Customer clicked signup button in control');
  });
  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    return;
  }

  // Page vats

  let loc = 'uk';
  if (window.location.pathname.indexOf('en-us') !== -1) {
    loc = 'us';
  } else if (window.location.pathname.indexOf('de') !== -1) {
    loc = 'de';
  }
  const pageType = window.gcor003loc_urls[window.location.pathname] || false;

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
        const article = document.querySelector('[data-module-name="articleContent"]');
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
    let location = 'uk';
    if (window.location.pathname.indexOf('en-us') !== -1) {
      location = 'us';
    } else if (window.location.pathname.indexOf('de') !== -1) {
      location = 'de';
    }

    const sticky = document.createElement('div');
    sticky.classList.add(`${ID}_sticky`);
    sticky.insertAdjacentHTML(
      'afterbegin',
      `
      <div class="${ID}_stickyContent">
        <p>Automatisieren Sie Ihre Zahlungseinzüge mit GoCardless.</p>
        <div class="${ID}_buttons">
          <span class="${ID}_buttonSc ${
        location !== 'de' ? `${ID}_openPopup` : `${ID}_dachLink`
      } ${ID}_ctaSticky" data-trackingname="sticky">${
        location == 'de' ? '<a href="/de-de/loesungen/mehr-erfahren/">Mehr erfahren</a>' : 'Learn more'
      }</span>
          <a class="${ID}_button ${ID}_ctaScSticky" href="https://manage.gocardless.com/signup?${
        location === 'de' ? 'lang=de&widget=publication-cta' : 'widget=hook'
      }">Jietzt starten</a>
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
            : loc === 'de'
            ? ''
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

            <div class="${ID}_content">
              ${getPopupTitle(pageType)}
              <div class="${ID}_inner">
                ${getPopupContent(pageType, loc)}
              </div>
              ${
                pageType !== 'dd'
                  ? `
              <div class="${ID}_ctas">
                <a class="${ID}_button ${ID}_popupCta" href="https://manage.gocardless.com/signup/">Get started</a>
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
        document.querySelector(`.${ID}_ctaWrapperBottom`).remove();
      }

      stickyCta();

      const ctaPanel = `
            <div class="${ID}_ctaWrapperBottom">
              <img src="${aws}/gc/gc003_cta.png" alt="Payments" />
              <div class="${ID}_ctaContent">
                <p>What would you like to do next?</p>
                <div class="${ID}_buttons">
                  <span class="${ID}_button ${ID}_openPopup ${ID}_ctaBottom" data-trackingname="CTA block">How does GoCardless ${ctaBottomCopy(
        pageType
      )}</span>
                  <a class="${ID}_buttonSc ${ID}_ctaSecondaryBottom" href="https://manage.gocardless.com/signup/">Sign Up and start taking payments</a>
                </div>
              </div>
            </div>
          `;

      setTimeout(() => {
        let bottomCta = document.querySelector('[data-module-name="publicationCTA"]');
        if (bottomCta) {
          bottomCta.insertAdjacentHTML('beforebegin', ctaPanel);
          bottomCta.classList.add(`${ID}_hidden`);
        } else {
          bottomCta = document.querySelector('[data-testid="multiPageGuidePagination"]');
          if (bottomCta) {
            bottomCta.insertAdjacentHTML('beforebegin', ctaPanel);
          }
        }

        // Add listeners.
        addeventListeners();
      }, 250);
    }
  };
  const callback = () => {
    if (location.pathname.indexOf('/de/handbuch/') !== -1 || document.querySelectorAll(`.${ID}_stickyContent`).length === 0) {
      console.log('test');

      setTimeout(runChanges, 500);
    } else {
      document.querySelector(`.${ID}_sticky`)?.remove();
    }
  };
  let oldHref = document.location.href;

  const observerss = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      const href = document.location.href;
      //callback();
      if (oldHref != href) {
        const result = { oldHref, href };

        oldHref = href;

        //callback();
      }
    });
  });

  const config = {
    childList: true,
    subtree: true,
  };
  const appContainer = document.querySelector('#gatsby-focus-wrapper');
  ///observer.observe(appContainer, config);

  observer.connect(
    document.querySelector('#mainContent'),
    () => {
      setTimeout(runChanges, 2000);
    },
    {
      throttle: 300,
      config: {
        attributes: false,
        childList: true,
        subtree: true,
      },
    }
  );
};
