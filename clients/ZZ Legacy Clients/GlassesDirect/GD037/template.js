const { data } = options;
const poller = require('@qubit/poller');
const cm = require('cookieman');
const userIsSignedUp = cm.val('_GD_signUpBanner');
const isMobile = !/computer|tablet/ig.test(options.state.get('deviceType'));
const carousel = options.state.get('carousel')[0];
document.body.classList.add('GD037');

// Convert fields markdown to HTML
Object.keys(data).forEach((prop) => {
  if (typeof data[prop] === 'string') {
    data[prop] = data[prop].replace(/\\n/g, '<br>');
  }
});


/* --------------------
  Helpers
-------------------- */
/**
 * Component helper class
 */
class Component {
  /**
   * @param {Object} options
   * @param {string} options.template Component markup
   * @param {function} options.events Function to bind event handlers to component
   * @param {function} options.render Function to render component
   * @returns {Object}
   */
  constructor(options) {
    this.options = options;
    this.component = Component.templateToElement(options.template);
    if (options.events) options.events(this.component);
    if (options.render) options.render(this.component);
  }

  /**
   * Converts string to elements
   * @param {string} template
   * @returns {HTMLElement}
   */
  static templateToElement(template) {
    const temp = document.createElement('div');
    temp.innerHTML = template.trim().replace(/>\s+</g, '><');

    return temp.firstChild;
  }
}

/**
 * Events helper class
 */
class Event {
  /**
   * @param {object} options Options object
   */
  constructor(options) {
    const opts = options || {};
    this.cache = {
      gaReference: opts.gaReference ? opts.gaReference : 'ga',
      isLegacy: opts.gaReference === '_gaq',
      eventCache: [],
      trackerName: null,
    };    
  }

  /**
   * Waits for GA to fully load before running callback
   * @param {function} callback Callback
   */
  waitForGA(callback) {
    poller([() => {
      try {
        return this.cache.isLegacy ? !!window._gaq : !!window[this.cache.gaReference].getAll().length;
      } catch (err) {
        return false;
      }
    }], () => {
      if (!this.cache.isLegacy) this.cache.trackerName = window[this.cache.gaReference].getAll()[0].get('name');
      this.cache.gaLoaded = true;
      callback();
    });
  }

  /**
   * Sends GA event by calling dispatch when ready
   * @param {string} category Event category
   * @param {string} action Event action
   * @param {string} label Event label
   * @param {object} options Options object
   * @param {boolean} options.nonInteraction Custom nonInteraction value for events (defaults to true)
   * @param {boolean} options.sendOnce "True" prevents same event from sending more than once
   */
  send(category, action, label, options) {
    const opts = options || {};

    // Prevent sending duplicate events if sendOnce is true
    if (opts.sendOnce) {
      const eventID = category + action + label;
      if (this.cache.eventCache.indexOf(eventID) === -1) {
        this.cache.eventCache.push(eventID);
      } else {
        return false;
      }
    }

    if (this.cache.gaLoaded) {
      this.dispatch(category, action, label);
    } else {
      this.waitForGA(() => {
        this.dispatch(category, action, label);
      });
    }

    return true;
  }

  /** Dispatches event */
  dispatch(category, action, label, options) {
    const opts = options || {};

    if (this.cache.isLegacy) {
      window._gaq.push(['_trackEvent', category, action, label, null, (typeof opts.nonInteraction !== 'undefined' ? opts.nonInteraction : true)]);
    } else {
      window[this.cache.gaReference](`${this.cache.trackerName}.send`, 'event', category, action, label, { nonInteraction: (opts.nonInteraction ? opts.nonInteraction : true) });
    }
  }
}
const event = new Event();


/* --------------------
  Components
-------------------- */
// Trustpilot rating
const trustpilot = (() => {
  poller([
    '.site-review-badge__score',
    () => {
      const el = document.querySelector('script[type="application/ld+json"]');
      if (el) {
        const parsedData = JSON.parse(el.innerHTML);
        const trustpilotScore = parsedData.aggregateRating && parsedData.aggregateRating.ratingValue;
        if (typeof parseFloat(trustpilotScore) === 'number') {
          return trustpilotScore;
        }
      }
    },
  ], (score, trustpilotScore) => {
    // Render
    if (isMobile) {
      score[0].insertAdjacentHTML('beforeend', `<span class="GD034_Rating">${trustpilotScore}</span>`);
    } else {
      poller(['#header-primary'], (header) => {
        const ratingText = score[0].textContent;
        header[0].insertAdjacentHTML('beforeend', `
        <div class="GD034_Container">
          <div class="GD034_Image_Container">
            <img class="GD034_Image_Logo" src="//assets.glassesdirect.co.uk/assets/gduk/trustpilot/trust-pilot-logo.1c7311306a87.svg" alt="Trustpilot" />
            <img class="GD034_Image_Stars" src="//assets.glassesdirect.co.uk/assets/gduk/trustpilot/trustpilot_ratings_5.cb9d2c37135d.svg" alt="Trustpilot Rating" />
          </div>
          <div class="GD034_Text_Conatiner">
            <span class="GD034_Rating_Text">${ratingText}</span>
            <span class="GD034_Rating">${trustpilotScore}</span>
          </div>
        </div>
      `);
      });
      document.body.classList.add('GD034');
    }
  });
})();

