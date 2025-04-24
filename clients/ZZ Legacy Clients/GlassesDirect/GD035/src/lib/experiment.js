const { data } = options;
const poller = require('@qubit/poller');
const cm = require('cookieman');
const userIsSignedUp = cm.val('_GD_signUpBanner') && cm.val('_GD_signUpBanner') !== '0';
const els = options.state.get('els');
const $ = window.jQuery;
const isMobile = !/computer|tablet/ig.test(options.state.get('deviceType'));
document.body.classList.add('GD035');

// FullStory Tagging
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
const fullStory = (experiment_str, variation_str) => {
  poller([
    () => !!(window.fs && window.fs.setUserVars),
  ], () => {
    window.FS.setUserVars({
      experiment_str,
      variation_str,
    });
  }, {
    multiplier: 1.2,
    timeout: 0,
  });
};
fullStory('GD035', '1');

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

// Hero Banner 1
const heroBanner = (() => {
  const newVars = {
    modifier: '--desk',
    img: data.heroImg1,
    terms: data.heroTerms1 ? `<div class="GD035_offer__terms">${data.heroTerms1}</div>` : '',
    offerStyles: `bottom: ${data.heroContent1_bottom}; ${data.heroContent1_side}: ${data.heroContent1_side_offset};`,
    primaryTextStyles: `color: ${data.heroContent1_primary_colour};`,
    secondaryTextStyles: `color: ${data.heroContent1_secondary_colour};`,
    CTAStyles: `background: ${data.heroCta1_bg_colour}; color: ${data.heroCta1_text_colour};`,
    get preTitle() {
      return data.heroPreTitle1 ? `<p class="GD035_banner__preTitle" style="${this.secondaryTextStyles}">${data.heroPreTitle1}</p>` : '';
    },
    get title() {
      let content = '';
      if (data.heroTitle1) {
        content = `
          ${data.heroTitle1 ? `<p class="GD035_banner__title GD035_banner__title--large" style="${this.primaryTextStyles}">${data.heroTitle1}</p>` : ''}
          ${data.heroTitleSmall1 ? `<p class="GD035_banner__title GD035_banner__title--small" style="${this.primaryTextStyles}">${data.heroTitleSmall1}</p>` : ''}
        `;
      }
      return content;
    },
    get smallPrint() {
      return data.heroSmallPrint1 ? `<p class="GD035_banner__smallPrint" style="${this.secondaryTextStyles}">${data.heroSmallPrint1}</p>` : '';
    },
    get CTA() {
      return `<button class="GD035_offer__CTA" style="${this.CTAStyles}">${data.heroCtaText1}</button>`;
    },
    get successTitle() {
      return data.heroSuccessTitle1 ? `<p class="GD035_banner__title GD035_banner__title--success" style="${this.primaryTextStyles}">${data.heroSuccessTitle1}</p>` : '';
    },
    get successText() {
      return data.heroSuccessText1 ? `<p class="GD035_banner__successText" style="${this.secondaryTextStyles}">${data.heroSuccessText1}</p>` : '';
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
      return data.heroTerms1b ? `<p class="GD035_offer__terms" style="${this.secondaryTextStyles}">${data.heroTerms1b}</p>` : '';
    },
    get title() {
      return data.heroTitle1b ? `<p class="GD035_banner__title GD035_banner__title--large" style="${this.primaryTextStyles}">${data.heroTitle1b}</p>` : '';
    },
    get CTA() {
      return `<a href="${this.href}" class="GD035_offer__CTA" style="${this.CTAStyles} display: ${this.showCTA ? 'inline-block' : 'none'}">${data.heroCtaText1b}</a>`;
    },
    get offerCode() {
      return data.heroOfferCode1b ? `<p class="GD035_offer__code" style="${this.secondaryTextStyles}">${data.heroOfferCode1b}</p>` : '';
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
  let activeBannerName = cm.val('GD035_defaultBanner') || 'new';
  const contentTemplates = {
    beforeSignUp: `
      ${newVars.preTitle}
      ${newVars.title}
      ${newVars.smallPrint}
      <div class="GD035_field">
        <form id="GD035_form">
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
      <a class="GD035_offer__CTA" href="https://www.glassesdirect.co.uk/popular/2-for-1-from-49/?page=1&sort=demand-desc&rows=30&aspect=front" style="background: #1667CA; color: white;">START BROWSING</a>
      ${newVars.terms}
    `,
  };
  const userTemplates = {
    new: `
      <div class="GD035_bannerContent GD035_bannerContent--new ${activeBannerName === 'new' ? 'GD035_bannerContent--active' : ''}">
        <img src="${newVars.img}"/>
        <div class="GD035_offer" style="${newVars.offerStyles}">
          ${userIsSignedUp ? contentTemplates.afterSignUp : contentTemplates.beforeSignUp}
        </div>
      </div>
    `,
    returning: `
      <div class="GD035_bannerContent GD035_bannerContent--returning ${activeBannerName === 'returning' ? 'GD035_bannerContent--active' : ''}">
        <a href="${returningVars.href}">
          <img src="${returningVars.img}"/>
        </a>
        <div class="GD035_offer" style="${returningVars.offerStyles}">
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

  return new Component({
    template: `
      <div class="GD035_banner-wrapper GD035_section">
        <div class="GD035_banner GD035_banner${newVars.modifier} GD035_banner--1">
          ${userTemplates.new}
          ${userTemplates.returning}
          <div class="GD035_bannerChange">
            <span>${bannerMessages[activeBannerName]}</span>
          </div>
        </div>
      </div>
    `,
    events: (component) => {
      // Form submission functionality
      const isValidEmail = email => email.match(/.*@.*\..{2,}/);
      const form = component.querySelector('#GD035_form');
      if (form) {
        form.querySelector('button').addEventListener('click', (e) => {
          e.preventDefault();
          const input = form.querySelector('input[type=email]');

          const error = (message) => {
            const err = component.querySelector('.GD035_errorMessage');
            if (!err) {
              component.querySelector('.GD035_field').insertAdjacentHTML('beforeend', `<p class="GD035_errorMessage">${message}</div>`);
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
                component.querySelector('.GD035_offer').innerHTML = contentTemplates.afterSignUp;
                cm.set('_GD_signUpBanner', '1');
                event.send('GD035', 'Submitted', 'Email submitted in hero banner');
                require('@qubit/send-uv-event')('GD035:email:signup', options.meta);
              },
              error: () => {
                error('Sorry, there was an error submitting the form. Please try again.');
                event.send('GD035', 'Error', 'Form submit error');
              },
            });
          } else {
            // Enter a valid email
            error('Please enter a valid email address');
          }
        });
      }

      // Banner change
      const bannerChange = component.querySelector('.GD035_bannerChange');
      const bannerText = bannerChange.querySelector('span');

      /**
       * Changes to a different hero banenr
       * @param {string} banner Name of banner to change to
       */
      const changeBannerTo = (banner) => {
        const activeClass = 'GD035_bannerContent--active';
        const activeBanner = component.querySelector(`.${activeClass}`);
        activeBannerName = banner;
        activeBanner.classList.remove(activeClass);
        component.querySelector(`.GD035_bannerContent--${banner}`).classList.add(activeClass);
        bannerText.innerHTML = bannerMessages[banner];
        cm.set('GD035_defaultBanner', activeBannerName);
      };

      bannerChange.addEventListener('click', () => {
        changeBannerTo(activeBannerName === 'new' ? 'returning' : 'new');
      });
    },
    render: (component) => {
      els.$carousel[0].insertAdjacentElement('afterend', component);
    },
  });
})();

// Videos
const videos = (() => {
  const videoData = [
    {
      title: 'Free Home Trial',
      text: 'Our Home Trial service lets you try up to 4 frames for 7 days at home, for free.',
      img: 'https://dd6zx4ibq538k.cloudfront.net/static/images/2680/affc32e8647934d64adc76b280aaf57d_800_600.jpeg',
      videoLinkTitle: 'Free home trials',
    },
    {
      title: 'Virtual Try-On',
      text: 'With Virtual Try-On you an try any frame from your home with just a webcam.',
      img: 'https://dd6zx4ibq538k.cloudfront.net/static/images/2680/a3504ef9c066376a00b355730d5fe5b5_800_600.jpeg',
      videoLinkTitle: 'Virtual Try-on',
    },
    {
      title: 'Easy to Order',
      text: 'Ordering with us is so easy thanks to the 30-day returns and friendly customer service.',
      img: 'https://dd6zx4ibq538k.cloudfront.net/static/images/2680/6feb625eacf201015d79842e7f30f3fe_800_600.jpeg',
      videoLinkTitle: 'How to order',
    },
  ];

  return new Component({
    template: `
      <div class="GD035_videos GD035_section">
        <div class="GD035_section__inner">
          <h3 class="set-title">Easy to try, easy to order</h3>
          <p>When you buy at Glasses Direct, you’re not only buying great quality frames at great prices, but you’re also buying convenience, peace of mind and efficiency.</p>
          <ul>
            ${videoData.map(video => `
              <li class="GD035_video" data-video="${video.videoLinkTitle}">
                <div class="GD035_video__img">
                  <img src="${video.img}" />
                </div>
                <div class="GD035_video__title">${video.title}</div>
                <p>${video.text}</p>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>
    `,
    events: (component) => {
      const items = component.querySelectorAll('.GD035_video');
      Array.from(items).forEach((item) => {
        const linkTitle = item.getAttribute('data-video');
        poller([`.cboxElement[title="${linkTitle}"]`], () => {
          item.querySelector('.GD035_video__img').addEventListener('click', () => {
            event.send('GD035', 'Clicked', 'Watch video');
            document.querySelector(`.cboxElement[title="${linkTitle}"]`).click();
          });
        });
      });
    },
    render: (component) => {
      if (typeof heroBanner !== 'undefined') {
        heroBanner.component.insertAdjacentElement('afterend', component);
      } else {
        els.$carousel[0].insertAdjacentElement('afterend', component);
      }
    },
  });
})();

// Product Carousel
const productCarousel = (() => {
  // Add new Product Carousel
  videos.component.insertAdjacentHTML('afterend', `
    <div class="GD035_product-carousel GD035_section">
      <div class="tmspslot GD035_tmspslot" data-k="p4kanuk" data-slid="4-product-carousel-userconversion-hp-test" data-p="1"></div>
    </div>
  `);

  const newCarousel = document.querySelector('.GD035_product-carousel');

  // Product Carousel description and events
  poller([
    '.GD035_tmspslot[data-state="loaded"]',
    '.GD035_product-carousel .slick-slider',
  ], () => {
    const $ = window.jQuery;

    // Change title
    const title = newCarousel.querySelector('.set-title');
    title.innerText = 'Best Sellers';

    // Add desc
    title.insertAdjacentHTML('afterend', '<div class="GD035_product-carousel__desc"><p>Discover the must-have designer brands like Ray-Ban® Oakley and Jimmy Choo and our house brands like London Retro and Scout. Plus, stock up on all the latest trending shapes and classic styles.</p></div>');

    // After content
    newCarousel.querySelector('.slick-slider').insertAdjacentHTML('afterend', `
      <div class="GD035_product-carousel__desc GD035_product-carousel__desc--bottom">
        <p>Looking for something else? Discover our wide range of glasses and choose from up to 800 frames.</p>
        <a class="GD035_offer__CTA" href="/products">Find your style</a>
      </div>
    `);

    newCarousel.querySelector('.GD035_product-carousel__desc--bottom .GD035_offer__CTA').addEventListener('click', () => {
      event.send('GD035', 'Clicked', 'Find Your Style');
    });

    // Events
    const $slider = $(newCarousel).find('.slick-slider');
    let isSliding = false;
    $slider.on('beforeChange', () => {
      isSliding = true;
      event.send('GD035', 'Scroll', 'Recommended for you carousel interaction', { sendOnce: true });
    });
    $slider.on('afterChange', () => {
      isSliding = false;
    });

    const links = newCarousel.querySelectorAll('.product a');
    Array.from(links).forEach((link) => {
      link.addEventListener('click', () => {
        if (!isSliding) {
          // User clicked and didn't swipe, assumed product click
          event.send('GD035', 'Clicked', 'Product in carousel');
        }
      });
    });
  });

  return newCarousel;
})();

// Hero Banner 2
const heroBanner2 = (() => {
  // Default values
  const vars = {
    modifier: '--desk',
    img: data.heroImg2,
    terms: data.heroTerms2 ? `<div class="GD035_offer__terms">${data.heroTerms2}</div>` : '',
    link: data.heroHref2 ? data.heroHref2 : '#',
    offerStyles: `bottom: ${data.heroContent2_bottom}; ${data.heroContent2_side}: ${data.heroContent2_side_offset};`,
    primaryTextStyles: `color: ${data.heroContent2_primary_colour};`,
    secondaryTextStyles: `color: ${data.heroContent2_secondary_colour};`,
    CTAStyles: `background: ${data.heroCta2_bg_colour}; color: ${data.heroCta2_text_colour};`,
    get preTitle() {
      return data.heroPreTitle2 ? `<p class="GD035_banner__preTitle" style="${this.secondaryTextStyles}">${data.heroPreTitle2}</p>` : '';
    },
    get title() {
      return data.heroTitle2 ? `<p class="GD035_banner__title" style="${this.primaryTextStyles}">${data.heroTitle2}</span></p>` : '';
    },
    get CTA() {
      return `<a href="${this.link}" class="GD035_offer__CTA" style="${this.CTAStyles}">${data.heroCtaText2}</a>`;
    },
    get code() {
      return data.heroCode2 ? `<p class="GD035_banner__code" style="${this.primaryTextStyles}">${data.heroCode2}</p>` : '';
    },
  };

  // Mobile specific values
  if (isMobile) {
    vars.modifier = '--mob';
    vars.img = data.heroImgM2;
    vars.primaryTextStyles = `color: ${data.heroContent2_primary_colour_mob};`;
    vars.secondaryTextStyles = `color: ${data.heroContent2_secondary_colour_mob};`;
    vars.CTAStyles = `background: ${data.heroCta2_bg_colour_mob}; color: ${data.heroCta2_text_colour_mob};`;
  }

  return new Component({
    template: `
      <div class="GD035_banner-wrapper">
        <div class="GD035_banner GD035_banner${vars.modifier} GD035_banner--2">
          <a href="${vars.link}">
            <img src="${vars.img}"/>
          </a>
          <div class="GD035_offer" style="${vars.offerStyles}">
            ${vars.preTitle}
            ${vars.title}
            ${vars.code}
            ${vars.CTA}
          </div>
          ${vars.terms}
        </div>
      </div>
    `,
    events: (component) => {
      const links = component.querySelectorAll('a');
      Array.from(links).forEach((link) => {
        link.addEventListener('click', () => {
          event.send('GD035', 'Clicked', 'Shop Boutique');
        });
      });
    },
    render: (component) => {
      productCarousel.insertAdjacentElement('afterend', component);
    },
  });
})();

// Bottom Banners
const bottomBanners = (() => {
  const banners = [
    {
      img: 'https://dd6zx4ibq538k.cloudfront.net/static/images/2680/3d3d4fac92d78aa134a6eba1f4f77788_1160_320.png',
      link: 'https://www.glassesdirect.co.uk/share/',
      name: 'Refer a friend',
    },
    {
      img: 'https://dd6zx4ibq538k.cloudfront.net/static/images/2680/6da65577fbc6959c7f70f891a4b76349_1160_320.jpeg',
      link: 'https://blog.glassesdirect.co.uk/charity',
      name: 'BOGO',
    },
  ];

  const template = `
    <div class="GD035_bottom-banners GD035_section">
      <div class="GD035_section__inner">
        <ul>
          ${banners.map(banner => `<li class="GD035_bottom-banner" data-banner-name="${banner.name}"><a href="${banner.link}"><img src="${banner.img}"/></a></li>`).join('')}
        </ul>
      </div>
    </div>
  `;

  // Render
  heroBanner2.component.insertAdjacentHTML('afterend', template);

  // Events
  const allBanners = document.querySelectorAll('.GD035_bottom-banner');
  Array.from(allBanners).forEach((banner) => {
    const name = banner.getAttribute('data-banner-name');
    banner.addEventListener('click', () => {
      event.send('GD035', 'Clicked', `${name} banner`);
    });
  });

  return document.querySelector('.GD035_bottom-banners');
})();
