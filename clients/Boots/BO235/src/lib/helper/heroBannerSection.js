import shared from "../../../../../../core-files/shared";
import links from "../assets/links";

const { ID } = shared;
const { hero_banner, hero_cta } = links;

/**
 * Original:
 *  <span class="${ID}-text-body">Giving you all the latest deals, offers and free gifts around parenting and baby buys.</span>
          <span class="${ID}-text-small-star">*8 points per £1 on baby products</span>
 */
export const heroBannerSection = () => `
<h1>Parenting Club</h1>
<div class="${ID}-heroBanner">
  <div class="${ID}-row">
    <div class="${ID}-heroBanner-innerImage">
    <img src="${hero_banner}" alt="Boots Parenting Club"/>
    </div>
    <div class="${ID}-heroBanner-innerContent">
        <div class="${ID}-heroBanner-innerContent-wrapper">
            <div class="${ID}-pc-logo"><img src="https://boots.scene7.com/is/image/Boots/cd%5Fparenting%5Fclub?scl=1&fmt=png-alpha"/></div>
            <span class="${ID}-text-heading">Boots Parenting Club</span>
            <p>From the moment you find out you're pregnant until the day the child you care for turns 5, become a Parenting Club member and enjoy all the benefits!</p>
        </div>
        <div class="${ID}-heroBanner-innerContent-cta">
            <a href="${hero_cta}">JOIN TODAY</a>
        </div>
    </div>
  </div>
</div>


`;
