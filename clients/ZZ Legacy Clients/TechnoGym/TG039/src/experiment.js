import { fullStory, events } from '../../../../lib/utils';
import { poller, observer } from '../../../../lib/uc-lib';
import thesePosts from './lib/posts';

/**
 * {{TG039}} - {{Add sticky brochure request based on tag of blog}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'TG039',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    /**
     * Main object with Category key, to Country code to href
     */
    const obj = thesePosts;
    const cc = components.getCountryCode();
    const url = components.getUrl();
    const cat = components.getCategory(obj, cc, url);
    /**
     * Product urls
     */
    const reasonURLS = {
      myrun: 'https://www.technogym.com/gb/contacts/?reason=catalogue&sku=MYRUN-CONFIGURABLE-EUROPE&type=conf',
      skillrun: 'https://www.technogym.com/gb/contacts/?reason=catalogue&sku=DJJ0EUT',
      skillmill: 'https://www.technogym.com/gb/contacts/?reason=catalogue&sku=DJK04DTAN00EANR2',
      mycycling: 'https://www.technogym.com/gb/contacts/?reason=catalogue&sku=DCS0ANB',
    };
    const reason = components.whichReason(reasonURLS, cat);
    /**
     * HTML to add to page
     */
    poller([
      '.newsroom_post_wrapper .single_post article.single-blog-post',
    ], () => {
      if (!localStorage.getItem('TG039-banner_shown')) {
        const bannerHTML = components.buildHtml(cat, cc, reason);
        const containerRef = document.querySelector('.newsroom_post_wrapper');
        if (url && cat) {
          components.addHTML(containerRef, bannerHTML);
          events.send(settings.ID, 'Added', 'Element has been added to the page', { sendOnce: true });
          // components.scrollPos();
          components.moveTitleMobile();
          const spanToggle = document.querySelector('.TG039-broch-banner span#TG039-toggle');
          if (spanToggle) {
            spanToggle.addEventListener('click', () => {
              components.clickToggle();
            });
          }
          const pathnameIs = window.location.pathname;
          if (pathnameIs.split('/')[1] === 'it') {
            document.body.classList.add('TG039_IT');
          }
          components.mouseOverIt();
          components.removeBanner();
        }
      }
    });
    // Run first time without having the email in the cookie.
    poller([
      '.TG039-broch-banner .TG039-right input#TG039-email',
    ], () => {
      components.controlRequest();
    });
    /**
     * Run a poller for on the contact page, once the form
     * has loaded and the email input, the input value will
     * be populated with the cookie value.
     */
    poller([
      '#contactForm input#email',
    ], components.populateEmail);

    window.addEventListener("resize", function(){
      if(window.innerWidth < 729){
         components.moveTitleMobile();
      }
   });
   /**
    * Amends 17/08/18
    */
    // Run first time without having the email in the cookie.
    poller([
      '.TG039-broch-banner #TG039-toggle',
    ], () => {
      components.plusToggle();

      const banner = document.querySelector('section.TG039-broch-banner');
      if (banner) {
        // adding scroll event
        if (!banner.classList.contains('disable-scroll')) {
          // detects new state and compares it with the new one
          banner.classList.add('slideUp');
          banner.classList.remove('slideDown');
        // saves the new position for iteration.
        }
      }
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
  },

  components: {
    getUrl() {
      return window.location.pathname;
    },
    getCountryCode() {
      return (window.location.pathname).split('/')[1];
    },
    /**
     * @desc returns key
     * @param {Object}
     * @param {CountryCode}
     */
    getKeyByValue(obj, value) {
      return Object.keys(obj).find(key => obj[key] === value);
    },
    /**
     *
     * @param {Object} obj
     * @param {String} country
     * @param {String} url
     */
    getCategory(obj, country, url) {
      url = url.replace(/\/$/, '') + '/';
      return obj[country][url];
    },
    /**
     * @desc Returns HTML for the banner, takes in Img source,
     * cat name and country.
     * @param {String} imgSrc
     * @param {String} catName
     * @param {String} country
     */
    buildHtml(catName, country, reasonUrl) {
      let upperCatName = null;
      // Cap Cat Name
      if (catName) {
        upperCatName = catName.toUpperCase();
      }
      // Determine which img to use.
      let imgSrc = 'https://cdn.optimizely.com/img/8355110909/f2564423cbbf488e82affa6e1c85075e.jpg';
      switch (catName) {
        case 'myrun':
          imgSrc = 'https://cdn.optimizely.com/img/8355110909/f2564423cbbf488e82affa6e1c85075e.jpg';
          break;
        case 'mycycling':
          imgSrc = 'https://cdn.optimizely.com/img/8355110909/f06d8e5ccb4a4ea5a6ac9d1a321e0799.jpg';
          break;
        case 'skillmill':
          imgSrc = 'https://cdn.optimizely.com/img/8355110909/ba51c0d9c72e4962b5eba45c7f92241c.jpg';
          break;
        case 'skillrun':
          imgSrc = 'https://cdn.optimizely.com/img/8355110909/e542c53133a84a2d9a0a324e0fec82d0.jpg';
          break;
        default:
      }
      // Determine which country
      const whichCountry = Experiment.components.getCountryCode();
      if (whichCountry === 'gb') {
        return `
          <section class="TG039-broch-banner">
            <div class="TG039-brochure container">
            <div class="TG039-close_brochure">&times;</div>
              <span id="TG039-toggle"></span>
              <div class="TG039-left">
                <img src="${imgSrc}" alt="${upperCatName}">
              </div>
              <div class="TG039-right">
                <h1>Request ${upperCatName} Brochure</h1>
                <p>Interested in ${upperCatName}? Request a free brochure delivered to your email inbox.</p>
  
                <div class="TG039-right--cta">
                  <input type="email" id="TG039-email" placeholder="Email Address*">
                  <a href="${reasonUrl}" class="button"® id="TG039-email-submit" target="_blank">Request Free Brochure</a>
                  <a href="https://www.technogym.com/${country}/contacts/?reason=call" target="_blank" class="TG039-callback">Request call back ></a>
                  <p class="TG039-required-el">This field is required</p>
                </div>
              </div>
            </div>
          </section>
        `;
      } else if (whichCountry === 'it') {
        return `
          <section class="TG039-broch-banner">
            <div class="TG039-brochure container">
            <div class="TG039-close_brochure">&times;</div>
              <span id="TG039-toggle"></span>
              <div class="TG039-left">
                <img src="${imgSrc}" alt="${upperCatName}">
              </div>
              <div class="TG039-right">
                <h1>Richiedi catalogo ${upperCatName}</h1>
                <p>Interessato a ${upperCatName}? Richiedi il catalogo gratuitamente alla tua email</p>
  
                <div class="TG039-right--cta">
                  <input type="email" id="TG039-email" placeholder="Email Address*">
                  <a href="${reasonUrl}" class="button"® id="TG039-email-submit" target="_blank">Richiedi il catalogo gratuitamente</a>
                  <a href="https://www.technogym.com/${country}/contacts/?reason=call" target="_blank" class="TG039-callback">Ti richiamiamo noi ></a>
                  <p class="TG039-required-el">Questo è un campo obbligatorio.</p>
                </div>
              </div>
            </div>
          </section>
        `;
      }
    },
    /**
     * @desc Returns the reason URL to be passed to the
     * a tag in the HTML.
     * @param {Object} obj
     * @param {String} cat
     */
    whichReason(obj, cat) { 
      return obj[cat];
    },
    /**
     * @desc Inserted Before end of Ref.
     * @param {HTML Element} ref
     * @param {String} html
     */
    addHTML(ref, html) {
      ref.insertAdjacentHTML('afterend', html);
    },
    /**
     * @desc this will submit the email address to a cookie and take us to the
     * relative contact page.
     */
    controlRequest() {
      const emailInput = document.querySelector('.TG039-broch-banner .TG039-right input#TG039-email');
      const submitEmail = document.querySelector('.TG039-broch-banner .TG039-right a#TG039-email-submit');
      // let capturedEmail = false;
      if (emailInput && submitEmail) {
        submitEmail.addEventListener('click', (e) => {
          if (/(.+)@(.+){2,}\.(.+){2,}/.test(emailInput.value)) {
            events.send(Experiment.settings.ID, 'Click', 'User clicked Request Free Brochure', { sendOnce: true });
            e.preventDefault();
            // Remove old item
            localStorage.removeItem('tg39-to-email');
            // Store Email in cookies
            const emailValue = emailInput.value;
            submitEmail.classList.remove('tg39-got-it');
            if (emailValue) {
              localStorage.setItem('tg39-to-email', emailValue);
              submitEmail.classList.add('tg39-got-it');
            }
            window.open(e.currentTarget.href, '_blank');
          } else {
            e.preventDefault();
            emailInput.classList.add('TG039-required');
            const requiredP = document.querySelector('.TG039-broch-banner .TG039-right p.TG039-required-el');
            requiredP.classList.add('TG039-show-required');
          }
        });
      }
    },
    /**
     * @desc populates the contact form email input with the cookie.
     */
    populateEmail() {
      const emailInput = document.querySelector('#contactForm input#email');
      const emailValue = localStorage.getItem('tg39-to-email');
      if (emailValue && emailInput) {
        emailInput.value = '';
        emailInput.value = emailValue;
      }
    },
    /**
     * @desc determine whether the scroll position is up or down.
     */
    scrollPos() {
      let scrollPos = 0;
      const banner = document.querySelector('section.TG039-broch-banner');
      if (banner) {
        // adding scroll event
        window.addEventListener('scroll', () => {
          if (!banner.classList.contains('disable-scroll')) {
            // detects new state and compares it with the new one
            if ((document.body.getBoundingClientRect()).top > scrollPos) {
              banner.classList.add('slideUp');
              banner.classList.remove('slideDown');
            } else {
              // document.getElementById('info-box').dataset.scrollDirection = 'DOWN';
              banner.classList.add('slideDown');
              banner.classList.remove('slideUp');
            }
            // saves the new position for iteration.
          }
          scrollPos = (document.body.getBoundingClientRect()).top;
        });
      }
    },
    moveTitleMobile() {
      if (window.innerWidth <= 729) {
        const title = document.querySelector('.TG039-broch-banner .TG039-right h1');
        const ref = document.querySelector('.TG039-broch-banner .TG039-left');
        if (title && ref) {
          ref.insertAdjacentElement('beforebegin', title);
        }
      }
    },
    /**
     * @desc toggle slider on click of arrow
     */
    clickToggle() {
      const container = document.querySelector('.TG039-broch-banner');
      const toggle = document.querySelector('.TG039-broch-banner #TG039-toggle');
      if (container) {
        if (container.classList.contains('slideDown')) {
          container.classList.add('disable-scroll');
          container.classList.remove('slideDown');
          container.classList.add('slideUp');
          toggle.classList.add('active');
        } else if (container.classList.contains('slideUp')) {
          container.classList.remove('disable-scroll');
          container.classList.remove('slideUp');
          container.classList.add('slideDown');
          toggle.classList.remove('active');
        } else {
          container.classList.add('disable-scroll');
          container.classList.add('slideUp');
          toggle.classList.add('active');
        }
      }
    },
    /**
     * Slide up on mouseover
     */
    mouseOverIt() {
      const banner = document.querySelector('section.TG039-broch-banner');
      const icon = document.querySelector('.TG039-broch-banner #TG039-toggle');
      if (banner) {
        banner.addEventListener('mouseover', () => {
          banner.classList.add('slideUp');
          if (icon) {
            icon.textContent = '';
          }
        });
        banner.addEventListener('mouseout', () => {
          banner.classList.remove('slideUp');
          if (icon) {
            icon.textContent = '';
          }
        });
      }
    },
    /**
     * Change + to - on open / close
     */
    plusToggle() {
      const icon = document.querySelector('.TG039-broch-banner #TG039-toggle');
      const container = document.querySelector('.TG039-broch-banner');
      observer.connect(container, () => {
        if (icon) {
          if (container.classList.contains('slideUp')) {
            icon.textContent = '';
          } else if (container.classList.contains('slideDown')) {
            icon.textContent = '';
          }
        }
      }, {
        config: {
          childList: false,
          attributes: true,
        },
      });
      // }
    },
    removeBanner() {
      const removeBanner = document.querySelector('.TG039-close_brochure');
      const banner = document.querySelector('.TG039-broch-banner');
      removeBanner.addEventListener('click', () => {
        localStorage.setItem('TG039-banner_shown', 1);
        banner.remove();
      });
    },
  },
};

export default Experiment;
