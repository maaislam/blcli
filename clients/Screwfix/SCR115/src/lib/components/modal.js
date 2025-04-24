import { closeIcon } from '../assets/icons';

const modal = (id) => {
  const html = `
    <div class="${id}__modal">
        <div class="${id}__modal-overlay"></div>
        <div class="${id}__modal-container" tabindex="-1" role="dialog" aria-modal="false" aria-label="Product Details">
            <div class="${id}__modal-header">
                <div class="${id}__mainTitle">Product details</div>
                <div class="${id}__closeWrapper" tabindex="0">
                    Close ${closeIcon}
                </div>
            </div>
            <div class="${id}__modal-content"></div>
        </div>
    </div>
    `;
  return html.trim();
};

export default modal;