// Banner Grid Component
const bannerGrid = (() => {
  /*
   * Hero Banner vars
   */
  const newVars = {
    modifier: '--desk',
    img: data.heroImg1,
    terms: data.heroTerms1 ? `<div class="GD037_offer__terms">${data.heroTerms1}</div>` : '',
    offerStyles: `bottom: ${data.heroContent1_bottom}; ${data.heroContent1_side}: ${data.heroContent1_side_offset};`,
    primaryTextStyles: `color: ${data.heroContent1_primary_colour};`,
    secondaryTextStyles: `color: ${data.heroContent1_secondary_colour};`,
    CTAStyles: `background: ${data.heroCta1_bg_colour}; color: ${data.heroCta1_text_colour};`,
    get preTitle() {
      return data.heroPreTitle1 ? `<p class="GD037_banner__preTitle" style="${this.secondaryTextStyles}">${data.heroPreTitle1}</p>` : '';
    },
    get title() {
      let content = '';
      if (data.heroTitle1) {
        content = `
          ${data.heroTitle1 ? `<p class="GD037_banner__title GD037_banner__title--large" style="${this.primaryTextStyles}">${data.heroTitle1}</p>` : ''}
          ${data.heroTitleSmall1 ? `<p class="GD037_banner__title GD037_banner__title--small" style="${this.primaryTextStyles}">${data.heroTitleSmall1}</p>` : ''}
        `;
      }
      return content;
    },
    get smallPrint() {
      return data.heroSmallPrint1 ? `<p class="GD037_banner__smallPrint" style="${this.secondaryTextStyles}">${data.heroSmallPrint1}</p>` : '';
    },
    get CTA() {
      return `<button class="GD037_offer__CTA" style="${this.CTAStyles}">${data.heroCtaText1}</button>`;
    },
    get successTitle() {
      return data.heroSuccessTitle1 ? `<p class="GD037_banner__title GD037_banner__title--success" style="${this.primaryTextStyles}">${data.heroSuccessTitle1}</p>` : '';
    },
    get successText() {
      return data.heroSuccessText1 ? `<p class="GD037_banner__successText" style="${this.secondaryTextStyles}">${data.heroSuccessText1}</p>` : '';
    },
  };

  const returningVars = {
    modifier: '--desk',
    img: data.heroImg1b,
    href: data.heroHref1b,
    offerStyles: `bottom: ${data.heroContent1b_bottom}; ${data.heroContent1b_side}: ${data.heroContent1b_side_offset};`,
    primaryTextStyles: `color: ${data.heroContent1b_primary_colour};`,
    secondaryTextStyles: `color: ${data.heroContent1b_secondary_colour};`,
    showCTA: data.heroCtaShow1b,
    CTAStyles: `background: ${data.heroCta1b_bg_colour}; color: ${data.heroCta1b_text_colour};`,
    get terms() {
      return data.heroTerms1b ? `<p class="GD037_offer__terms" style="${this.secondaryTextStyles}">${data.heroTerms1b}</p>` : '';
    },
    get title() {
      return data.heroTitle1b ? `<p class="GD037_banner__title GD037_banner__title--large" style="${this.primaryTextStyles}">${data.heroTitle1b}</p>` : '';
    },
    get CTA() {
      return `<button class="GD037_offer__CTA" style="${this.CTAStyles} display: ${this.showCTA ? 'inline-block' : 'none'}">${data.heroCtaText1b}</button>`;
    },
    get offerCode() {
      return data.heroOfferCode1b ? `<p class="GD037_offer__code" style="${this.secondaryTextStyles}">${data.heroOfferCode1b}</p>` : '';
    },
  };

  // Mobile specific values
  if (isMobile) {
    newVars.modifier = '--mob';
    newVars.img = data.heroImgM1;
    newVars.primaryTextStyles = `color: ${data.heroContent1_primary_colour_mob};`;
    newVars.secondaryTextStyles = `color: ${data.heroContent1_secondary_colour_mob};`;
    newVars.CTAStyles = `background: ${data.heroCta1_bg_colour_mob}; color: ${data.heroCta1_text_colour_mob};`;

    returningVars.modifier = '--mob';
    returningVars.img = data.heroImgM1b;
    returningVars.primaryTextStyles = `color: ${data.heroContent1b_primary_colour_mob};`;
    returningVars.secondaryTextStyles = `color: ${data.heroContent1b_secondary_colour_mob};`;
    returningVars.CTAStyles = `background: ${data.heroCta1b_bg_colour_mob}; color: ${data.heroCta1b_text_colour_mob};`;
    returningVars.showCTA = true; // Always show CTA on mobile

    // Replace line breaks with spaces for mobile titles;
    data.heroSuccessTitle1 = data.heroSuccessTitle1.replace(/<br>/g, ' ');
  }

  const middlewareToken = cm.val('csrftoken');
  let activeBannerName = cm.val('GD037_defaultBanner') || 'returning';
  const contentTemplates = {
    beforeSignUp: `
      ${newVars.preTitle}
      ${newVars.title}
      ${newVars.smallPrint}
      <div class="GD037_field">
        <form id="GD037_form">
          <input type="hidden" name="csfrmiddlewaretoken" value="${middlewareToken}">
          <input type="email" name="email" placeholder="Enter your email">
          ${newVars.CTA}
        </form>
      </div>
      ${newVars.terms}
    `,
    afterSignUp: `
      ${newVars.successTitle}
      ${newVars.successText}
      <a class="GD037_offer__CTA" href="#" style="background: #1667CA; color: white;">START BROWSING</a>
      ${newVars.terms}
    `,
  };
  const userTemplates = {
    new: `
      <div class="GD037_bannerContent GD037_bannerContent--new ${activeBannerName === 'new' ? 'GD037_bannerContent--active' : ''}">
        <img src="${newVars.img}"/>
        <div class="GD037_offer" style="${newVars.offerStyles}">
          ${userIsSignedUp ? contentTemplates.afterSignUp : contentTemplates.beforeSignUp}
        </div>
      </div>
    `,
    returning: `
      <div class="GD037_bannerContent GD037_bannerContent--returning ${activeBannerName === 'returning' ? 'GD037_bannerContent--active' : ''}">
        <a href="${returningVars.href}">
          <img src="${returningVars.img}"/>
        </a>
        <div class="GD037_offer" style="${returningVars.offerStyles}">
          ${returningVars.title}
          ${returningVars.offerCode}
          ${returningVars.CTA}
        </div>
        ${returningVars.terms}
      </div>
    `,
  };
  const bannerMessages = {
    new: '<em>See our latest offer here</em>',
    returning: 'New to Glasses Direct? <em>Discover our welcome offer</em>',
  };

  /*
   * Grid Banner vars
   */
  const gridVars = {
    modifier: '--desk',
    img2: data.gridImg2,
    img3: data.gridImg3,
    href2: data.gridHref2,
    href3: data.gridHref3,
    terms2: data.gridTerms2 ? `<div class="GD037_offer__terms">${data.gridTerms2} <a href="${data.gridTermsHref2}">${data.gridTermsLinkText2}</a></div>` : '',
    terms3: data.gridTerms3 ? `<div class="GD037_offer__terms">${data.gridTerms3} <a href="${data.gridTermsHref3}">${data.gridTermsLinkText3}</a></div>` : '',
  };

  // Mobile specific values
  if (isMobile) {
    gridVars.modifier = '--mob';
    gridVars.img1 = data.gridImgM1;
    gridVars.titleStyles1 = `color: ${data.gridTitle1_colour_mob};`;
    gridVars.showCTA1 = true; // Always show CTA on mobile
  }

  return new Component({
    template: `
      <div class="GD037_banner-wrapper GD037_section">
        <div class="GD037_banner GD037_banner${newVars.modifier} GD037_banner--1">
          ${userTemplates.new}
          ${userTemplates.returning}
          <div class="GD037_bannerChange">
            <span>${bannerMessages[activeBannerName]}</span>
          </div>
        </div>

        <div class="GD037_banner-grid-wrapper">
          <div class="GD037_banner-grid GD037_banner-grid${gridVars.modifier}">
            <div class="GD037_banner--2">
              <a href="${gridVars.href2}">
                <img src="${gridVars.img2}" />
              </a>
              ${gridVars.terms2}
            </div>

            <div class="GD037_banner--3">
              <a href="${gridVars.href3}">
                <img src="${gridVars.img3}" />
              </a>
              ${gridVars.terms3}
            </div>
          </div>
        </div>
      </div>
    `,
    events: (component) => {
      // Form submission functionality
      const isValidEmail = email => email.match(/.*@.*\..{2,}/);
      const form = component.querySelector('#GD037_form');
      if (form) {
        form.querySelector('button').addEventListener('click', (e) => {
          e.preventDefault();
          const input = form.querySelector('input[type=email]');

          const error = (message) => {
            const err = component.querySelector('.GD037_errorMessage');
            if (!err) {
              component.querySelector('.GD037_field').insertAdjacentHTML('beforeend', `<p class="GD037_errorMessage">${message}</div>`);
            } else {
              err.innerText = message;
            }
          };

          if (isValidEmail(input.value.trim())) {
            $.ajax({
              type: 'POST',
              url: '/newsletter/subscription/',
              data: $(input).serialize(),
              success: () => {
                component.querySelector('.GD037_offer').innerHTML = contentTemplates.afterSignUp;
                cm.set('_GD_signUpBanner', '1');
                event.send('GD037', 'Submitted', 'Email submitted in hero banner');
                require('@qubit/send-uv-event')('GD037:email:signup', options.meta);
              },
              error: () => {
                error('Sorry, there was an error submitting the form. Please try again.');
                event.send('GD037', 'Error', 'Form submit error');
              },
            });
          } else {
            // Enter a valid email
            error('Please enter a valid email address');
          }
        });
      }

      // Banner change
      const bannerChange = component.querySelector('.GD037_bannerChange');
      const bannerText = bannerChange.querySelector('span');

      /**
       * Changes to a different hero banenr
       * @param {string} banner Name of banner to change to
       */
      const changeBannerTo = (banner) => {
        const activeClass = 'GD037_bannerContent--active';
        const activeBanner = component.querySelector(`.${activeClass}`);
        activeBannerName = banner;
        activeBanner.classList.remove(activeClass);
        component.querySelector(`.GD037_bannerContent--${banner}`).classList.add(activeClass);
        bannerText.innerHTML = bannerMessages[banner];
        cm.set('GD037_defaultBanner', activeBannerName);
      };

      bannerChange.addEventListener('click', () => {
        changeBannerTo(activeBannerName === 'new' ? 'returning' : 'new');
      });

      // GA events
      component.querySelector('.GD037_banner--1').addEventListener('click', () => {
        event.send('GD037', 'Clicked', 'Hero banner');
      });

      component.querySelector('.GD037_banner--2').addEventListener('click', () => {
        event.send('GD037', 'Clicked', 'Bottom left banner');
      });

      component.querySelector('.GD037_banner--3').addEventListener('click', () => {
        event.send('GD037', 'Clicked', 'Bottom right banner');
      });

      component.querySelector('.GD037_offer__CTA').addEventListener('click', () => {
        event.send('GD037', 'Clicked', 'Hero banner CTA');
      });
    },
    render: (component) => {
      carousel.insertAdjacentElement('afterend', component);
    },
  });
})();

