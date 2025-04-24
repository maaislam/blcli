import shared from "../../../../../../core-files/shared";
import links from "../assets/links";

const { avonee, avoneePDP, hero_cta } = links;
const { ID } = shared;
export const avoneeSection = () => `<div class="${ID}-avoneeSection">
<div class="${ID}-avoneeSection-wrapper">
    <div class="image-primary">
        <img src="https://boots.scene7.com/is/image/Boots/aveeno1?scl=1&fmt=png-alpha"/>
    </div>
    <div class="body-context">    
        <h2 class="${ID}-avoneeSection-heading">AVEENO® Baby Daily Care Gentle Bath & Wash</h2>
        <p class="${ID}-avoneeSection-bodyContent">
        <span class="bodyContent-main"
            >Formulated with natural oat extract, AVEENO® Baby Daily Care Hair & Body Wash gently cleanses and nourishes your baby's delicate skin <span class="text-hide-mobile">from top to toe without leaving it dry. It is designed to preserve baby skin's protective barrier and microbiome.</span></span
        >
        <span class="bodyContent-secondary">Sign up to Boots Parenting Club to receive the AVEENO® Baby Baby Daily Care 2-in-1 Shampoo & Conditioner 250ml*</span>
        <span class="${ID}-text-small-termsAndcondition"
            >*T&Cs apply.
            <a href="javascript:void(0)" class="avonee-read-more">Read more here</a>
        </span>
        </p>
        <div class="${ID}-avoneeSection-footer">
            <a href="${hero_cta}" class="join-now-cta">JOIN TODAY</a>
            <a href="${avoneePDP}" class="product-details-cta">PRODUCT DETAILS</a>
        </div>
    </div>
</div>
</div>
`;
