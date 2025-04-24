const updateBag = (SAP, qty) => {
  window.dispatchEvent(
    new CustomEvent('oct-basket:update', {
      detail: {
        payload: {
          calculateInventory: false,
          channel: 'Ecommerce',
          orderItem: {
            partNumber: `${SAP}`,
            quantity: qty,
          },
        },
        additionalDetails: {
          pageName: '',
          quickBuy: false,
          productId: `${SAP}`,
          quantity: qty,
        },
      },
      bubbles: true,
    })
  );
};

export default updateBag;
