import settings from '../../settings';

const { ID } = settings;

export default () => {
  const selectMinBox = document.querySelector(`.${ID}-price-select`);
  const selectMaxBox = document.querySelector(`.${ID}-price-select:last-child`);
  const lowPrice = document.querySelector('.price-filter #lowLimit');
  const toPrice = document.querySelector('.price-filter #highLimit');

  if (selectMaxBox && selectMinBox) {
    selectMinBox.addEventListener('change', () => {
      lowPrice.value = selectMinBox.value;
    });
    selectMaxBox.addEventListener('change', () => {
      toPrice.value = selectMaxBox.value;
    });
  }
};
