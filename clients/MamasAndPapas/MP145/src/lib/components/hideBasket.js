export const removeBasket = () => {
  const slideOutBasket = document.querySelector('#miniCartSlider');
  const overlay = document.querySelector('.blackout');
  slideOutBasket.style.display = 'none';
  overlay.style.display = 'none';
  document.body.classList.add('MP145-allow_scroll');
};

export const showBasket = () => {
  const slideOutBasket = document.querySelector('#miniCartSlider');
  const overlay = document.querySelector('.blackout');
  slideOutBasket.style.display = 'block';
  overlay.style.display = 'block';
  document.body.classList.remove('MP145-allow_scroll');
};
