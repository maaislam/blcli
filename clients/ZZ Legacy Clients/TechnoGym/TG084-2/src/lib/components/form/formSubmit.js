import appState from './appState';
import { pollerLite } from '../../../../../../../lib/uc-lib';

export default () => {
  const loader = document.querySelector('.TG084-2-Lightbox_loader');
  const successMessage = document.querySelector('.TG084-2-success_message');

  document.querySelector('#identity-form').addEventListener('submit', () => {

    // poll for the sucess message
    if (appState.downloadBrochure === 'yes') {
      loader.style.display = 'block';
      pollerLite(['.feed-success'], () => {
        // then redirect
        window.open(appState.activeDownloadLink, '_blank');
        window.location.href = appState.productLink;
      });
    } else {
      loader.style.display = 'block';
      pollerLite(['.feed-success'], () => {
        successMessage.style.display = 'block';
      });
    }
  });
};
