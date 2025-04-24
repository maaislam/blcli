import shared from '../../shared';


const { ID } = shared;

export const createLoader = () => {
    const loader = document.createElement('div');
    loader.classList.add(`${ID}-loader`);
    loader.innerHTML = `
    <div class="${ID}-loader_inner">
        <div class="${ID}-loader_ring"></div>
        <span>Please wait...</span>
    </div>
      `;

    document.querySelector(`.${ID}-mainForm`).appendChild(loader);
}

export const showLoader = () => {
    const loader = document.querySelector(`.${ID}-loader`);
    loader.classList.add(`${ID}-loader_show`);
}

export const hideLoader = () => {
    const loader = document.querySelector(`.${ID}-loader`);
    loader.classList.remove(`${ID}-loader_show`);
}