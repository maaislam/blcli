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
    const currentPageNumber = pagination.querySelector('.page-number.page');
    const ellipsis = pagination.querySelectorAll('.ellipsis');

    if (pageNumbers.length > 0) {
      // Show last page number.
      const lastIndex = pageNumbers.length - 1;
      pageNumbers[lastIndex].classList.add(`${shared.ID}_show`);

      // Show previous page number.
      const previousSibling = currentPageNumber.previousElementSibling;
      if (currentPageNumber && previousSibling) {
        if (previousSibling.classList.contains('page-number')) {
          previousSibling.classList.add(`${shared.ID}_show`);
        }
      }

      // Show next page number.
      const nextSibling = currentPageNumber.nextElementSibling;
      if (currentPageNumber && nextSibling) {
        if (nextSibling.classList.contains('page-number')) {
          nextSibling.classList.add(`${shared.ID}_show`);
        }
      }

      // Is it the last, or second to last, page? If so, show page 1 number.
      const isLastPage = pageNumbers[lastIndex].classList.contains('page');
      const isSecondToLast = pageNumbers[lastIndex - 1] && pageNumbers[lastIndex - 1].classList.contains('page');
      if (isLastPage || isSecondToLast) {
        pageNumbers[0].classList.add(`${shared.ID}_show`);
      }

      // Sometimes there are two ellipsis items, if so show the second. Otherwise show the one.
      if (ellipsis.length > 1) ellipsis[1].classList.add(`${shared.ID}_show`);
      else if (ellipsis.length > 0) ellipsis[0].classList.add(`${shared.ID}_show`);

      // Edge cases
      let firstPageVisible = pageNumbers[0].classList.contains(`${shared.ID}_show`);
      const lastPageVisible = pageNumbers[lastIndex].classList.contains(`${shared.ID}_show`);
      const secondToLastVisible = pageNumbers[lastIndex - 1] && pageNumbers[lastIndex - 1].classList.contains(`${shared.ID}_show`);
      // Prevent this sorta thing on page 28: 27, 28, 29, ..., 30
      // Instead we want 1, ..., 27, 28, 29, 30
      if (!firstPageVisible && lastPageVisible && secondToLastVisible && ellipsis.length > 0) {
        pageNumbers[0].classList.add(`${shared.ID}_show`);
        pageNumbers[0].insertAdjacentElement('afterend', ellipsis[0]);
        firstPageVisible = true;
      }

      if (!firstPageVisible && lastPageVisible && ellipsis.length > 0) {
        // Move ellipsis to be before last page number, instead of after first page number.
        pageNumbers[lastIndex].insertAdjacentElement('beforebegin', ellipsis[0]);
      }
    }

    // Prevent two ellipsis from ever showing.
    const visibleEllipsis = pagination.querySelectorAll(`.${shared.ID}_show.ellipsis`);
    if (visibleEllipsis.length > 1) {
      visibleEllipsis[1].classList.remove(`${shared.ID}_show`);
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
