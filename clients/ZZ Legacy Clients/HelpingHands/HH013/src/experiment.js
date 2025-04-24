import { events, fullStory } from '../../../../lib/utils';


/**
 * {{HH013}} - {{Job Seekers V2}}
 */

const Run = () => {
  const $ = window.jQuery;
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: '{{ID}}',
      VARIATION: '{{VARIATION}}',
    },
    cache: (() => {
      const docVar = document;
      const bodyVar = docVar.body;
      const desktopLocation = bodyVar.querySelector('#sidebar > .row > .col-md-12');
      const mobileLocation = docVar.getElementById('mobile-cta-block');
      const tabletLocation = docVar.getElementById('intro');
      const allEmailLinks = bodyVar.querySelectorAll('a[href*="@helpinghands"]');
      const emailLink = allEmailLinks[allEmailLinks.length - 1].getAttribute('href');

      return {
        docVar,
        bodyVar,
        desktopLocation,
        mobileLocation,
        tabletLocation,
        emailLink,
      };
    })(),
    // eslint-disable-next-line
    init: () => {
      if (Exp.settings.VARIATION === '2') {
        events.send(Exp.settings.ID, 'Control', 'Control variation fired');
        return false;
      }
      // Setup
      const { services } = Exp;
      const { settings } = Exp;
      const { components } = Exp;

      Exp.cache.bodyVar.classList.add(settings.ID);
      services.tracking();
      components.setupElements();
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking: () => {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      },
    },
    components: {
      setupElements() {
        const { render } = Exp;
        // Initial render
        if (window.innerWidth <= 767) {
          render.banner(Exp.cache.mobileLocation);
        } else if (window.innerWidth > 767 && window.innerWidth < 992) {
          render.banner(Exp.cache.tabletLocation);
        } else {
          // Render desktop
          render.banner(Exp.cache.desktopLocation);
        }
        // Add resize event listener
        Exp.bindExperimentEvents.handleResize();
        Exp.bindExperimentEvents.addTracking();
        // Event
        events.send(`${Exp.settings.ID}`, 'Seen', 'User saw module', { sendOnce: true });
      },
    },
    render: {
      banner(renderLocation) {
        const reasonMarkup = `
          <div class="HH013_Benefit_Container">
            <img class="HH013_Benefit_Image" src="//useruploads.visualwebsiteoptimizer.com/useruploads/363191/images/0081e78f13894cf4b27b75b341faa1de_purple_people.png" alt="Rewarding work where you really make a difference"/>
            <span class="HH013_Benefit_Text">Rewarding work where you really make a difference</span>
          </div>
          <div class="HH013_Benefit_Container">
            <img class="HH013_Benefit_Image" src="//useruploads.visualwebsiteoptimizer.com/useruploads/363191/images/61fdd7d8d95d4fcf839bf1ec5b7751d1_purple_calender.png" alt="Flexible work patterns to suit your lifestyle" />
            <span class="HH013_Benefit_Text">Flexible work patterns to suit your lifestyle</span>
          </div>
          <div class="HH013_Benefit_Container">
            <img class="HH013_Benefit_Image" src="//useruploads.visualwebsiteoptimizer.com/useruploads/363191/images/4aed0085c897da615a7ac53eb0d293bd_purple_price_icon.png" alt="Competitive rates of pay and a supportive environment" />
            <span class="HH013_Benefit_Text">Competitive rates of pay and a supportive environment</span>
          </div>
          <div class="HH013_Benefit_Container">
            <img class="HH013_Benefit_Image" src="//useruploads.visualwebsiteoptimizer.com/useruploads/363191/images/827dc0525a04a64420375faccab3a124_purple_training_icon_.png" alt="Training and development that is endorsed by Skills for Care" />
            <span class="HH013_Benefit_Text">Training and development that is endorsed by Skills for Care</span>
          </div>
        `;
        renderLocation.insertAdjacentHTML('afterend', `
          <div class="HH013_Container">
            <h3 class="HH013_Header">Why work for Helping Hands?</h3>
              <div class="HH013_Benefits_Container">
                ${reasonMarkup}
              </div>
              <div class="HH013_Button_Container">
                <a href="https://jobsearch.helpinghands.co.uk/" class="HH013_Recruitment_Button HH013_Apply_Now_Button">Apply now</a>
                <a href="${Exp.cache.emailLink}" class="HH013_Recruitment_Button HH013_Email_Button">Email us</a>
              </div>
          </div>
        `);
      },
    },
    bindExperimentEvents: {
      // Add a window resize event listener
      handleResize() {
        window.addEventListener('resize', () => {
          // Remove markup and event listeners
          $('.HH013_Container').remove();
          // Render markup in new position
          const { render } = Exp;
          if (window.innerWidth <= 767) {
            render.banner(Exp.cache.mobileLocation);
          } else if (window.innerWidth > 767 && window.innerWidth < 992) {
            render.banner(Exp.cache.tabletLocation);
          } else {
            // Render desktop
            render.banner(Exp.cache.desktopLocation);
          }
          // Rebind event listeners
          this.addTracking();
        });
      },
      addTracking() {
        // Track apply now button - using jQuery as markup is removed and added
        $('.HH013_Apply_Now_Button').click(() => {
          events.send(`${Exp.settings.ID}`, 'Clicked', 'Apply now', { sendOnce: true });
        });
        // Track email us button
        $('.HH013_Email_Button').click(() => {
          events.send(`${Exp.settings.ID}`, 'Clicked', 'Email us', { sendOnce: true });
        });
      },
    },
  };

  Exp.init();
};

export default Run;
