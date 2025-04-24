/**
 * GD048 - Prescription Landing Question
 * @author User Conversion
 */
import { setup } from './services';
import settings from './settings';

const activate = () => {
  setup();
  const { ID } = settings;

  // Add header
  const prescriptionOptions = document.querySelector('#prescription-options');
  prescriptionOptions.insertAdjacentHTML('afterbegin', `<div class="${ID}_heading">Do you have your prescription to hand?</div>`);

  // New text for options
  const optionText = {
    later: {
      id: '#prescription-tab-header-later',
      heading: 'No',
      desc: 'Don\'t worry, save time and place your order now, then send your prescription later via email, phone or post',
    },
    add: {
      id: '#prescription-tab-header-add',
      heading: 'Yes',
      desc: 'I can enter the details now',
    },
    saved: {
      id: '#prescription-tab-header-saved',
      heading: 'Yes',
      desc: 'I have a prescription saved with Glasses Direct',
    },
  };

  // Replace inner markup
  Object.keys(optionText).forEach((key) => {
    const obj = optionText[key];
    const el = prescriptionOptions.querySelector(obj.id);
    if (el) {
      el.innerHTML = `
        <h4>${obj.heading}</h4>
        <p>${obj.desc}</p>
      `;
    }
  });

  // Re-order options
  const choices = prescriptionOptions.querySelector('.prescription-choices');
  const later = choices.querySelector('#prescription-tab-header-later');
  choices.insertAdjacentElement('beforeend', later);
};

export default activate;