// Carousel changes
const productCarousel = (() => {
  // Add new Product Carousel
  document.querySelector('#frame-scroller').insertAdjacentHTML('beforebegin', `
    <div class="GD037_product-carousel">
      <div class="tmspslot GD037_tmspslot" data-k="p4kanuk" data-slid="4-product-carousel-userconversion-hp-test" data-p="1"></div>
    </div>
  `);

  const newCarousel = document.querySelector('.GD037_product-carousel');

  // Product Carousel description and events
  poller([
    '.GD037_tmspslot[data-state="loaded"]',
    '.GD037_product-carousel .slick-slider',
  ], () => {
    const $ = window.jQuery;

    // Desc
    newCarousel.querySelector('.set-title').insertAdjacentHTML('afterend', '<div class="GD037_product-carousel__desc"><p>We\'ve selected stylish bestsellers we think you might like.</p><p>Choose from our wide range of frames no matter your budget.</p></div>');

    // Events
    const $slider = $(newCarousel).find('.slick-slider');
    let isSliding = false;
    $slider.on('beforeChange', () => {
      isSliding = true;
      event.send('GD037', 'Scroll', 'Recommended for you carousel interaction', { sendOnce: true });
    });
    $slider.on('afterChange', () => {
      isSliding = false;
    });

    const links = newCarousel.querySelectorAll('.product a');
    Array.from(links).forEach((link) => {
      link.addEventListener('click', () => {
        if (!isSliding) {
          // User clicked and didn't swipe, assumed product click
          event.send('GD037', 'Clicked', 'Product in carousel');
        }
      });
    });
  });
})();

