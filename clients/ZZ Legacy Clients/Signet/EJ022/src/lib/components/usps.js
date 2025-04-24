import settings from '../settings';

export default () => {
  const usps = ['usp 1', 'usp2', 'usp3'];

  // add the usp wrapper
  const formWrapper = document.createElement('div');
  formWrapper.classList.add(`${settings.ID}-uspWrapper`);
  document.querySelector('#basketForm').appendChild(formWrapper);

  for (let index = 0; index < usps.length; index += 1) {
    const element = usps[index];
    const usp = document.createElement('div');
    usp.classList.add(`${settings.ID}-usp`);
    usp.innerHTML = `<p>${element}</p>`;
    document.querySelector(`.${settings.ID}-uspWrapper`).appendChild(usp);
  }
};
