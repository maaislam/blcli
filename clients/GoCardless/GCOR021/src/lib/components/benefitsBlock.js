import { playBtn } from '../assets';

const benefitBlock = (id, content) => {
  const {
    heroImage,
    heroImageMob,
    heroReview,
    reviewer,
    subheadline,
    keyBenefits,
    button1Text,
    button1Url,
    button2Text,
    button2Url,
    brandLogo,
  } = content;

  const htmlStr = `brandLogo
    <div class="${id}__casestudy">
        <div class="${id}__casestudy--wrapper">
            <div class="image-wrapper">
                <picture>
                    <source media="(max-width:768px)" srcset="${heroImageMob}">
                    <img src="${heroImage}" alt="${subheadline}">
                </picture>
                <div class="${id}__brand-logo" style="background-image:url(${brandLogo})"></div>
            </div>
            <div class="content-wrapper">
                <div class="text-row row1">
                    <div class="hero-review">
                        <div class="review">${heroReview}</div>
                        <div class="reviewer">${reviewer}</div>
                    </div>
                    <div class="key-benefits">
                        <div class="key-benefits-title">${subheadline}</div>
                        <ul>
                            <li>${keyBenefits[0]}</li>
                            <li>${keyBenefits[1]}</li>
                        </ul>
                    </div>
                </div>
                <div class="button-row row2">
                    <a href="${button1Url}" class="signup-btn css-m5wlkr">
                        ${button1Text}
                    </a>
                    <a href="${button2Url}" class="customerstories-btn css-140tqjo">
                    ${button2Text}
                    </a>
                </div>
            </div>
        </div>
    </div>
    `;

  return htmlStr.trim();
};
export default benefitBlock;
