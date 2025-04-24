/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import TopHeader from './components/topHeader/topHeader';
import Form from './components/form/form';
import { getLanguage } from './helpers';

const activate = () => {
  setup();

  document.body.classList.add(`TG082-${getLanguage()}`);
  // Experiment code
  const topHeader = new TopHeader();

  const newForm = new Form();

  // Add terms to footer
  const mainContent = document.querySelector('.page-container');
  const mainStripCopy = document.querySelector('.main-strip__copy');
  const mainStripSubline = document.querySelector('.main-strip__subline');

  if(mainContent && (mainStripSubline || mainStripCopy)) {
    mainContent.insertAdjacentHTML('afterend', `
      <div class="TG082-footer-box">
        ${mainStripCopy ? '<h3>' + mainStripCopy.innerHTML + '</h3>' : ''}
        ${mainStripSubline ? mainStripSubline.innerHTML : ''}
      </div>
    `);
  }
};

export default activate;
