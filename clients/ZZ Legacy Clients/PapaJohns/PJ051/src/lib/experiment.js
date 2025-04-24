/**
 * PJ051 - Papa Rewards Logged In - Education & Aspriration
 * @author User Conversion
 */
import { setup, getPostbackType } from './services';
import { getClosest } from '../../../../../lib/utils';
import AddToBagNotification from '../components/AddToBagNotification/AddToBagNotification';
import ProgressPizza from '../components/ProgressPizza/ProgressPizza';
import HasPointsUSP from '../components/HasPointsUSP/HasPointsUSP';

const activate = () => {
  setup();
  const hasPoints = !!Number(document.querySelector('.prNewPagePoints h3.points').innerText.replace(' POINTS', ''));

  // COMPONENTS
  const progressPizza = new ProgressPizza();
  if (hasPoints) new HasPointsUSP();

  /**
   * Generic page changes
   */
  function pageChanges() {
    try {
      // Move elements
      const promoContainer = document.querySelector('.wideCont > .prPromoGreyContainer');
      if (promoContainer) {
        if (window.innerWidth <= 600) {
          document.querySelector('.prMenuOffersCont .prPromoGreyContainer').insertAdjacentElement('beforebegin', promoContainer);
        } else {
          promoContainer.parentElement.insertAdjacentElement('beforeend', promoContainer);
        }
      }

      // Change product CTA text
      (() => {
        const ctaTextEls = document.querySelectorAll('.prMenuOffersCont .menuList .centerB');
        Array.from(ctaTextEls).forEach((node) => {
          const text = node.innerText.trim();
          if (text === 'ADD') {
            node.innerText = 'REDEEM';
          } else if (/[\d]+ POINTS REQUIRED/.test(text)) {
            node.innerText = node.innerText.replace('POINTS REQUIRED', 'MORE POINTS NEEDED');
          }
        });
      })();
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * Triggers event handlers for ASP.NET end request postbacks
   * @param {object} sender
   */
  function endRequestHook(sender) {
    try {
      const { asyncTarget, sourceElement } = sender._postBackSettings;
      const postbackType = getPostbackType(asyncTarget);
      const postbackTypeHandlers = {
        'Add To Bag': () => {
          const element = getClosest(sourceElement, '.menuList');
          new AddToBagNotification({ product: element });
          setTimeout(() => {
            progressPizza.update();
          }, 500);
        },
        'Remove From Bag': () => {
          setTimeout(() => {
            progressPizza.update();
          }, 500);
        },
      };

      if (postbackType && typeof postbackTypeHandlers[postbackType] === 'function') {
        postbackTypeHandlers[postbackType](); // Init event handler
      }
    } catch (e) {
      console.log(e);
    }
  }

  pageChanges();
  window.prm.add_endRequest(endRequestHook);
  window.prm.add_pageLoaded(pageChanges);
};

export default activate;
