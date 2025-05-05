const brandWrapper = (id, data) => {
  const html = `
    <div class="${id}__bandBar brand-bar">
        <div class="brand-bar__container">
            ${data
              .map((item) => {
                return `
                    <a href="${item.url}" class="brand-bar__item">
                        <img src="${item.imgLink}" alt="${item.name}" />
                    </a>
                `;
              })
              .join('\n')}
            
        </div>
    </div>
  `;
  return html.trim();
};

export default brandWrapper;
