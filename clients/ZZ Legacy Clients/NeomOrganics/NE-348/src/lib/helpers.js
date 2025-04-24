import { fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export const checkScrollUntilElIntoView = (elementTarget) => {
  window.addEventListener("scroll", function() {
    if (!elementTarget.classList.contains('cta-seen')) {
      if (window.scrollY <= (elementTarget.offsetTop + elementTarget.offsetHeight)) {
        if (isElementInViewport(elementTarget)) {
          elementTarget.classList.add('cta-seen');

          if (VARIATION == '2') {
            fireEvent(`Visible - 'Show more' button`);
          } else if (VARIATION == 'control') {
            fireEvent(`Visible - Pagination`);
          }
        }
      }
    }
  });
};

export const isElementInViewport = (el) => {
  let jQuery = null;
  jQuery = window.jQuery || window.$;
  if (typeof jQuery === "function" && el instanceof jQuery) {
      el = el[0];
  }

  let rect = el.getBoundingClientRect();

  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
      rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
  );
}

