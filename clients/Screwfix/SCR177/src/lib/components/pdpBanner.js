import { promoImage } from '../assets/icons';

const pdpBanner = (id) => {
  const html = `
        <div class="${id}__pdpBannerWrapper ${id}__banner" aria-label="15% off all Karcher, use code KARCHER15">
            <div class="${id}__pdpBannerContainer">
                <div class="${id}__bannerContent">
                    <strong class="${id}__bannerText">15% OFF ALL</strong>
                    <span class="${id}__bannerImage">
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

export default pdpBanner;
