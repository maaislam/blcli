/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { events } from '../../../../../lib/utils';
import { setup } from './services';
import shared from './shared';

export default () => {
  setup();

  /*
    Always show current page number (.page) CSS
    Always show last page number (.page_number:last-child) JS
    Always show previous page, if there is one ((.page).previousSibling) JS
    Always show next page, if there is one ((.page).nextSibling) JS
    Show page 1 when current page is the last page ir second to last.
  */
  const changePagination = () => {
    const pagination = document.querySelector('.pagination');
    const pageNumbers = pagination.querySelectorAll('.page-number');
    const currentPage = pagination.querySelector('.page-number.page');
    const currentPageNumber = parseInt(currentPage.innerText, 10);
    const ellipsis = pagination.querySelectorAll('.ellipsis');

    if (pageNumbers.length > 0) {
      // Show last page number.
      const lastIndex = pageNumbers.length - 1;
    const lastPageNumber = parseInt(pageNumbers[lastIndex].innerText, 10);

      pageNumbers[lastIndex].classList.add(`${shared.ID}_show`);

      // Show previous page number.
      const previousSibling = currentPage.previousElementSibling;
      if (currentPage && previousSibling) {
        if (previousSibling.classList.contains('page-number')) {
          previousSibling.classList.add(`${shared.ID}_show`);
        }
      }

      // Show next page number.
      const nextSibling = currentPage.nextElementSibling;
      if (currentPage && nextSibling) {
        if (nextSibling.classList.contains('page-number')) {
          nextSibling.classList.add(`${shared.ID}_show`);
        }
      }

      // Always show page 1
      pageNumbers[0].classList.add(`${shared.ID}_show`);

      // Edge cases
      const secondToLastVisible = lastPageNumber - currentPageNumber < 3; // when 11 pages & on page 7, it's: 11 - 7 = 3

      // When on page 7:  1 ... 6 7 8 ... 11 <- we want both ellipsis
      // When on page 11 (last): 1 ... 10 11  <- show one ellipsis
      if (ellipsis.length > 1) ellipsis[1].classList.add(`${shared.ID}_show`);
      else if (ellipsis.length > 0) ellipsis[0].classList.add(`${shared.ID}_show`);
      if (currentPageNumber > 3 && !secondToLastVisible) {
        ellipsis[0].classList.add(`${shared.ID}_show`);
      }

      // Add second ellipsis to go from: 1 ... 7 8 9 11
      // to: 1 ... 7 8 9 ... 11
      // And make sure first ellipsis is just after page 1 number
      console.log(lastIndex, currentPageNumber, secondToLastVisible)
      if (currentPageNumber > 3 && !secondToLastVisible && ellipsis.length === 1) {
        console.log('add second ellipsis');
        const secondEllipsis = ellipsis[0].cloneNode(true);
        pageNumbers[lastIndex].insertAdjacentElement('beforebegin', secondEllipsis);
        pageNumbers[0].insertAdjacentElement('afterend', ellipsis[0]);
      }
    }

    // Event tracking.
    for (let i = 0; i < ellipsis.length; i++) {
      ellipsis[i].addEventListener('click', () => {
        events.send(shared.ID, 'Click', 'Ellipsis clicked');
      });
    }
    for (let i = 0; i < pageNumbers.length; i++) {
      pageNumbers[i].addEventListener('click', () => {
        events.send(shared.ID, 'Click', 'Page number clicked');
      });
    }
  };

  // Run.
  changePagination();

  // Run when page changes (pagination relies on PJAX)
  $('.product-list #pjax-container').on('pjax:end', () => {
    changePagination();
  });
};
