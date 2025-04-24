import debounce from 'lodash/debounce';

export const swipeHnadler = (fireEvent) => {
  const elem = document.querySelector('.page_products_section ');
  console.log(elem);
  if (!elem) {
    return;
  }
  const mouseMoveHandler = debounce(() => {
    if (elem.classList.contains('mouseMoveTrackStart')) {
      fireEvent('user swipers or clicks through the product carousel');
    }
  }, 100);
  const mouseUpHandler = () => {
    elem.removeEventListener('mousemove', mouseMoveHandler);
    elem.classList.remove('mouseMoveTrackStart');
    // elem.removeEventListener('mouseup', mouseUpHandler);
    // console.log('mouse up');
  };

  const mouseDownHandler = () => {
    elem.classList.add('mouseMoveTrackStart');
    elem.addEventListener('mousemove', mouseMoveHandler);
    elem.addEventListener('mouseup', mouseUpHandler);
  };
  elem.addEventListener('mousedown', mouseDownHandler);
};
