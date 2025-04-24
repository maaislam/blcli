const plpPromo = (id, data) => {
  const { promoTag, promoText, discountCode, promoLink } = data;
  const html = `
        <a href="${promoLink}" class="${id}__plpPromoWrapper ${id}__banner" aria-label="${promoText} ${discountCode}" data-attr="${promoTag}">
            <div class="${id}__plpPromoContainer" aria-disabled="true">
                <div class="${id}__promoContent">
                    <strong class="${id}__promoText">${promoTag}</strong>
                    <p>${promoText}</p>
                </div>
                <div class="${id}__codeContent">
                    <div class="${id}__promoCode">
                        <span class="${id}__code">${discountCode}</span>
                        <span class="${id}__categoryButton">Shop greenstar</span> 
                    </div>
                    <div class="${id}__promoImage">  
                    </div>          
                </div>
            </div>
        </a>
    `;

  return html.trim();
};

export default plpPromo;
