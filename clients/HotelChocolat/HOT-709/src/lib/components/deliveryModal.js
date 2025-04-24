import { data } from '../data/data';
import shared from '../../../../../../core-files/shared';
import { closeSVG } from '../assets/icons';

const { ID } = shared;

const deliveryContainer = () => {
  const htmlStr = Object.keys(data)
    .map((sectionKey) => {
      const section = data[sectionKey];

      return `
        <div class="delivery-wrapper" data-section="${section.title}">
          <div class="delivery-header">
            <div class="icon">${section.icon}</div>
            <div class="delivery-title">${section.title}</div>
          </div>
          <div class="grid-container">
            ${section.details
              .map(
                (detail) => `
              <div class="grid-title">${detail.deliveryType}</div>
              <div class="grid-description">${detail.deliveryDescription}</div>
              <div class="grid-price">${detail.priceOne}</div>
            `
              )
              .join('')}
          </div>
        </div>
      `;
    })
    .join('');

  return htmlStr;
};

const container = `
  <div class="${ID}__delivery-container" data-model="delivery">
    <div class="${ID}__deliveryWrapper">
      <div class="${ID}-ways-to-pay-slide-close">
       ${closeSVG}
      </div>
    <div class="${ID}__delivery-info">Delivery Information</div>
      ${deliveryContainer()}  
    <div class="${ID}__deliveryFooter">
      <div class="${ID}__title">Delivery & Returns information</div>
      <div class="${ID}__more-info">For more details, please see the <a href="/uk/help/delivery.html">delivery information</a> page.</div>
    </div>
    </div>
    <div class="${ID}-continue-shopping">
      <a>return to shopping bag</a>
    </div>
  </div>`;

export default container;
