/* eslint-disable no-new */
import '../../../../../config/node_modules/array-from-polyfill/dist/index';
import { setup } from './services';
import PopOver from '../components/PopOver/PopOver';

const activate = () => {
  setup();

  if (window.mobileSite) document.body.classList.add('GD_mobile');

  const location = document.querySelector('body').id;
  switch (location) {
    case 'page-category':
      new PopOver({ version: 'PLP' });
      break;

    case 'page-product':
      new PopOver({ version: 'PDP' });
      break;

    case 'hometrial-basket-page':
      new PopOver({ version: 'hometrialBasket' });
      break;

    default:
      new PopOver({ version: 'all' });
      break;
  }
};

export default activate;
