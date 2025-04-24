import { fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

const { ID } = shared;

const newNavigationHTML = `<div class="${ID}-new-nav-elements">
<a class="single-nav-element" href="/collections/new-in/">NEW IN</a>
<a class="single-nav-element" href="/collections/non-wired-bras/">NON - WIRED BRAS</a>
<a class="single-nav-element" href="/search/padded/">PADDED BRAS</a>
<a class="single-nav-element" href="/collections/t-shirt-bras/">T-SHIRT BRAS</a>
<a class="single-nav-element" href="/collections/sports-bras/">SPORTS BRAS</a>
<a class="single-nav-element single-nav-element-with-svg">
	SHOP BY CATEGORY <svg aria-hidden="true" focusable="false" data-prefix="fal" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" ><path fill="currentColor" d="M443.5 162.6l-7.1-7.1c-4.7-4.7-12.3-4.7-17 0L224 351 28.5 155.5c-4.7-4.7-12.3-4.7-17 0l-7.1 7.1c-4.7 4.7-4.7 12.3 0 17l211 211.1c4.7 4.7 12.3 4.7 17 0l211-211.1c4.8-4.7 4.8-12.3.1-17z"></path></svg>
</a>
<div class="hidden-sub-categories">
	 <a class="single-nav-element" href="/collections/all-lingerie/">LINGERIE</a>
	 <a class="single-nav-element" href="/collections/all-swimwear/">SWIMWEAR</a>
	 <a class="single-nav-element" href="/collections/all-clothing/">CLOTHING</a>
	 <a class="single-nav-element" href="/collections/sportswear/">SPORTSWEAR</a>
	 <a class="single-nav-element" href="/collections/all-nightwear/">NIGHTWEAR</a>
</div>
<a class="single-nav-element" href="/collections/sale/"><span class="c-tag">Sale</span></a>
</div>`;

/**
 * @param {Element} originalNavigationElement
 */
export const renderNewNavigation = (originalNavigationElement) => {
  originalNavigationElement.insertAdjacentHTML('afterend', newNavigationHTML);

  for (const element of document.querySelectorAll('.single-nav-element')) {
    // On new element click
    element.addEventListener('click', (e) => {
      e.preventDefault();
      e.target.innerText && fireEvent(`Click Link - ${e.target.innerText}`);

      // If not shop by category or undefined (svg element) -> fire event and redirect
      if (
        e.target.innerText !== 'SHOP BY CATEGORY' &&
        e.target.innerText !== undefined &&
        !!e.target.href
      ) {
        fireEvent(`Click Link - user is being redirected to: ${e.target.href}`);
        return (window.location = e.target.href);
      }

      const shopByCategoryElement = document.querySelector(
        '.single-nav-element-with-svg'
      );

      /**
       * When open -> rotate and show sub-categories
       * When close -> rotate and hide sub-categories
       */
      if (
        !shopByCategoryElement.classList.contains(
          'single-nav-element-with-svg--open'
        )
      ) {
        // Add class to rotate svg
        shopByCategoryElement.classList.add(
          'single-nav-element-with-svg--open'
        );

        // Add class to show sub-categories
        document
          .querySelector('.hidden-sub-categories')
          .classList.add('hidden-sub-categories--show');

        fireEvent(`Click Link - user opened SHOP BY CATEGORY`);
      } else {
        // Remove class to rotate svg
        shopByCategoryElement.classList.remove(
          'single-nav-element-with-svg--open'
        );

        // Remove class to show sub-categories
        document
          .querySelector('.hidden-sub-categories')
          .classList.remove('hidden-sub-categories--show');

        fireEvent(`Click Link - user closed SHOP BY CATEGORY`);
      }
    });
  }
};
