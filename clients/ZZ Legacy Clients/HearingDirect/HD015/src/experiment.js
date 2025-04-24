import { fullStory, events } from '../../../../lib/utils';

/**
 * {{HD015}} - {{Experiment Title}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'HD015',
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
      // const currentNavElements = document.querySelectorAll('.site-nav__list li.site-nav__item:first-of-type li.sub-nav__item');
      const links = document.querySelectorAll('.site-nav__list li.site-nav__item:first-of-type li.sub-nav__item');
      const arr = [];
      for (let i = 0; links.length > i; i += 1) {
        const link = links[i];
        arr.push({ text: link.querySelector('.sub-nav__link').innerText, href: link.querySelector('.sub-nav__link').href });
      }
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
      const div = document.createElement('div');
      div.classList.add('hd15-new-nav');
      const html = `
        <ul class="sub-nav__list">
          <li class="hd15-list-title" id="hd15-product"><strong>Products</strong></li>
          <li class="sub-nav__item"><strong><a class="sub-nav__link" href="${country.link1}">View All Hearing Aids</a></strong></li>
          <li class="sub-nav__item"><a class="sub-nav__link" href="${country.link2}">Discreet Hearing Aids</a></li>
          <li class="sub-nav__item"><a class="sub-nav__link" href="${country.link3}">Invisible Hearing Aids</a></li>
        </ul>
        <ul class="sub-nav__list" id="hd15-guides">
          <li class="hd15-list-title"><strong>Guides</strong></li>
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
      const guidesRef = document.querySelector('#hd15-guides');
      arr.forEach((element) => {
        if (!element.text.match(/Discreet|Invisible/)) {
          guidesRef.insertAdjacentHTML('beforeend', `<li class="sub-nav__item"><a class="sub-nav__link new-link" href="${element.href}">${element.text}</a></li>`);
        }
      });
    },
    trackIt() {
      const newNavLinks = document.querySelectorAll('.site-nav__list li.site-nav__item:first-of-type li.sub-nav__item a');
      const clickEvent = () => {
        events.send('HD015', 'Click', 'User clicked a new nav element', { sendOnce: true });
      };
      for (let i = 0; newNavLinks.length > i; i += 1) {
        newNavLinks[i].addEventListener('click', clickEvent);
      }
    },
  },
};

export default Experiment;
