const popupStockHandler = (id, colorConfig) => {
  const popupElem = document.querySelector('[data-test-id="add-variant-modal"]');
  const deliveryMsgBlocks = popupElem.querySelectorAll('[data-test-id="delivery-availability-message"]');
  const collectionMsgBlocks = popupElem.querySelectorAll('[data-test-id="collection-availability-message"]');

  document.querySelector('[data-test-id="variants-list"]').classList.add(`${id}__height-adjust`);

  deliveryMsgBlocks.forEach((deliveryBlock) => {
    deliveryBlock.classList.remove(`${id}__green`, `${id}__red`, `${id}__orange`);
    deliveryBlock.querySelector(`.${id}__deliveryIcon`)?.remove();
    const deliveryStatus = deliveryBlock.innerText.indexOf('Unavailable') !== -1 ? `unavailable` : `available`;

    const htmlStr = `<span class="${id}__deliveryIcon">${colorConfig.icon[deliveryStatus]}</span>`;
    deliveryBlock.querySelector('[data-test-id="icon"]').classList.add(`${id}__hide`);
    deliveryBlock.classList.add(`${colorConfig.deliveryColors[deliveryStatus]}`);

    deliveryBlock.insertAdjacentHTML('afterbegin', htmlStr);
  });
  const updateCollectionMsg = () => {
    collectionMsgBlocks.forEach((collectionBlock) => {
      collectionBlock.classList.remove(`${id}__green`, `${id}__red`, `${id}__orange`);
      collectionBlock.querySelector(`.${id}__collectionIcon`)?.remove();
      const STOCK_THRESHOLD = 20;
      const messageBlock = collectionBlock.querySelector('[data-test-id="collection-message-variant-popup"]');
      const stockText = messageBlock.innerText.match(/\d+/) || '0';
      const stockNumber = parseInt(stockText[0]);

      const collectionStatus =
        stockNumber > STOCK_THRESHOLD ? 'greenAvailablity' : stockNumber == 0 ? 'unavailable' : 'orangeAvailability';

      const htmlStr = `<span class="${id}__collectionIcon">${colorConfig.icon[collectionStatus]}</span>`;
      collectionBlock.querySelector('[data-test-id="icon"]').classList.add(`${id}__hide`);
      collectionBlock.classList.add(`${colorConfig.collectionColors[collectionStatus]}`);

      collectionBlock.insertAdjacentHTML('afterbegin', htmlStr);
    });
  };
  updateCollectionMsg();
  popupElem.querySelectorAll('[data-test-id="input-component"]').forEach((inputElement) => {
    inputElement.addEventListener('input', (e) => {
      setTimeout(() => {
        updateCollectionMsg();
      }, 1000);
    });
  });
};

export default popupStockHandler;
