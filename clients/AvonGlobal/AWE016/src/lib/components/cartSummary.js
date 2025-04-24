const renderCartSummary = (id, data, anchor) => {
  const { DiscountDescription, Price, RegularPrice, Savings } = data.Campaigns[0];
  const formatPrice = (amount, code = 'it-IT', currency = 'EUR') => {
    return new Intl.NumberFormat(code, {
      style: 'currency',
      currency,
    }).format(amount);
  };

  const deliveryPrice = RegularPrice <= 35 ? { string: formatPrice(5.4), float: 5.4 } : { string: 'GRATIS', float: 0 };
  const totalSavings = Savings;
  const tooltipIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
  <circle cx="6" cy="6" r="5.5" stroke="#7436BD"/>
  <path d="M5.31473 7.22999H6.58473C6.58473 6.04999 8.29473 5.89999 8.29473 4.26999C8.29473 3.11999 7.31473 2.44999 5.84473 2.44999C4.59473 2.44999 3.69473 2.90999 3.13473 3.66999L4.10473 4.29999C4.45473 3.80999 4.99473 3.52999 5.73473 3.52999C6.50473 3.52999 6.98473 3.90999 6.98473 4.46999C6.98473 5.46999 5.31473 5.74999 5.31473 7.22999ZM5.95473 9.61999C6.41473 9.61999 6.74473 9.26999 6.74473 8.83999C6.74473 8.40999 6.41473 8.06999 5.95473 8.06999C5.48473 8.06999 5.15473 8.40999 5.15473 8.83999C5.15473 9.26999 5.48473 9.61999 5.95473 9.61999Z" fill="#7436BD"/>
  </svg>`;
  const tooltipText = `Spese calcolate con spedizione standard. Altre opzioni di spedizione disponibili al checkout.`;
  const tooltipCloseicon = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
  <path d="M11.8141 10.9531C11.8723 11.0092 11.9186 11.0764 11.9506 11.1507C11.9825 11.225 11.9993 11.3049 12 11.3858C12.0007 11.4666 11.9853 11.5468 11.9547 11.6216C11.924 11.6965 11.8788 11.7645 11.8216 11.8216C11.7645 11.8788 11.6965 11.924 11.6216 11.9547C11.5468 11.9853 11.4666 12.0007 11.3858 12C11.3049 11.9993 11.225 11.9825 11.1507 11.9506C11.0764 11.9186 11.0092 11.8723 10.9531 11.8141L6 6.86103L1.04693 11.8141C0.990761 11.8723 0.923568 11.9186 0.849275 11.9506C0.774983 11.9825 0.695079 11.9993 0.614225 12C0.533371 12.0007 0.453187 11.9853 0.378351 11.9547C0.303516 11.924 0.235527 11.8788 0.178353 11.8216C0.121178 11.7645 0.0759631 11.6965 0.0453453 11.6216C0.0147276 11.5468 -0.000679607 11.4666 2.29911e-05 11.3858C0.000725589 11.3049 0.0175238 11.225 0.0494374 11.1507C0.081351 11.0764 0.127741 11.0092 0.1859 10.9531L5.13897 6L0.1859 1.04693C0.0749782 0.932087 0.0136011 0.778268 0.0149886 0.618608C0.016376 0.458947 0.0804167 0.306219 0.193318 0.193318C0.306219 0.0804167 0.458947 0.016376 0.618608 0.0149886C0.778268 0.0136011 0.932087 0.0749782 1.04693 0.1859L6 5.13897L10.9531 0.1859C11.0092 0.127741 11.0764 0.081351 11.1507 0.0494374C11.225 0.0175238 11.3049 0.000725589 11.3858 2.29911e-05C11.4666 -0.000679607 11.5468 0.0147276 11.6216 0.0453453C11.6965 0.0759631 11.7645 0.121178 11.8216 0.178353C11.8788 0.235527 11.924 0.303516 11.9547 0.378351C11.9853 0.453187 12.0007 0.533371 12 0.614225C11.9993 0.695079 11.9825 0.774983 11.9506 0.849275C11.9186 0.923568 11.8723 0.990761 11.8141 1.04693L6.86103 6L11.8141 10.9531Z" fill="white"/>
  </svg>`;

  const htmlStr = `
    <div class="${id}__cart-summary">
        <div class="${id}__cart-header">RIEPILOGO</div>
        <div class="${id}__subtotal">
            <span>Subtotale</span>
            <span>${formatPrice(RegularPrice + totalSavings)}</span>
        </div>
        <div class="${id}__discount">
            <span>Sconto</span>
            <span> -${formatPrice(totalSavings)}</span>
        </div>
        <div class="${id}__delivery">
            <span>Consegna a partire da</span>
            <span>${deliveryPrice.string}</span>
        </div>
        <div class="${id}__total">
            <div><span>Totale stimato</span><div class="${id}__tooltip">&nbsp;${tooltipIcon}<span class="${id}__tooltiptext">${tooltipText}<span class="${id}__tooltip-close">${tooltipCloseicon}</span></span></div></div>
            <span>${formatPrice(Price + deliveryPrice.float)}</span>
        </div>
        <div class="${id}__taxblock"></div>
    </div>`;

  document.querySelectorAll(`.${id}__cart-summary`).forEach((elem) => {
    elem?.remove();
  });
  anchor.insertAdjacentHTML('beforebegin', htmlStr);
};
export default renderCartSummary;
