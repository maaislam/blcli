/**
 * GD054 - Mobile lens flow change
 * @author User Conversion
 */
import { setup } from './services';
import settings from './settings';

const activate = () => {
  setup();

  const { ID } = settings;

  // Hide original 'continue with basic lenses' link
  const formSummary = document.querySelector('#lens-package-form-summary .form-summary');
  const continueBasicBtn = formSummary.querySelector('.option-select');
  formSummary.insertAdjacentElement('afterend', continueBasicBtn);
  continueBasicBtn.style.display = 'none';

  // Change form summary text
  formSummary.innerHTML = '<strong>Save up to 55%</strong> on high street prices with our affordable packages';

  // Change title
  // document.querySelector('.form-heading').innerText = 'Package upgrades';

  // Add new 'continue with basic lenses' button below packages
  const newButton = document.createElement('button');
  newButton.className = `${ID}_basicLenses`;
  newButton.innerHTML = 'Continue with basic lenses';
  newButton.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    continueBasicBtn.click();
  });
  document.querySelector('.options-block').insertAdjacentElement('beforeend', newButton);

  // Add title to silver package
  document.querySelector('#silver-lens-package .highlight-text').childNodes[0].textContent = 'OPTICIAN RECOMMENDED';
};

export default activate;
