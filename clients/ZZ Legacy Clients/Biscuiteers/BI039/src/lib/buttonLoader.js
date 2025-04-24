import settings from './settings';

const { ID } = settings;

export default () => {
  const allCTAButtons = document.querySelectorAll(`.${ID}-button:not(.${ID}-delivery)`);

  let timeoutTime;


  for (let index = 0; index < allCTAButtons.length; index += 1) {
    const element = allCTAButtons[index];
    const loader = document.createElement('span');
    loader.classList.add(`${ID}-buttonLoader`);
    loader.innerHTML =
    `<div class="${ID}-loader-container ${ID}-ball-pulse-double">
      <div class="${ID}-loader">
        <div class="${ID}-ball-1"></div>
        <div class="${ID}-ball-2"></div>
      </div>
    </div>`;
    element.appendChild(loader);

    element.addEventListener('click', (e) => {
      const currenttarget = e.currentTarget;

      if(!currenttarget.classList.contains('BI039-disabled')) {

      currenttarget.querySelector(`.${ID}-buttonLoader`).classList.add(`${ID}-loader_show`);

        // if the upsell ctas are clicked
        if (currenttarget.classList.contains('BI039-upsell_buy')) {
          timeoutTime = 3000;
        // if the buy now in delivery is clicked
        } else if (currenttarget.classList.contains('BI039-deliveryBuybutton')) {
          timeoutTime = 5000;
        } else {
          timeoutTime = 3000;
        }

        // remove the loader after so many seconds
        setTimeout(() => {
          currenttarget.querySelector(`.${ID}-buttonLoader`).classList.remove(`${ID}-loader_show`);
        }, timeoutTime);
      }
    });
  }
};
