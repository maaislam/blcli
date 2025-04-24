/**
 * IDXXX - Description
 * @author User Conversion
 */

const activate = () => {
  let URLs = {
    'treadmill-myrun.html': 0,
    'run-personal.html': 0,
    'skillbike.html': 0,
    'unica.html': 0,
    'skillrow.html': 0,
    'skillmill-connect.html': 0,
    'skillrun.html': 0,
    'mycycling.html': 0,
    'bike-excite-forma.html': 0,
    'jog-excite-forma.html': 0,
    'synchro-excite-forma.html': 0,
    'cross-personal.html': 0,
  };

  if (localStorage.getItem('TG-product_engagement')) {
    URLs = JSON.parse(localStorage.getItem('TG-product_engagement'));
  }

  const key = window.location.pathname.replace('/gb/', '');

  if (typeof URLs[key] !== 'undefined') {
    URLs[key] = URLs[key] + 1;
  }

  localStorage.setItem('TG-product_engagement', JSON.stringify(URLs));
};

export default activate;
