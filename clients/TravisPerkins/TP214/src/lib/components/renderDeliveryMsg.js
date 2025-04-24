const renderDeliveryMsg = (testId, timeValid, skuValid, parentElm, data) => {
  const elemAlreadyinDOM = parentElm.querySelector(`.${testId}__noticeLabel`);
  if (elemAlreadyinDOM) {
    elemAlreadyinDOM.remove();
  }

  const htmlStr = `<div class="${testId}__noticeLabel">
        <img src="http://sb.monetate.net/img/1/581/3437428.png" />
        <p>You can also get<strong> next day delivery</strong> on selected products <span style="font-weight: 700; color: #182D3D;">if you order before 4pm</span></p>
    </div>`;

  if (timeValid() && skuValid(data)) {
    document.querySelector(`.${testId}__greenbox`).classList.add('show-green-box');
    parentElm.querySelector('[data-test-id="branch-title-wrapper"]').insertAdjacentHTML('beforeend', htmlStr);
  }
};

export default renderDeliveryMsg;
