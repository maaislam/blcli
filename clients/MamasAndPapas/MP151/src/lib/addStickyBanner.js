import { pollerLite, observer } from '../../../../../lib/uc-lib';

export default () => {
  // Sticky Banner
  observer.connect([document.querySelector('header#js-header')], () => {
    pollerLite(['span.MP151-usp__wrapper'], () => {
      const globalMessagesContainer = document.querySelector('#globalMessages');
      const usp = document.querySelector('span.MP151-usp__wrapper');
      const header = document.querySelector('header#js-header');
      if (header.classList.contains('header_sticky')) {
        header.insertAdjacentElement('beforeend', usp);
        usp.classList.add('sticky');
      } else {
        globalMessagesContainer.insertAdjacentElement('afterend', usp);
        usp.classList.remove('sticky');
      }
    });
  }, {
    throttle: 200,
    config: {
      attributes: true,
      childList: false,
    },
  });
};