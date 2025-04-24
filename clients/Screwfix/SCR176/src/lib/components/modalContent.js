import { crossIcon } from '../assets/icons';
import { basket } from './basket';
import { checkoutSummary } from './checkoutSummary';
import { collectProductWrapper } from './collectProductWrapper';
import { deliveryProductWrapper } from './deliveryProductWrapper';

export const modalContent = (id, data) => {
  const { lineItems, priceInformation, branchName } = data;
  const html = `
            
                <div class="${id}__modal-header">
                  <div class="${id}__closeWrapper">
                    <span class="${id}__icon">${crossIcon}</span>
                    <span class="${id}__text">Close</span>
                  </div>
                  <div class="${id}__basketTitle">Your basket</div>
                  <div class="${id}__basket">
                    ${basket(id, lineItems, priceInformation)}
                  </div>
                </div>
                ${collectProductWrapper(id, branchName, lineItems)}
                ${checkoutSummary(id, priceInformation)}
           
    `;
  return html.trim();
};
