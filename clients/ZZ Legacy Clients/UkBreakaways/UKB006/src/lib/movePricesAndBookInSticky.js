import { throttle } from '../../../../../lib/uc-lib';

export default () => {
  const pricesContainer = document.querySelector('span.blue-line.large.orange');
  const bookCTAContainer = document.querySelector('a.orange-btn.book.pull-right');
  document.querySelector('footer').insertAdjacentHTML('afterend', `<div class='UKB006-sticky__wrapper'></div>`);
  const stickyContainer = document.querySelector('.UKB006-sticky__wrapper');
  stickyContainer.insertAdjacentElement('beforeend', pricesContainer);
  stickyContainer.insertAdjacentElement('beforeend', bookCTAContainer);

  const scrollHandler = throttle(() => {
    //get the element
    const elem = document.querySelector('.UKB006-selectSection__wrapper');
    //get the distance scrolled on body (by default can be changed)
    const distanceScrolled = document.body.scrollTop;
    //create viewport offset object
    const elemRect = elem.getBoundingClientRect();
    //get the offset from the element to the viewport
    const elemViewportOffset = elemRect.top;
    const totalOffset = distanceScrolled + elemViewportOffset;
    
    if (window.pageYOffset > totalOffset) {
      stickyContainer.classList.add("sticky");
    } else {
      stickyContainer.classList.remove("sticky");
    }
  }, 300);
  
  window.addEventListener('scroll', scrollHandler);
};