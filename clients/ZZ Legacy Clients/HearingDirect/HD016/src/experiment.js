import { fullStory, events } from '../../../../lib/utils';

/**
 * {{HD016}} - {{Navigation Mobile Improvements}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'HD016',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    components.newNav();
    events.useLegacyTracker();
    components.trackIt();
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
    newNav() {
      const currentNavElements = document.querySelectorAll('.site-nav__list li.site-nav__item:first-of-type li.sub-nav__item');
      const div = document.createElement('div');
      div.classList.add('hd16-new-nav');
      const whatCountry = () => {
        const url = window.location.pathname.split('/')[1];
        if (url === 'us') {
          return {
            link1: 'https://www.hearingdirect.com/us/hearing-aids/',
            link2: 'https://www.hearingdirect.com/us/discreet-hearing-aids/',
            link3: 'https://www.hearingdirect.com/us/invisible-hearing-aids/',
          };
        } else {
          return {
            link1: 'https://www.hearingdirect.com/hearing-aids/',
            link2: 'https://www.hearingdirect.com/discreet-hearing-aids/',
            link3: 'https://www.hearingdirect.com/invisible-hearing-aids/',
          };
        }
      };
      const country = whatCountry();
      const html = `
        <ul class="sub-nav__list">
          <li class="hd16-list-title" id="hd16-product"><strong>Products</strong></li>
          <li class="sub-nav__item"><strong><a class="sub-nav__link" href="${country.link1}">View All Hearing Aids</a></strong></li>
          <li class="sub-nav__item"><a class="sub-nav__link" href="${country.link2}">Discreet Hearing Aids</a></li>
          <li class="sub-nav__item"><a class="sub-nav__link" href="${country.link3}">Invisible Hearing Aids</a></li>
        </ul>
        <ul class="sub-nav__list" id="hd16-guides">
          <li class="hd16-list-title"><strong>Guides</strong></li>
        </ul>
        <div class="sub-nav__promo"><img class="sub-nav__promo-img" alt="Help &amp; Advice" src="https://www.hearingdirect.com/skin/frontend/jh/hearingdirect/images/helpandadvice.png">
          <p class="sub-nav__promo-title">Need Some Help?</p>
          <p class="sub-nav__promo-desc"><a href="https://www.hearingdirect.com/contacts/">Click to talk to our lovely team</a></p>
        </div>
      `;
      div.innerHTML = html;
      const ref = document.querySelector('.site-nav__list li.site-nav__item:first-of-type .sub-nav > .container');
      if (ref) {
        ref.innerHTML = html;
      }
      const guidesRef = document.querySelector('#hd16-guides');
      [].forEach.call(currentNavElements, (element) => {
        const text = element.querySelector('a');
        if (!text.textContent.match(/Discreet|Invisible/)) {
          guidesRef.insertAdjacentHTML('beforeend', element.outerHTML);
        }
      });
    },
    trackIt() {
      const newNavLinks = document.querySelectorAll('.site-nav__list li.site-nav__item:first-of-type li.sub-nav__item a');
      const clickEvent = () => {
        events.send('HD016', 'Click', 'User clicked a new nav element', { sendOnce: true });
      };
      for (let i = 0; newNavLinks.length > i; i += 1) {
        newNavLinks[i].addEventListener('click', clickEvent);
      }
    },
  },
};

export default Experiment;
