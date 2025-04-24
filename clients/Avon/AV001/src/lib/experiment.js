/**
 * @author User Conversion
 */
import { setup } from './services';
import settings from './settings';
import { pollerLite } from '../../../../../lib/uc-lib';
import { events, getClosest } from '../../../../../lib/utils';

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
 * Is attached?
 *
 * This function has to be run when pollers return true, given we have
 * some race conditions when landing on checkoutdelivery/delivery/
 *
 * @return {Boolean}
 */
const isAttached = () => {
  const root = window.AppModule.RootScope;
  const hasRep = root.Session && root.Session.HasRepresentative;

  return hasRep;
};

/**
 * Hide references to rep
 * Varies across pages
 * IN some cases we just want to re-word things as they've chosen
 * to shop online, e.g. checkout terms
 */
const hideRepReferences = () => {

  if(window.location.pathname.match(/checkoutmobile/)) {
    pollerLite([
      '[ng-click="Conditions.AcceptContactByRepresentative = !Conditions.AcceptContactByRepresentative; AcceptContactByRepresentativeChanged()"]',
    ], () => {
      try {
        const span = document.querySelector('[ng-click="Conditions.AcceptContactByRepresentative = !Conditions.AcceptContactByRepresentative; AcceptContactByRepresentativeChanged()"]').nextElementSibling.querySelector('span');

        if(span) {
          span.innerText = settings.INTERESTED;
        }
      } catch (e) {}
    });

    pollerLite([
      'input[name="shippingOption"]',
    ], () => {
      try {
        const deliveryOptions = document.querySelectorAll('input[name="shippingOption"]');
        const repDelivery = [].filter.call(deliveryOptions, option => JSON.parse(option.value).Code === 'rep_delivery')[0];

        if (repDelivery) {
          repDelivery.parentNode.style.display = 'none';
        }
      } catch (e) {}
    });
  }

  if(window.location.pathname.match(/checkoutdirectdelivery\/delivery/i)) {
    pollerLite([
      'header .ShoppingWith'
    ], () => {
      if(isAttached()) return false;

      const input = document.querySelector('header .ShoppingWith');
      if(input) {
        input.style.display = 'none';
      }
    });

    pollerLite([
      'header #RepPhoto'
    ], () => {
      if(isAttached()) return false;

      const input = document.querySelector('header #RepPhoto');
      if(input) {
        input.style.display = 'none';
      }
    });

    pollerLite([
      '[name=ContactByAvon]'
    ], () => {
      if(isAttached()) return false;

      const input = document.querySelector('[name=ContactByAvon]');
      if(input && input.nextElementSibling) {
        input.nextElementSibling.innerHTML = '<span>' + settings.INTERESTED + '</span>';
      }
    });

    pollerLite([
      '.section-footer .termsandconditions > div > .checkbox'
    ], () => {
      if(isAttached()) return false;

      // This rule for the 'new' checkout
      const wrap = document.querySelector('.section-footer .termsandconditions > div > .checkbox');
      if(wrap) {
        wrap.style.display = 'none';
      }
    });

    pollerLite([
      '#RepDelivery'
    ], () => {
      if(isAttached()) return false;

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
      if(isAttached()) return false;

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

  pollerLite([
    '.DeviceDisplay .ContentModule [href="/representative/"]',
  ], () => {
    const repWidget = document.querySelector('.DeviceDisplay .ContentModule [href="/representative/"]');
    if(repWidget) {
      const repWidgetContainer = getClosest(repWidget, '.DeviceDisplay');
      repWidgetContainer.style.display = 'none';
    }
  });

};

/**
 * Helper has representative
 */
const hasRepresentative = () => {
  const sessionContext = sessionStorage.getItem('SessionContext_GB');
  if(!sessionContext) {
    return false;
  }

  const sessionContextObject = JSON.parse(sessionContext);

  if(!sessionContextObject 
      || typeof sessionContextObject.HasRepresentative === 'undefined') {
    return false;
  }

  return !!sessionContextObject.HasRepresentative;
}

/**
 * Entry point for running experiment
 *
 * 50% of users are considered 'online', the other 50% control
 * i.e. 50% of users see version of site where there are no rep references
 */
const activate = () => {
  events.send(`${settings.ID}-${settings.VARIATION}`, 'did-meet-conditions');

  if(settings.VARIATION != 'control') {
    hideRepReferences();
  }
};

export default activate;
