const stockFilter = (id, quantity, VARIATION) => {
  const urlParams = new URLSearchParams(window.location.search);
  const toggleStatus = urlParams.get('criteria.inStock');

  // const label = !toggleStatus ? 'Only show items in stock' : 'Only show items in stock';
  const label = VARIATION === '1' ? 'Hide out of stock items' : 'Only show items in stock';
  const html = `
        <div class="${id}__toggle-facet_container">
            <label class="${id}__oct-toggle">
                <input class="${id}__oct-toggle__checkbox" type="checkbox" ${toggleStatus ? 'checked' : ''} 
                  data-testid="toggle-checkbox" aria-checked="false" name="inStock" role="switch" aria-label="${label}">
                <span class="${id}__oct-toggle__slider oct-toggle__slider--unselected" aria-hidden="true"></span>
            </label>
            <p class="oct-text oct-text--standard oct-text--size_m ${id}__toggle-facet_container_text" data-testid="text">${label}</p>
            ${
              window.location.pathname === '/sitesearch' && quantity
                ? `<span class="${id}__totalItems">${quantity} results</span>`
                : ''
            }
        </div>
    `;

  return html.trim();
};

export default stockFilter;
