import shared from "../shared"

const { ID } = shared;

export const createLoader = () => {
    const loader = document.createElement('div');
    loader.classList.add(`${ID}-finderLoader`);
    loader.innerHTML = `<div class="${ID}-loader_inner">
    <span></span><p>Loading your personalised products</p>
    </div>`;

    document.querySelector(`.${ID}-finderOptions_wrapper`).appendChild(loader);
}

export const showLoader = () => {
    const loader = document.querySelector(`.${ID}-finderLoader`);
    loader.classList.add(`${ID}-loader_active`);
}

export const removeLoader = () => {
    const loader = document.querySelector(`.${ID}-finderLoader`);
    loader.remove();
}



