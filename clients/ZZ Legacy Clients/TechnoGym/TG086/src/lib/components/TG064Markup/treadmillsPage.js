import TG042 from "./TG042";
import productDescriptions from "./productDescriptions";
import { pollerLite } from "../../../../../../../lib/uc-lib";
import settings from '../../settings';

const { ID } = settings;

export default () => {
  // add treadmills class
  document.body.classList.add(`${ID}-treadmills`);
  // if treadmills page, run code from TG064
  TG042();
  pollerLite(['.TG086-read_more'], () => {
    productDescriptions();

    // hide the desktop filter bar
    if(window.innerWidth > 767 && settings.VARIATION === '1') {
      const filterBar = document.querySelector(`.${ID}-topFiltersWrapper`);
      filterBar.style.display = 'none';
    }    
  });
 

  // move the designed for to the side
  const newFilters = () => {
    const designedFilters = document.createElement('div');
    designedFilters.classList.add(`${ID}-designedForSide`);
    designedFilters.innerHTML = `<dt>
    <div class="${ID}-filterType_title">
      Designed for
      <span class="icon-Arrowdown"></span>
    </div></dt><dd><ul><li>
    <span class="${ID}-home"></span>
    <a href="https://www.technogym.com/gb/products/cardio/shopby/line_internal-myrun-personal-forma-artis/product_type-treadmills.html">Home</a>
    </li>
    <li><span class="${ID}-business"></span><a href="https://www.technogym.com/gb/products/cardio/shopby/line_internal-artis-excite/product_type-treadmills.html">Business</a></li></ul></dd>`;

    document.querySelector('.aside-content #narrow-by-list').insertAdjacentElement('afterbegin', designedFilters);
  };
  if(window.innerWidth > 767 && settings.VARIATION === '1') {
    newFilters();
  }
}