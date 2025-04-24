import icon from "../assets/icon";
import links from "../assets/links";
import shared from "../../../../../../core-files/shared";

const { join_the_club, hero_cta } = links;
const { tick } = icon;
const { ID } = shared;
export const babySection = () => `<div class="${ID}-babySection">
<div class="${ID}-babySection-wrapper">
    <div class="image-secondary">
        <img src="${join_the_club}" />
    </div>
  <div class="body-context">
    <h2 class="${ID}-babySection-heading">
    Whether you are a first time parent, or helping to support a growing family, we’ll help you navigate the world of caring for a baby or child.
    </h2>
    <ul class="${ID}-babySection-listContent">
      <li class="lits-items">${tick}<span class="list-item-text">8 points per £1 on baby products***</span></li>
      <li class="lits-items">${tick}<span class="list-item-text">Free gifts at key stages of your baby's development</span></li>
      <li class="lits-items">${tick}<span class="list-item-text">Expert parenting advice</span></li>
      <li class="lits-items">${tick}<span class="list-item-text">Parenting Club offers via the Boots app</span></li>
      <li class="lits-items">${tick}<span class="list-item-text">Sign up to Boots Parenting Club to receive the Aveeno® Baby Daily Care 2-in-1 Shampoo & Conditioner 250ml</span></li>
    </ul>
    <div class="${ID}-babySection-cta">
      <a href="${hero_cta}" class="join-the-club-now-cta">JOIN TODAY</a>
    </div>
  </div>
  <div class="image-primary">
    <img src="${join_the_club}" />
  </div>
</div>
</div>
`;
