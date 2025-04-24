import { getData, getDataFromNav } from "./getData"
import shared from "./shared";

export default () => {

    const { ID } = shared;

    const navData = getData(getDataFromNav);

    const createNavWrapper = () => {
        const newNav = document.createElement('div');
        newNav.classList.add(`${ID}-mainNav`);
        newNav.innerHTML = `<div class="${ID}-navInner"><ul></ul></div>`

        document.querySelector('.header .header__container').insertAdjacentElement('afterend', newNav);
    }

    createNavWrapper();


    Object.keys(navData).forEach((i) => {
        console.log([i][0]);
        const data = navData[i];

        const navLink = document.createElement('li');
        navLink.classList.add(`${ID}-level1Nav`);
        navLink.innerHTML = `<span><a href="#">${[i][0]}</a></span>`;

        document.querySelector(`.${ID}-navInner ul`).appendChild(navLink);
    });

}