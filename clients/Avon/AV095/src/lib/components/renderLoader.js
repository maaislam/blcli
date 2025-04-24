export const renderLoader = (action, type) => {
  document.querySelectorAll('.AV095.page-header').forEach((item) => {
    if (action === 'add') {
      item.classList.add('AV095__sample--add-row');
      item.querySelector('.AV095-pg-header').classList.add('AV095-hide');
      item.querySelector(`.AV095__sample-${type}`).classList.remove('AV095-hide');
    } else {
      item.classList.add('AV095__sample--remove-row');
      item.querySelector(`.AV095__sample-${type}`).classList.remove('AV095-hide');

      item.querySelector('.AV095-pg-header').classList.add('AV095-hide');
    }
  });
};

export const resetLoader = () => {
  document.querySelectorAll('.AV095.page-header').forEach((item) => {
    item.classList.remove('AV095__sample--add-row');
    item.classList.remove('AV095__sample--remove-row');
    item.querySelector('.AV095-pg-header').classList.remove('AV095-hide');
    item.querySelector(`.AV095__sample-added`).classList.add('AV095-hide');
    item.querySelector(`.AV095__sample-removed`).classList.add('AV095-hide');
  });
};
