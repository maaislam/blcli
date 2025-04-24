import beerData from './data/beer';
import shopData from './data/shop';
import visitData from './data/visit';
import exploreData from './data/explore';
import settings from './shared';

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
        <li class="${ID}-nav__lt3 has-image">
          <a href="/uk/shop/shopall">
            <span class="${ID}-nav__link-title">Shop all</span>
            <img src="https://brewdogmedia.s3.eu-west-2.amazonaws.com/images/menu-shopall.png">
          </a>
        </li>

        <li class="${ID}-nav__lt4 ${ID}-has-kids">
          <a>
            <span class="${ID}-nav__link-title">SHOP</span>
            <span class="${ID}-nav__link-desc">Browse our selection of beers, spirits, ciders & more</span>
          </a>

          <ul class="${ID}-submenu">
            ${generateSubmenuMarkup(shopData)}
          </ul>
        </li>

        <li class="${ID}-nav__lt4 ${ID}-has-kids">
          <a>
            <span class="${ID}-nav__link-title">BEER</span>
            <span class="${ID}-nav__link-desc">Discover our full range of beer and beer bundles</span>
          </a>

          <ul class="${ID}-submenu">

            <li class="${ID}-nav__lt3 has-image xstandout">
              <a href="/uk/shop/multi-beer-bundles">
                <span class="${ID}-nav__link-title">Shop beer bundles</span>

                <img src="https://brewdogmedia.s3.eu-west-2.amazonaws.com/images/menu-bundles.png">
              </a>
            </li>

            ${generateSubmenuMarkup(beerData)}
          </ul>
        </li>

        <li class="${ID}-nav__lt4 ${ID}-has-kids">
          <a>
            <span class="${ID}-nav__link-title">VISIT</span>
            <span class="${ID}-nav__link-desc">Find your nearest bar or explore our breweries</span>
          </a>

          <ul class="${ID}-submenu">
            ${generateSubmenuMarkup(visitData)}
          </ul>
        </li>

        <li class="${ID}-nav__lt4 ${ID}-has-kids">
          <a>
            <span class="${ID}-nav__link-title">EXPLORE</span>
            <span class="${ID}-nav__link-desc">Learn more about BrewDog, our initiatives & culture</span>
          </a>

          <ul class="${ID}-submenu">
            ${generateSubmenuMarkup(exploreData)}
          </ul>
        </li>
      </ul>

      <div class="${ID}-nav__block ${ID}-nav__bestsellers">
        <h2 class="heading heading-5">Bestsellers</h2>

        <div class="${ID}-nav__boxes">
          <a class="${ID}-nav__box" href="https://www.brewdog.com/uk/punk-ipa-48-can">
            <img src="https://brewdogmedia.s3.eu-west-2.amazonaws.com/images/menu-punk48.png">
            <span class="xtitle">Punk IPA x 48 Bundle</span>
          </a>
          <a class="${ID}-nav__box" href="https://www.brewdog.com/uk/the-headliners-48-x-can">
            <img src="https://brewdogmedia.s3.eu-west-2.amazonaws.com/images/menu-headliner48.png">
            <span class="xtitle">Headliner x 48 Bundle</span>
          </a>
        </div>

        <ul class="${ID}-nav--list">
          <li class="${ID}-nav__lt4">
            <a href="https://www.brewdog.com/uk/shop/best-sellers">
              <span class="${ID}-nav__link-title">Shop all bestsellers</span>
            </a>
          </li>
        </ul>
      </div>

      <div class="${ID}-nav__block ${ID}-nav__more">
        <h2 class="heading heading-5">More Brewdog</h2>

        <ul class="${ID}-nav--list">
          <li class="${ID}-nav__lt5">
            <a href="https://www.brewdog.com/uk/gift-guide">
              <span class="${ID}-nav__link-title">Gift Guide</span>
              <span class="${ID}-nav__link-desc">Find our perfect gift, from beer drinker to beer geek</span>
            </a>
          </li>

          <li class="${ID}-nav__lt4 bg-grey">
            <a href="https://www.brewdog.com/uk/shop/multi-beer-bundles">
              <span class="${ID}-nav__link-title">Beer bundles</span>
            </a>
          </li>

          <li class="${ID}-nav__lt4 bg-grey">
            <a href="https://www.brewdog.com/uk/shop/new-releases">
              <span class="${ID}-nav__link-title">New releases</span>
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
