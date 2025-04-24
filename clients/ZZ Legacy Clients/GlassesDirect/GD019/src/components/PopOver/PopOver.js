import settings from '../../lib/settings';
import { poller, observer } from '../../../../../../lib/uc-lib';
import { events, getClosest } from '../../../../../../lib/utils';

const { ID, VARIATION } = settings;

export default class PopOver {
  constructor(options) {
    const opts = options || {};
    this.version = opts.version;
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const navElement = document.createElement('div');
    navElement.classList.add(`${ID}_popOverWrap`, 'button-popover__message');
    navElement.innerHTML = `
      <div class="${ID}_popOver">
        <div class="${ID}_popOver__head">
          <span class="${ID}_popOver__headContent">
            <span class="${ID}_item-count">0</span>/4 added
          </span>
        </div>
        <div class="${ID}_popOver__body hide">
          <div class="${ID}_popOver__CTA">
            <a href="#" class="button-popover__link">Order Home Trial</a>
          </div>
        </div>
      </div>
    `;
    this.navComponent = navElement;

    if (this.version === 'PDP') {
      const ctaElement = document.createElement('div');
      ctaElement.classList.add(`${ID}_popOverWrap`, 'button-popover__message');
      ctaElement.innerHTML = `
        <div class="${ID}_popOver">
          <div class="${ID}_popOver__head">
            <span class="${ID}_popOver__headContent">
              <span class="${ID}_item-count">0</span>/4 Added to your Home trial
            </span>
          </div>
          <div class="${ID}_popOver__body">
            <div class="${ID}_popOver__CTA">
              <a href="https://www.glassesdirect.co.uk/help-me-choose/" class="button-popover__link">Find Another Frame</a>
            </div>
            <div class="${ID}_popOver__CTA">
              <a href="https://www.glassesdirect.co.uk/basket/hometrial/" class="button-popover__link">View Home Trial</a>
            </div>
          </div>
        </div>
      `;
      this.ctaComponent = ctaElement;
    }
  }

