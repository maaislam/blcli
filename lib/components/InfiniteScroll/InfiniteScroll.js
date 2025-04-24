import { throttle } from '../../uc-lib';

export default (cb) => {
  const container = document.querySelector('.productLister');
  const pagination = document.querySelector('.pagination-plp');
  const next = document.querySelector('.pagination-down .pagination .next a');
  const bottomPagination = document.querySelector('.pagination-down .pagination');
  let isRunning = false;
  let finished = false;

  pagination.style.display = 'none';

  console.log(bottomPagination);
  const loadNextProducts = () => {
    if (isRunning || finished) {
      return false;
    }
    isRunning = true;
    if (pagination && next) {
      const nextHref = next.getAttribute('href');

      if (nextHref) {
        const request = new XMLHttpRequest();
        request.open('GET', nextHref, true);

        request.onload = () => {

          if (request.status >= 200 && request.status < 400) {
            const temp = document.createElement('div');
            temp.innerHTML = request.responseText;
            const itemsToAdd = temp.querySelectorAll('.productLister .col-xs-6.col-sm-3.mt-3');
            const newNext = temp.querySelector('.pagination-down .pagination .next a');

            // loop through the items that need to be added
            for (let index = 0; index < itemsToAdd.length; index += 1) {
              const element = itemsToAdd[index];
              const image = element.querySelector('img');
              const dataSrc = image.getAttribute('data-src');
              const src = image.getAttribute('src');

              if (dataSrc !== src) {
                image.setAttribute('src', dataSrc);
              }
              // append to the current product container
              container.appendChild(element);
            }
            // update the pagination href to pull in the products
            if (newNext && newNext.getAttribute('href')) {
              next.setAttribute('href', newNext.getAttribute('href'));
            } else {
              finished = true;
              pagination.remove();
              bottomPagination.remove();
            }
            isRunning = false;
            if (typeof cb === 'function') {
              cb();
            }
          }
        };
        request.send();
      }
    }
  };

  // on scroll load the new products in
  window.onscroll = (throttle, () => {
    const pOffsetTop = bottomPagination.getBoundingClientRect().top;
    if ((window.pageXOffset + window.outerHeight) >= pOffsetTop) {
      loadNextProducts();
    }
  });
};
