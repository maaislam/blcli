import modalInner from './modalInner';

const renderModal = (ID) => {
  //render modal
  const modal = document.createElement('div');
  modal.id = `${ID}__modal`;

  modal.innerHTML = `
      <div id="${ID}__overlay" class="${ID}__overlay ${ID}__hide"></div>
      <div id="${ID}__modal" class="${ID}__modal ${ID}__hide">
          <div class="${ID}__modal-content">
           ${modalInner()}
            
            
          </div>
      </div>`;
  //modal overlay
  const overlay = document.createElement('div');
  overlay.id = `${ID}__overlay`;
  overlay.classList.add('modal-overlay');

  document.body.appendChild(modal);
};
export default renderModal;
