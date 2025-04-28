const modal = (id, optionsArray, sortBy) => {
  const html = `
              <div class="${id}__modal ${id}__sortByModal" role="dialog" aria-modal="true" aria-hidden="true" aria-labelledby="${id}__modal-title" aria-describedby="${id}__modal-desc">
                  <div class="${id}__modal-overlay"></div>
                  <div class="${id}__modal-container">
                      <div class="${id}__modal-content">
                        ${optionsArray
                          .map((option) => {
                            return `<button class="${id}__sortOption ${
                              sortBy && option.value === sortBy ? `${id}__active` : ''
                            }" type="button" data-value="${option.value}">${option.label}</button>`;
                          })
                          .join('\n')}    
                        </div>
                  </div>
              </div>
          `;
  return html.trim();
};

export default modal;
