import { tickIcon } from '../assets/icons';

const storeMessage = (id, storeName, stock, distanceText) => {
  const html = `
    <div class="${id}__storeMessage">
      <span class="${id}__successIcon">${tickIcon}</span>
      <span class="${id}__successText">
        <span>${stock} available for FREE Click & Collect in</span>
        <span>
            <strong>${storeName} ${distanceText}</strong>
        </span>
      </span>
    </div>
  `;
  return html.trim();
};

export default storeMessage;
