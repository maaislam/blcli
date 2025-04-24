import imageMap from '../config/imageMap';

export default {
  getUrl() {
    return window.location.pathname;
  },
  getColour(selectEl) {
    if (selectEl) {
      const selectedOption = selectEl.querySelector('option[selected="selected"]');
      const colourId = selectedOption.getAttribute('value');
      return colourId;
    }
  },
  checkMap(url, colourId) {
    let run = {} || false;
    if (url && colourId) {
      if (imageMap[url]) {
        run = imageMap[url][colourId];
      }
    }
    return run;
  }
};