  bindEvents() {
    const { ctaComponent, navComponent } = this;
    const eventHandlers = {};
    const isMobile = window.mobileSite;
    const device = isMobile ? 'mobile' : 'desktop';
    const pageType = this.version;
    let pollerRef;
    let hideNavPopupTimeout;
    let hideCtaPopupTimeout;

    // Elements
    const hometrialCTA = document.querySelector('#action-hometrial');
    const outOfStockCTA = document.querySelector('#product-temporarily-out-of-ht');

    // Helpers
    const getBasketCount = () => document.querySelector('#nav-hometrial .badge-count').textContent.trim();
    const thisProductAdded = () => hometrialCTA.classList.contains('button--secondary--active');
    const changeCtaTextTo = (text) => {
      hometrialCTA.getElementsByTagName('span')[1].textContent = text;
      if (outOfStockCTA) outOfStockCTA.childNodes[2].textContent = text;
    };

    // PDP Event Handlers
    /** Change CTA text to appropriate message */
    const updateCTAText = () => {
      const CTAText = document.querySelector(`#${ID}_last-hometrial-text`);
      const basketCount = getBasketCount();
      const productAdded = thisProductAdded();

      switch (basketCount) {
        case '3':
          if (!productAdded) {
            // Update CTA text to add last home trial
            changeCtaTextTo('Add last home trial');

            // Add supporting text under CTA
            if (!CTAText) {
              const prevEl = outOfStockCTA || hometrialCTA;
              prevEl.insertAdjacentHTML('afterend', `<div class="button--${ID}" id="${ID}_last-hometrial-text">You will be taken directly to the home trial checkout</div>`);
            }
          } else {
            // Remove supporting text under CTA if it exists
            if (CTAText) CTAText.parentElement.removeChild(CTAText);
          }
          break;

        case '4':
          if (productAdded) {
            // Change CTA text to remove if this product has been added
            changeCtaTextTo('Remove from home trial');

            // Remove supporting text under CTA if it exists
            if (CTAText) CTAText.parentElement.removeChild(CTAText);
          }
          break;

        default:
          if (!productAdded) {
            // Update CTA text to default add text
            changeCtaTextTo('Add to home trial');

            // Remove supporting text under CTA if it exists
            if (CTAText) CTAText.parentElement.removeChild(CTAText);
          } else {
            // Update CTA text to default remove text
            changeCtaTextTo('Remove from home trial');
          }
          break;
      }
    };

    // Split logic by page and device
    const pageFunctions = {
      PDP: {
        /** Runs only for mobile */
        mobile: () => {
          // Modify inital CTA markup to match desktop
          if (!hometrialCTA.querySelector('span')) {
            const productIsInHomeTrial = thisProductAdded();
            const intialText = productIsInHomeTrial ? hometrialCTA.getAttribute('data-active-text') : hometrialCTA.getAttribute('data-inactive-text');
            hometrialCTA.innerHTML = `<span class="icon icon-hometrial"></span><span data-replaceable-text="">${intialText}</span>`;
          }
        },

        /** Runs for all devices */
        all: () => {
          // Define event handlers
          eventHandlers.modifyMiniBasket = (e) => {
            const cachedBasketCount = getBasketCount();

            // Destroy any previous pollers to avoid conflicts
            if (pollerRef) pollerRef.destroy();

            // If home trial is full, show an error message
            if (device === 'desktop') {
              const checkIfHomeTrialFull = (() => {
                const productWasRemoved = (() => {
                  const isButton = e.target.id && e.target.id === 'action-hometrial';
                  const el = isButton ? e.target : getClosest(e.target, '#action-hometrial');
                  return el.innerText.trim().toLowerCase() === 'remove from home trial';
                })();

                if (!productWasRemoved && cachedBasketCount == 4) {
                  navComponent.querySelector(`.${ID}_popOver__headContent`).innerHTML = '<span style="font-size: 13px;">Your Home Trial is full.</span>';
                  navComponent.classList.add('visible');
                  navComponent.querySelector(`.${ID}_popOver__body`).classList.remove('hide');
                  if (hideNavPopupTimeout) clearTimeout(hideNavPopupTimeout);
                  hideNavPopupTimeout = setTimeout(() => {
                    navComponent.classList.remove('visible');
                  }, 6000);
                }
              })();
            }

            /*
             * When the hometrial basket count no longer matches the cached number
             * a new product has been added
             */
            const productUpdateCallback = () => {
              const newBasketCount = getBasketCount();

              // If final home trial has been added, redirect user to basket page
              // else show home trial added popup
              if (newBasketCount == 4 && thisProductAdded()) {
                events.send(ID, 'Clicked', 'add last home trial / proceeded to home trial checkout', { sendOnce: true });
                window.location = 'https://www.glassesdirect.co.uk/order-hometrial/';
              } else {
                // Hide minibasket popup
                const minibasket = document.querySelector('#popover-hometrial');
                if (minibasket) minibasket.classList.add('hidden');

                // Update home trial basket number
                ctaComponent.querySelector(`.${ID}_item-count`).textContent = newBasketCount;

                // Show home trial popup and hide after 4 seconds
                ctaComponent.classList.add('visible');
                if (hideCtaPopupTimeout) clearTimeout(hideCtaPopupTimeout);
                hideCtaPopupTimeout = setTimeout(() => {
                  ctaComponent.classList.remove('visible');
                }, 4000);
              }
            };

            // Wait for product to be added before making changes
            pollerRef = poller([() => getBasketCount() !== cachedBasketCount], () => {
              events.send(ID, 'View', `${ID} activated - Variation ${VARIATION}`, { sendOnce: true }); // TODO: Change to variation event
              productUpdateCallback();
            });
          };

          // Attach event handlers
          hometrialCTA.addEventListener('click', eventHandlers.modifyMiniBasket);

          // Prevent clicks on popup from bubbling and triggering a button click
          ctaComponent.addEventListener('click', (e) => {
            e.stopPropagation();
          });

          // Init
          updateCTAText();

          // Update CTA text on colour change
          const colours = document.querySelector('.swatch-menu__options');
          if (colours) {
            observer.connect(colours, updateCTAText, {
              throttle: 20,
              config: {
                attributes: true,
                childList: false,
                subtree: true,
              },
            });
          }
        },
      },

      PLP: {
        /** Runs only for desktop */
        desktop: () => {
          // Define event handlers
          eventHandlers.showMiniBasket = (e) => {
            const TIME_TO_SHOW = 6000;
            const cachedBasketCount = getBasketCount();
            const productRemoved = e.target.innerText.trim().toLowerCase() === 'remove from hometrial';

            // Destroy any previous pollers to prevent functions from running more times than necessary
            if (pollerRef) pollerRef.destroy();

            if (!productRemoved && cachedBasketCount == 4) {
              // Home trial is full, show error message
              navComponent.querySelector(`.${ID}_popOver__headContent`).innerHTML = '<span style="font-size: 13px;">Your Home Trial is full.</span>';
              navComponent.classList.add('visible');
              navComponent.querySelector(`.${ID}_popOver__body`).classList.remove('hide');
              if (hideNavPopupTimeout) clearTimeout(hideNavPopupTimeout);
              hideNavPopupTimeout = setTimeout(() => {
                navComponent.classList.remove('visible');
              }, TIME_TO_SHOW);
            } else {
              /** When the hometrial basket count no longer matches the cached number a new product has been added */
              const productUpdateCallback = () => {
                if (pollerRef) pollerRef.destroy();
                const count = getBasketCount();

                // Hide minibasket popup
                const minibasket = document.querySelector('#popover-hometrial');
                if (minibasket) minibasket.classList.add('hidden');

                // Show checkout link if all products have been added
                if (count == 4) {
                  navComponent.querySelector(`.${ID}_popOver__body`).classList.remove('hide');
                } else {
                  navComponent.querySelector(`.${ID}_popOver__body`).classList.add('hide');
                }

                // Show x/4 products added message
                navComponent.querySelector(`.${ID}_popOver__headContent`).innerHTML = `<span class="${ID}_item-count">${count}</span>/4 added`;
                navComponent.classList.add('visible');
                if (hideNavPopupTimeout) clearTimeout(hideNavPopupTimeout);
                hideNavPopupTimeout = setTimeout(() => {
                  navComponent.classList.remove('visible');
                }, TIME_TO_SHOW);
              };

              // Wait for product to be added before making changes
              pollerRef = poller([() => getBasketCount() !== cachedBasketCount], () => {
                events.send(ID, 'View', `${ID} activated - Variation ${VARIATION}`, { sendOnce: true }); // TODO: Change to variation event
                productUpdateCallback();
              });
            }
          };
          eventHandlers.redirectToBasket = () => {
            window.location = 'https://www.glassesdirect.co.uk/order-hometrial/';
          };
          eventHandlers.stickyComponent = () => {
            const offset = window.pageYOffset;
            if (offset >= 215) {
              const receiver = document.querySelector('.active-filters__item--clear-all');
              receiver.insertAdjacentElement('beforeend', navComponent);
            } else {
              const receiver = document.querySelector('#nav-hometrial');
              receiver.insertAdjacentElement('beforeend', navComponent);
            }
          };

          // Attach event handlers
          [].forEach.call(document.querySelectorAll('.action-hometrial'), (trialElement) => {
            trialElement.addEventListener('click', eventHandlers.showMiniBasket);
          });
          navComponent.querySelector('.button-popover__link').addEventListener('click', eventHandlers.redirectToBasket);
          window.addEventListener('scroll', eventHandlers.stickyComponent);
        },
      },

      hometrialBasket: {
        mobile: () => {
          poller(['.hometrial-item.slot-empty a.product-link'], () => {
            const placeholderLinks = document.querySelectorAll('.hometrial-item.slot-empty a.product-link'); 
            [].forEach.call(placeholderLinks, (el) => {
              el.href = '/products';
              el.addEventListener('click', () => {
                events.send(ID, 'Click', 'Clicked empty hometrial slot - basket page');
              });
            });
          });
        },
      },

      all: {
        /** Runs only for desktop */
        desktop: () => {
          // Alter minicart on mutation if desktop
          const popoverContent = document.querySelector('#popover-hometrial .popover-inner');
          const arrow = {
            el: popoverContent.parentElement.querySelector('.popover-arrow'),
            show: () => {
              arrow.el.style.display = '';
            },
            hide: () => {
              arrow.el.style.display = 'none';
            },
          };

          const mutationHandler = (el, mutation) => {
            // Wrap all list items in a div for styling purposes and placeholders in a link
            if (!document.querySelector(`.${ID}_list-itemWrap`)) {
              const trialElements = document.querySelectorAll('#popover-hometrial li.list-item');
              [].forEach.call(trialElements, (element) => {
                const isPlaceholder = element.classList.contains('placeholder-item');
                const content = element.innerHTML;
                element.innerHTML = '';
                const wrap = document.createElement('div');
                wrap.classList.add(`${ID}_list-itemWrap`);
                wrap.innerHTML = isPlaceholder ? `<a href="/products">${content}</a>` : content;
                const link = wrap.querySelector('a');
                if (link) {
                  link.addEventListener('click', () => {
                    events.send(ID, 'Click', 'Clicked empty hometrial slot');
                  });
                }
                element.insertAdjacentElement('afterbegin', wrap);
              });
            }

            // Change header text to show current number in home trial
            const heading = document.querySelector('.list-heading');
            if (heading) {
              heading.textContent = `${getBasketCount()}/4 Added to your Home trial`;
            }

            // Hide arrow if product was removed
            const productWasRemoved = !!document.querySelector('.removed-notice');
            if (productWasRemoved) {
              arrow.hide();
            } else {
              arrow.show();
            }

            // Change placeholder text
            const placeholders = [].filter.call(popoverContent.querySelectorAll('.placeholder-title'), el => el.innerText === 'Choose another frame!');
            placeholders.forEach((el) => {
              el.innerText = el.innerText.replace('Choose another frame!', 'Find another frame');
            });

            // Update CTA text if PDP
            if (pageType === 'PDP') {
              updateCTAText();
            }
          };
          observer.connect(popoverContent, mutationHandler, {
            throttle: 10,
            config: {
              attributes: false,
              childList: true,
              subtree: false,
            },
          });
        },
      },
    };

    // Run page functions
    if (typeof pageFunctions[pageType][device] === 'function') pageFunctions[pageType][device]();
    if (typeof pageFunctions[pageType].all === 'function') pageFunctions[pageType].all();
    if (typeof pageFunctions.all[device] === 'function') pageFunctions.all[device]();
    if (typeof pageFunctions.all.all === 'function') pageFunctions.all.all();
  }

  render() {
    const { navComponent, ctaComponent } = this;
    if (navComponent) document.querySelector('#nav-hometrial').insertAdjacentElement('beforeend', this.navComponent);
    if (ctaComponent) document.querySelector('#product-actions #action-hometrial').insertAdjacentElement('beforeend', this.ctaComponent);
  }
}
