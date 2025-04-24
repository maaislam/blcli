import { fullStory, events } from '../../../../../lib/utils';
import shared from './shared';

/**
 * Pass data to shared object
 * @param {Object} data
 */
export const share = (data) => {
  Object.keys(data).forEach((key) => {
    shared[key] = data[key];
  });
};

/**
 * Standard experiment setup
 */
export const setup = () => {
  const { ID, VARIATION } = shared;

  /** Use fullStory API to tag screen recording with experiment info */
  fullStory(ID, `Variation ${VARIATION}`);

  /** Namespace with body classes for easier CSS specificity */
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
};

/**
 * 
 * Submit mailing list from the banner experiment.
 */
export const submitFooterForm = (e, isMobile) => {
  // remove wrapper if exists
  const privacyWrapper = document.querySelector('.tp158-success-wrapper--privacy');
  if(privacyWrapper) {
    privacyWrapper.parentNode.removeChild(privacyWrapper);
  }

  // Validate input & show error if not in email format. @In case error checking is needed
  const bannerInputField = document.querySelector('[class="tp158-banner-field"]');
  // let errorMessage = document.querySelector('[class="tp158-field-error"]');
  if (!bannerInputField.validity.valid) {
    // errorMessage.classList.add('tp158-field-error-active');
    return false;
  }
  else {
    // errorMessage.classList.remove('tp158-field-error-active');
  }

  // React overrides default value setter so we have to use this way to update the field.
  const footerInputField = document.querySelector('input[class*="JoinOurMailingList__Input"]');
  let nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
  let emailFieldValue = bannerInputField.value;

  nativeInputValueSetter.call(footerInputField, emailFieldValue);

  // Make sure React respects our value change.
  var changeEvent = new Event('input', { bubbles: true });
  footerInputField.dispatchEvent(changeEvent);

  // Trigger button onclick action - this will submit the form.
  // React listens for mouse down & up (click is here for good measure).
  const mouseClickEvents = ['mousedown', 'click', 'mouseup'];
  const submitButton = footerInputField.nextSibling;
  mouseClickEvents.forEach(mouseEventType =>
    submitButton.dispatchEvent(
      new MouseEvent(mouseEventType, {
        view: window,
        bubbles: true,
        cancelable: true,
        buttons: 1
      })
    )
  );

  // Show success message & adjust banner elements.
  const successMsgWrapper = document.querySelector('[class*="SubscriptionBlock__Wrapper"]').cloneNode(true);
  successMsgWrapper.classList.add('tp158-success-wrapper');

  // Add a close button to the success message (which removes the element).
  const closeButton = document.createElement('div');
  closeButton.classList.add('tp158-close-success-button');
  closeButton.innerText = 'X';
  closeButton.onclick = (e) => {
    successMsgWrapper.remove();
  }
  successMsgWrapper.appendChild(closeButton);

  // Add message wrapper to the banner.
  const bannerWrapper = document.querySelector('[class*="tp158-banner-wrapper"]');
  if (isMobile) {
    // On mobile, add it after the panel.
    bannerWrapper.after(successMsgWrapper);
    successMsgWrapper.classList.add('tp158-success-wrapper-mobile');
  }
  else {
    bannerWrapper.appendChild(successMsgWrapper);
  }

  // Remove class from the banner text block.
  const firstTextBlock = document.querySelector('[class*="tp158-banner-text-first"]');
  if (firstTextBlock) firstTextBlock.classList.remove('tp158-banner-text-first');
  document.querySelector('[class*="tp158-banner-text-second"]').remove();
  document.querySelector('[class*="tp158-banner-field-wrapper"]').remove();

  // Set cookie.
  setCookie('newsletter_list', true, 530); // 2 years.

  // Send did-send event
  events.send(`${shared.ID}`, `V-${shared.VARIATION}`, 'did-submit-form');
}


export const toggleAccordion = () => {
  // Toggle content in an accordion.
  const accordionWrapper = document.querySelector('[class*="tp158-accordion-wrapper"]');
  const bannerWrapper = document.querySelector('[class*="tp158-banner-wrapper"]');

  accordionWrapper.classList.toggle('tp158-accordion-open');
  bannerWrapper.classList.toggle('tp158-accordion-open');
}

// Source: W3Schools
export const setCookie = (cname, cvalue, exdays) => {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export const getCookie = (cname) => {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
