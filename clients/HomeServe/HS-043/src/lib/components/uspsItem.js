const uspsItem = (id, item) => {
  const html = `
        <div class="${id}__usp-card" role="region" aria-labelledby="${item.id}">
            <div class="${id}__usp-icon" aria-hidden="true" id="${item.id}">
                ${item.icon}
            </div>
            <div class="${id}__usp-text">
                <h3 id="${item.id}">${item.title}</h3>
                <p>${item.subtitle}</p>
            </div>
        </div>
    `;

  return html.trim();
};

export default uspsItem;
