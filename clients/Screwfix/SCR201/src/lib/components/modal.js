import { closeIcon } from '../assets/icons';

const modal = (id) => {
  const html = `
    <div class="${id}__modal" role="dialog" aria-modal="true" tabindex="-1">
        <div class="${id}__modal-overlay"></div>
          <div class="${id}__modal-container">
                 <button type="button" class="${id}__closeWrapper" aria-label="Close modal" tabindex="0">
                    <span class="${id}__text">Close</span>
                    <span class="${id}__icon">${closeIcon}</span>
                 </button>
                 <div class="${id}__modal-content"></div>
          </div>
          
        </div>
    </div>
    `;
  return html.trim();
};

export default modal;
