import shared from '../shared';

const { ID } = shared;

export default () => {

    const header = document.querySelector('.page-header');

    // change logos and icons
    const brandLogo = document.querySelector('.header .logo-wrapper .logo');
    brandLogo.querySelector('img').setAttribute('src', '//cdn.optimizely.com/img/6087172626/7c5cdf62083649069f5e674a8c229b46.png');

    // move the blue bar below the header
    const officialBar = document.querySelector('.logo-subtitle');
    header.insertAdjacentElement('afterend', officialBar);
    
    // add the search
    const newSearchIcon = document.createElement('div');
    newSearchIcon.classList.add(`${ID}-search`);
    newSearchIcon.innerHTML = `<span></span>`;
    document.querySelector('.header .header-right-links').insertAdjacentElement('afterbegin', newSearchIcon);

    // move the search from footer to below header
    const newSearchBar = document.createElement('div');
    newSearchBar.classList.add(`${ID}-searchBar`);
    officialBar.insertAdjacentElement('beforebegin', newSearchBar);
    const footerSearch = document.querySelector('.block.block-search')
    newSearchBar.appendChild(footerSearch);

    newSearchIcon.addEventListener('click', () => {
        if(newSearchBar.classList.contains(`${ID}-search_active`)) {
            newSearchBar.classList.remove(`${ID}-search_active`);
        } else {
            newSearchBar.classList.add(`${ID}-search_active`);
        }
    });

    // submit the form on new search
    const searchForm = document.querySelector(`.${ID}-searchBar`);
    searchForm.querySelector('#search_mini_form .label').addEventListener('click', () => {
        searchForm.querySelector('#search_mini_form').submit();
    });
}