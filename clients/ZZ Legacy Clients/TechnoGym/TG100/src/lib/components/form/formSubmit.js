import appState from './appState';
import { pollerLite } from '../../../../../../../lib/uc-lib';
import settings from '../../settings';


const { ID } = settings;

export default () => {
  const loader = document.querySelector(`.${ID}-Lightbox_loader`);
  const successMessage = document.querySelector(`.${ID}-success_message`);
  const form = document.querySelector(`.${ID}-lightboxForm`);

  document.querySelector('#identity-form').addEventListener('submit', () => {

    // poll for the success message
    if (appState.downloadBrochure === 'yes') {
      loader.style.display = 'block';
      form.style.display === 'none';
      pollerLite(['.feed-success'], () => {
        // then redirect
        window.open(appState.activeDownloadLink, '_blank');
        window.location.href = appState.productLink;
     });
    } else {
      loader.style.display = 'block';
      form.style.display === 'none';
      pollerLite(['.feed-success'], () => {
        successMessage.style.display = 'block';
      });
    }
  });
};
