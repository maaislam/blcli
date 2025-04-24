import { pollerLite } from '../../../../lib/uc-lib';
import { fullStory, events } from '../../../../lib/utils';

/**
 * PJ014 - Dealbuilder improvements
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'PJ014',
    VARIATION: '1',
  },

  init() {
    const { services, components } = Experiment;
    services.setup();
    const { elements } = Experiment;

    /*
     * Set as a function to scroll to an element on reload
     */
    let scrollOnReload = false;

    /*
     * Set queuedScroll to true when user clicked select item
     * This is necessary because the the component rebuilds itself
     * on click of this button so we must wait for that to happen
     * before attempting to scroll
     */
    let queuedScroll = false;
    let clickedSinglePizza = false;

    /**
     * When an item is clicked, remember the index number and append the menuItems
     * list to this number on reload
     */
    let itemNumberClicked = false;

    const modifyDealBuilderMarkup = () => {
      // Namespace modified CSS
      elements.dealBuilder.querySelector('.aside-pick-deal').classList.add('PJ014--modified');

      // Modify each item
      const items = Array.from(elements.dealBuilder.querySelectorAll('.select-deal-m > div')).filter(node => node.classList && !node.classList.contains('clearFix'));
      const singleItem = items.length === 1;
      items.forEach((item, index) => {
        // Remove TAP TO from label
        (() => {
          const labelEl = item.querySelector('.deal-overlay > span');
          if (labelEl) {
            let newLabel = labelEl.innerText.replace('TAP TO', '').trim();
            newLabel = newLabel.replace(' OR CHICKEN', '');
            labelEl.innerHTML = `<b>${newLabel}</b>`;
          }
        })();

        // Remove empty p tags
        (() => {
          const pTags = Array.from(item.children).filter(node => node.nodeName === 'P');
          pTags.forEach((node) => {
            if (node.innerHTML === '') {
              node.parentElement.removeChild(node);
            }
          });
        })();

        // Wrap content in containers and add numbers
        (() => {
          // Head
          const head = (() => {
            const container = document.createElement('div');
            container.classList.add('PJ014_itemHead');
            const content = item.querySelector('a');
            const dealTitle = item.querySelector('.deal-title');
            if (dealTitle) {
              container.appendChild(dealTitle);

              // Split second row into new container (toppings, half and half etc.)
              const toppings = dealTitle.childNodes[2] && dealTitle.childNodes[2].nodeType === 3 ? dealTitle.childNodes[2] : null;
              if (toppings) {
                dealTitle.removeChild(toppings);
                dealTitle.insertAdjacentHTML('beforeend', `<div class="PJ014_dealName__toppings">${toppings.nodeValue}</div>`);
              }
            }
            if (content) {
              container.appendChild(content);
            }

            // Add list number
            container.insertAdjacentHTML('afterbegin', `<div class="PJ014_listNumber"><span class="PJ014_listNumber__number">${index + 1}</span></div>`);

            item.insertAdjacentElement('afterbegin', container);

            return container;
          })();

          // Body
          const body = (() => {
            const container = document.createElement('div');
            container.classList.add('PJ014_itemInner');

            if (item.children.length && !item.querySelector('.PJ014_itemInner')) {
              services.wrapAll(item, container);
            }

            return container;
          })();
        })();

        // Add selected class to selected options
        (() => {
          const isSelected = (() => {
            const aTags = item.querySelectorAll('a');
            const removeBtn = Array.from(aTags).filter(node => node.id && node.id.indexOf('lbRemoveProduct') > -1);

            return !aTags.length || removeBtn.length;
          })();
          if (isSelected) {
            item.classList.add('PJ014_selected');
          }
        })();

        // Single item specific changes
        /* (() => {
          if (singleItem) {
            // Add class to change styling
            elements.dealBuilder.querySelector('.aside-pick-deal').classList.add('PJ014--singleItem');

            // If pizza, default to CYO view
          }
        })(); */

        // Change remove icon
        (() => {
          const closeIcon = item.querySelector('.fa-times-circle');
          if (closeIcon) {
            closeIcon.classList.remove('fa-times-circle');
            closeIcon.classList.add('fa-close');
          }
        })();

        // Remember index of clicked option so we can move menuItems below this
        (() => {
          const itemSelected = item.classList.contains('PJ014_selected');
          if (!itemSelected) {
            item.querySelector('a').addEventListener('click', () => {
              itemNumberClicked = index;
            });
          }
        })();

        // Add controls (+/-) if item hasn't been selected
        (() => {
          const itemSelected = item.classList.contains('PJ014_selected');
          if (!itemSelected) {
            const link = item.querySelector('.PJ014_itemHead > a');
            if (link) {
              const control = document.createElement('div');
              control.classList.add('PJ014_itemControl');
              control.innerHTML = '<i class="fa fa-plus" aria-hidden="true"></i>';
              control.addEventListener('click', () => {
                const i = control.querySelector('i');
                if (i.classList.contains('fa-plus')) {
                  // Open menuList
                  control.previousElementSibling.click();
                  i.classList.add('fa-minus');
                  i.classList.remove('fa-plus');
                  item.classList.add('PJ014_option--active');
                } else {
                  // Close menuList
                  const menuItems = elements.dealBuilder.querySelector('.menuItems');
                  if (menuItems) {
                    // Is half & half
                    if (menuItems.parentElement.id && menuItems.parentElement.id.indexOf('objDealBuilderMobile_pnlHalfAndHalf') > -1) {
                      menuItems.parentElement.style.display = 'none';
                    } else {
                      menuItems.parentElement.parentElement.style.display = 'none';
                    }
                    i.classList.add('fa-plus');
                    i.classList.remove('fa-minus');
                    item.classList.remove('PJ014_option--active');
                  } else if (elements.dealBuilder.querySelector('#ctl00_cphBody__objDealBuilderMobile_pnlCustomise')) {
                    // Is CYO
                    elements.dealBuilder.querySelector('#ctl00_cphBody__objDealBuilderMobile_pnlCustomise').style.display = 'none';
                    i.classList.add('fa-plus');
                    i.classList.remove('fa-minus');
                    item.classList.remove('PJ014_option--active');
                  }
                }
              });
              link.insertAdjacentElement('afterend', control);
            }
          }
        })();
      });

      // Scroll to menu if user click select item
      if (queuedScroll && window.jQuery && itemNumberClicked !== false) {
        queuedScroll = false;
        const clickedItem = items[itemNumberClicked];
        const $ = window.jQuery;
        pollerLite([
          '.select-deal-m',
          '.aside-pick-deal',
        ], () => {
          setTimeout(() => {
            $('.aside-pick-deal').animate({
              scrollTop: clickedItem.offsetTop,
            }, 200);
          }, 0);
        });
      }

      // Change add deal CTA text if available
      (() => {
        const CTA = elements.dealBuilder.querySelector('#ctl00_cphBody__objDealBuilderMobile_lbAddDeal');
        if (CTA) {
          CTA.innerText = CTA.innerText.replace('add deal', 'add deal to basket');
        }
      })();

      // If single item, check if Cheese & Tomato pizza and default to CYO view if so
      /* (() => {
        if (singleItem) {
          if (clickedSinglePizza) {
            clickedSinglePizza = false;
            const pizzas = elements.dealBuilder.querySelectorAll('.menuListCont');
            if (pizzas.length === 1) {
              const isCheeseAndTomato = pizzas[0].querySelector('.titleWithIcon').innerText.trim() === 'Cheese & Tomato';
              if (isCheeseAndTomato) {
                // Open CYO view
                const CYOLink = Array.from(elements.dealBuilder.querySelectorAll('a.greenLink')).filter(el => el.innerHTML === 'Create Your Own');
                if (CYOLink.length) {
                  window.__doPostBack(services.encodeID(CYOLink[0].getAttribute('id')), ''); // eslint-disable-line no-underscore-dangle
                }
              }
            }
          } else {
            const selectPizzaLink = elements.dealBuilder.querySelector('.choosePizza');
            if (selectPizzaLink) {
              selectPizzaLink.addEventListener('click', () => {
                clickedSinglePizza = true;
              });
            }
          }
        }
      })(); */

      // Change title
      (() => {
        const title = elements.dealBuilder.querySelector('.welcome');
        if (title) {
          let dealName = title.innerHTML;
          const price = dealName.match(/£(\d{3}|\d{2}|\d{1}).\d{2}/g);
          if (price) {
            dealName = dealName.replace(` for ${price}.`, '');
            dealName = dealName.replace(` for ${price}`, '');
            dealName = dealName.replace(` ${price}`, '');
          }

          const dealContents = elements.dealBuilder.querySelector('.aside-deal-contents');
          dealContents.insertAdjacentHTML('afterbegin', `
            <div class="PJ014_dealName">
              <div class="PJ014_dealName__name">${dealName}</div>
              ${price ? `<div class="PJ014_dealName__price">${price}</div>` : ''}
            </div>
          `);

          title.innerText = 'dealbuilder';
        }
      })();

      // Item submenu changes
      (() => {
        const mainBlock = elements.dealBuilder.querySelector('#ctl00_cphBody__objDealBuilderMobile_pnlPizzas') || elements.dealBuilder.querySelector('#ctl00_cphBody__objDealBuilderMobile_pnlCustomise') || elements.dealBuilder.querySelector('#ctl00_cphBody__objDealBuilderMobile_pnlHalfAndHalf');
        if (mainBlock) {
          // Change 'add' to 'select' on all CTAs
          Array.from(mainBlock.querySelectorAll('.greenButton .centerB, .butContainer a')).filter(node => node.innerText.toLowerCase() === 'add').forEach((node) => {
            const el = node;
            el.innerText = 'Select';
          });

          // Change 'options' to 'customise' on all CTAs
          Array.from(mainBlock.querySelectorAll('.greenButton .centerB, .butContainer a')).filter(node => node.innerText.toLowerCase() === 'options').forEach((node) => {
            const el = node;
            el.innerText = 'Customise';
          });

          // Move submenu/customise block to underneath corresponding option number
          if (itemNumberClicked !== false) {
            const clickedOption = items[itemNumberClicked];
            clickedOption.appendChild(mainBlock);
            const option = clickedOption.querySelector('.PJ014_itemControl i');
            if (option) {
              option.classList.add('fa-minus');
              option.classList.remove('fa-plus');
              clickedOption.classList.add('PJ014_option--active');
            }
            // itemNumberClicked = false; // Reset
          }
        }
      })();

      // Add an inactive CTA if not all options are selected
      (() => {
        const CTA = elements.dealBuilder.querySelector('.m-checkout-buttons > a');
        const priceEl = elements.dealBuilder.querySelector('.PJ014_dealName__price');
        if (!CTA) {
          elements.dealBuilder.querySelector('.aside-deal-contents').insertAdjacentHTML('beforeend', `<div class="m-checkout-buttons PJ014_CTA--inactive"><a class="actionButton">add deal to basket${priceEl ? ` - ${priceEl.innerText}` : ''}</a></div>`);
        }
      })();

      // Move any descriptive text to bottom, below options
      (() => {
        const desc = elements.dealBuilder.querySelector('.aside-deal-contents > p');
        const priceModifier = elements.dealBuilder.querySelector('#ctl00_cphBody__objDealBuilderMobile_pnlPriceModifier');
        if (priceModifier) {
          priceModifier.insertAdjacentElement('beforebegin', desc);
        } else if (desc) {
          elements.dealBuilder.querySelector('.aside-deal-contents').insertAdjacentElement('beforeend', desc);
        }
      })();
    };

    // Events
    const bindEvents = () => {
      if (elements.dealBuilder) {
        elements.dealBuilder.addEventListener('click', (e) => {
          let node = e.target;
          let select = null; // Select item
          let pic = null; // Item picture

          while (node !== this) {
            if (node && node.classList && (node.classList.contains('choosePizza') || node.classList.contains('greenLink'))) {
              // Clicked select item
              select = node;
              break;
            } else if (node && node.classList && node.classList.contains('pic') && node.parentElement.classList.contains('menuListCont')) {
              // Clicked item picture
              pic = node;
            }
            if (node.parentNode) {
              node = node.parentNode;
            } else {
              break;
            }
          }

          // Clicked select an item, scroll to items on reload
          if (select) queuedScroll = true;
          if (pic) {
            const item = pic.parentElement;
            services.forceAdd(item);
          }
        });
      }

      // Anchor user to next step if selecting half and half step
      window.prm.add_beginRequest((sender, args) => {
        try {
          const element = args._postBackElement; // eslint-disable-line no-underscore-dangle
          const id = element.getAttribute('id');

          if (/objHalfAndHalf/.test(id)) {
            // Clicked a Half & Half option
            if (/objHalfAndHalf_lb(Original|Authentic|Stuffed|Deep)/.test(id)) {
              // Clicked base
              scrollOnReload = () => {
                const $ = window.jQuery;
                setTimeout(() => {
                  $('.aside-pick-deal').animate({
                    scrollTop: $('#ctl00_cphBody__objDealBuilderMobile__objHalfAndHalf_upHalf1').offset().top,
                  }, 400);
                  scrollOnReload = false;
                }, 200);
              };
            }

            if (/objHalfAndHalf__rptPizzaHalf1_ctl[\d]+_lbHalf1/.test(id)) {
              // Clicked 1st half
              scrollOnReload = () => {
                const $ = window.jQuery;
                setTimeout(() => {
                  $('.aside-pick-deal').animate({
                    scrollTop: $('#ctl00_cphBody__objDealBuilderMobile__objHalfAndHalf_lbHalf2Header').offset().top + 20,
                  }, 400);
                  scrollOnReload = false;
                }, 200);
              };
            }

            if (/objHalfAndHalf__rptPizzaHalf2_ctl[\d]+_lbHalf2/.test(id)) {
              // Clicked 2nd half
              scrollOnReload = () => {
                const $ = window.jQuery;
                setTimeout(() => {
                  $('.aside-pick-deal').animate({
                    scrollTop: $('#ctl00_cphBody__objDealBuilderMobile__objHalfAndHalf_lbAdd').offset().top,
                  }, 400);
                  scrollOnReload = false;
                }, 200);
              };
            }
          }
        } catch (e) {} // eslint-disable-line

        return true;
      });
    };

    // Init experiment
    bindEvents();
    modifyDealBuilderMarkup();
    components.loader.init();

    // Re-init experiment when the deal builder refreshes
    window.prm.add_pageLoaded(() => {
      try {
        if (!elements.dealBuilder.querySelector('.PJ014--modified')) {
          modifyDealBuilderMarkup();
        }
        if (scrollOnReload && typeof scrollOnReload === 'function') {
          scrollOnReload();
        }
      } catch (e) {} // eslint-disable-line
    });
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
    },

    /**
     * @desc Caches elements to be used in the experiment
     */
    cacheElements() {
      const { elements } = Experiment;
      elements.dealBuilder = document.querySelector('#ctl00_cphBody__objDealBuilderMobile_upDealBuilder');
    },

    /**
     * @desc Runs all setup functions
     */
    setup() {
      const { settings, services } = Experiment;
      services.tracking();
      services.cacheElements();
      document.body.classList.add(settings.ID);
    },

    /**
     * @desc Wraps elements in a container
     * @param {HTMLElement} target Target containing child nodes which will be wrapped
     * @param {HTMLElement} wrapper Element to wrap nodes in
     * @returns {HTMLElement} Container with elements inside
     */
    wrapAll(target, wrapper) {
      const children = Array.from(target.childNodes);
      children.forEach(child => wrapper.appendChild(child));
      target.appendChild(wrapper);
      return wrapper;
    },

    /**
     * @desc Encodes an element ID to be used in postbacks
     * @param {String} id Id of the element to format
     * @returns {String} Formatted string
     */
    encodeID(id) {
      // Reverse string as a workaround for no negative lookbehind in regex
      const reverse = s => s.split('').reverse().join('');
      let encoded = reverse(id);
      encoded = encoded.replace(/_(?!_)/g, '$');
      encoded = reverse(encoded);
      return encoded;
    },

    /**
     * @desc Adds item to selection
     * @param {HTMLElement} item Item to add
     */
    forceAdd(item) {
      const { services } = Experiment;
      try {
        const add = (() => {
          let addEl = Array.from(item.querySelectorAll('.splitButtons a')).filter(el => el.innerHTML === 'Add')[0];
          if (!addEl) {
            addEl = item.querySelector('.greenButton');
          }
          return addEl;
        })();
        const addID = add.getAttribute('id');
        const encodedID = services.encodeID(addID);
        window.__doPostBack(encodedID, ''); // eslint-disable-line no-underscore-dangle
      } catch (e) {
        // console.log('Failed adding selection');
      }
    },
  },

  components: {
    loader: {
      create() {
        const element = document.createElement('div');
        element.classList.add('PJ014_pageOverlay');
        element.innerHTML = '<div class="PJ014_loadingDots"><span>.</span><span>.</span><span>.</span><span>.</span><span>.</span></div>';
        return element;
      },

      bindEvents(component) {
        const loader = component;
        const ctrls = {
          show: () => {
            if (window.jQuery) {
              window.jQuery(loader).fadeIn();
            } else {
              loader.style.display = 'block';
            }
          },

          hide: () => {
            if (window.jQuery) {
              window.jQuery(loader).fadeOut();
            } else {
              loader.style.display = 'none';
            }
          },
        };

        window.prm.add_beginRequest((sender, args) => {
          try {
            const element = args._postBackElement; // eslint-disable-line no-underscore-dangle
            const id = element.getAttribute('id');
            if (/_lbSelect/.test(id)) {
              // Clicked select / remove - don't show loader
              return false;
            }

            ctrls.show();
            setTimeout(() => {
              ctrls.hide();
            }, 3000);
          } catch (e) {} // eslint-disable-line

          return true;
        });

        window.prm.add_endRequest(() => {
          try {
            ctrls.hide();
          } catch (e) {} // eslint-disable-line

          return true;
        });
      },

      render(component) {
        document.body.appendChild(component);
      },

      init() {
        const component = this.create();
        this.bindEvents(component);
        this.render(component);
        Experiment.elements.loader = component;
      },
    },
  },

  elements: {},
};

export default Experiment;
