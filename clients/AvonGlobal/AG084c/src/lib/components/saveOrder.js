const saveOrder = (id, repName) => {
  //check if save order is enabled

  const saveOrderBtns = [...document.querySelectorAll('button')].filter(
    (item) => item.innerText.toLowerCase().indexOf('save order') !== -1
  );
  if (saveOrderBtns.length <= 0) return '';
  saveOrderBtns.forEach((item) => {
    item.setAttribute('data-test-id', `${id}__control-saveorder-btns`);
    if (item.closest('.checkout_container')) return;
    item.style.display = 'none';
  });
  //document.querySelector(`.${id}__has-rep`).classList.add(`${id}__hide`);
  const controlSaveorderInput = document.querySelector(`input[placeholder="Write an order reference"]`);
  controlSaveorderInput.classList.add(`${id}__controlsaveorder-input`);
  controlSaveorderInput.closest('.order_details_section')?.classList.add(`${id}__hide`);

  const htmlStr = `
    <div class="${id}__saveorder">
        <div class="${id}__saveorder-wrapper">
            <div class="${id}__saveorder--title">Order detail</div>
            <div class="${id}__saveorder--repname">
                <span class="prefix">You are shopping as</span>
                <span class="repname">${repName}</span>
            </div>
            <input type="text"
                    placeholder="Write an order reference">
        </div>
        <div class="${id}__saveorder--btn btn-full">
            SAVE ORDER
        </div>
    </div>
    `;

  return htmlStr;
};

export default saveOrder;
