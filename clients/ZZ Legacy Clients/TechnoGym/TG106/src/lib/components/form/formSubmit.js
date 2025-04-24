import appState from './appState';
import { pollerLite } from '../../../../../../../lib/uc-lib';
import shared from '../../shared';
import { showLoader, hideLoader } from './loader';

const { ID } = shared;

export default () => {
  const successMessage = document.querySelector(`.${ID}-success_message`);
  const formBlock = document.querySelector(`.${ID}-form_headerText`);

 // const successMessage = document.querySelector(`.${ID}-success_message`);
  document.querySelector('#identity-form').addEventListener('submit', () => {

    showLoader();

    // poll for the success message
    if (appState.downloadBrochure === 'yes') {
      pollerLite(['.feed-success'], () => {
        hideLoader();
        // then redirect
        window.open(appState.activeDownloadLink, '_blank');
        window.location.href = appState.productLink;
        successMessage.style.display = 'block';
        formBlock.style.display = 'none';
     });
    } else {
        pollerLite(['.feed-success'], () => {
          hideLoader();
          successMessage.innerHTML = "<h3>Thanks, one of our team will get back to you within 24 hours.</h3>";
          successMessage.style.display = 'block';
          formBlock.style.display = 'none';
        });
    }
  });
};
