import { promoImage } from '../assets/icons';

const plpPromoCard = (id) => {
  const html = `
        <div class="${id}__plpPromoCardWrapper" aria-label="15% off all Karcher, use code KARCHER15">
            <div class="${id}__plpPromoCardContainer" aria-disabled="true">
                <div class="${id}__promoContent">
                    <strong class="${id}__promoText">15% OFF</strong>
                    <span class="${id}__promoWrapper">
                        <strong class="${id}__promoText">ALL</strong>
                        <span class="${id}__promoImage">
                            ${promoImage}
                        </span>
                    </span>
                </div>
                <div class="${id}__codeContent">
                    <span class="${id}__codeText">Use Code:</span>
                     <span class="${id}__code">
                        &nbsp;KARCHER15
                    </span>
                </div>
            </div>
        </div>
    `;

  return html.trim();
};

export default plpPromoCard;
