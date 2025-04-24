import shared from "../shared";

const { ID } = shared;

export const createLoader = () => {
    const loader = document.createElement ('div');
    loader.classList.add(`${ID}-loader`);
    loader.innerHTML = `<span></span><p>Checking Terms...</p>`;
    const h1 = document.querySelector('.content.search-content .container h1');
    if(h1) {
      h1.insertAdjacentElement('afterend', loader);
    }
}

export const showLoader = () => {
    const loader = document.querySelector(`.${ID}-loader`);
    if(loader) {
      loader.classList.add(`${ID}-loader_visible`);
    }
}

export const hideLoader = () => {
    const loader = document.querySelector(`.${ID}-loader`);
    if(loader) {
      loader.classList.remove(`${ID}-loader_visible`);
    }
}
