/**
 * @author User Conversion
 */
import { setup } from './services';
import settings from './settings';
import { getChoice, choiceMatches, saveChoice } from './userChoices';
import { pollerLite } from '../../../../../lib/uc-lib';

/**
 * Helper Get text nodes
 */
const getTextNodesRecursive = (elm, store = []) => {
  const kids = elm.childNodes;
  kids && kids.forEach((k) => {
    if(k.nodeType === 3) {
      store.push(k);
    } else {
      getTextNodesRecursive(k, store);
    }
  });

  return store;
};

/**
 * Hide references to rep
 * Varies across pages
 * IN some cases we just want to re-word things as they've chosen
 * to shop online, e.g. checkout terms
 */
const hideRepReferences = () => {
  window.dataLayer.push({
    event: `${settings.ID}-${settings.VARIATION}`,
    category: `rep-references-removed-for-user`
  });
  
  if(window.location.pathname.match(/checkoutmobile/)) {
    pollerLite([
      '.termsandconditions > div:not(.checkbox2) .checkbox .checkbox-label span'
    ], () => {
      const span = document.querySelector(
        '.termsandconditions > div:not(.checkbox2) .checkbox .checkbox-label span'
      );

      if(span) {
        span.innerText = settings.INTERESTED;
      }
    });

    pollerLite([
      '.shippingoptions [value*=REPRESENTATIVE]'
    ], () => {
      // This rule for the 'new' checkout
      const wrap = document.querySelector('.shippingoptions [value*=REPRESENTATIVE]');
      if(wrap) {
        wrap.parentNode.style.display = 'none';
      }
    });
  }

  if(window.location.pathname.match(/checkoutdirectdelivery\/delivery/i)) {
    pollerLite([
      'header .ShoppingWith'
    ], () => {
      const input = document.querySelector('header .ShoppingWith');
      if(input) {
        input.style.display = 'none';
      }
    });

    pollerLite([
      'header #RepPhoto'
    ], () => {
      const input = document.querySelector('header #RepPhoto');
      if(input) {
        input.style.display = 'none';
      }
    });

    pollerLite([
      '[name=ContactByAvon]'
    ], () => {
      const input = document.querySelector('[name=ContactByAvon]');
      if(input && input.nextElementSibling) {
        input.nextElementSibling.innerHTML = '<span>' + settings.INTERESTED + '</span>';
      }
    });

    pollerLite([
      '.section-footer .termsandconditions > div > .checkbox'
    ], () => {
      // This rule for the 'new' checkout
      const wrap = document.querySelector('.section-footer .termsandconditions > div > .checkbox');
      if(wrap) {
        wrap.style.display = 'none';
      }
    });

    pollerLite([
      '#RepDelivery'
    ], () => {
      const input = document.querySelector('#RepDelivery');
      if(input) {
        input.style.display = 'none';
      }
    }, {
      timeout: 0,
      multiplier: 1  
    });

    pollerLite([
      '.TermsConditions'
    ], () => {
      const terms = document.querySelector('.TermsConditions');
      if(terms) {
        const termsTextNodes = getTextNodesRecursive(terms);

        termsTextNodes.forEach((tt) => {
          if(tt.textContent.match('I agree that Avon Representatives')) {
            tt.textContent = settings.INTERESTED;
          }
        });
      }
    });
  }

  pollerLite([
    '.FooterColumnText'
  ], () => {
    [].forEach.call(document.querySelectorAll('.FooterColumnText'), (link) => {
      if(link 
          && link.parentNode 
          && link.innerText.trim().toLowerCase() == 'change representative') 
      {
        link.parentNode.style.display = 'none';
      }
    });
  });

  pollerLite([
    '#RepMenu'
  ], () => {
    const repMenu = document.querySelector('#RepMenu');
    if(repMenu) {
      repMenu.style.display = 'none';
    }
  });

  pollerLite([
    '.FindARepModule'
  ], () => {
    const repMenu = document.querySelector('.FindARepModule');
    if(repMenu) {
      repMenu.style.display = 'none';
    }
  });

  pollerLite([
    '#FindARepWidget'
  ], () => {
    const repWidget = document.querySelector('#FindARepWidget');
    if(repWidget) {
      repWidget.style.display = 'none';
    }
  });

};

/**
 * Show the homepage banner
 */
