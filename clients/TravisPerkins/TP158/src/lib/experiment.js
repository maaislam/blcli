/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, submitFooterForm, toggleAccordion } from './services';
import shared from './shared';
import { getCookie, events } from '../../../../../lib/utils';

export default () => {
  if(document.body.classList.contains(`${shared.ID}`)) {
    // Prevent running twice on same page
    return;
  }

  window.addEventListener('beforeunload', (event) => {
    const success = document.querySelectorAll('.tp158-success-wrapper');
    [].forEach.call(success, (s) => {
      s.parentNode.removeChild(s);
    });
  });

  setup();

  events.send(`${shared.ID}`, `V-${shared.VARIATION}`, 'did-meet-conditions');

  if(shared.VARIATION == 'control') {
    return;
  }

  // Don't change the banner for loggedin users, and visitors on the mailing list.
  const isLoggedIn = !document.querySelector('[class*="JoinOurMailingList__Input"]'); // check if footer newsletter form exists.
  const alreadyOnList = getCookie('newsletter_list') === 'true';
  
    
  // Vars.
  var bannerWrapper;
  const isMobile = document.querySelector('[class*="HomePageMobile__HomePageBody"]');

  // Covid page link and updated text.
  let link = "<a href='https://www.travisperkins.co.uk/content/covid-19' class='tp158-banner-link'>Click here</a>";
  const firstTextContent = `${link} for our COVID-19 Service Update.`;
  
  // Mailing list field and button
  const formLabelWrapper = document.createElement('div');
  formLabelWrapper.innerHTML = '<p>Join our mailing list for the latest offers, news and COVID-19 updates</p>';
  
  // Field.
  const fieldWrapper = document.createElement('div');
  const emailField = '<input type="email" required="true" class="tp158-banner-field" placeholder="Enter your email address..." value="" />';
  const button = document.createElement('button');
  // const fieldError = '<p class="tp158-field-error">Please enter a valid email address</p>';

  // Button.
  button.innerHTML = '<svg class="sc-gzVnrw QjaOQ" fill="white"><use xlink:href="#send"></use></svg>';
  button.classList.add('tp158-banner-button');
  fieldWrapper.innerHTML = emailField;
  fieldWrapper.appendChild(button);

  fieldWrapper.classList.add('tp158-banner-field-wrapper');
  formLabelWrapper.classList.add('tp158-banner-text-second');

  // prevent click which seems to trigger page refresh
  fieldWrapper.addEventListener('click', e => e.stopPropagation());

  if (isMobile) {
    // Mobile.
    
    const headerWrapper = document.querySelector('[class*="PageHeaderMobile__HeaderWrapper"]');
    
    // We need to add the outer panel on mobile.
    const iconCaret = '<svg class="sc-gzVnrw tp158-icon-down"><use xlink:href="#down"></use></svg>';
    const label = '<p class="tp158-mobile-banner-text">COVID-19 Service Update</p>';
    
    bannerWrapper = document.createElement('div');
    bannerWrapper.classList.add('tp158-mobile-banner-wrapper');
    const bannerHeader = document.createElement('div');
    bannerHeader.classList.add('tp158-mobile-banner-header');
    bannerHeader.innerHTML = `${label}${iconCaret}`;
    bannerHeader.onclick = toggleAccordion;
    bannerWrapper.appendChild(bannerHeader);

    // First text panel.
    const firstTextBlockMobile = document.createElement('div');
    firstTextBlockMobile.innerHTML = firstTextContent;

    // Add to the right elements.
    headerWrapper.appendChild(bannerWrapper);

    const accordionWrapper = document.createElement('div');
    accordionWrapper.classList.add('tp158-accordion-wrapper');
    accordionWrapper.appendChild(firstTextBlockMobile);

    // DOn't show the form for users & signed up peeps.
    if (!isLoggedIn && !alreadyOnList) {
      accordionWrapper.appendChild(formLabelWrapper);
      accordionWrapper.appendChild(fieldWrapper);
    }
    
    bannerWrapper.appendChild(accordionWrapper);
    
    // Add class to main wrapper.
    bannerWrapper.classList.add('tp158-banner-wrapper');
  }
  else {
    // Desktop.

    // Wrappers.
    bannerWrapper = document.querySelector(shared.REQUIRED_SELECTOR);
    const bannerWrapperLink = bannerWrapper.querySelector('[class*="Layout__ReactLink"]');
    const bannerContentWrapper = document.querySelector('[class*= "TOLaunchBannerDesktop__Inner"]');

    // Change copy in the existing banner text block.
    const firstTextBlock = bannerContentWrapper.querySelector('[class*="TOLaunchBannerDesktop__ContentBlock"]')
    const firstTextBlockText = firstTextBlock.querySelector('[class*="TOLaunchBannerDesktop__BannerText"]');
    firstTextBlock.classList.add('tp158-banner-text-first');
    if (firstTextBlockText) firstTextBlockText.innerHTML = firstTextContent;

    // Don't show the form for users & signed up peeps.
    if (!isLoggedIn && !alreadyOnList) {
      
      // Remove link from the banner wrapper.
      if (bannerWrapperLink) {

        // clone all children of the link up a level in the tree
        var i = 0; // backup to prevent infinite loops.
        while (bannerWrapperLink.hasChildNodes() && i++ < 10) {
          bannerWrapper.appendChild(bannerWrapperLink.firstChild);
        }

        // Remove the link node - not needed.
        // This approach is used as React attaches itself to the wrapper and detects clicks - not just the anchor link.
        bannerWrapperLink.remove();
        bannerContentWrapper.onclick = (e) => {
          // allow our link through, block others.
          if (e.target.tagName !== 'A') e.preventDefault();
        };
      }

      bannerContentWrapper.appendChild(formLabelWrapper);
      bannerContentWrapper.appendChild(fieldWrapper);

      // Add class to main wrapper.
      bannerWrapper.classList.add('tp158-banner-wrapper');
    }

  }

  // Privacy box, shows on focus
  const privacyHtml = `
  <div class="ecMaFR tp158-success-wrapper tp158-success-wrapper--privacy tp158-hide">
		<div class="JoinOurMailingList__Wrapper-m35guw-0 iXpuvt" data-test-id="mail-block">
			<div class="JoinOurMailingList__Description-m35guw-6 bCwXDW" data-test-id="mail-block-description">
				When joining, you agree to travisperkins.co.uk contacting you via email with information about news, goods, offers and services which we feel will be of interest to you. Please refer to our <a class="JoinOurMailingList__StyledLink-m35guw-7 doVirx" data-test-id="privacy-policy-link" href="/privacyPolicy"><span class="JoinOurMailingList__LinkText-m35guw-8 cQiQNL sc-jDwBTQ hbNGWv">privacy policy</span></a> for more information on how we use your details.
			</div>
		</div>
		<div class="tp158-close-success-button">
			X
		</div>
	</div>
  `;

  if(bannerWrapper) {
    bannerWrapper.insertAdjacentHTML('beforeend', privacyHtml);
  }
  if(isMobile) {
    const privacyWrapper = document.querySelector('.tp158-success-wrapper--privacy');
    if(privacyWrapper) {
      privacyWrapper.classList.add('tp158-success-wrapper-mobile');
    }
  }


  const emailFieldInput = document.querySelector('input[class*="tp158-banner-field"]');

  // Privacy
  if(emailFieldInput) {
    const privacyWrapper = document.querySelector('.tp158-success-wrapper--privacy');

    if(privacyWrapper) {
      emailFieldInput.addEventListener('focus', () => {
        if(privacyWrapper) {
          privacyWrapper.classList.remove('tp158-hide');
        }
      });

      const close = privacyWrapper.querySelector('.tp158-close-success-button');
      if(close) {
        close.addEventListener('click', () => {
          privacyWrapper.parentNode.removeChild(privacyWrapper);
        });
      }

      document.body.addEventListener('click', (e) => {
        if(!e.target.classList.contains('tp158-banner-field')) {
          privacyWrapper.classList.add('tp158-hide');
        }
      });
    }
  }

  // Submit mailing list form action.
  button.onclick = (e) => submitFooterForm(e, isMobile);
  if (emailFieldInput) emailFieldInput.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
      submitFooterForm(e, isMobile)
    }
  });
  
}
