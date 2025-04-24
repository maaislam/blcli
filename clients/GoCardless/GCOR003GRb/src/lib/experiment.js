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
import { copyData } from './data';
//import urls from './urls';

const { ID, VARIATION } = shared;
const signupUrl = 'https://manage.gocardless.com/signup?lang=';
const docHeight = document.body.offsetHeight;
//const aws = 'https://brainlabs-media.s3.eu-west-2.amazonaws.com';
const country = location.pathname.indexOf('/de/') !== -1 ? 'de' : 'fr';
const imageStorage = 'https://ucds.ams3.digitaloceanspaces.com/GoCardless/GCOR003/gc003_';
//window.gc3_urls = urls;

const ctaCopy = (pageType) => {
  // if (pageType === 'ach') return 'Collect ACH payments now';
  // if (pageType === 'dd') return 'Collect Direct Debit payments now';
  // if (pageType === 'op') return 'Collect online payments now';

  if (pageType === 'generic') return copyData.ctaCopy[pageType][country];
  if (pageType === 'sepa') return copyData.ctaCopy[pageType][country];
};

const stickyCopy = (pageType) => {
  // if (pageType === 'ach') {
  //   return `<span class="${ID}_mobileHide">GoCardless: A</span><span class="${ID}_desktopHide">Try a</span> better way to collect ACH payments.`;
  // }
  // if (pageType === 'dd') {
  //   return `<span class="${ID}_mobileHide">GoCardless: A</span><span class="${ID}_desktopHide">Try a</span> better way to collect Direct Debit payments.`;
  // }
  // if (pageType === 'op') {
  //   return `<span class="${ID}_mobileHide">GoCardless: A</span><span class="${ID}_desktopHide">Try a</span> better way to collect online payments.`;
  // }
  if (pageType === 'sepa') {
    return copyData.stickyCopy[pageType][country];
  }
  if (pageType === 'generic') {
    return copyData.stickyCopy[pageType][country];
  }
};

const ctaBottomCopy = (pageType) => {
  // if (pageType === 'ach') return 'collect ACH payments?';
  // if (pageType === 'dd') return 'collect Direct Debit payments?';
  // if (pageType === 'op') return 'collect online payments?';
  if (pageType === 'sepa') return 'SEPA-Lastschriftzahlungen ein?';
  if (pageType === 'generic') return 'Zahlungen ein?';
};