const showBanner = () => {
  setup();

  window.dataLayer.push({
    event: `${settings.ID}-${settings.VARIATION}`,
    category: `user_met_homepage_conditions`
  });

  if(settings.VARIATION != 'control') {
    localStorage.setItem(`${settings.ID}-did-see-takeover`, '1');

    // --------------------------------
    // Show the homepage takeover
    // --------------------------------
    window.dataLayer.push({
      event: `${settings.ID}-${settings.VARIATION}`,
      category: `user_saw_homepage_takeover`,
    });

    const html = `
      <div class="${settings.ID}-takeover">  
        <div class="${settings.ID}-takeover__content">
          <h2 class="${settings.ID}-takeover__title">Hey You!</h2>
          <p class="${settings.ID}-takeover__subtitle ${settings.ID}-desktop-only">Welcome to Avon. Shopping with us is simple.</p>

          <div class="${settings.ID}-takeover__btnwrap">
            <div class="${settings.ID}-takeover__btncol">
              <p class="${settings.ID}-mobile-only ${settings.ID}-takeover__btncopy"
                >Shop directly with Avon for quick, easy ordering</p>

              <p class="${settings.ID}-takeover__btnpara">
                <a class="${settings.ID}-takeover__button ${settings.ID}-takeover__button--online" 
                  data-ident="online"
                >
                  Shop Online
                </a>
              </p>

              <p class="${settings.ID}-desktop-only ${settings.ID}-takeover__btncopy"
                >Shop directly with Avon</p>
              <p class="${settings.ID}-desktop-only ${settings.ID}-takeover__btncopy"
                >Quick, easy ordering, like you would expect from any online store</p>
            </div>
            <div class="${settings.ID}-takeover__btncol">

              <p class="${settings.ID}-takeover__btnpara">
                <a class="${settings.ID}-takeover__button ${settings.ID}-takeover__button--online" 
                  data-ident="rep"
                  href="/representative/"
                >
                  Shop with a Rep
                </a>
              </p>

              <p class="${settings.ID}-desktop-only ${settings.ID}-takeover__btncopy"
                >Free, bespoke delivery from your local area</p>
              <p class="${settings.ID}-desktop-only ${settings.ID}-takeover__btncopy"
                >Connect your online and offline Avon experience to receive advice, product recommendations and access to special offers</p>
              <p class="${settings.ID}-mobile-only ${settings.ID}-takeover__btncopy"
                >Connect your online and offline Avon experience to receive advice, product recommendations and access to special offers</p>
            </div>
          </div>
          
        </div>
      </div>
    `;

    const mainContentWrapper = document.querySelector('#MainContentWrapper');

    if(mainContentWrapper) {
      mainContentWrapper.insertAdjacentHTML('beforebegin', html);

      const takeoverWrap = document.querySelector(`.${settings.ID}-takeover`);
      if(takeoverWrap) {
        const btns = document.querySelectorAll(`.${settings.ID}-takeover__button`);
        [].forEach.call(btns, (btn) => {
          btn.addEventListener('click', (e) => {
            const ident = e.currentTarget.dataset.ident;
            
            saveChoice(ident);

            if(ident == 'online') {
              takeoverWrap.classList.add(`${settings.ID}-takeover--anim-zero-height`);
              setTimeout(() => {
                window.location.reload();
              }, 300);
            }
          });
        });
      }
    }
  }
};

/**
 * Entry point for running experiment
 */
const activate = () => {
  if(choiceMatches('online')) {
    // --------------------------------
    // User has alrady made a choice
    // --------------------------------
    setup();

    if(settings.VARIATION != 'control') {
      hideRepReferences();
    }
  } else if(!getChoice()) {
    // -----------------------------------------------
    // User has not made a choice, poll
    // to ensure they meet conditions of showing
    // the banner
    // -----------------------------------------------
    pollerLite([
      '#MainContentWrapper',
      () => {
        // --------------------------------
        // Only run for non-attached users
        // --------------------------------
        const sessionContext = sessionStorage.getItem('SessionContext_GB');
        if(!sessionContext) {
          return false;
        }

        const sessionContextObject = JSON.parse(sessionContext);

        if(!sessionContextObject 
            || typeof sessionContextObject.HasRepresentative === 'undefined') {
          return false;
        }

        return !sessionContextObject.HasRepresentative;
      },
      () => !!window.dataLayer,
      () => !localStorage.getItem(`${settings.ID}-did-see-takeover`),
      () => {
        // --------------------------------
        // Only run for users who visited
        // by landing directly on the homepage
        // --------------------------------
        return !document.referrer.match('avon.uk.com');
      },
      () => {
        // --------------------------------
        // Only runs on homepage
        // --------------------------------
        return window.location.pathname == '/';
      }
    ], showBanner);
  }
};

export default activate;
