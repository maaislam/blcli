import { fullStory, events } from '../../../../lib/utils';
import AC004 from './lib/AC004';
import { pollerLite } from '../../../../lib/uc-lib';


/**
 * {{AC032}} - {{AC004 Desktop Iteration}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'AC032',
    VARIATION: '{{VARIATION}}',
  },

  cache: (() => {
    const bodyVar = document.body;
    let header = null;
    let headerContainer = null;
    let iAmTitle = null;
    let inIndustryTitle = null;
    let orderResultsTitle = null;
    let cta = null;
    let searchWrap = null;
    let submitBtn = null;
    let container = null;
    let lookingForOption = null;
    let industrySelect = null;
    let locationChoice = null;

    return {
      bodyVar,
      header,
    };
  })(),

  init() {
    // Setup
    const { settings, services, cache, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);

    // Run AC004 if not already active
    if (!document.querySelector('.AC004')) {
      AC004();
    }

    // Poll for new elements
    pollerLite(['.AC004_search_wrap', '.AC004_order-wrap'], () => {
      // Re cache AC004 elements
      cache.header = cache.bodyVar.querySelector('.AC004_search_wrap h2.AC004_header');
      cache.headerContainer = cache.bodyVar.querySelector('.AC004_search_wrap .AC004_col-wrap');
      cache.iAmTitle = cache.bodyVar.querySelector('.AC004_search_wrap .AC004_user-type h3');
      cache.inIndustryTitle = cache.bodyVar.querySelector('.AC004_search_wrap .AC004_ind-wrap h3');
      cache.orderResultsTitle = cache.bodyVar.querySelector('.AC004_search_wrap .AC004_order-wrap h3');
      cache.cta = cache.bodyVar.querySelector('.AC004_search_wrap .AC004_search-btn');
      cache.searchWrap = cache.bodyVar.querySelector('.AC004_search_wrap .AC004_col-wrap');
      cache.submitBtn = cache.bodyVar.querySelector('.AC004_search_wrap a.AC004_search-btn');
      cache.container = cache.bodyVar.querySelector('.AC004_search_wrap');
      cache.lookingForOption = cache.bodyVar.querySelectorAll('.AC004_col-wrap .AC004_user-type > div');
      cache.industrySelect = cache.bodyVar.querySelector('.AC004_ind-wrap .AC004_pre_selected_ind');
      cache.locationChoice = cache.bodyVar.querySelector('.AC004_location-wrap .autosuggest');

      // Title
      components.changeHTML(cache.header, '<span><i class="fa fa-search"></i> Refine your search</span>');
      // Add context
      components.addHTML(cache.headerContainer, '<div class="AC032-intro"><p>We recommend you refine your search. Recruitment agencies that are specialised by both location and industry have a <span>60%</span> greater success rate.</p></div>', 'beforebegin');
      // Change "I am" title
      components.changeHTML(cache.iAmTitle, '1. What are you looking for? <sup>*</sup>');
      // Change "In Industry" title
      components.changeHTML(cache.inIndustryTitle, '2. Select an industry and location<sup>*</sup>');
      // Change "Order results by" title
      components.changeHTML(cache.orderResultsTitle, '3. Order results by<sup>*</sup>');
      // Change CTA title
      components.changeHTML(cache.cta, 'Refine Agencies');
      // Refine message
      services.addRefineMessage();
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
    addRefineMessage() {
      const { cache } = Experiment;
      let hasLookingFor = false;
      let hasSelectedIndustry = false;
      let hasLocation = false;
      
      // Add click event to container
      const ref = Experiment.cache.bodyVar.querySelector('.AC004_search_wrap .AC004_search-btn');

      if (!cache.container) return false;

      let count = 0;
      cache.container.addEventListener('click', (e) => {
        // Event for user interaction
        if (count > 1) {
          events.send(Experiment.settings.ID, 'Interaction', 'User interacted with search module', { sendOnce: true });
        }
        count += 1;

        // Check the looking for options
        for (let i = 0; cache.lookingForOption.length > i; i += 1) {
          if (cache.lookingForOption[i].classList.contains('AC004_active')) {
            hasLookingFor = true;
          }
        }
        // Check the industry and location
        if (cache.industrySelect && cache.industrySelect.textContent.trim() !== 'Please select an industry') {
          hasSelectedIndustry = true;
        }
        // Check for location
        if (cache.locationChoice && cache.locationChoice.querySelector('span.autosuggest-result')) {
          hasLocation = true;
        }
        // Check to see if all fields now return true. If so add the message.
        if (hasLookingFor && hasSelectedIndustry && hasLocation) {
          if (ref) {
            if (!Experiment.cache.bodyVar.querySelector('p.AC032-refine-message')) {
              ref.insertAdjacentHTML('afterend', '<p class="AC032-refine-message">Click refine agencies to apply your changes</p>');
              return false;
            }
          }
        }
        // Check for errors to send events on click of submit
        if (e.target.classList.contains('AC004_search-btn')) {
          // Check for error
          if (cache.container.querySelector('.AC004_error')) {
            events.send(Experiment.settings.ID, 'Error', 'Error validation on variation', { sendOnce: true });
          }
        }
      });
    },
    testTracking() {
      // Track loaded
      events.send(Experiment.settings.ID, 'Loaded', 'Experiment has loaded', { sendOnce: true });
      // Catch validation error
      Experiment.cache.submitBtn.addEventListener('click', () => {

      });
    },
  },

  components: {
    changeHTML(el, html) {
      if (el && html) {
        el.innerHTML = html;
      }
    },
    addHTML(ref, html, position) {
      if (ref && html && position) {
        ref.insertAdjacentHTML(position, html);
      }
    },
  },
};

export default Experiment;
