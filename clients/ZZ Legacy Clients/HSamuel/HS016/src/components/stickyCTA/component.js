import getProductData from './data';
import { throttle } from '../../../../../../lib/uc-lib';
import { cacheDom } from '../../../../../../lib/cache-dom';
import { events, eventFire, scrollTo } from '../../../../../../lib/utils';
import settings from '../../settings';

export default () => {
  const financeAvailable = !!document.querySelector('#js-ifcBuyButton');
  const buyingForm = cacheDom.get('.buying-buttons');
  const productData = getProductData();
  const $ = window.jQuery;

  /**
   * Create component
   * @returns {HTMLElement}
   */
  function create() {
    const component = document.createElement('div');
    component.classList.add('HS016_StickyCTA');
    let html = [
      '<div>',
      `<div class="HS016_StickyCTA__name">${productData.name}</div>`,
      `<div class="HS016_StickyCTA__price">£${productData.price.toFixed(2)}</div>`,
      '</div>',
    ].join('');

    // Only add finance button if it's available
    if (financeAvailable) {
      html += [
        '<div class="HS016_StickyCTA__CTAs">',
        '<div id="HS016_buyCTA" class="HS016_StickyCTA__CTA">Buy Now</div><div class="HS016_StickyCTA__CTA--separator"><span>- OR -</span></div><div id="HS016_financeCTA" class="HS016_StickyCTA__CTA">Pay By Finance</div>',
        '</div>',
      ].join('');
    } else {
      html += [
        '<div class="HS016_StickyCTA__CTAs HS016_StickyCTA__CTAs--single">',
        '<div id="HS016_buyCTA" class="HS016_StickyCTA__CTA">Buy Now</div>',
        '</div>',
      ].join('');
    }

    component.innerHTML = html;

    return component;
  }

  /**
   * Bind events to component
   * @param {HTMLElement} component
   */
  function bindEvents(component) {
    // CTA events
    const buyCTA = component.querySelector('#HS016_buyCTA');
    buyCTA.addEventListener('click', () => {
      // buyingForm.submit();
      document.querySelector('.buying-buttons__buy').click();
      events.send(settings.ID, settings.VARIATION, 'Buy CTA clicked');
    });

    if (financeAvailable && document.querySelector('#js-ifc-modal')) {
      const financeCTA = component.querySelector('#HS016_financeCTA');
      const originalFinanceCTA = cacheDom.get('#js-ifcBuyButton');
      const sizeSelect = document.querySelector('#js-options-select');

      financeCTA.addEventListener('click', () => {
        // Force click on original finance button
        eventFire(originalFinanceCTA, 'click');
        events.send(settings.ID, settings.VARIATION, 'Finance CTA clicked');

        // Update finance button text
        setTimeout(() => {
          financeCTA.innerText = originalFinanceCTA.innerText;
        }, 500);

        // Scroll to error block if it exists
        if (sizeSelect && sizeSelect.options[sizeSelect.selectedIndex].text === 'Choose a size') {
          const errorView = sizeSelect.getBoundingClientRect().bottom + window.scrollY;
          scrollTo(errorView - 200);
        }
      });
    }

    // Window scroll event
    const controls = {
      animating: false,
      show: () => {
        controls.animating = true;
        $(component).slideDown(300, () => {
          events.send(settings.ID, settings.VARIATION, 'Sticky CTAs shown', { sendOnce: true });
          controls.animating = false;
        });
      },
      hide: () => {
        controls.animating = true;
        $(component).slideUp(400, () => {
          controls.animating = false;
        });
      },
    };

    const scrollCheck = throttle(() => {
      if (controls.animating) return false;
      const waypoint = buyingForm.getBoundingClientRect().bottom;
      if (waypoint < 0) {
        controls.show();
      } else if (waypoint >= 0) {
        controls.hide();
      }
      return true;
    }, 200);

    window.addEventListener('scroll', scrollCheck);
  }

  /**
   * Render component on page
   * @param {HTMLElement} component
   */
  function render(component) {
    document.body.appendChild(component);
  }

  const component = create();
  bindEvents(component);
  render(component);
  return component;
};
