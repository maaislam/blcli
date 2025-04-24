/**
 * change the mobile header
 */

import shared from "./shared";

export default () => {

    const { ID } =  shared;

    const mobileHeader = document.querySelector('.page-header');

    // change logo
    const logo = mobileHeader.querySelector('.logo-wrapper');

    const navToggle = mobileHeader.querySelector('.nav-toggle');
    logo.insertAdjacentElement('beforebegin', navToggle);

    const newSearchIcon = document.createElement('div');
    newSearchIcon.classList.add(`${ID}-search`);
    newSearchIcon.innerHTML = `<span></span>`;
    mobileHeader.querySelector('.header-right-links__cart-links').insertAdjacentElement('afterbegin', newSearchIcon);

    const search = document.querySelector('.top-search-banner');
    document.querySelector(`.${ID}-search`).addEventListener('click', () => {
        if(search.classList.contains(`${ID}-searchShow`)){
            search.classList.remove(`${ID}-searchShow`);
        } else {
            search.classList.add(`${ID}-searchShow`);
        }
    });
}