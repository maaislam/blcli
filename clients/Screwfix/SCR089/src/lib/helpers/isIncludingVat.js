const isIncludingVat = () => {
    const vatElem = document.querySelector('[data-qaid="pdp-vat-toggle"]');
    const isVatText = vatElem && vatElem.textContent.includes('Inc Vat');

    return isVatText;
}

export default isIncludingVat;