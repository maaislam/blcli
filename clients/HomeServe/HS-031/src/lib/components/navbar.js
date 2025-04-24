import { myHomeServeData } from '../data/myHomeServeData.js';
import { accordion } from './componentUtils.js';
import search from './search.js';

//https://www.homeserve.co.uk/uk/account/B2C-logout?logout=show

const navbar = (id) => {
  const signInOutUrl = window.isLoggedIn ? '/uk/account/B2C-logout?logout=show' : '/uk/loggedin/my-homeserve';
  const signInOutText = window.isLoggedIn ? 'Log out' : 'Log in';

  const htmlStr = `<div class="${id}_navbar-container drawerClosed">
    <ul class="${id}_navlinks nav">
      <li class="${id}_navlink has-dropdown">
        <div class="${id}_dropdown-container">
          <p class='${id}_menu-title'>Home cover</p>
          <div class="${id}_dropdown-list">
            <a class='${id}_subLink' href="/insurance-cover">All home cover plans</a>
            <a class='${id}_subLink' href="/insurance-cover/gas-and-boiler-comparison">Boiler cover</a>
            <a class='${id}_subLink' href="/insurance-cover/plumbing-and-drainage-comparison">Plumbing & drainage cover</a>
            <a class='${id}_subLink' href="/insurance-cover/electrical-comparison">Electric cover</a>
            <a class='${id}_subLink' href="/insurance-cover/landlords-comparison">Landlord cover</a>
            <a class='${id}_subLink' href="/insurance/home-accident-cover">Home accident cover</a>
            <a class='${id}_subLink' href="/insurance/offers">Offers</a>
          </div>
        </div>
        ${accordion}
      </li>
      <li class="${id}_navlink">
        <a href="/heating/">New boilers</a>
        ${accordion}
      </li>
      <li class="${id}_navlink" style="display:none;">
        <a href="/ev-charger">EV Chargers</a>
        ${accordion}
      </li>
      <li class="${id}_navlink has-dropdown">
        <div class="${id}_dropdown-container">
          <p class='${id}_menu-title'>Repairs</p>
          <div class="${id}_dropdown-list">
            <a class='${id}_subLink' href="/repairs">One-off repair</a>
            <a class='${id}_subLink' href="/living/category/how-to">Fix it yourself</a>
            <a class='${id}_subLink' href="/loggedIn/my-homeserve">Make a claim</a>
          </div>
        </div>
        ${accordion}
      </li>
      <li class="${id}_navlink has-dropdown">
        <div class="${id}_dropdown-container">
          <p class='${id}_menu-title'>Help & Support</p>
          <div class="${id}_dropdown-list">
            <a class='${id}_subLink' href="/about/frequently-asked-questions">FAQs</a>
            <a class='${id}_subLink' href="/help-and-advice">Help & advice</a>
            <a class='${id}_subLink' href="/living">Living blog</a>
            <a class='${id}_subLink' href="/about/about-us">Why HomeServe?</a>
            <a class='${id}_subLink' href="/contact-us">Contact Us</a>
          </div>
        </div>
        ${accordion}
      </li>
      ${
        window.isLoggedIn
          ? `<li class="${id}_navlink has-dropdown ${id}_myHomeServe-mobile">
      <div class="${id}_dropdown-container">
        <p class='${id}_menu-title'>MyHomeServe</p>
        <div class="${id}_dropdown-list">
          ${myHomeServeData?.map((item) => `<a class='${id}_subLink' href="${item.url}">${item.title}</a>`).join('')}
        </div>
      </div>
      ${accordion}
      </li>`
          : ''
      }
      <li class="${id}_btnWrapper">
        <a href="${signInOutUrl}" class="btn" id="login_button">
            ${signInOutText}
        </a>
        <a href="/uk/loggedin/claims-proxy" class="btn" id="make_a_claim_button">
          Make a claim
        </a>
      </li>
    </ul>
    ${search(id)}
  </div>
  <div class="${id}__overlay"></div>
  `;

  return htmlStr;
};

export default navbar;
