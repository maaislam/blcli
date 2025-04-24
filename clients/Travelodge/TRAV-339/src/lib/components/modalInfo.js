const modalInfo = (id, extraCost, totalWithAdditionalNight) => {
  const html = `
    <div class="${id}__modalInfo">
        <div class="${id}__modalInfo-content">
            <div class="${id}__imageWrapper">
                <img src="https://cdn-eu.dynamicyield.com/api/9879209/images/18a9549b31076__trav-339.png"/>
            </div>
            <div class="${id}__info">
                <h2 class="${id}__info-title">Check out anytime on Sunday or stay until 
Monday morning</h2>
                <div class="${id}__info-list">
                    <div class="${id}__info-item">
                        <span class="${id}__icon"></span>
                        <span class="${id}__title">✓ More time to explore</span>
                    </div>
                    <div class="${id}__info-item">
                        <span class="${id}__icon"></span>
                         <span class="${id}__title">✓ Catch some extra Zzzs</span>
                        
                    </div>
                    <div class="${id}__info-item">
                        <span class="${id}__icon"></span>
                       <span class="${id}__title">✓ Freshen up before you head home</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="${id}__modalInfo-summery">
            <div class="${id}__priceInfo">
                <p class="${id}__stayInfo">
                    <span class="${id}__stayInfo-title">Extend your stay</span>
                    <span ${id}__stayInfo-price>+£${Math.round(extraCost)}</span>
                </p>
                <p class="${id}__subTotal">
                     <span class="${id}__subTotal-title">New total:</span>
                    <span ${id}__subTotal-price> £${totalWithAdditionalNight}</span>
                </p>
            </div>
            <button class="${id}__extendButton">Extend your stay</button>
            <button class="${id}__cancelButton">Cancel</button>
        </div>
    </div>
  `;
  return html.trim();
};

export default modalInfo;
