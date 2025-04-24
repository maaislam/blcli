const saveOrder = (id, repName) => {
  //check if save order is enabled

  const saveOrderBtns = [...document.querySelectorAll('button')].filter(
    (item) => item.innerText.indexOf('Сохранить заказ') !== -1
  );
  if (saveOrderBtns.length <= 0) return '';
  // saveOrderBtns[0].style.display = 'none';
  saveOrderBtns.forEach((item) => {
    item.setAttribute('data-test-id', `${id}__control-saveorder-btns`);
    if (item.closest('.checkout_container')) return;
    item.style.display = 'none';
  });

  const controlSaveorderInput = document.querySelector(`input[placeholder="Введите название заказа"]`);
  controlSaveorderInput.classList.add(`${id}__controlsaveorder-input`);
  controlSaveorderInput.closest('.order_details_section').classList.add(`${id}__hide`);

  const htmlStr = `
    <div class="${id}__saveorder">
        <div class="${id}__saveorder-wrapper">
            <div class="${id}__saveorder--title">Информация о заказе</div>
            <div class="${id}__saveorder--repname">
                <span class="prefix">Заказ размещает</span>
                <span class="repname">${repName}</span>
            </div>
            <input type="text"
                    placeholder="Введите название заказа">
        </div>
        <div class="${id}__saveorder--btn btn-full">
          Сохранить заказ
        </div>
    </div>
    `;

  return htmlStr;
};

export default saveOrder;
