import shared from "../../../../../../core-files/shared";
import links from "../assets/links";

const { shopPointDesktop, shopPointMobile } = links;
const { ID } = shared;
export const shopPointBooster = () => `<div class="${ID}-shopPointerBoosterSection">
<div class="${ID}-shopPointerBoosterSection-wrapper">
<h3 class="${ID}-shopPointerBoosterSection-primaryHeader">Shop our top points boosters</h3>
<h4 class="${ID}-shopPointerBoosterSection-secondaryHeader">Collect 8 points per £1 on your baby shop - that's 8p back to spend online & in store!</h4>
<a href="https://www.boots.com/baby-child">
  <div class="${ID}-shopPointerBoosterSection-image">
    <img src="${shopPointDesktop}" alt="" class="shopPointerBoosterSection-desktop" />
    <img src="${shopPointMobile}" alt="" class="shopPointerBoosterSection-mobile" />
  </div>
</a>
</div>
</div>
<div class="${ID}-usps oct-template"></div>
<div class="${ID}-terms oct-template"></div>`;
