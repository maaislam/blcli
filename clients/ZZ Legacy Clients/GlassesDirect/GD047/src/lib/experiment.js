/**
 * GD047 - Prescription error redirect
 * @author User Conversion
 */
import { setup } from './services';
import { events } from '../../../../../lib/utils';
import settings from './settings';

const activate = () => {
  setup();
  const { ID } = settings;
  const prescriptionFormError = document.querySelector('.prescription-form-errors.message-error');

  // --------------------------
  // Modify Error Message
  // --------------------------
  const prescriptionFormErrorContact = prescriptionFormError.querySelector('.prescription-form-errors.message-error .error-contact');
  const newErrorContact = document.createElement('div');
  newErrorContact.className = `${ID}_formError`;
  newErrorContact.innerHTML = `
    <p>If you would like help with your prescription, call our team of Dispensing Opticians on 01793 746 555.</p>
    <hr class="${ID}_line">
    <p style="font-weight:bold; color:black;">Alternatively, you can send us your prescription later by photo, email, phone or post. Upon completing your order, our opticians will contact you to obtain your prescription.</p>
    <div class="${ID}_ctas">
      <div id="${ID}_sendLaterCta" class="button button--secondary">SEND IT LATER</div>
    </div>
  `;
  const sendItLaterLink = document.querySelector('.switch-to-later-tab');
  newErrorContact.querySelector(`#${ID}_sendLaterCta`).addEventListener('click', () => {
    sendItLaterLink.click();
  });

  // Render
  prescriptionFormErrorContact.replaceWith(newErrorContact);


  // --------------------------
  // Error Tracking
  // --------------------------
  const prescriptionFormErrors = prescriptionFormError.querySelectorAll('ul > li');

  /**
   * Send a GA event if error message matches
   * @param {string} errorMsg
   */
  const sendErrorEvent = (errorMsg) => {
    switch (true) {
      case /The total value of (Left|Right) Distance's sphere and cylinder must be within -8 and 8/.test(errorMsg):
        events.send(`${ID} Prescription`, 'Error present', 'Prescription exceeds');
        break;

      case /Date of prescription: Prescription must have been taken within the last two years/.test(errorMsg):
        events.send(`${ID} Prescription`, 'Error present', 'Prescription outdated');
        break;

      case /You must enter a value for (Left|Right) Distance Axis, because you entered a Cylinder value/.test(errorMsg):
        events.send(`${ID} Prescription`, 'Error present', 'No axis');
        break;

      case /You must enter a value for (Left|Right) Distance Cylinder, because you entered an Axis value/.test(errorMsg):
        events.send(`${ID} Prescription`, 'Error present', 'No cyl');
        break;

      case /If your prescription has only one value for Near Addition, please enter this value for both eyes/.test(errorMsg):
        events.send(`${ID} Prescription`, 'Error present', 'Near Add needed');
        break;

      default:
        break;
    }
  };
  Array.prototype.forEach.call(prescriptionFormErrors, (el) => {
    const text = el.innerText.trim();
    sendErrorEvent(text);
  });
};

export default activate;