const learnMoreLink = (pagetype) => {
  // if (pagetype !== 'de' && pagetype !== 'fr') return;

  return copyData.learnMoreLink[pagetype === 'sepa' ? 'sepa' : 'generic'][country];
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
      <a class="${ID}_button ${ID}_popupCta" href=${location === 'de' ? `${signupUrl}de` : `${signupUrl}fr`}>${
          copyData.ctaPopup[pageType][location]
        }</a>
      <a class="${ID}_buttonSc ${ID}_popupCtaSecondary" href="">
      ${copyData.ctaBottomCopy1[pageType][location]}
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

  // -----------------------------
  // If control, bail out from here
  // -----------------------------

  // Page vats

  let loc = 'fr';
  if (window.location.pathname.indexOf('/de') !== -1) loc = 'de';

  //const pageType = window.gc3_urls[window.location.pathname] || false;
  //const pageType = location.pathname.indexOf('sepa') !== -1 ? 'sepa' : 'generic';
  const pageType = window.gcor003loc_urls[window.location.pathname] || false;

  if (!pageType) return;
  fireEvent('Conditions Met');

  if (VARIATION == 'control') {
    return;
  }
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

          fireEvent(`Open popup - ${pageType}`);
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
      fireEvent(`Close popup - ${pageType}`);
    });
    overlay.addEventListener('click', () => {
      popup.classList.remove(`${ID}_active`);
      fireEvent(`Close popup - ${pageType}`);
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
        fireEvent(`Signup click - sticky - ${pageType}`);
      });
    }

    // cta block secondary
    if (bottomLink) {
      bottomLink.addEventListener('click', () => {
        fireEvent(`Signup click - cta block - ${pageType}`);
      });
    }

    // Popup buttons with text
    if (popupCta) {
      popupCta.addEventListener('click', () => {
        fireEvent(`Click - popup get started - ${pageType}`);
      });
    }
    if (popupSecondary) {
      popupSecondary.addEventListener('click', () => {
        fireEvent(`Click - popup learn more - ${pageType}`);
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
          
          <a class="${ID}_button ${ID}_ctaScSticky ${ID}_ctaScSticky--first ${ID}_openPopup">${
        copyData.ctaBottomCopy1[pageType][country]
      }</a>
          <a class="${ID}_button ${ID}_ctaScSticky" href= ${country === 'de' ? `${signupUrl}de` : `${signupUrl}fr`}>${
        copyData.ctaBottomCopy[pageType][country]
      }</a>
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
          <span style="display:none;" class="${ID}_scroll">Read the article</span>
          `
            : ``
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

          <div class="${ID}_popup ${ID}_bg-sepa">
            <div class="${ID}_close"></div>

            <div class="${ID}_content">
              <div class="${ID}_inner">
                ${getPopupContent(pageType, loc, getBtnContainer)}
              </div>
              ${
                pageType !== 'dd'
                  ? `
              <div class="${ID}_ctas ${ID}_hidden">
                <a class="${ID}_button ${ID}_popupCta" href=${
                      country === 'de'
                        ? 'https://manage.gocardless.com/signup?lang=de'
                        : 'https://manage.gocardless.com/signup?lang=fr'
                    }>${copyData.ctaPopup[pageType][country]}</a>
                <a class="${ID}_buttonSc ${ID}_popupCtaSecondary" href="">
                ${copyData.ctaBottomCopy1[pageType][country]}
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
        document.querySelector(`.${ID}_popupCtaSecondary`).setAttribute('href', learnMoreLink(pageType));
      }

      // Update bottom CTA.
      if (document.querySelector(`.${ID}_ctaWrapperBottom`)) {
        //document.querySelector(`.${ID}_ctaWrapperBottom`).remove();
      }

      stickyCta();
      const signupUrl = 'https://manage.gocardless.com/signup?lang=';

      const ctaPanelDE = `
            <div class="${ID}_ctaWrapperBottom">
               <div class="image" style="background-image:url(${imageStorage}img6.png)">
                <img src="${imageStorage}img7.png" alt="" />
              </div>
              <div class="${ID}_ctaContent">
                <span class="title">Was würden Sie als nächstes tun wollen?</span>
                <div class="${ID}_buttons">
                  <a data-href="${learnMoreLink(
                    pageType
                  )}" class="${ID}_button ${ID}_openPopup ${ID}_ctaBottom" data-trackingname="CTA block">Wie zieht GoCardless ${ctaBottomCopy(
        pageType
      )}</a>
                  <a class="${ID}_buttonSc ${ID}_ctaSecondaryBottom" href="${signupUrl}de">Jetzt anmelden und mit dem Zahlungseinzug beginnen</a>
                </div>
              </div>
            </div>
          `;
      const ctaPanelFR = `
            <div class="${ID}_ctaWrapperBottom">
               <div class="image" style="background-image:url(${imageStorage}img6.png)">
                <img src="${imageStorage}img7.png"  />
              </div>
              <div class="${ID}_ctaContent">
                <span class="title">Que voulez-vous faire ensuite?</spa>
                <div class="${ID}_buttons">
                  <a data-href="" class="${ID}_button ${ID}_openPopup ${ID}_ctaBottom" data-trackingname="CTA block">Le prélèvement automatique avec GoCardless : comment ça marche ?</a>
                  <a class="${ID}_buttonSc ${ID}_ctaSecondaryBottom" href="${signupUrl}fr">S'inscrire et commencer à collecter des paiements</a>
                </div>
              </div>
            </div>
          `;

      const ctaPanel = loc === 'fr' ? ctaPanelFR : ctaPanelDE;

      setTimeout(() => {
        let bottomCta = document.querySelector('[data-module-name="publicationCTA"]');
        if (bottomCta && !document.querySelector(`.${ID}_ctaWrapperBottom`)) {
          bottomCta.insertAdjacentHTML('beforebegin', ctaPanel);
          //bottomCta.classList.add(`${ID}_hidden`);
        } else if (!bottomCta && !document.querySelector(`.${ID}_ctaWrapperBottom`)) {
          const lastElm = document.querySelectorAll('.css-2mik2o');
          bottomCta = lastElm[lastElm.length - 1];
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
