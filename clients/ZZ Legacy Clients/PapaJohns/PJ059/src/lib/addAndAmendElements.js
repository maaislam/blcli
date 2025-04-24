import { pollerLite } from '../../../../../lib/uc-lib';

export default (emailInput, device) => {

  const amendElements = emailInput => {
    // Uncheck register checkbox
    const checkBox = document.querySelector('#chkGuestRegister');
    if (checkBox && checkBox.checked) {
      checkBox.click();
    }

    // Adjust containers height
    if (device === 'desktop') {
      const contactDetailsContainer = document.querySelector('.orderInfo.contactDetailsCont.extraFieldsCont');
      const deliveryDetailsContainer = document.querySelector('.orderInfo.noRight.deliveryDetailsCont');
      
      if (contactDetailsContainer.offsetHeight > deliveryDetailsContainer.offsetHeight) {
        deliveryDetailsContainer.style.height = contactDetailsContainer.offsetHeight;
      } else if (deliveryDetailsContainer.offsetHeight > contactDetailsContainer.offsetHeight) {
        contactDetailsContainer.style.height = deliveryDetailsContainer.offsetHeight;
      } else {
        contactDetailsContainer.style.height = '500px';
        deliveryDetailsContainer.style.height = '500px';
      }

      // Scroll to Element
      const contactDetailsTop = contactDetailsContainer.getBoundingClientRect().top;
      const contactDetailsHeight = contactDetailsContainer.getBoundingClientRect().height;
      const distanceFromTop = document.querySelector('.orderInfo.productSummary').getBoundingClientRect().height;
      window.scrollTo({
        top: distanceFromTop,
        behavior: 'smooth'
      });
    } else if (device === 'mobile') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const addElements = emailInput => {
    emailInput.classList.add('error');
    const registeredEmail = emailInput.value;

    const emailRow = emailInput.closest('p');

    if (!document.querySelector('.PJ059-buttons__wrapper #PJ059-resetPassword')) {
      const newButtons = `<div class="PJ059-error__message">
        <p>This email is already registered.</p>
      </div>
      <div class="PJ059-buttons__wrapper">
        <span class="PJ059__btn" id="PJ059-resetPassword">
          <div>Reset Password</div>
        </span>
        <span class="PJ059__btn" id="PJ059-signIn">
          <div>Sign In</div>
        </span>
      </div>
      <div class='PJ059-message__success hidden'><p>We are sending a link to reset your password to <strong>${registeredEmail}</strong>.</p></div>
      <div class='PJ059-message__error hidden'><p>Something went wrong. Please try again later.</p></div>`;
      emailRow.insertAdjacentHTML('afterend', newButtons);
    }

    return registeredEmail;
  };

  amendElements(emailInput);
  const registeredEmail = addElements(emailInput);

  // Checkbox
  const checkbox = document.querySelector('input#chkGuestRegister');
  if (checkbox) {
    checkbox.addEventListener('click', () => {
      const currentEmail = emailInput.value;
      if (currentEmail !== registeredEmail) {
        document.querySelector('.PJ059-error__message').classList.add('hide');
        document.querySelector('.PJ059-buttons__wrapper').classList.add('hide');
        document.querySelector('#ctl00_cphBody_txtGuestEmail').classList.remove('error');
      } else {
        document.querySelector('.PJ059-error__message').classList.remove('hide');
        document.querySelector('.PJ059-buttons__wrapper').classList.remove('hide');
      }
    });
  }

  // User changes email input value
  emailInput.addEventListener('change', () => {
    const emailChangedTo = emailInput.value;
    if (emailChangedTo !== registeredEmail) {
      document.querySelector('.PJ059-error__message').classList.add('hide');
      document.querySelector('.PJ059-buttons__wrapper').classList.add('hide');

      document.querySelector('#ctl00_cphBody_txtGuestEmail').classList.remove('error');
    } else {
      document.querySelector('.PJ059-error__message').classList.remove('hide');
      document.querySelector('.PJ059-buttons__wrapper').classList.remove('hide');
    }
  });

  return registeredEmail;
};