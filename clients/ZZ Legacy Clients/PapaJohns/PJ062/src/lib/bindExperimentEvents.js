import settings from './settings';
import { observer } from '../../../../../lib/uc-lib';

function toggleLightboxContent() {
  const listItems = document.querySelectorAll('li.PJ062-lightbox__item');
  [].forEach.call(listItems, (item) => {
    const container = item.querySelector('.PJ062-itemContent');
    if (container) {
      container.addEventListener('click', () => {
        if (!item.classList.contains('open')) {
          item.classList.add('open');
          item.querySelector('div.PJ062-itemContent').classList.add('open');
          item.querySelector('div.PJ062-itemContent__hidden').classList.add('open');
          item.querySelector('span.PJ062-icon__toggle div').classList.add('open');
        } else {
          item.classList.remove('open');
          item.querySelector('div.PJ062-itemContent').classList.remove('open');
          item.querySelector('div.PJ062-itemContent__hidden').classList.remove('open');
          item.querySelector('span.PJ062-icon__toggle div').classList.remove('open');
        }
      });
    }
  });
}

function orderCtaClick(orderMethod) {
  const orderCTA = document.querySelector('.PJ062-lightbox__item div.PJ062-orderButton');
  if (orderCTA) {
    orderCTA.addEventListener('click', () => {
      if (orderMethod === 'Delivering') {
        window.__doPostBack('ctl00__objHeader_lbOrderForDelivery'.replace(/_/g, '$').replace(/\$\$/g, '$_'), '');
      } else if (orderMethod === 'Collecting') {
        window.__doPostBack('ctl00__objHeader_lbOrderForCollection'.replace(/_/g, '$').replace(/\$\$/g, '$_'), '');
      }
    });
  }
};

export { toggleLightboxContent, orderCtaClick }; // eslint-disable-line
