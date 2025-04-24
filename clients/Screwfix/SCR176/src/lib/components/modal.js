const modal = (id) => {
  const html = `
    <div class="${id}__modal">
        <div class="${id}__modal-overlay"></div>   
          <div class="${id}__modal-container">
              <div class="${id}__loader"></div>
              <div class="${id}__modal-content" style="display: none;">
               
              </div>
          </div>
        </div>
    </div>
    `;
  return html.trim();
};

export default modal;
