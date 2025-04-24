import settings from './settings';
import pubSub from './PublishSubscribe';

/**
 * Add body classes
 *
 * @access private
 */
const addBodyClasses = () => {
  document.body.classList.add(settings.ID);

  document.body.classList.add(`${settings.ID}-${settings.VARIATION}`);
};

/**
 * Helper - Create what we do pages banner
 */
const createTopBanner = () => {
  const mainContentWrap = document.querySelector('.main-container > .main-content-wrap');
  if(mainContentWrap) {
    mainContentWrap.insertAdjacentHTML('afterbegin', `
      <div class="${settings.ID}-top-banner">
        <div class="${settings.ID}-top-banner__link">
          <p class="${settings.ID}-top-banner__heading">Keep your first aid knowledge fresh</p>
          <div class="${settings.ID}-top-banner__text">
            <p>Sign up to our monthly newsletter to get updates on courses, information about
              health and safety legislations, advice, and more.</p>
          </div>
          <div class="RC051-top-banner__btn"><a href="/News-and-legislation/sign-up-to-our-newsletter.aspx">Learn More</a></div>
        </div>
      </div>
    `);

    pubSub.publish('did-add-top-banner');

    const bannerLink = document.querySelector(`.${settings.ID}-top-banner__link`);
    if(bannerLink) {
      bannerLink.addEventListener('click', () => {
        pubSub.publish('did-click-top-banner');
      });
    }
  }
};

/**
 * Helper - modify checkout newsletter box
 */
const modifyCheckoutNewsletterBox = () => {
  const newsletterBox = document.querySelector('.checkout-newsletter-signup');
  if(newsletterBox) {
    // -- Add HTML --
    newsletterBox.insertAdjacentHTML('afterbegin', `
      <h2 class="${settings.ID}-newsletter-box-title">
        Sign up to our newsletter <span>(optional)</span>
      </h2>

      <p>
        Our monthly newsletter features information and updates on first aid courses and health and
        safety at work legislation, as well as advice and tips to help you reduce risks and keep
        your workplace safe. Sign up today.
      </p>
    `);

    pubSub.publish('did-add-content-to-checkout-newsletter-box');

    // -- Modify checkbox copy --
    const label = newsletterBox.querySelector('label[for=NewsletterSignupYesNoCheckbox]');
    if(label) {
      const labelChildNodes = label.childNodes;
      [].forEach.call(labelChildNodes, (childNode) => {
        if(childNode.nodeType == 3 && childNode.textContent.trim().toLowerCase() == 'signup to our newsletter') {
          childNode.textContent = ' Yes, please sign me up';
        }
      });

      pubSub.publish('did-rename-label-on-checkout-newsletter-box');

      label.addEventListener('click', () => {
        pubSub.publish('user-clicked-signup-checkbox-checkout');
      });
    }
  }
};

/**
 * Helper modify ongoing support page content
 */
const modifyOngoingSupportPageContent = () => {
  const htmlToAdd = `
    <div class="${settings.ID}-newsletter-info">
      <h2>Monthly newsletter</h2>

      <p>Our monthly newsletter features information and updates on first aid courses
      and health and safety at work legislation, as well ad advice and tips to help you
      reduce risks and keep your workplace safe. Sign up today.</p>

      <p>
        <a href="/News-and-legislation/sign-up-to-our-newsletter.aspx" class="button-primary ${settings.ID}-newsletter-info__cta">
          Sign up to our newsletter
        </a>
      </p>
    </div>
  `;

  const contentFirstParagraph = document.querySelector('.main-content .rich-text > p')
  if(contentFirstParagraph) {
    contentFirstParagraph.insertAdjacentHTML('afterend', htmlToAdd);

    pubSub.publish('did-show-newsletter-info');

    const infoLink = document.querySelector(`.${settings.ID}-newsletter-info__cta`);
    if(infoLink) {
      infoLink.addEventListener('click', () => {
        pubSub.publish('did-click-newsletter-info-cta');
      });
    }
  }

};

/**
 * Entry point for running experiment
 *
 * @access public
 */
export default () => {
  // --------------------------------------------
  // Experiment is running
  // --------------------------------------------
  pubSub.publish('experiment-init');

  // --------------------------------------------
  // Add classes to body
  // --------------------------------------------
  addBodyClasses();
  
  // --------------------------------------------
  // Create banner on what we do pages
  // --------------------------------------------
  if(
      window.location.pathname.match(/Courses\/First-aid-at-work-courses-uk-mainland.aspx/i)
      || window.location.pathname.match(/What-we-do\/First-aid-at-work.aspx/i)
  ) {
    createTopBanner();
  }
  
  // --------------------------------------------
  // Checkout amend newsletter box
  // --------------------------------------------
  if(window.location.pathname.match(/Purchase\/YourDetails.aspx/i)) {
    modifyCheckoutNewsletterBox();
  }
  
  // --------------------------------------------
  // Ongoing support page content amendsa
  // --------------------------------------------
  if(window.location.pathname.match(/What-we-do\/ongoing-support.aspx/i)) {
    modifyOngoingSupportPageContent();
  }
  
  // --------------------------------------------
  // Event tracking on sign up form page
  // --------------------------------------------
  if(window.location.pathname.match(/News-and-legislation\/sign-up-to-our-newsletter.aspx/i)) {
    pubSub.publish('user-saw-signup-page');

    const scfBtn = document.querySelector('.scfSubmitButton');
    if(scfBtn) {
      scfBtn.addEventListener('click', () => {
        pubSub.publish('user-did-click-subscribe-on-signup-page');
      });
    }
  }
};
