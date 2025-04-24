import shared from '../../../../../../core-files/shared';

const savingMsg = (savingAmountToShow) => {
  const { ID, VARIATION } = shared;
  const utagData = window.utag.data;

  const { prodSkuSavePercent } = utagData;

  // console.log('prodSkuSavePercent', prodSkuSavePercent);
  // console.log('prodSkuSavePound', prodSkuSavePound);
  const htmlStr = `
    <div class="${ID}__saving ctwF9f RBilUC">
        <div class="">
            <div data-qaid="pdp-save-price"
                class="v46NZe"><span class="nw2ke_">Save</span><span aria-hidden="true">-</span>${prodSkuSavePercent[0]}%</div>
        </div>
        <div class="${ID}__saving-message">
            ${
              VARIATION === '1'
                ? `You’re saving £${savingAmountToShow} by purchasing today!`
                : `Buy now to save £${savingAmountToShow}!`
            } 
        </div>
        
    </div>
    `;

  return htmlStr;
};

export default savingMsg;
