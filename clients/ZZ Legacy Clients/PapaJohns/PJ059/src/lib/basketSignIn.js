import { pollerLite } from '../../../../../lib/uc-lib';

const activateSignIn = {
  init(proceedBtnId, emailInput) {
    pollerLite([`a#${proceedBtnId}`], () => {
      window.__doPostBack(`${proceedBtnId}`.replace(/_/g, '$').replace(/\$\$/g, '$_'), '');
    });
    pollerLite([`${emailInput}`], () => {
      if (sessionStorage.getItem('PJ059-data')) {
        const userEmail = sessionStorage.getItem('PJ059-data');
        setTimeout(function(){
          document.querySelector(`${emailInput}`).setAttribute('value', `${userEmail}`);
          // Remove session storage item
          sessionStorage.removeItem('PJ059-data');
        }, 2000);
      }
    });
  }
};

export default activateSignIn;