// Discover our ranges component
const ranges = (() => {
  const NUMBER_OF_BANNERS = 4; // Must correspond with number in fields.json
  const datasets = [];
  for (let i = 1; i <= NUMBER_OF_BANNERS; i += 1) {
    datasets.push({
      show: data['rangesShow' + i],
      img: data['rangesImg' + i],
      imgM: data['rangesImgM' + i],
      href: data['rangesHref' + i],
      category: data['rangesCat' + i],
      title: data['rangesTitle' + i],
      usp: data['rangesUSP' + i],
    });
  }

  return new Component({
    template: `
      <div class="GD037_ranges">
        <h3 class="set-title">Discover our ranges</h3>
        <p>We've got over 800 frames to suit any budget. Find yourself a great deal and stylish eyewear.</p>
        ${datasets.map((dataset) => {
        let str = '';
          if (dataset.show) {
            str = `
              <div class="GD037_ranges-banner">
                <a href="${dataset.href}">
                  <img src="${isMobile ? dataset.imgM : dataset.img}"/>
                </a>
                <div class="GD037_ranges-banner-content">
                  <p class="GD037_ranges-banner-category">${dataset.category}</p>
                  <p class="GD037_ranges-banner-title">${dataset.title}</p>
                  <ul class="GD037_ranges-banner-usp">
                    ${dataset.usp.map(usp => `<li>${usp}</li>`).join('')}
                  </ul>
                  <a class="GD037_ranges-banner-cta" href="${dataset.href}">Shop ${dataset.category}</a>
                </div>
              </div>
            `;
          }
          return str;
        }).join('')}
      </div>
    `,
    events: (component) => {
      const banners = component.querySelectorAll('.GD037_ranges-banner');
      Array.from(banners).forEach((banner, i) => {
        banner.addEventListener('click', () => {
          event.send('GD037', 'Clicked', `Ranges ${datasets[i].category} banner`);
        });
      });
    },
    render: (component) => {
      if (isMobile) {
        const mobileBottom = document.querySelector('#home-section-bottom');
        mobileBottom.parentElement.insertBefore(component, mobileBottom);
      } else {
        const wrapper = document.querySelector('#frame-scroller').parentElement;
        wrapper.appendChild(component);
      }
    },
  });
})();

