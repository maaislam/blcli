import { icon } from '../assets/icons';

const uspsWrapper = (id, data) => {
  const html = `
    <div class="${id}__uspsWrapper">
        <div class="${id}__uspsContainer">
            ${data
              .map((item) => {
                return `
                    <div class="${id}__uspsItem">
                        <div class="${id}__icon">${icon}</div>
                        <div class="${id}__text">${item}</div>
                    </div>
                `;
              })
              .join('\n')}
        </div>
        <span class="${id}__more-product-details" role="button" tabindex="0">See more product details</span>
    </div>
  `;

  return html.trim();
};

export default uspsWrapper;
