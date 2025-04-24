import { arrow } from '../assets/icons';

const viewElement = (id) => {
  const html = `
        <div class="${id}__viewElement ${id}__more">
            <div class="${id}__viewElement-wrapper">
                <span class="${id}__text">View more</span>
                <span class="${id}__icon">${arrow}</span>
            </div>
            
        </div>
    `;

  return html.trim();
};

export default viewElement;
