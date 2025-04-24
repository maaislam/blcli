import {
  setup,
  sizeSelect,
  colorSelect,
  generateSizeList,
} from './services';
import settings from './settings';

const {
  ID
} = settings;

const activate = () => {
  setup();

  if (window.dataLayer[0].page.template === 'prodpage') {
    localStorage.removeItem('sizeModifiers');
    const target = document.querySelector('#product_select');
    if(!target.querySelector('input[type="radio"]')){
      sizeSelect(true);
      generateSizeList();
    } else {
      colorSelect();
      sizeSelect(false);
    }
  }
};

export default activate;
