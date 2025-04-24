import settings from '../settings';

// if clear or apply is clicked, remove storage
export default () => {
  const viewButton = document.querySelector('#filter-modal .filters-panel__header .filters-panel__cta');
  const clearAll = document.querySelector('#filter-modal .filters-panel__header #clear');

  viewButton.addEventListener('click', () => {
    // if any are active, remove them
    if (document.querySelector(`.${settings.ID}-filter_active`)) {
      document.querySelector(`.${settings.ID}-filter_active`).classList.remove(`${settings.ID}-filter_active`);
    }
    sessionStorage.removeItem(`${settings.ID}-filtered`);
  });


  if (clearAll) {
    clearAll.addEventListener('click', () => {
      sessionStorage.removeItem(`${settings.ID}-filtered`);
      if (document.querySelector(`.${settings.ID}-filter_active`)) {
        document.querySelector(`.${settings.ID}-filter_active`).classList.remove(`${settings.ID}-filter_active`);
      }
    });
  }
};
