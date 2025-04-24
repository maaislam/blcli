import { fullStory, events } from '../../../../lib/utils';
import nav from './lib/nav';
import { poller } from '../../../../lib/uc-lib';

/**
 * {{PD038}} - {{Experiment Title}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'PD038',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    const controlNav = document.querySelector('#header .pd1_navigation');
    components.replaceEl(controlNav, nav);
    const navDropdowns = document.querySelectorAll('.PD038-Navigation-Wrapper .PD038-Title-Wrap');
    if (navDropdowns) {
      [].forEach.call(navDropdowns, (el) => {
        components.toggleNavElement(el);
      });
    }
    // Click tracking
    services.clickTracking();
    // animated scroll
    poller([
      () => {
        let trigger = false;
        if (window.jQuery) trigger = true;
        return trigger;
      },
    ], components.animateScroll);
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
    clickTracking() {
      const viewAllLinks = document.querySelectorAll('.PD038-Navigation-Wrapper .PD038-Links .PD038-view-all');
      if (viewAllLinks) {
        [].forEach.call(viewAllLinks, (link) => {
          const linkText = link.textContent;
          let text = null;
          if (linkText) {
            text = linkText.trim().toLowerCase();
          }
          link.addEventListener('click', () => {
            events.send(Experiment.settings.ID, 'Click', 'View all sublink');
          });
        });
      }
      const subNavLinks = document.querySelectorAll('.PD038-Navigation-Wrapper .PD038-Links > a:not(.PD038-view-all)');
      if (subNavLinks) {
        [].forEach.call(subNavLinks, (link) => {
          link.addEventListener('click', () => {
            events.send(Experiment.settings.ID, 'Click', 'Clicked a secondary Navigation link');
          });
        });
      }
      const menu = document.querySelector('#header a.ui-collapsible-heading-toggle');
      if (menu) {
        menu.addEventListener('click', () => {
          events.send(Experiment.settings.ID, 'Click', 'Navigation Menu - PD038');
        });
      }
    },
  },

  components: {
    replaceEl(ref, el) {
      if (ref && el) {
        ref.innerHTML = el;
        events.send(Experiment.settings.ID, 'Shown', 'New mobile navigation was added', { sendOnce: true });
      }
    },
    toggleNavElement(el) {
      el.addEventListener('click', (e) => {
        const thisArrow = e.currentTarget.querySelector('.PD038-Arrow');
        const thisPanel = e.currentTarget.nextElementSibling;
        
        // Close all other panels
        const otherPanels = document.querySelectorAll('.PD038-Navigation-Wrapper .PD038-Links');
        [].forEach.call(otherPanels, (panel) => {
          if (panel !== thisPanel) {
            panel.classList.remove('PD038-Links--show');
          }
        });

        // Toggle all other arrows
        const otherArrows = document.querySelectorAll('.PD038-Navigation-Wrapper .PD038-Title-Wrap .PD038-Arrow');
        [].forEach.call(otherArrows, (arrow) => {
          if (arrow !== thisArrow) {
            arrow.classList.remove('PD038-closed');
          }
        });

        if (thisArrow && thisPanel) {
          thisPanel.classList.toggle('PD038-Links--show');
          thisArrow.classList.toggle('PD038-closed');
        }
      });
    },
    animateScroll() {
      let $ = null;
      $ = window.jQuery;
      const topLevelNavs = document.querySelectorAll('.PD038-Navigation-Wrapper .PD038-Title-Wrap');
      [].forEach.call(topLevelNavs, (item) => {
        item.addEventListener('click', () => {
          $('html, body').animate({
            scrollTop: $(item).offset().top - 30,
          }, 1000);
        });
      });
    },
  },
};

export default Experiment;
