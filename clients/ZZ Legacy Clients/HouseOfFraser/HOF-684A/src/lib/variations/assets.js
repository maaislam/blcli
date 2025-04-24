import shared from "../../../../../../core-files/shared";

const { ID } = shared;

export const card = `<div class="${ID}-sticky-card">
<div class="${ID}-sticky-card--primary">
  <span class="${ID}-sticky-card--heading">ORDER SUMMARY</span>
  <div class="${ID}-sticky-card--arrow"><svg xmlns="http://www.w3.org/2000/svg" width="21" height="12" viewBox="0 0 21 12" fill="none">
  <line y1="-0.5" x2="13.6089" y2="-0.5" transform="matrix(0.712079 0.702099 -0.712079 0.702099 0 1.57663)" stroke="black"/>
  <line x1="20.3536" y1="0.643135" x2="9.84937" y2="11.1473" stroke="black"/>
  </svg></div>
</div>
<div class="${ID}-sticky-card--body">
  <ul class="${ID}-sticky-card--items">
    <li class="${ID}-sticky-card--item"><span class="${ID}-subtotal-label"></span><span class="${ID}-subtotal"></span></li>
    <li class="${ID}-sticky-card--item"><span class="${ID}-shipping-label"></span><span class="${ID}-shipping"></span></li>
    <li class="${ID}-sticky-card--item"><span class="${ID}-promotion-label"></span><span class="${ID}-promotion"></span></li>
    <li class="${ID}-sticky-card--item"><span class="${ID}-discount-label"></span><span class="${ID}-discount"></span></li>
  </ul>
  <div class="${ID}-sticky-card--total"><span>TOTAL</span><span class="${ID}-total">$360</span></div>
</div>
<div class="${ID}-sticky-card--footer">
  <a href="#" class="${ID}-sticky-card--button"><span>PROCEED TO CHECKOUT</span></a>
</div>
</div>
`;
