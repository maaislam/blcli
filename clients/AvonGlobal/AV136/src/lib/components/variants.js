import variant from './variant';

const variants = (id, variantsData) => {
  const { selectedVariant, data } = variantsData;
  const arrow = `<svg width="14" height="14" viewBox="0 0 24 15" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M12.1066 9.26395L20.5812 0.789341C21.2498 0.120713 22.3339 0.120713 23.0025 0.789341C23.6711 1.45797 23.6711 2.54203 23.0025 3.21066L12.1066 14.1066L1.21066 3.21066C0.54203 2.54203 0.54203 1.45797 1.21066 0.789341C1.87929 0.120713 2.96335 0.120713 3.63198 0.789341L12.1066 9.26395Z" fill="#606F80"/>
  </svg>
`;

  const htmlStr = `
        <div class="${id}__variants">
            <div class="${id}__variants-headline">
                Selected option:
            </div>
            <div class="${id}__variants-dp" data-selected="${selectedVariant.name}">
                <div class="${id}__variants-dp--title">
                    <span class="name">${selectedVariant.name}</span>
                    <span class="arrow">${arrow}</span>
                </div>
                <div class="${id}__variants-container ${id}__hide">
                    ${data.map((item) => variant(id, item)).join('\n')}
                </div>
            </div>
        </div>
    `;
  return htmlStr.trim();
};

export default variants;
