import { promoImage } from '../assets/icons';

const plpPromo = (id, tag = '') => {
  const html = `
        <div class="${id}__plpPromoWrapper ${id}__banner ${id}__${tag}" aria-label="15% off all Karcher, use code KARCHER15">
            <div class="${id}__plpPromoContainer" aria-disabled="true">
                <div class="${id}__promoContent">
                    <strong class="${id}__promoText">15% OFF ALL</strong>
                    <span class="${id}__promoImage">
                        ${promoImage}
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

export default plpPromo;
