const rePositionTopRow = (rePosAt) => {
  const itemToObserve = document.querySelectorAll('.page-header.AV095');

  window.addEventListener('scroll', () => {
    if (window.scrollY > rePosAt) {
      itemToObserve.forEach((item) => {
        item.classList.add('AV095__fixed-row');
      });
      document.querySelector('.site-header.AV095').classList.add('AV095-hide');
    } else {
      itemToObserve.forEach((item) => {
        item.classList.remove('AV095__fixed-row');
      });
      document.querySelector('.site-header.AV095').classList.remove('AV095-hide');
    }
  });
};

export default rePositionTopRow;
