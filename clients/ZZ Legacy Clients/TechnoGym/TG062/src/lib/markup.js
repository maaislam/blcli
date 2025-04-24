import { translate } from './services';

const messageFieldMarkup = `
  <li class="wide TG062_select-wrap">
    <label for="userType" class="required">${translate('I am enquiring for:')}<em>*</em></label>
    <div class="TG062_select">
      <span></span>
      <select name="userType" id="TG062_user">
        <option selected="selected" value="private_individual">${translate('home use')}</option>
        <option value="business">${translate('business use')}</option>
        <option value="freelance_professional">${translate('freelance interest')}</option>
      </select>
    </div>
  </li>
`;

function contactUsMarkup(number) {
  const msg = `
    <div class="TG062_call_us">
      <span>${translate('OR')}</span>
      <h3 class="TG062_title">${translate('Call our consultants on <a href="tel:0800 316 2496">0800 316 2496</a>')}</h3>
      <p>${translate('For spare parts and service contracts: <a href="tel:01344 300236">01344 300236</a>')}</p>
      <p>${translate('For technical assistance: <a href="tel:01344 823700">01344 823700</a>')}</p>
    </div>
  `;
  return msg;
}

const modal = `
  <div class="TG062_pop-up_modal">
    <div class="TG062_body_click"></div>
    <div class="TG062_inner_div">
      <a class="TG062_close_btn">✕</a>
      <div class="TG062_overflow_fix">
        <h3>${translate('Form Successfully Submitted')}</h3>
        <strong>${translate("Don't Miss Out")}</strong>
        <p>${translate('Join our newsletter for Innovative training programmes, news about products, exclusive special offers and top tips on developing a wellness lifestyle.')}</p>
        <div class="TG062_email-wrap">
          <input type="text" placeholder="Email Address" />
          <a class="TG062_submit-newsletter">${translate('Submit')}</a>
        </div>
        <span>${translate('OR')}</span>
        <a href="https://www.technogym.com/gb/products.html" class="TG062_submit-newsletter">${translate('View TechnoGym Products')}</a>
      </div>
    </div>
  </div>
`;

export { messageFieldMarkup, contactUsMarkup, modal };
