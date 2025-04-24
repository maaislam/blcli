import { fullStory, events } from '../../../../lib/utils';

/**
 * {{PJ033}} - {{Mobile Offer Filter}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'PJ033',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    let $ = null;
    $ = window.jQuery;
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    
    const filters = components.buildFilters();
    const ref = document.querySelector('.main .promocodeOffers');
    if (ref && filters !== null) {
      components.appendFilter(ref, filters);
    }
    components.controlFilter();
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
  },

  components: {
    buildFilters() {
      const html = `
        <div class="nearestStore filter">
          <span>Filter by deal type: </span>
          <p>
              <span class="cssRadio">
                  <input id="ctl00_cphBody__objOffers_rdFilterAll" type="radio" name="ctl00$cphBody$_objOffers$OfferFilter" value="rdFilterAll" checked="checked">
                  <label for="ctl00_cphBody__objOffers_rdFilterAll">
                      All</label>
                  <input id="ctl00_cphBody__objOffers_rdFilterMealDeals" type="radio" name="ctl00$cphBody$_objOffers$OfferFilter" value="rdFilterMealDeals" data-val="ctl00$cphBody$_objOffers$rdFilterMealDeals">
                  <label for="ctl00_cphBody__objOffers_rdFilterMealDeals">
                      Meal Deals</label>
                  <input id="ctl00_cphBody__objOffers_rdFilterSpecialPricePizza" type="radio" name="ctl00$cphBody$_objOffers$OfferFilter" value="rdFilterSpecialPricePizza" data-val="ctl00$cphBody$_objOffers$rdFilterSpecialPricePizza">
                  <label for="ctl00_cphBody__objOffers_rdFilterSpecialPricePizza">
                      Special Price Pizza</label>
                  <input id="ctl00_cphBody__objOffers_rdFilterPoundOrOff" type="radio" name="ctl00$cphBody$_objOffers$OfferFilter" value="rdFilterPoundOrOff" data-val="ctl00$cphBody$_objOffers$rdFilterPoundOrOff">
                  <label for="ctl00_cphBody__objOffers_rdFilterPoundOrOff">
                      £ or % off</label>
              </span>
          </p>
          <div class="clearFix">
          </div>
        </div>
      `;
      return html;
    },
    appendFilter(ref, el) {
      if (ref && el) {
        ref.insertAdjacentHTML('afterend', el);
      }
    },
    controlFilter() {
      const form = document.querySelector('#aspnetForm');
      const filters = document.querySelectorAll('.nearestStore.filter span.cssRadio input[type="radio"]');
      
      const url = `https://www.papajohns.co.uk${window.location.pathname}`;
      /**
       * Site functions
       */
      // var theForm = document.forms['aspnetForm'];
      // if (!theForm) {
      //     theForm = document.aspnetForm;
      // }
      // function __doPostBack(eventTarget, eventArgument) {
      //     if (!theForm.onsubmit || (theForm.onsubmit() != false)) {
      //         theForm.__EVENTTARGET.value = eventTarget;
      //         theForm.__EVENTARGUMENT.value = eventArgument;
      //         theForm.submit();
      //     }
      // }
      // const toggleChecked = (el) => {
      //   if (el.getAttribute('checked') === 'checked') {
      //     el.setAttribute('checked', '');
      //   } else {
      //     el.setAttribute('checked', 'checked');
      //   }
      // };
      [].forEach.call(filters, (filter) => {
        filter.addEventListener('click', (event) => {
          event.preventDefault();
          const dataVal = filter.getAttribute('data-val');
          [].forEach.call(filters, (filter) => {
            if (filter !== event.currentTarget) {
              filter.setAttribute('checked', '');
            } else {
              filter.setAttribute('checked', 'checked');
            }
          });
          console.log(dataVal);
          window.__doPostBack(dataVal, '');
        });
      });
    },
  },
};

export default Experiment;
