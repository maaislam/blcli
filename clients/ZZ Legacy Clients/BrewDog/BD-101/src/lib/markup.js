import beerData from './data/beer';
import settings from './shared';
import visitData from './data/visit';
import exploreData from './data/explore';

const ID = settings.ID;

/**
 * Helper generate submenu markup
 */
const generateSubmenuMarkup = (menuData) => {
  let result = '';

  menuData.forEach((d) => {
    if(!d[1]) {
      result += `
        <li class="${ID}-nav__ltsection">
          <h2 class="heading heading-5">${d[0]}</h2>
        </li>
      `;
    } else {
      result += `
        <li class="${
          (
            d[2] == 1 ? `${ID}-nav__lt4 xstandout` : (
              d[2] == 2 ? `${ID}-nav__lt3 xstandout` : `${ID}-nav__lt2`
            )
          )
        } ${d[3] ? 'has-desc' : ''} ${d[4] ? 'has-image' : ''}">
          <a href="${d[1]}">

            <span class="${ID}-nav__link-title">${d[0]}</span>

            ${d[3] ? `
              <span class="${ID}-nav__link-desc">${d[3]}</span>
            ` : ''}

            ${d[4] ? `
              <img src="${d[4]}">
            ` : ''}
          </a>
        </li>
      `;
    }
  });

  result += '';

  return result;
};

/**
 * Main markup
 */
export default () => {
  const ID = settings.ID;

  let html = '';

  html += `
    <nav class="${ID}-nav">

      <ul class="${ID}-nav__block ${ID}-nav__main ${ID}-nav--list">
        <li class="${ID}-nav__lt4 ${ID}-has-kids">
          <a>
            <span class="${ID}-nav__link-title">BEER</span>
          </a>

          <ul class="${ID}-submenu">
            <h2 class="heading heading-5">Shop</h2>

            <li class="${ID}-nav__lt3 has-image xstandout">
              <a href="/uk/shop/beer">
                <span class="${ID}-nav__link-title">All Beer</span>
                <img src="https://brewdogmedia.s3.eu-west-2.amazonaws.com/images/menu-shopall.png">
              </a>
            </li>

            ${generateSubmenuMarkup(beerData)}
          </ul>
        </li>

        <li class="${ID}-nav__lt4">
          <a href="https://www.brewdog.com/uk/shop/cider">
            <span class="${ID}-nav__link-title">CIDER</span>
          </a>
        </li>

        <li class="${ID}-nav__lt4">
          <a href="https://www.brewdog.com/uk/shop/spirits">
            <span class="${ID}-nav__link-title">SPIRITS</span>
          </a>
        </li>

        <li class="${ID}-nav__lt4">
          <a href="https://www.brewdog.com/uk/shop/merchandise">
            <span class="${ID}-nav__link-title">MERCH</span>
          </a>
        </li>
      </ul>

      <div class="${ID}-nav__block ${ID}-nav__more">
        <h2 class="heading heading-5">More Brewdog</h2>

        <ul class="${ID}-nav--list">

          <li class="${ID}-nav__lt4 ${ID}-has-kids bg-grey">
            <a>
              <span class="${ID}-nav__link-title">Locations</span>
            </a>

            <ul class="${ID}-submenu">
              ${generateSubmenuMarkup(visitData)}
            </ul>
          </li>

          <li class="${ID}-nav__lt5">
            <a href="https://www.brewdog.com/uk/gift-guide">
              <span class="${ID}-nav__link-title">Gift Guide</span>
              <span class="${ID}-nav__link-desc">Find our perfect gift, from beer drinker to beer geek</span>
            </a>
          </li>

          <li class="${ID}-nav__lt4 ${ID}-has-kids bg-grey">
            <a>
              <span class="${ID}-nav__link-title">Community</span>
            </a>

            <ul class="${ID}-submenu">
              ${generateSubmenuMarkup(exploreData)}
            </ul>
          </li>

          <li class="${ID}-nav__lt4 bg-grey">
            <a href="https://www.brewdog.com/uk/shop/stock-clearance">
              <span class="${ID}-nav__link-title">Stock Clearance</span>
            </a>
          </li>

          <li class="${ID}-nav__lt4 bg-grey">
            <a href="https://www.brewdog.com/uk/shop/returns-and-refunds">
              <span class="${ID}-nav__link-title">Delivery & Returns</span>
            </a>
          </li>

          <li class="${ID}-nav__lt4 bg-grey">
            <a href="https://www.brewdog.com/uk/customer/account/">
              <span class="${ID}-nav__link-title">My account</span>
            </a>
          </li>
        </ul>
      </div>

    </nav>
  `;

  return html;
};
