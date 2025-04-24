import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

const { ID, VARIATION } = shared;

const targetPaths = [
  '/kitchens/fitted-kitchens',
  '/bedrooms/fitted-bedrooms',
  '/rooms/bathrooms/fitted-bathrooms',
  '/kitchen-visualiser',
  '/kitchens/kitchen-visualiser-overview',
  '/kitchen-style-finder'
];

const isTargetPage = targetPaths.some((path) =>
  window.location.pathname.includes(path)
);

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
  return null;
};

const setCookie = (cName, cValue) => {
  const path = 'path=/';
  document.cookie = `${cName}=${cValue}; ${path}`;
};

const init = () => {
  const isLogin = window.dataLayer.find((item) => item.event === 'login');
  const getPersona = getCookie('Persona');
  const isTrade = getPersona === 'Trade';

  if (isLogin) return;
  if (isTrade) return;

  setCookie('Persona', 'Consumer');
  window.location.reload();
};

export default () => {
  if (!isTargetPage) return;

  newEvents.initiate = true;
  newEvents.method = ['ga4'];
  newEvents.property = 'G-LVM963RWMB';

  setup();

  fireEvent('Conditions Met');

  if (VARIATION == 'control') {
    return;
  }

  init();

};