// USP Bar
const usps = (() => {
  const uspData = [
    {
      className: 'trustpilot',
      text: 'Excellent',
      link: 'https://uk.trustpilot.com/review/www.glassesdirect.co.uk',
    },
    {
      className: 'home-trial',
      text: 'Free<br>Home Trial',
      link: 'https://www.glassesdirect.co.uk/free-home-trial/',
    },
    {
      className: 'free-returns',
      text: 'Free<br>Returns',
      link: 'https://www.glassesdirect.co.uk/help/returns-policy/',
    },
    {
      className: 'qualified',
      text: 'Qualified<br>Opticians',
      link: 'https://www.glassesdirect.co.uk/help/contact/',
    },
  ];

  const template = `
    <div class="GD037_usps">
      <ul>
        ${uspData.map(usp => `<li class="GD037_usp GD037_usp--${usp.className}"><a href="${usp.link}"><span class="GD037_usp__img"></span><p>${usp.text}</p></a></li>`).join('')}
      </ul>
    </div>
  `;

  // Render
  ranges.component.insertAdjacentHTML('afterend', template);

  return document.querySelector('.GD037_usps');
})();

// Bottom Banners
const bottomBanners = (() => {
  const banners = [
    {
      img: 'https://dd6zx4ibq538k.cloudfront.net/static/images/2680/3d3d4fac92d78aa134a6eba1f4f77788_1160_320.png',
      link: 'https://www.glassesdirect.co.uk/share/',
    },
    {
      img: 'https://dd6zx4ibq538k.cloudfront.net/static/images/2680/6da65577fbc6959c7f70f891a4b76349_1160_320.jpeg',
      link: 'https://blog.glassesdirect.co.uk/charity',
    },
  ];

  const template = `
    <div class="GD037_bottom-banners">
      <ul>
        ${banners.map(banner => `<li class="GD037_bottom-banner"><a href="${banner.link}"><img src="${banner.img}"/></a></li>`).join('')}
      </ul>
    </div>
  `;

  // Render
  usps.insertAdjacentHTML('afterend', template);

  return document.querySelector('.GD037_bottom-banners');
})();
