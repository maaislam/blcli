const addToBag = (SAP, qty = 1) => {
    console.log('SAP: ', SAP)
    window.dispatchEvent(
        new CustomEvent('oct-basket:add', {
            detail: {
                payload: {
                    calculateInventory: false,
                    channel: 'Ecommerce',
                    quickBuy: false,
                    orderItems: [
                        {
                            partNumber: `${SAP}`,
                            quantity: qty,
                        },
                    ],
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
export default addToBag;
