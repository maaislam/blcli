import shared from "../../../../../../core-files/shared";
import data from "../data";

export default () => {
  const { ID } = shared;

  const gridData = data().inGrid;

  Object.keys(gridData).forEach((i) => {
    const data = gridData[i];

    const gridBlock = document.createElement('div');
    gridBlock.className = `${ID}-inGrid product-card`;
    gridBlock.innerHTML = `
    ${data.image ? `<div class="${ID}-image"><img src="${data.image}" alt="${data.imageAlt}" /></div>` : ''}
    <div class="${ID}-innerText">
      <h2>${[i][0]}</h2>
      ${data.innerGridHTML}
    </div>`;

    const productEl = document.querySelectorAll('.product-card')[data.position];
    if(productEl) {
      productEl.insertAdjacentElement('afterend', gridBlock);
    }
  });
}
