import { offerIcon } from '../assets/icons';

const floatElement = (id) => {
  const html = `
        <div class="${id}__floatElement">
            <div class="${id}__text">subscribe</div>
            <div class="${id}__icon">${offerIcon}</div>
        </div>
    `;
  return html.trim();
};

export default floatElement;
