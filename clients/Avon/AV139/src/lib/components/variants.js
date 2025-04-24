import variant from './variant';

const variants = (id, variantsData) => {
  const { selectedVariant, data } = variantsData;
  const arrow = `<svg aria-hidden="true" class="icon icon--wide icon-chevron-down" viewBox="0 0 10 6"><path d="M5 6 0 1.203 1.254 0 5 3.602 8.746 0 10 1.203 5 6z"></path></svg>
`;

  const htmlStr = `
        <div class="${id}__variants">
            
            <div class="${id}__variants-dp" data-selected="${selectedVariant.name}">
                <div class="${id}__variants-dp--title">
                    <span class="name">${selectedVariant.name}</span>
                    <span class="arrow">${arrow}</span>
                </div>
                <div class="${id}__variants-container ${id}__hide">
                    <span class="${id}__modal-label modal-label">
                      <svg aria-hidden="true" class="icon icon-close" viewBox="0 0 12 12"><path d="M12 .978 11.022 0 6 5.029.978-.001 0 .98 5.029 6 0 11.023.978 12 6 6.97 11.022 12l.978-.978L6.971 6 12 .978z"></path></svg>
                      <span class="label">Select a Size</span>
                    </span>
                    ${data.map((item) => variant(id, item)).join('\n')}
                </div>
            </div>
        </div>
    `;
  return htmlStr.trim();
};

export default variants;
