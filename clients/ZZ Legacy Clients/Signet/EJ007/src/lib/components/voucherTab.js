import settings from '../../lib/settings';
import { pollerLite, feedbackTab } from '../../../../../../lib/uc-lib';

const { ID } = settings;

export default class VoucherTab {
  constructor() {
    this.createAndRender();
  }

  createAndRender() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_VoucherTab`);
    this.component = element;

    pollerLite(['#js-emailSignUpPopup'], () => {
      const emailSignUp = document.querySelector('#js-emailSignUpPopup');
      element.appendChild(emailSignUp);
    });

    feedbackTab.init({
      label: 'Get 10% off your next order',
      content: element,
      position: 'bottom',
      tabDimensions: { width: '100%', height: 'auto' },
      contentDimensions: { width: '100%', height: '350px' },
      dimBackground: true,
      customClass: `${ID}_VoucherTab_Content`,
      animationSpeed: 300,
      sessionClose: true,
    });

    // add active to the tab to turn the arrow
    const addActive = () => {
      const pickupTabBg = document.querySelector('.UC_fb-tab-container');
      const feedbackTabDiv = document.querySelector('.UC_fb-tab');
      feedbackTabDiv.addEventListener('click', () => {
        if (pickupTabBg.style.bottom !== '0px') {
          feedbackTabDiv.classList.add(`${settings.ID}-tab_show`);
        } else {
          feedbackTabDiv.classList.remove(`${settings.ID}-tab_show`);
        }
      });
    };

    addActive();

    window.addEventListener('resize', () => {
      feedbackTab.refresh();
      addActive();
    });
  }
}
