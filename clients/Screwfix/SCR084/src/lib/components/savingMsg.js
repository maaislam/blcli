import shared from '../../../../../../core-files/shared';

const savingMsg = (savingAmountToShow, savingPercent) => {
  const { ID, VARIATION } = shared;

  const formatNumber = (number) => {
    if (number % 1 !== 0) {
      return number.toFixed(2);
    } else {
      return number.toString();
    }
  };
  const percentValue = formatNumber(savingPercent * 100);
  // console.log('prodSkuSavePercent', prodSkuSavePercent);
  // console.log('prodSkuSavePound', prodSkuSavePound);
  const htmlStr = `
    <div class="${ID}__saving ctwF9f RBilUC">
        <div class="">
            <div data-qaid="pdp-save-price"
                class="v46NZe"><span class="nw2ke_">Save</span><span aria-hidden="true">-</span>${percentValue}%</div>
        </div>
        <div class="${ID}__saving-message">
            ${
              VARIATION === '1'
                ? `You’re saving £${formatNumber(savingAmountToShow)} by purchasing today!`
                : `Buy now to save £${formatNumber(savingAmountToShow)}!`
            } 
        </div>
        
    </div>
    `;

  return htmlStr;
};

export default savingMsg;
