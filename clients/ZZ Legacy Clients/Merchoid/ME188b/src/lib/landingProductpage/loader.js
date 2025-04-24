import settings from '../settings';

export const hideLoader = () => {
  const loader = document.querySelector(`.${settings.ID}-loader_wrapper`);
  setTimeout(() => {
    loader.classList.add(`${settings.ID}-loader_hide`);
  }, 7000);
};

export const loaderMarkup = () => {
  const loadingWrapper = document.createElement('div');
  loadingWrapper.classList.add(`${settings.ID}-loader_wrapper`);
  loadingWrapper.innerHTML = `
  <div class="${settings.ID}-text-inner">
    <span></span>
    <div class="${settings.ID}-text_logo ${settings.ID}-starWars_text"></div>
    <div class="${settings.ID}-text_logo ${settings.ID}-by_text"></div>
    <div class="${settings.ID}-text_logo ${settings.ID}-logo"></div>
  </div>`;
  document.body.appendChild(loadingWrapper);

  hideLoader();
};

export const showLoader = () => {

};

