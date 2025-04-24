import { fullStory } from '../../../../../lib/utils';
import settings from './settings';
const { ID, VARIATION } = settings;

/**
 * Standard experiment setup
 */
export const setup = () => {
  fullStory(ID, `Variation ${VARIATION}`);
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
};

/**
 * Appends a stylesheet to the head from a CDN
 * @param {string} url Stylesheet URL
 */
export const appendStyleSheet = (url) => {
  const el = document.createElement('link');
  el.href = url;
  el.type = 'text/css';
  el.rel = 'stylesheet';
  document.getElementsByTagName('head')[0].appendChild(el);
};

/**
 * Gets user data from digitalData or localStorage if available
 */
export const getUserData = () => {
  const localSegments = window.localStorage.DS003 ? JSON.parse(window.localStorage.DS003) : undefined;
  const segments = window.digitalData.user[0].segment;
  const dataLayer = Object.prototype.hasOwnProperty.call(segments, 'areaofuse') ? segments : undefined;
  if (dataLayer && localSegments !== dataLayer) {
    // Local storage is out of date, update data
    window.localStorage.DS003 = JSON.stringify(dataLayer);
  }

  return dataLayer || localSegments;
};

export const generateName = (code, obj) => {
  let html = '';
  switch(code){
    case 'EN':
    html += `<h4 class="${ID}_topCategories__itemTitle">${obj.name}</h4>`
    break;
    case 'DE':
    html += `<h4 class="${ID}_topCategories__itemTitle">${obj.nameDE}</h4>`
    break;
    case 'CH':
    html += `<h4 class="${ID}_topCategories__itemTitle">${obj.nameDE}</h4>`
    break;
    case 'FR':
    html += `<h4 class="${ID}_topCategories__itemTitle">${obj.nameFR}</h4>`
    break;
    case 'SV':
    html += `<h4 class="${ID}_topCategories__itemTitle">${obj.nameSV}</h4>`
    break;
    default:
    break;
  }
  return html;
}

export const generateProduct = (code, obj, shopNow) => {
  let html = '';
  switch(code){
    case 'EN':
    html += `
    <img src="${obj.img}" class="${ID}_slider__tabBody--listItem__img">
    <p class="${ID}_slider__tabBody--listItem__desc">${obj.name.length > 33 ? `${obj.name.substr(0, 45)}...` : obj.name}</p>
    <div class="${ID}_slider__tabBody--listItem__buttonWrap">
      <a href="${obj.link}" class="${ID}_slider__tabBody--listItem__button">${shopNow}</a>
    </div>
    `
    break;
    case 'DE':
    html += `
    <img src="${obj.img}" class="${ID}_slider__tabBody--listItem__img">
    <p class="${ID}_slider__tabBody--listItem__desc">${obj.nameDE.length > 33 ? `${obj.nameDE.substr(0, 45)}...` : obj.nameDE}</p>
    <div class="${ID}_slider__tabBody--listItem__buttonWrap">
      <a href="${obj.linkDE}" class="${ID}_slider__tabBody--listItem__button">${shopNow}</a>
    </div>
    `
    break;
    case 'CH':
    html += `
    <img src="${obj.img}" class="${ID}_slider__tabBody--listItem__img">
    <p class="${ID}_slider__tabBody--listItem__desc">${obj.nameDE.length > 33 ? `${obj.nameDE.substr(0, 45)}...` : obj.nameDE}</p>
    <div class="${ID}_slider__tabBody--listItem__buttonWrap">
      <a href="${obj.linkDE}" class="${ID}_slider__tabBody--listItem__button">${shopNow}</a>
    </div>
    `
    break;
    case 'FR':
    html += `
    <img src="${obj.img}" class="${ID}_slider__tabBody--listItem__img">
    <p class="${ID}_slider__tabBody--listItem__desc">${obj.nameFR.length > 33 ? `${obj.nameFR.substr(0, 45)}...` : obj.nameFR}</p>
    <div class="${ID}_slider__tabBody--listItem__buttonWrap">
      <a href="${obj.linkFR}" class="${ID}_slider__tabBody--listItem__button">${shopNow}</a>
    </div>
    `
    break;
    case 'SV':
    html += `
    <img src="${obj.img}" class="${ID}_slider__tabBody--listItem__img">
    <p class="${ID}_slider__tabBody--listItem__desc">${obj.nameSV.length > 33 ? `${obj.nameSV.substr(0, 45)}...` : obj.nameSV}</p>
    <div class="${ID}_slider__tabBody--listItem__buttonWrap">
      <a href="${obj.linkSV}" class="${ID}_slider__tabBody--listItem__button">${shopNow}</a>
    </div>
    `
    break;
    default:
    break;
  }
  return html;
}

export const generateCategoryName = (code, obj, cleanCat, index) => {
  let html = '';
  switch(code){
    case 'EN':
    html += `<li class="${ID}_slider__tabHeader--listItem" data-categoryName="${obj.name}" data-sliderindex="${index}" data-toggle="${cleanCat}">${obj.name}</li>`;
    break;
    case 'DE':
    html += `<li class="${ID}_slider__tabHeader--listItem" data-categoryName="${obj.nameDE}" data-sliderindex="${index}" data-toggle="${cleanCat}">${obj.nameDE}</li>`;
    break;
    case 'CH':
    html += `<li class="${ID}_slider__tabHeader--listItem" data-categoryName="${obj.nameDE}" data-sliderindex="${index}" data-toggle="${cleanCat}">${obj.nameDE}</li>`;
    break;
    case 'FR':
    html += `<li class="${ID}_slider__tabHeader--listItem" data-categoryName="${obj.nameFR}" data-sliderindex="${index}" data-toggle="${cleanCat}">${obj.nameFR}</li>`;
    break;
    case 'SV':
    html += `<li class="${ID}_slider__tabHeader--listItem" data-categoryName="${obj.nameSV}" data-sliderindex="${index}" data-toggle="${cleanCat}">${obj.nameSV}</li>`;
    break;
    default:
    break;
  }
  return html;
}