const renderBtnsBlock = (id, parentContainer) => {
  document.querySelectorAll('.neither--btn').forEach((item) => {
    item?.closest(`.${id}__btn--container`).remove();
  });

  const htmlStr = `
        
    <div class="${id}__btn--container">
        <div class="${id}__toprow--btns">
            <div class="trade--btn">
                Continue as Trade
            </div>
            <div class="diy--btn">
                Continue as DIY
            </div>
        </div>
        <div class="${id}__bottomrow--btns">
            <span class="neither--btn">Continue as 'Neither'</span>
        </div>
    </div>`;

  const cancelBtn = document.querySelector('[class^="DeliveryAddressSelector__CancelButton-sc"]');
  const applyBtn = document.querySelector('[class^="DeliveryAddressSelector__ApplyButton-sc"]');
  [cancelBtn, applyBtn].forEach((btn) => {
    if (btn) {
      btn.style.display = 'none';
    }
  });

  parentContainer?.insertAdjacentHTML('afterbegin', htmlStr);
};

export default renderBtnsBlock;
